import { useParams } from '@tanstack/react-router';

export const OrderPage = () => {
	const { orderId } = useParams({ from: '/dashboard/tasks/$orderId' });

	return <div>Заказ {orderId}</div>;
};
