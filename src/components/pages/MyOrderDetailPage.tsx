'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useMyOrders } from '@/hook/useMyOrders';

export default function MyOrderDetailPage({ orderId }: { orderId: string }) {
  const router = useRouter();
  const { getOrder } = useMyOrders();
  const order = getOrder(orderId);

  if (!order) return <p>注文が見つかりません</p>;

  return (
    <div style={{ padding: '24px' }}>
      <h1>注文詳細</h1>
      <p>注文番号: {order.id}</p>
      <p>顧客名: {order.customerName}</p>
      <p>商品名: {order.productName}</p>
      <p>数量: {order.quantity}</p>
      <p>単価: ¥{order.price.toLocaleString()}</p>
      <p>合計: ¥{(order.quantity * order.price).toLocaleString()}</p>
      <p>注文日: {order.orderDate}</p>
      <button className="retro-btn" onClick={() => router.push(`/myapp/${orderId}/edit`)}>編集</button>
      &nbsp;
      <button className="retro-btn" onClick={() => router.push('/myapp')}>戻る</button>
    </div>
  );
} 