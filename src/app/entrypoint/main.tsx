import '@/shared/api/interceptors/interceptor';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { AppProvider } from '@/app/providers/app-provider';
import { routeTree } from '../providers/router/routeTree.gen';
import { Toaster } from 'sonner';

const router = createRouter({
	routeTree,
	defaultPreload: 'intent',
	scrollRestoration: true,
});

declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router;
	}
}

const rootElement = document.getElementById('app')!;

if (!rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement);
	root.render(
		<AppProvider>
			<RouterProvider router={router} />
			<Toaster position="top-center" />
		</AppProvider>,
	);
}
