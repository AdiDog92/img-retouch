import { useQuery } from '@tanstack/react-query';
import type { Order } from '../type';
import { getOrders } from '../../api/get-orders';

export const ordersQueryKey = ['orders'] as const;

export const useGetOrders = () => {
	return useQuery<Order[], Error>({
		queryKey: ordersQueryKey,
		queryFn: getOrders,
	});
};
