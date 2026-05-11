import { imageRetouchApi } from '@/shared/api/client/instance';
import type { CreateUserPayload, User } from '../model/type';

export const createUser = async (user: CreateUserPayload): Promise<User> => {
	const res = await imageRetouchApi.post('/users', user);

	if (res.status == 401) {
		throw new Error('Необходимо авторизоваться');
	}

	const data = res.data as User;

	return data;
};
