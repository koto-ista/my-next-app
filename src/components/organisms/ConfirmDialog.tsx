'use client';

import React from 'react';
import Modal from '../molecules/Modal';
import Button from '../atoms/Button';
import styles from './ConfirmDialog.module.css';

export interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  variant?: 'danger' | 'warning' | 'info';
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  title,
  message,
  confirmLabel = '確認',
  cancelLabel = 'キャンセル',
  onConfirm,
  onCancel,
  variant = 'danger'
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'danger':
        return {
          icon: '⚠️',
          confirmVariant: 'danger' as const,
          headerClass: styles['dialog-header--danger']
        };
      case 'warning':
        return {
          icon: '⚠️',
          confirmVariant: 'warning' as const,
          headerClass: styles['dialog-header--warning']
        };
      case 'info':
        return {
          icon: 'ℹ️',
          confirmVariant: 'primary' as const,
          headerClass: styles['dialog-header--info']
        };
      default:
        return {
          icon: '⚠️',
          confirmVariant: 'danger' as const,
          headerClass: styles['dialog-header--danger']
        };
    }
  };

  const variantStyles = getVariantStyles();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onCancel}
      size="medium"
    >
      <div className={`${styles.dialogHeader} ${variantStyles.headerClass}`}>
        <div className={styles.dialogIcon}>
          {variantStyles.icon}
        </div>
        <h2 className={styles.dialogTitle} id="dialog-title">{title}</h2>
      </div>
      
      <div className={styles.dialogContent}>
        <p className={styles.dialogMessage} id="dialog-message">{message}</p>
      </div>
      
      <div className={styles.dialogActions}>
        <Button
          label={cancelLabel}
          variant="secondary"
          size="medium"
          onClick={onCancel}
          type="button"
        />
        <Button
          label={confirmLabel}
          variant={variantStyles.confirmVariant}
          size="medium"
          onClick={onConfirm}
          type="button"
        />
      </div>
    </Modal>
  );
};

export default ConfirmDialog; 