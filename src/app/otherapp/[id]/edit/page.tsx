import { use } from 'react';
import OrderFormPage from '@/components/pages/OrderFormPage';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function EditOrder({ params }: PageProps) {
  const { id } = use(params);
  return <OrderFormPage mode="edit" orderId={id} />;
} 