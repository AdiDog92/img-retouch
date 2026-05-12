import { imageRetouchApi } from '@/shared/api/client/instance';
import type { CreateOrderPayload, Order } from '../model/type';

export const createOrder = async (payload: CreateOrderPayload): Promise<Order> => {
	const formData = new FormData();
	formData.set('clientNumber', String(payload.clientNumber));
	formData.set('orderNumber', String(payload.orderNumber));
	formData.set('description', payload.description);
	formData.set('designerId', payload.designerId);
	formData.set('file', payload.file);

	const response = await imageRetouchApi.post<Order>('orders', formData);

	if (response.status === 401) {
		throw new Error('Необходимо авторизоваться');
	}

	return response.data;
};
