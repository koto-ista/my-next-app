import { ReactNode } from 'react';
import '@/app/globals-myapp.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "自社アプリ - 注文管理システム",
  description: "自社アプリの注文管理システム",
};

export default function MyAppLayout({ children }: { children: ReactNode }) {
  // // body に myapp クラスを付与
  // useEffect(() => {
  //   document.body.classList.add('myapp');
  //   return () => document.body.classList.remove('myapp');
  // }, []);

  return <>{children}</>;
} 