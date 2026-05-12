import { useQuery } from '@tanstack/react-query';
import type { Order, OrderStatus } from '../type';
import { getOrders } from '../../api/get-orders';

export const ordersQueryKey = ['orders'] as const;

export const useGetOrders = (
	orderNumber?: number,
	dateFrom?: string,
	dateTo?: string,
	status?: OrderStatus,
	designerId?: string,
) => {
	return useQuery<Order[], Error>({
		queryKey: [...ordersQueryKey, { orderNumber, dateFrom, dateTo, status, designerId }] as const,
		queryFn: () => getOrders(orderNumber, dateFrom, dateTo, status, designerId),
	});
};
