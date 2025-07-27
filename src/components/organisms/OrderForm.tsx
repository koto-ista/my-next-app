'use client';

import React, { useState, useEffect } from 'react';
import Button from '../atoms/Button';
import FormField from '../molecules/FormField';
import { Order } from '../../hook/useOrders';
import styles from './OrderForm.module.css';

export interface OrderFormProps {
  order?: Order;
  onSubmit: (orderData: Omit<Order, 'id'>) => void;
  onCancel: () => void;
  mode: 'create' | 'edit';
}

const OrderForm: React.FC<OrderFormProps> = ({
  order,
  onSubmit,
  onCancel,
  mode
}) => {
  const [formData, setFormData] = useState({
    customerName: '',
    productName: '',
    quantity: '',
    price: '',
    orderDate: '',
    status: 'pending' as Order['status']
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (order && mode === 'edit') {
      setFormData({
        customerName: order.customerName,
        productName: order.productName,
        quantity: order.quantity.toString(),
        price: order.price.toString(),
        orderDate: order.orderDate,
        status: order.status
      });
    }
  }, [order, mode]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.customerName.trim()) {
      newErrors.customerName = '顧客名は必須です';
    }

    if (!formData.productName.trim()) {
      newErrors.productName = '商品名は必須です';
    }

    if (!formData.quantity || parseInt(formData.quantity) <= 0) {
      newErrors.quantity = '数量は1以上である必要があります';
    }

    if (!formData.price || parseInt(formData.price) < 0) {
      newErrors.price = '単価は0以上である必要があります';
    }

    if (!formData.orderDate) {
      newErrors.orderDate = '注文日は必須です';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('handleSubmit', formData);
    if (validateForm()) {
      onSubmit({
        customerName: formData.customerName,
        productName: formData.productName,
        quantity: parseInt(formData.quantity),
        price: parseInt(formData.price),
        orderDate: formData.orderDate,
        status: formData.status
      });
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

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
    <div className={styles['order-form-container']}>
      <div className={styles['order-form-header']}>
        <h2>{mode === 'create' ? '新規注文作成' : '注文編集'}</h2>
        <span 
          className={styles['order-form-status']}
          style={{ backgroundColor: getStatusColor(formData.status) }}
        >
          {getStatusText(formData.status)}
        </span>
      </div>

      <div className={styles['order-form-content']}>
        <form onSubmit={handleSubmit}>
          <div className={styles['order-form-section']}>
            <h3>基本情報</h3>
            <div className={styles['order-form-grid']}>
              <FormField
                fieldName="customerName"
                label="顧客名"
                value={formData.customerName}
                onChange={(value) => handleInputChange('customerName', value)}
                placeholder="顧客名を入力"
                required
                error={errors.customerName}
              />
              
              <FormField
                fieldName="productName"
                label="商品名"
                value={formData.productName}
                onChange={(value) => handleInputChange('productName', value)}
                placeholder="商品名を入力"
                required
                error={errors.productName}
              />
              
              <FormField
                fieldName="orderDate"
                label="注文日"
                type="date"
                value={formData.orderDate}
                onChange={(value) => handleInputChange('orderDate', value)}
                required
                error={errors.orderDate}
              />
            </div>
          </div>

          <div className={styles['order-form-section']}>
            <h3>注文内容</h3>
            <div className={styles['order-form-grid']}>
              <FormField
                fieldName="quantity"
                label="数量"
                type="number"
                value={formData.quantity}
                onChange={(value) => handleInputChange('quantity', value)}
                placeholder="数量を入力"
                required
                error={errors.quantity}
              />
              
              <FormField
                fieldName="price"
                label="単価"
                type="number"
                value={formData.price}
                onChange={(value) => handleInputChange('price', value)}
                placeholder="単価を入力"
                required
                error={errors.price}
              />
              
              <div className={styles['order-form-item']}>
                <label>合計金額</label>
                <span className={styles['order-form-total']}>
                  ¥{formData.quantity && formData.price ? (parseInt(formData.quantity) * parseInt(formData.price)).toLocaleString() : '0'}
                </span>
              </div>
            </div>
          </div>

          <div className={styles['order-form-section']}>
            <h3>ステータス情報</h3>
            <div className={styles['order-form-status-info']}>
              <div className={styles['order-form-item']}>
                <label>ステータス</label>
                <select
                  value={formData.status}
                  onChange={(e) => handleInputChange('status', e.target.value)}
                  className={styles['order-form-select']}
                >
                  <option value="pending">保留中</option>
                  <option value="processing">処理中</option>
                  <option value="completed">完了</option>
                  <option value="cancelled">キャンセル</option>
                </select>
              </div>
            </div>
          </div>

          <div className={styles['order-form-actions']}>
            <Button
              label="保存"
              variant="primary"
              size="large"
              type="submit"
            />
            <Button
              label="キャンセル"
              variant="secondary"
              size="large"
              onClick={onCancel}
              type="button"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderForm; 