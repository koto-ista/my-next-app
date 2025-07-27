'use client';

import React from 'react';
import Button from '../atoms/Button';
import styles from './OrderLayout.module.css';

export interface OrderLayoutProps {
  children: React.ReactNode;
  title: string;
  buttonType?: 'new' | 'back' | 'cancel';
  onButtonClick?: () => void;
}

const OrderLayout: React.FC<OrderLayoutProps> = ({
  children,
  title,
  buttonType,
  onButtonClick
}) => {
  const getButtonLabel = () => {
    switch (buttonType) {
      case 'new': return '新規注文';
      case 'back': return '一覧に戻る';
      case 'cancel': return 'キャンセル';
      default: return '';
    }
  };

  return (
    <div className={styles['order-layout']}>
      <header className={styles['order-layout-header']}>
        <div className={styles['order-layout-header-content']}>
          <h1 className={styles['order-layout-title']}>注文管理システム</h1>
          <h2 className={styles['order-layout-subtitle']}>{title}</h2>
        </div>
        {buttonType && onButtonClick && (
          <div className={styles['order-layout-actions']}>
            <Button
              label={getButtonLabel()}
              variant={buttonType === 'new' ? 'primary' : 'secondary'}
              size="medium"
              onClick={onButtonClick}
            />
          </div>
        )}
      </header>
      
      <main className={styles['order-layout-main']}>
        {children}
      </main>
    </div>
  );
};

export default OrderLayout; 