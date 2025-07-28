'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useMyOrders, MyOrder } from '@/hook/useMyOrders';
import MyOrderForm from '@/components/organisms/MyOrderForm';

export interface MyOrderFormPageProps {
  mode: 'create' | 'edit';
  orderId?: string;
}

export default function MyOrderFormPage({ mode, orderId }: MyOrderFormPageProps) {
  const router = useRouter();
  const { addOrder, updateOrder, getOrder } = useMyOrders();
  const order = orderId ? getOrder(orderId) : undefined;

  const handleSubmit = (data: Omit<MyOrder, 'id'>) => {
    if (mode === 'create') addOrder(data);
    else if (orderId) updateOrder(orderId, data);
    router.push('/myapp');
  };

  const handleCancel = () => router.push('/myapp');

  return (
    <div style={{ padding: '24px' }}>
      <MyOrderForm order={order} onSubmit={handleSubmit} onCancel={handleCancel} mode={mode} />
    </div>
  );
} 