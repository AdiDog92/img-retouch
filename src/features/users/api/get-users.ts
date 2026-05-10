import { imageRetouchApi } from '@/shared/api/client/instance';
import type { User } from '../model/type';

export const getUsers = async (): Promise<User[]> => {
	const response = await imageRetouchApi.get('/users');

	if (response.status == 401) {
		throw new Error('Ошбика при загрузке пользователей');
	}

	const data = response.data as User[];

	return data;
};
