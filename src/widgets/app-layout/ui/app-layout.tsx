import { AppProvider } from '@/app/providers/app-provider';
import { SidebarInset } from '@/shared/ui/shadcn/sidebar';
import { AppHeader } from '@/widgets/app-header/ui/app-header';
import { AppSidebar } from '@/widgets/app-sidebar/ui/app-sidebar';
import { AppBody } from '@/widgets/app-body/ui/app-body';
import { Toaster } from '@/shared/ui/shadcn/sonner';

export const AppLayout = () => {
	return (
		<AppProvider>
			<AppSidebar />
			<SidebarInset>
				<AppHeader />
				<AppBody />
				<Toaster position="top-center" />
			</SidebarInset>
		</AppProvider>
	);
};
