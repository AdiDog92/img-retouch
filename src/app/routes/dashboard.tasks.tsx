import { createFileRoute } from '@tanstack/react-router';
import { TasksPage } from '#/pages/tasks/ui/TasksPage';

export const Route = createFileRoute('/dashboard/tasks')({
	component: RouteComponent,
});

function RouteComponent() {
	return <TasksPage />;
}
