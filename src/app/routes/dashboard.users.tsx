import { createFileRoute, redirect } from '@tanstack/react-router';
import { UsersPage } from '@/pages/users/ui/users-page';
import { me } from '@/features/auth/api/me';
import { canViewUsersPage } from '@/features/auth/lib/permissions';

export const Route = createFileRoute('/dashboard/users')({
	beforeLoad: async () => {
		const user = await me();
		if (!user || !canViewUsersPage(user.role)) {
			throw redirect({ to: '/dashboard/tasks', replace: true });
		}
	},
	component: RouteComponent,
});

function RouteComponent() {
	return <UsersPage />;
}
