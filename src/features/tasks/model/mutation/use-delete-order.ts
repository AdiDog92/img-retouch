import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteOrder } from '../../api/delete-order';
import { ordersQueryKey } from './use-get-orders';

export const useDeleteOrder = () => {
	const queryClient = useQueryClient();

	return useMutation<void, Error, string>({
		mutationFn: deleteOrder,
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ordersQueryKey });
		},
	});
};
