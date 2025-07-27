'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import OrderLayout from '../templates/OrderLayout';
import OrderForm from '../organisms/OrderForm';
import { useOrders } from '../../hook/useOrders';
import { Order } from '../../hook/useOrders';

export interface OrderFormPageProps {
  mode: 'create' | 'edit';
  orderId?: string;
}

const OrderFormPage: React.FC<OrderFormPageProps> = ({ mode, orderId }) => {
  const router = useRouter();
  const { addOrder, updateOrder, getOrder } = useOrders();
  const order = orderId ? getOrder(orderId) : undefined;

  const handleSubmit = (orderData: Omit<Order, 'id'>) => {
    console.log('handleSubmit', orderData);
    if (mode === 'create') {
      addOrder(orderData);
    } else if (orderId) {
      updateOrder(orderId, orderData);
    }
    router.push('/otherapp');
  };

  const handleCancel = () => {
    router.push('/otherapp');
  };

  const getPageTitle = () => {
    return mode === 'create' ? '新規注文作成' : '注文編集';
  };

  const getButtonType = () => {
    return mode === 'create' ? 'cancel' : 'back';
  };

  return (
    <OrderLayout
      title={getPageTitle()}
      buttonType={getButtonType()}
      onButtonClick={handleCancel}
    >
      <OrderForm
        order={order}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        mode={mode}
      />
    </OrderLayout>
  );
};

export default OrderFormPage; 