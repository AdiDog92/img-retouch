import { AppLayout } from '#/widgets/app-layout/ui/app-layout';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard')({
	component: RouteComponent,
});

function RouteComponent() {
	return <AppLayout />;
}
