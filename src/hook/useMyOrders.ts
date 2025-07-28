'use client';

import { useState, useEffect } from 'react';

export interface MyOrder {
  id: string;
  customerName: string;
  productName: string;
  quantity: number;
  price: number;
  orderDate: string;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
}

export interface MyOrdersHook {
  orders: MyOrder[];
  addOrder: (order: Omit<MyOrder, 'id'>) => void;
  updateOrder: (id: string, order: Omit<MyOrder, 'id'>) => void;
  deleteOrder: (id: string) => void;
  getOrder: (id: string) => MyOrder | undefined;
  resetToInitialData: () => void;
}

// 注文番号生成 (昭和風に頭に "SY" を付与)
const generateMyOrderId = (): string => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const firstPart = Array.from({ length: 2 }, () => letters.charAt(Math.floor(Math.random() * letters.length))).join('');
  const secondPart = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  const thirdPart = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
  return `SY${firstPart}${secondPart}-${thirdPart}`;
};

const initialMyOrders: MyOrder[] = [
  {
    id: 'SYAB1234-567890',
    customerName: '山田 昭夫',
    productName: 'ブラウン管テレビ',
    quantity: 1,
    price: 45000,
    orderDate: '1985-07-10',
    status: 'completed'
  },
  {
    id: 'SYCD5678-123456',
    customerName: '佐々木 和子',
    productName: 'ラジカセ',
    quantity: 2,
    price: 12000,
    orderDate: '1984-12-05',
    status: 'processing'
  }
];

export const useMyOrders = (): MyOrdersHook => {
  const STORAGE_KEY = 'myOrders';
  const [orders, setOrders] = useState<MyOrder[]>([]);

  // localStorage から読み込み
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setOrders(JSON.parse(saved));
      } catch {
        setOrders(initialMyOrders);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initialMyOrders));
      }
    } else {
      setOrders(initialMyOrders);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialMyOrders));
    }
  }, []);

  // 保存
  useEffect(() => {
    if (orders.length) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
    }
  }, [orders]);

  const addOrder = (orderData: Omit<MyOrder, 'id'>) => {
    const newOrder: MyOrder = { ...orderData, id: generateMyOrderId() };
    setOrders(prev => [...prev, newOrder]);
  };

  const updateOrder = (id: string, orderData: Omit<MyOrder, 'id'>) => {
    setOrders(prev => prev.map(o => (o.id === id ? { ...orderData, id } : o)));
  };

  const deleteOrder = (id: string) => {
    setOrders(prev => prev.filter(o => o.id !== id));
  };

  const getOrder = (id: string) => orders.find(o => o.id === id);

  const resetToInitialData = () => {
    setOrders(initialMyOrders);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialMyOrders));
  };

  return { orders, addOrder, updateOrder, deleteOrder, getOrder, resetToInitialData };
}; 