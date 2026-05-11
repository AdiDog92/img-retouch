import { imageRetouchApi } from '@/shared/api/client/instance';
import type { Order } from '../model/type';

export const getOrders = async (): Promise<Order[]> => {
	const response = await imageRetouchApi.get('orders');

	if (response.status == 401) {
		throw new Error('Ошбика при загрузке заказов');
	}

	const data = response.data as Order[];

	return data;
};
