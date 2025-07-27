import { use } from 'react';
import OrderDetailPage from '@/components/pages/OrderDetailPage';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function OrderDetail({ params }: PageProps) {
  const { id } = use(params);
  return <OrderDetailPage orderId={id} />;
} 