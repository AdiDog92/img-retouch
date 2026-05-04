import { SidebarProvider } from '@/shared/ui/shadcn/sidebar';
import { AuthProvider } from '@/app/providers/auth-provider/auth-provider';
import { ThemeProvider } from '@/app/providers/theme-provider/theme-provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
	return (
		<ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
			<QueryClientProvider client={queryClient}>
				<AuthProvider>
					<SidebarProvider>{children}</SidebarProvider>
				</AuthProvider>
			</QueryClientProvider>
		</ThemeProvider>
	);
};
