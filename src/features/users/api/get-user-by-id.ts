import { imageRetouchApi } from '@/shared/api/client/instance';
import type { User } from '../model/type';

export const getUserById = async (id: number): Promise<User> => {
	const response = await imageRetouchApi.get(`/users/${id}`);

	if (response.status == 401) {
		throw new Error('Ошбика при загрузке пользователя');
	}

	const data = response.data as User;

	return data;
};
