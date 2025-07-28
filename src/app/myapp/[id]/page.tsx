import { use } from 'react';
import MyOrderDetailPage from '@/components/pages/MyOrderDetailPage';

interface Props { params: Promise<{ id: string }>; }

export default function Detail({ params }: Props) {
  const { id } = use(params);
  return <MyOrderDetailPage orderId={id} />;
} 