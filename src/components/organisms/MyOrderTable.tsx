import React from 'react';
import { MyOrder } from '@/hook/useMyOrders';
import styles from './MyOrderTable.module.css';

export interface MyOrderTableProps {
  orders: MyOrder[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const MyOrderTable: React.FC<MyOrderTableProps> = ({ orders, onEdit, onDelete }) => {
  return (
    <table className={`${styles.table} retro-table`}>
      <thead>
        <tr>
          <th>注文番号</th>
          <th>顧客名</th>
          <th>商品名</th>
          <th>数量</th>
          <th>合計金額</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        {orders.map(order => (
          <tr key={order.id}>
            <td>{order.id}</td>
            <td>{order.customerName}</td>
            <td>{order.productName}</td>
            <td>{order.quantity}</td>
            <td>¥{(order.quantity * order.price).toLocaleString()}</td>
            <td>
              <button className="retro-btn" onClick={() => onEdit(order.id)}>編集</button>
              &nbsp;
              <button className="retro-btn" onClick={() => onDelete(order.id)}>削除</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MyOrderTable; 