import { OrderPage } from '@/pages/orderPage/ui/order-page';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard/tasks/$orderId')({
	component: () => <OrderPage />,
});
