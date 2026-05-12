import type { User } from '../model/type';

export const getUserById = async (id: string): Promise<User> => {
	const response = await imageRetouchApi.get(`/users/${id}`);

	if (response.status == 401) {
		throw new Error('Ошбика при загрузке пользователя');
	}

	const data = response.data as User;

	return data;
};
