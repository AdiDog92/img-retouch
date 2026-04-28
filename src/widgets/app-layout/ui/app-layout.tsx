import { AppProvider } from '#/app/providers/AppProvider';
import { SidebarInset, SidebarTrigger } from '#/shared/ui/shadcn/sidebar';
import { AppSidebar } from '#/widgets/app-sidebar/ui/app-sidebar';
import { Outlet } from '@tanstack/react-router';

export const AppLayout = () => {
	return (
		<AppProvider>
			<AppSidebar />
			<SidebarInset>
				{/* TODO: Add header widget */}
				<header className="flex h-14 items-center border-b px-4">
					<SidebarTrigger />
				</header>
				<main className="flex-1 p-4">
					<Outlet />
				</main>
			</SidebarInset>
		</AppProvider>
	);
};
