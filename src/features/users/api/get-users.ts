import { imageRetouchApi } from '@/shared/api/client/instance';
import type { User } from '../model/type';

export const getUsers = async (query?: string): Promise<User[]> => {
	const normalizedQuery = query?.trim();
	const uri = normalizedQuery ? `/users?q=${encodeURIComponent(normalizedQuery)}` : '/users';

	const response = await imageRetouchApi.get(uri);

	if (response.status == 401) {
		throw new Error('Ошбика при загрузке пользователей');
	}

	const data = response.data as User[];

	return data;
};
