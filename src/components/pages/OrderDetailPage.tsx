'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import OrderLayout from '../templates/OrderLayout';
import { useOrders } from '../../hook/useOrders';
import styles from './OrderDetailPage.module.css';

export interface OrderDetailPageProps {
  orderId: string;
}

const OrderDetailPage: React.FC<OrderDetailPageProps> = ({ orderId }) => {
  const router = useRouter();
  const { getOrder } = useOrders();
  const order = getOrder(orderId);

  const handleEdit = () => {
    router.push(`/otherapp/${orderId}/edit`);
  };

  const handleBack = () => {
    router.push('/otherapp');
  };

  if (!order) {
    return (
      <OrderLayout
        title="注文詳細"
        buttonType="back"
        onButtonClick={handleBack}
      >
        <div className={styles['order-detail-error']}>
          <h2>注文が見つかりません</h2>
          <p>指定されたIDの注文は存在しません。</p>
        </div>
      </OrderLayout>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return '#ffa500';
      case 'processing': return '#0066cc';
      case 'completed': return '#008000';
      case 'cancelled': return '#cc0000';
      default: return '#666';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return '保留中';
      case 'processing': return '処理中';
      case 'completed': return '完了';
      case 'cancelled': return 'キャンセル';
      default: return status;
    }
  };

  return (
    <OrderLayout
      title="注文詳細"
      buttonType="back"
      onButtonClick={handleBack}
    >
      <div className={styles['order-detail-container']}>
        <div className={styles['order-detail-header']}>
          <h2>注文番号: {order.id}</h2>
          <span 
            className={styles['order-detail-status']}
            style={{ backgroundColor: getStatusColor(order.status) }}
          >
            {getStatusText(order.status)}
          </span>
        </div>

        <div className={styles['order-detail-content']}>
          <div className={styles['order-detail-section']}>
            <h3>基本情報</h3>
            <div className={styles['order-detail-grid']}>
              <div className={styles['order-detail-item']}>
                <label>顧客名</label>
                <span>{order.customerName}</span>
              </div>
              <div className={styles['order-detail-item']}>
                <label>商品名</label>
                <span>{order.productName}</span>
              </div>
              <div className={styles['order-detail-item']}>
                <label>注文日</label>
                <span>{order.orderDate}</span>
              </div>
            </div>
          </div>

          <div className={styles['order-detail-section']}>
            <h3>注文内容</h3>
            <div className={styles['order-detail-grid']}>
              <div className={styles['order-detail-item']}>
                <label>数量</label>
                <span>{order.quantity}個</span>
              </div>
              <div className={styles['order-detail-item']}>
                <label>単価</label>
                <span>¥{order.price.toLocaleString()}</span>
              </div>
              <div className={styles['order-detail-item']}>
                <label>合計金額</label>
                <span className={styles['order-detail-total']}>¥{(order.quantity * order.price).toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className={styles['order-detail-section']}>
            <h3>ステータス情報</h3>
            <div className={styles['order-detail-status-info']}>
              <div className={styles['order-detail-item']}>
                <label>現在のステータス</label>
                <span 
                  className={styles['order-detail-status-text']}
                  style={{ color: getStatusColor(order.status) }}
                >
                  {getStatusText(order.status)}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles['order-detail-actions']}>
          <button onClick={handleEdit} className={styles['order-detail-edit-button']}>
            この注文を編集
          </button>
        </div>
      </div>
    </OrderLayout>
  );
};

export default OrderDetailPage; 