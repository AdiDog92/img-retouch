import { imageRetouchApi } from '@/shared/api/client/instance';

export type AuthUser = {
	id: number;
	username: string;
	email: string;
	fullName: string;
	role: string;
};

export const me = async (): Promise<AuthUser | null> => {
	try {
		const response = await imageRetouchApi.get<AuthUser>('/api/auth/me');
		return response.data;
	} catch (error: any) {
		if (error?.response?.status === 401) {
			return null;
		}
		throw error;
	}
};
