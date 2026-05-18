import { createFileRoute } from '@tanstack/react-router';
import { TasksPage } from '@/pages/tasks/ui/tasks-page';

export const Route = createFileRoute('/dashboard/tasks/')({
	component: () => <TasksPage />,
});
