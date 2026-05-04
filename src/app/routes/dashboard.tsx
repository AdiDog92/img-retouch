import { AppLayout } from '@/widgets/app-layout/ui/app-layout';
import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard')({
	beforeLoad: () => {
		const token = localStorage.getItem('token');
		if (!token) {
			throw redirect({ to: '/', replace: true });
		}
	},
	component: RouteComponent,
});

function RouteComponent() {
	return <AppLayout />;
}
