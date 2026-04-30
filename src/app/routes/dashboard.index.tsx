import { createFileRoute } from '@tanstack/react-router';
import { StatsPage } from '@/pages/stats/ui/stats-page';

export const Route = createFileRoute('/dashboard/')({
	component: RouteComponent,
});

function RouteComponent() {
	return <StatsPage />;
}
