'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useMyOrders } from '@/hook/useMyOrders';
import MyOrderTable from '@/components/organisms/MyOrderTable';

export default function MyOrderListPage() {
  const router = useRouter();
  const { orders, deleteOrder, resetToInitialData } = useMyOrders();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleAdd = () => router.push('/myapp/add');
  const handleEdit = (id: string) => router.push(`/myapp/${id}/edit`);
  const handleDetail = (id: string) => router.push(`/myapp/${id}`);

  const handleDelete = (id: string) => {
    if (confirm('本当に削除しますか？')) deleteOrder(id);
  };

  const handleReset = () => {
    if (confirm('localStorageの注文データを初期状態にリセットします。よろしいですか？')) {
      resetToInitialData();
    }
  };

  return (
    <div style={{ padding: '24px' }}>
      <h1>自社アプリ - 注文一覧</h1>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        <button className="retro-btn" onClick={handleAdd}>新規追加</button>
        <button className="retro-btn" onClick={handleReset}>データリセット</button>
      </div>
      <MyOrderTable orders={orders} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
} 