import { imageRetouchApi } from '@/shared/api/client/instance';
import type { Order, OrderStatus } from '../model/type';

export const getOrders = async (
	orderNumber?: number,
	dateFrom?: string,
	dateTo?: string,
	status?: OrderStatus,
	designerId?: string,
): Promise<Order[]> => {
	const uri = new URLSearchParams();

	if (orderNumber) uri.set('orderNumber', orderNumber.toString());
	if (dateFrom) uri.set('dateFrom', dateFrom);
	if (dateTo) uri.set('dateTo', dateTo);
	if (status) uri.set('orderStatus', status);
	if (designerId) uri.set('designerId', designerId);

	const response = await imageRetouchApi.get(`orders?${uri.toString()}`);

	if (response.status == 401) {
		throw new Error('Ошбика при загрузке заказов');
	}

	const data = response.data as Order[];

	return data;
};
