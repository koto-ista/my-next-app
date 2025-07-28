import { use } from 'react';
import MyOrderFormPage from '@/components/pages/MyOrderFormPage';

interface Props { params: Promise<{ id: string }>; }

export default function Edit({ params }: Props) {
  const { id } = use(params);
  return <MyOrderFormPage mode="edit" orderId={id} />;
} 