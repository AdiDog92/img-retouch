import { imageRetouchApi } from '@/shared/api/client/instance';
import type { Order } from '../model/type';

export const getOrderById = async (id: string) => {
	if (!id) {
		throw new Error('ID заказа не может быть пустым');
	}

	const response = await imageRetouchApi.get(`/orders/${id.trim()}`);

	if (response.status === 404) {
		throw new Error('Заказ не найден');
	}

	if (response.status === 401) {
		throw new Error('Необходимо авторизоваться');
	}

	const data = response.data as Order;

	return data;
};
