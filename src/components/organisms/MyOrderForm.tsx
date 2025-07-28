import React, { useState, useEffect } from 'react';
import Button from '@/components/atoms/Button';
import { MyOrder } from '@/hook/useMyOrders';
import FormField from '@/components/molecules/FormField';
import styles from './MyOrderForm.module.css';

export interface MyOrderFormProps {
  order?: MyOrder;
  onSubmit: (orderData: Omit<MyOrder, 'id'>) => void;
  onCancel: () => void;
  mode: 'create' | 'edit';
}

const MyOrderForm: React.FC<MyOrderFormProps> = ({ order, onSubmit, onCancel, mode }) => {
  const [formData, setFormData] = useState({
    customerName: '',
    productName: '',
    quantity: '',
    price: '',
    orderDate: '',
    status: 'pending' as MyOrder['status']
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

  const validate = () => {
    const newErr: Record<string, string> = {};
    if (!formData.customerName) newErr.customerName = '必須';
    if (!formData.productName) newErr.productName = '必須';
    if (!formData.quantity || parseInt(formData.quantity) <= 0) newErr.quantity = '1以上';
    if (!formData.price || parseInt(formData.price) < 0) newErr.price = '0以上';
    if (!formData.orderDate) newErr.orderDate = '必須';
    setErrors(newErr);
    return Object.keys(newErr).length === 0;
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
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

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <h2>{mode === 'create' ? '新規注文作成' : '注文編集'}</h2>
      <div className={styles.grid}>
        <FormField fieldName="customerName" label="顧客名" value={formData.customerName} onChange={v=>handleChange('customerName',v)} required error={errors.customerName} />
        <FormField fieldName="productName" label="商品名" value={formData.productName} onChange={v=>handleChange('productName',v)} required error={errors.productName} />
        <FormField fieldName="orderDate" label="注文日" type="date" value={formData.orderDate} onChange={v=>handleChange('orderDate',v)} required error={errors.orderDate} />
        <FormField fieldName="quantity" label="数量" type="number" value={formData.quantity} onChange={v=>handleChange('quantity',v)} required error={errors.quantity} />
        <FormField fieldName="price" label="単価" type="number" value={formData.price} onChange={v=>handleChange('price',v)} required error={errors.price} />
      </div>
      <div className={styles.actions}>
        <Button label="保存" variant="primary" size="large" type="submit" />
        <Button label="キャンセル" variant="secondary" size="large" type="button" onClick={onCancel} />
      </div>
    </form>
  );
};

export default MyOrderForm; 