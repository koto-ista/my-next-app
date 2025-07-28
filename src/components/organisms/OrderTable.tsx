'use client';

import React from 'react';
import Button from '../atoms/Button';
import { Order } from '../../hook/useOrders';
import styles from './OrderTable.module.css';

export interface OrderTableProps {
  orders: Order[];
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const OrderTable: React.FC<OrderTableProps> = ({
  orders,
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
    <div className={styles['order-table-container']}>
      <table className={styles['order-table']}>
        <thead>
          <tr>
            <th>注文番号</th>
            <th>顧客名</th>
            <th>商品名</th>
            {/* <th>数量</th> */}
            {/* <th>単価</th> */}
            {/* <th>合計</th> */}
            {/* <th>注文日</th> */}
            <th>ステータス</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id} className={styles['order-table-row']}>
              <td>{order.id}</td>
              <td>{order.customerName}</td>
              <td>{order.productName}</td>
              {/* <td>{order.quantity}</td> */}
              {/* <td>¥{order.price.toLocaleString()}</td> */}
              {/* <td className={styles['order-table-total']}>¥{(order.quantity * order.price).toLocaleString()}</td> */}
              {/* <td>{order.orderDate}</td> */}
              <td>
                <span 
                  className={styles['order-table-status']}
                  style={{ backgroundColor: getStatusColor(order.status) }}
                >
                  {getStatusText(order.status)}
                </span>
              </td>
              <td className={styles['order-table-actions']}>
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable; 