import { imageRetouchApi } from '@/shared/api/client/instance';

export const deleteUser = async (id: string): Promise<void> => {
	const res = await imageRetouchApi.delete(`/users/${id}`);

	if (res.status == 401) {
		throw new Error('Необходимо авторизоваться');
	}

	const data = res.data as void;

	return data;
};
