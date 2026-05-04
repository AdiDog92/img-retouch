import { AppProvider } from '@/app/providers/app-provider/index';
import { SidebarInset } from '@/shared/ui/shadcn/sidebar';
import { AppHeader } from '@/widgets/app-header/ui/app-header';
import { AppSidebar } from '@/widgets/app-sidebar/ui/app-sidebar';
import { AppBody } from '@/widgets/app-body/ui/app-body';

export const AppLayout = () => {
	return (
		<AppProvider>
			<AppSidebar />
			<SidebarInset>
				<AppHeader />
				<AppBody />
			</SidebarInset>
		</AppProvider>
	);
};
