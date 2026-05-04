import { createContext } from 'react';
import type { AuthUser } from '@/features/auth/api/me';
import type { LoginPayload } from '@/features/auth/api/login';

export type AuthContextType = {
	user: AuthUser | null;
	isAuthenticated: boolean;
	isInitializing: boolean;
	login: (payload: LoginPayload) => Promise<void>;
	logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
