'use client';
import { ReactNode, useEffect } from 'react';
import '@/app/globals-myapp.css';

export default function MyAppLayout({ children }: { children: ReactNode }) {
  // body に myapp クラスを付与
  useEffect(() => {
    document.body.classList.add('myapp');
    return () => document.body.classList.remove('myapp');
  }, []);

  return <>{children}</>;
} 