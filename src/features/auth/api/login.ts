import { imageRetouchApi } from '@/shared/api/client/instance';

export type LoginPayload = {
	username: string;
	password: string;
};

type LoginResponse = {
	token?: string;
	accessToken?: string;
};

export const login = async (payload: LoginPayload): Promise<string> => {
	const response = await imageRetouchApi.post('/api/auth/login', payload);

	if (response.status === 401) {
		throw new Error('Неверные учетные данные');
	}

	const data = response.data as string | LoginResponse;
	const token = typeof data === 'string' ? data : (data.token ?? data.accessToken ?? null);

	if (!token) {
		throw new Error('Токен не был возвращен из точки входа входа');
	}

	return token;
};
