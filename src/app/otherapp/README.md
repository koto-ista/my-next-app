# コンポーネント開発ガイドライン

本書はフロントエンド層（`my-next-app/src/`）に存在する

* `app/otherapp`
* `hook/`
* `components/`

の 3 つのディレクトリを横断する **コンポーネント設計 / 実装ルール** をまとめたものです。
実装を開始する前に必ず一読し、記載内容を満たしていることを確認してください。

---

## 1. ディレクトリ構成と責務

| ディレクトリ | 役割 | 依存関係 |
|--------------|------|-----------|
| `components/atoms`      | 最小単位の再利用 UI。色・余白を含め **単独で意味がある** もの。 | 外部 UI ライブラリのみ |
| `components/molecules`  | 複数の Atom を組み合わせて 1 つの入力やカードを表す。 | Atoms |
| `components/organisms`  | 複数の Molecule / Atom を組み合わせてセクションを形成。API 呼び出しは **行わない**。 | Molecules / Atoms |
| `components/templates`  | ページ共通レイアウト。ヘッダーやナビゲーションを含む。 | Organisms 以下 |
| `components/pages`      | 画面のロジック層。テンプレートを組み合わせ、Hook でデータを取得。 | Templates 以下 / Hooks |
| `hook/meibo-app`       | 業務ドメイン固有のカスタム Hook。`useEmployees` など。 | axios・外部 API |
| `app/otherapp`      | Next.js pages ルーターのエントリ。URL ごとのページコンポーネント。 | components/pages 以下 |

> 原則として **上位層が下位層にのみ依存** します。逆依存は不可。
>
> app/otherapp → components/pages → templates → organisms → molecules → atoms

---

## 2. 命名規則

### ファイル / ディレクトリ
- **パスはキャメルケース**、複合語はパス区切りで表現
 - `component/organisms/employee/ListContent.tsx`
- テストは同階層に `*.spec.tsx`, Storybook は `*.stories.tsx`

### コンポーネント
- React コンポーネントは **パス + 機能名** で一意にする
 - 例: `EmployeeListContent`, `AddAdminModalButton`
- Props 型は `<ComponentName>Props` を推奨

### Hook
- 命名は **`use` + 動詞/目的語**
 - `useEmployees`, `useModel`
- 引数 = 初期値, 返り値 = 状態 & アクション関数をまとめたオブジェクト

---

## 3. Props 設計原則

1. **単方向データフロー**
  - 子が上位層の状態を直接書き換えない
2. **最小限の責務で分割**
  - Atom はプレゼンテーションのみ
  - Organism 以上でイベントハンドラを受け取る
3. **必須か任意かを明示**
  - `undefined` 許容を減らし、Optional Chaining より事前チェックを推奨

---

## 4. Hooks 実装指針

| 観点 | ルール |
|------|--------|
| 冪等性 | 外部副作用（fetch など）は `useEffect` 内に閉じる |
| 型安全 | 戻り値オブジェクトを **明示的インターフェイス** で定義 |
| テスト | ビジネスロジックは `react-hooks-testing-library` でユニットテスト |

例: `useEmployees`
```ts
export interface EmployeesHook {
 employees: Employee[];
 addEmployee(e: Omit<Employee, 'id'>): void;
 editEmployee(e: Employee): void;
 deleteEmployee(id: number): void;
}
```

---

## 5. ページ層 (pages/meibo-app)

1. **API 通信は禁止** → 必要であれば Hook 経由で行う
2. **ページタイトル / SEO** は `next/head` で設定
3. **レイアウト** には必ず `EmployeeBase` を通し、状態を保持

---

## 6. Storybook / テスト

- Atom/Molecule/Organism には Storybook を作成し UI 確認
- Jest + Testing Library で単体テストを必ず追加

---

## 7. コード品質

| ツール | コマンド |
|--------|----------|
| ESLint | `npm run lint` |
| Prettier | `npm run format` |
| Stylelint | `npm run lint:style` |

CI で上記スクリプトが失敗するとマージできない設定を推奨。

---

## 8. 参考

- Atomic Design: Brad Frost – *Atomic Design*
- Next.js 公式 Best Practice
- React Hooks RFC

以上。
