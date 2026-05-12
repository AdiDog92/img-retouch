import { toast } from 'sonner';
import { createOrder } from '../../api/create-order';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ordersQueryKey } from './use-get-orders';
import type { CreateOrderPayload, Order } from '../type';

export const useCreateOrder = () => {
	const queryClient = useQueryClient();

	return useMutation<Order, Error, CreateOrderPayload>({
		mutationFn: createOrder,
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ordersQueryKey });
			toast.success('Заказ успешно создан');
		},
		onError: () => {
			toast.error('Ошибка при создании заказа');
		},
	});
};
