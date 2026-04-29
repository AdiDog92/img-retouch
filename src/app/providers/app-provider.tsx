import { SidebarProvider } from '@/shared/ui/shadcn/sidebar';
import { ThemeProvider } from './theme-provider';

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
	return (
		<ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
			<SidebarProvider>
				{children}
			</SidebarProvider>
		</ThemeProvider>
	);
};
