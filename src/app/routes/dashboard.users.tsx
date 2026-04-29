import { createFileRoute } from '@tanstack/react-router';
import { UsersPage } from '@/pages/users/ui/UsersPage';

export const Route = createFileRoute('/dashboard/users')({
	component: RouteComponent,
});

function RouteComponent() {
	return <UsersPage />;
}
