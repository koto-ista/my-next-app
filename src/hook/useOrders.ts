'use client';

import { useState, useEffect } from 'react';

export interface Order {
  id: string;
  customerName: string;
  productName: string;
  quantity: number;
  price: number;
  purchaseCost: number;
  purchaseDate: string;
  previousOwner: string;
  orderDate: string;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
}

export interface OrdersHook {
  orders: Order[];
  addOrder: (order: Omit<Order, 'id'>) => void;
  updateOrder: (id: string, order: Omit<Order, 'id'>) => void;
  deleteOrder: (id: string) => void;
  getOrder: (id: string) => Order | undefined;
  resetToInitialData: () => void;
}

// 注文番号生成関数
const generateOrderId = (): string => {
  // 2文字の大文字英字を生成
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const firstPart = Array.from({ length: 2 }, () => 
    letters.charAt(Math.floor(Math.random() * letters.length))
  ).join('');
  
  // 4文字の数値を生成
  const secondPart = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  
  // 6文字の数値を生成
  const thirdPart = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
  
  return `${firstPart}${secondPart}-${thirdPart}`;
};

const initialOrders: Order[] = [
  {
    id: 'AB1234-567890',
    customerName: '田中太郎',
    productName: 'ノートパソコン',
    quantity: 1,
    price: 150000,
    purchaseCost: 140000,
    purchaseDate: '2024-01-14',
    previousOwner: '山田花子',
    orderDate: '2024-01-15',
    status: 'completed'
  },
  {
    id: 'CD5678-123456',
    customerName: '佐藤花子',
    productName: 'スマートフォン',
    quantity: 2,
    price: 80000,
    purchaseCost: 75000,
    purchaseDate: '2024-01-15',
    previousOwner: '鈴木一郎',
    orderDate: '2024-01-16',
    status: 'processing'
  },
  {
    id: 'EF9012-789012',
    customerName: '鈴木一郎',
    productName: 'タブレット',
    quantity: 1,
    price: 50000,
    purchaseCost: 45000,
    purchaseDate: '2024-01-16',
    previousOwner: '田中太郎',
    orderDate: '2024-01-17',
    status: 'pending'
  }
];

export const useOrders = (): OrdersHook => {
  const [orders, setOrders] = useState<Order[]>([]);

  // 初期データの読み込み
  useEffect(() => {
    const savedOrders = localStorage.getItem('orders');
    if (savedOrders) {
      try {
        const parsedOrders = JSON.parse(savedOrders);
        // 既存データのID形式をチェックし、必要に応じて新しい形式に変換
        const migratedOrders = parsedOrders.map((order: any) => {
          // 数値のID（古い形式）を新しい形式に変換
          if (typeof order.id === 'number' || (typeof order.id === 'string' && /^\d+$/.test(order.id))) {
            return {
              ...order,
              id: generateOrderId()
            };
          }
          return order;
        });
        setOrders(migratedOrders);
        // 変換されたデータを保存
        localStorage.setItem('orders', JSON.stringify(migratedOrders));
      } catch (error) {
        console.error('localStorageの読み込みエラー:', error);
        // エラーの場合は初期データを使用
        setOrders(initialOrders);
        localStorage.setItem('orders', JSON.stringify(initialOrders));
      }
    } else {
      setOrders(initialOrders);
      localStorage.setItem('orders', JSON.stringify(initialOrders));
    }
  }, []);

  // データの永続化
  useEffect(() => {
    if (orders.length > 0) {
      localStorage.setItem('orders', JSON.stringify(orders));
    }
  }, [orders]);

  const addOrder = (orderData: Omit<Order, 'id'>) => {
    const newOrder: Order = {
      ...orderData,
      id: generateOrderId()
    };
    setOrders(prev => [...prev, newOrder]);
  };

  const updateOrder = (id: string, orderData: Omit<Order, 'id'>) => {
    setOrders(prev => 
      prev.map(order => 
        order.id === id ? { ...orderData, id } : order
      )
    );
  };

  const deleteOrder = (id: string) => {
    setOrders(prev => prev.filter(order => order.id !== id));
  };

  const getOrder = (id: string) => {
    return orders.find(order => order.id === id);
  };

  const resetToInitialData = () => {
    setOrders(initialOrders);
    localStorage.setItem('orders', JSON.stringify(initialOrders));
  };

  return {
    orders,
    addOrder,
    updateOrder,
    deleteOrder,
    getOrder,
    resetToInitialData
  };
}; 