import { SidebarTrigger } from '@/shared/ui/shadcn/sidebar';
import { ModeToggle } from '@/shared/ui/mode-toggle';
import { AppBreadcrumbs } from '@/widgets/app-header/ui/app-breadcrumbs';
import { Separator } from '@/shared/ui/shadcn/separator';

export const AppHeader = () => {
	return (
		<header className="flex h-14 items-center justify-between border-b px-4">
			<div className="flex items-center gap-2">
				<SidebarTrigger />
				<Separator orientation="vertical" />
				<AppBreadcrumbs />
			</div>
			<ModeToggle />
		</header>
	);
};
