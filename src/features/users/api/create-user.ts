import { imageRetouchApi } from '@/shared/api/client/instance';
import type { User } from '../model/type';

export const createUser = async (user: User): Promise<User> => {
	const res = await imageRetouchApi.post('/users', user);

	if (res.status == 401) {
		throw new Error('Необходимо авторизоваться');
	}

	const data = res.data as User;

	return data;
};
