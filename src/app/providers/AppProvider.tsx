import { SidebarProvider } from '#/shared/ui/shadcn/sidebar';

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
	return <SidebarProvider>{children}</SidebarProvider>;
};
