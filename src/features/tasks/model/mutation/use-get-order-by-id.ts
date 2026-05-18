import { useQuery } from '@tanstack/react-query';
import { getOrderById } from '../../api/get-order-by-id';
import type { Order } from '../type';

type UseGetOrderByIdOptions = {
	enabled?: boolean;
};

export const useGetOrderById = (id: string, options: UseGetOrderByIdOptions = {}) => {
	const { enabled = true } = options;

	return useQuery<Order, Error>({
		queryKey: ['order', id],
		queryFn: () => getOrderById(id),
		enabled: enabled && Boolean(id),
	});
};
