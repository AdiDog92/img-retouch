import { AuthPage } from '#/pages/auth/ui/AuthPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({ component: Home });

function Home() {
	return <AuthPage />;
}
