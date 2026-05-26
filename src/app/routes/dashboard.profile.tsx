import { createFileRoute } from '@tanstack/react-router';
import { ProfilePage } from '@/pages/profile/ui/profile-page';

export const Route = createFileRoute('/dashboard/profile')({
	component: () => <ProfilePage />,
});
