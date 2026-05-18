import { useEffect, useMemo, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { AuthContext } from './auth-context';
import { login, type LoginPayload } from '@/features/auth/api/login';
import { me, type AuthUser } from '@/features/auth/api/me';
import { useNavigate } from '@tanstack/react-router';

type AuthProviderProps = {
	children: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const [user, setUser] = useState<AuthUser | null>(null);
	const [isInitializing, setIsInitializing] = useState(true);

	useEffect(() => {
		let isMounted = true;

		const init = async () => {
			try {
				const currentUser = await me();
				if (!isMounted) return;

				if (currentUser === null && hadToken) {
					localStorage.removeItem('token');
					setUser(null);
					await queryClient.clear();
					void navigate({ to: '/', replace: true });
					toast.error('Сессия истекла или недействительна');
					return;
				}

				setUser(currentUser);
			} catch {
				if (!isMounted) return;

				setUser(null);
				localStorage.removeItem('token');
				await queryClient.clear();
				void navigate({ to: '/', replace: true });
				toast.error('Не удалось проверить сессию');
			} finally {
				if (isMounted) {
					setIsInitializing(false);
				}
			}
		};

		void init();

		return () => {
			isMounted = false;
		};
	}, [navigate, queryClient]);

	const handleLogin = async (payload: LoginPayload) => {
		const token = await login(payload);
		localStorage.setItem('token', token);

		const currentUser = await me();
		if (!currentUser) {
			localStorage.removeItem('token');
			throw new Error('Не удалось получить профиль');
		}
		setUser(currentUser);

		await queryClient.invalidateQueries();
	};

	const handleLogout = async () => {
		localStorage.removeItem('token');
		setUser(null);
		await queryClient.clear();
		void navigate({ to: '/' });
	};

	const value = useMemo(
		() => ({
			user,
			isAuthenticated: Boolean(user),
			isInitializing,
			login: handleLogin,
			logout: handleLogout,
		}),
		[user, isInitializing],
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
