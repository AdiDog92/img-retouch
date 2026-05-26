import { imageRetouchApi } from '@/shared/api/client/instance';
import type { User } from '../model/type';

export const updateUser = async (id: string, user: User): Promise<User> => {
	const res = await imageRetouchApi.put(`/users/${id}`, user);

	if (res.status == 401) {
		throw new Error('Необходимо авторизоваться');
	}

	return res.data as User;
};
