'use client';

import * as React from 'react';

import { NavMain } from '@/widgets/app-sidebar/ui/nav-main';
import { NavUser } from '@/widgets/app-sidebar/ui/nav-user';
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/shared/ui/shadcn/sidebar';
import { TerminalSquareIcon, TerminalIcon, UserIcon } from 'lucide-react';
import { useAuth } from '@/app/providers/auth-provider/use-auth';
import { usePermissions } from '@/features/auth/model/use-permissions';

const data = {
	user: {
		name: 'Админ',
		email: 'admin@example.com',
		avatar: '/avatars/shadcn.jpg',
	},
	navMain: [
		{
			title: 'Ретуш изображений',
			url: '#',
			icon: <TerminalSquareIcon />,
			isActive: true,
			items: [
				{
					title: 'Пользователи',
					url: '/dashboard/users',
				},
				{
					title: 'Задачи',
					url: '/dashboard/tasks',
				},
				{
					title: 'Параметры',
					url: '#',
				},
			],
		},
	],
};
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const { user, logout } = useAuth();
	const { canViewUsersPage } = usePermissions();

	const navMain = React.useMemo(
		() =>
			data.navMain.map((group) => ({
				...group,
				items: group.items?.filter((item) => item.url !== '/dashboard/users' || canViewUsersPage),
			})),
		[canViewUsersPage],
	);

	return (
		<Sidebar variant="inset" {...props}>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton size="lg" render={<a href="#" />}>
							<div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
								<TerminalIcon className="size-4" />
							</div>
							<div className="grid flex-1 text-left text-sm leading-tight">
								<span className="truncate font-medium">Сфера</span>
							</div>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={navMain} />
				{/* <NavProjects projects={data.projects} /> */}
				{/* <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={user} logout={logout} />
			</SidebarFooter>
		</Sidebar>
	);
}
