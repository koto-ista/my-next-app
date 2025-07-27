'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import OrderLayout from '../templates/OrderLayout';
import OrderTable from '../organisms/OrderTable';
import ConfirmDialog from '../organisms/ConfirmDialog';
import { useOrders } from '../../hook/useOrders';
import styles from './OrderListPage.module.css';

const OrderListPage: React.FC = () => {
  const router = useRouter();
  const { orders, deleteOrder } = useOrders();
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    orderId: string | null;
    orderName: string;
  }>({
    isOpen: false,
    orderId: null,
    orderName: ''
  });

  const handleViewOrder = (id: string) => {
    router.push(`/otherapp/${id}`);
  };

  const handleEditOrder = (id: string) => {
    router.push(`/otherapp/${id}/edit`);
  };

  const handleDeleteOrder = (id: string) => {
    const order = orders.find(o => o.id === id);
    if (order) {
      setDeleteModal({
        isOpen: true,
        orderId: id,
        orderName: `${order.customerName} - ${order.productName}`
      });
    }
  };

  const handleConfirmDelete = () => {
    if (deleteModal.orderId) {
      deleteOrder(deleteModal.orderId);
      setDeleteModal({
        isOpen: false,
        orderId: null,
        orderName: ''
      });
    }
  };

  const handleCancelDelete = () => {
    setDeleteModal({
      isOpen: false,
      orderId: null,
      orderName: ''
    });
  };

  const handleAddOrder = () => {
    router.push('/otherapp/add');
  };

  return (
    <>
      <OrderLayout
        title="注文一覧"
        buttonType="new"
        onButtonClick={handleAddOrder}
      >
        <div className={styles['order-list-container']}>
          {orders.length === 0 ? (
            <div className={styles['order-list-empty']}>
              <p>注文データがありません</p>
              <button onClick={handleAddOrder}>新規注文を作成</button>
            </div>
          ) : (
            <OrderTable
              orders={orders}
              onView={handleViewOrder}
              onEdit={handleEditOrder}
              onDelete={handleDeleteOrder}
            />
          )}
        </div>
      </OrderLayout>

      <ConfirmDialog
        isOpen={deleteModal.isOpen}
        title="注文の削除"
        message={`「${deleteModal.orderName}」を削除しますか？\nこの操作は取り消すことができません。`}
        confirmLabel="削除"
        cancelLabel="キャンセル"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        variant="danger"
      />
    </>
  );
};

export default OrderListPage; 