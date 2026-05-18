import { imageRetouchApi } from '@/shared/api/client/instance';

export const deleteOrder = async (id: string): Promise<void> => {
	const response = await imageRetouchApi.delete(`/orders/deleteOrder/${id}`);

	if (response.status === 401) {
		throw new Error('Необходимо авторизоваться');
	}

	const data = response.data as void;

	return data;
};
