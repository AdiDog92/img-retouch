import { AuthPage } from '@/pages/auth/ui/AuthPage';
import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
	beforeLoad: ({ location }) => {
		const token = localStorage.getItem('token');
		if (token && location.pathname === '/') {
			throw redirect({ to: '/dashboard', replace: true });
		}
	},
	component: AuthPage,
});
