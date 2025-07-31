import { ReactNode } from 'react';
// import '@/app/globals-otherapp.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "他社アプリ - 注文管理システム",
  description: "他社アプリの注文管理システム",
};

export default function OtherAppLayout({ children }: { children: ReactNode }) {
  // body に myapp クラスを付与
  // useEffect(() => {
  //   document.body.classList.add('otherapp');
  //   return () => document.body.classList.remove('otherapp');
  // }, []);

  return <>{children}</>;
} 