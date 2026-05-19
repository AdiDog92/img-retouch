import { imageRetouchApi } from '@/shared/api/client/instance';
import type { Order } from '../model/type';

/** Тело как у `updateOrderMultipart`: только @RequestParam + файлы. */
export type UpdateOrderMultipartParams = {
	orderId: string;
	description?: string | null;
	designerId?: number | null;
	file?: File;
	readyFile?: File;
};

export const updateOrder = async (params: UpdateOrderMultipartParams): Promise<Order> => {
	const { orderId, description, designerId, file, readyFile } = params;
	const formData = new FormData();

	if (description != null && String(description).trim() !== '') {
		formData.append('description', String(description).trim());
	}
	if (designerId != null && Number.isFinite(designerId)) {
		formData.append('designerId', String(designerId));
	}
	if (file) {
		formData.append('file', file);
	}
	if (readyFile) {
		formData.append('readyFile', readyFile);
	}

	const response = await imageRetouchApi.put<Order>(`/orders/updateOrder/${orderId}`, formData);

	if (response.status === 401) {
		throw new Error('Необходимо авторизоваться');
	}

	if (response.status === 404) {
		throw new Error('Заказ не найден');
	}

	return response.data;
};
