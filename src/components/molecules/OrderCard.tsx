'use client';

import React from 'react';
import Button from '../atoms/Button';
import { Order } from '../../hook/useOrders';
import styles from './OrderCard.module.css';

export interface OrderCardProps {
  order: Order;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const OrderCard: React.FC<OrderCardProps> = ({
  order,
  onView,
  onEdit,
  onDelete
}) => {
  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending': return '#ffa500';
      case 'processing': return '#0066cc';
      case 'completed': return '#008000';
      case 'cancelled': return '#cc0000';
      default: return '#666';
    }
  };

  const getStatusText = (status: Order['status']) => {
    switch (status) {
      case 'pending': return '保留中';
      case 'processing': return '処理中';
      case 'completed': return '完了';
      case 'cancelled': return 'キャンセル';
      default: return status;
    }
  };

  return (
    <div className={styles['order-card']}>
      <div className={styles['order-card-header']}>
        <h3 className={styles['order-card-title']}>注文番号: {order.id}</h3>
        <span 
          className={styles['order-card-status']}
          style={{ backgroundColor: getStatusColor(order.status) }}
        >
          {getStatusText(order.status)}
        </span>
      </div>
      
      <div className={styles['order-card-content']}>
        <div className={styles['order-card-info']}>
          <p><strong>顧客名:</strong> {order.customerName}</p>
          <p><strong>商品名:</strong> {order.productName}</p>
          <p><strong>数量:</strong> {order.quantity}個</p>
          <p><strong>単価:</strong> ¥{order.price.toLocaleString()}</p>
          <p><strong>合計:</strong> ¥{(order.quantity * order.price).toLocaleString()}</p>
          <p><strong>注文日:</strong> {order.orderDate}</p>
        </div>
      </div>
      
      <div className={styles['order-card-actions']}>
        <Button
          label="詳細"
          variant="primary"
          size="small"
          onClick={() => onView(order.id)}
        />
        <Button
          label="編集"
          variant="secondary"
          size="small"
          onClick={() => onEdit(order.id)}
        />
        <Button
          label="削除"
          variant="danger"
          size="small"
          onClick={() => onDelete(order.id)}
        />
      </div>
    </div>
  );
};

export default OrderCard; 