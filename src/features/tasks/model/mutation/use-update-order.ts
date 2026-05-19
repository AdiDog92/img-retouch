import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Order } from '../type';
import { updateOrder, type UpdateOrderMultipartParams } from '../../api/update-order';
import { toast } from 'sonner';
import { ordersQueryKey } from './use-get-orders';

export const useUpdateOrder = () => {
	const queryClient = useQueryClient();

	return useMutation<Order, Error, UpdateOrderMultipartParams>({
		mutationFn: updateOrder,
		onSuccess: async (_, { orderId }) => {
			await queryClient.invalidateQueries({ queryKey: ['order', orderId] });
			await queryClient.invalidateQueries({ queryKey: ordersQueryKey });
			toast.success('Заказ успешно обновлен');
		},
		onError: (err) => {
			toast.error(err.message || 'Ошибка при обновлении заказа');
		},
	});
};
