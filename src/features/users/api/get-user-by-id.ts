import type { User } from '../model/type';
import { imageRetouchApi } from '@/shared/api/client/instance';

export const getUserById = async (id: string): Promise<User> => {
	const res = await imageRetouchApi.get(`/users/${id}`);

	if (res.status == 401) {
		throw new Error('Необходимо авторизоваться');
	}

	const data = res.data as User;

	return data;
};
