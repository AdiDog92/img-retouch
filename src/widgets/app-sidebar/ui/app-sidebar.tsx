'use client';

import * as React from 'react';

import { NavMain } from '@/widgets/app-sidebar/ui/nav-main';
import { NavProjects } from '@/widgets/app-sidebar/ui/nav-projects';
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
import {
	TerminalSquareIcon,
	BotIcon,
	BookOpenIcon,
	Settings2Icon,
	LifeBuoyIcon,
	SendIcon,
	FrameIcon,
	PieChartIcon,
	MapIcon,
	TerminalIcon,
} from 'lucide-react';
import { useAuth } from '@/app/providers/auth-provider/use-auth';

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
		// {
		// 	title: 'Models',
		// 	url: '#',
		// 	icon: <BotIcon />,
		// 	items: [
		// 		{
		// 			title: 'Genesis',
		// 			url: '#',
		// 		},
		// 		{
		// 			title: 'Explorer',
		// 			url: '#',
		// 		},
		// 		{
		// 			title: 'Quantum',
		// 			url: '#',
		// 		},
		// 	],
		// },
		// {
		// 	title: 'Documentation',
		// 	url: '#',
		// 	icon: <BookOpenIcon />,
		// 	items: [
		// 		{
		// 			title: 'Introduction',
		// 			url: '#',
		// 		},
		// 		{
		// 			title: 'Get Started',
		// 			url: '#',
		// 		},
		// 		{
		// 			title: 'Tutorials',
		// 			url: '#',
		// 		},
		// 		{
		// 			title: 'Changelog',
		// 			url: '#',
		// 		},
		// 	],
		// },
		// {
		// 	title: 'Settings',
		// 	url: '#',
		// 	icon: <Settings2Icon />,
		// 	items: [
		// 		{
		// 			title: 'General',
		// 			url: '#',
		// 		},
		// 		{
		// 			title: 'Team',
		// 			url: '#',
		// 		},
		// 		{
		// 			title: 'Billing',
		// 			url: '#',
		// 		},
		// 		{
		// 			title: 'Limits',
		// 			url: '#',
		// 		},
		// 	],
		// },
	],
	// navSecondary: [
	// 	{
	// 		title: 'Support',
	// 		url: '#',
	// 		icon: <LifeBuoyIcon />,
	// 	},
	// 	{
	// 		title: 'Feedback',
	// 		url: '#',
	// 		icon: <SendIcon />,
	// 	},
	// ],
	// projects: [
	// 	{
	// 		name: 'Design Engineering',
	// 		url: '#',
	// 		icon: <FrameIcon />,
	// 	},
	// 	{
	// 		name: 'Sales & Marketing',
	// 		url: '#',
	// 		icon: <PieChartIcon />,
	// 	},
	// 	{
	// 		name: 'Travel',
	// 		url: '#',
	// 		icon: <MapIcon />,
	// 	},
	// ],
};
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const { user, logout } = useAuth();

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
				<NavMain items={data.navMain} />
				{/* <NavProjects projects={data.projects} /> */}
				{/* <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={user} logout={logout} />
			</SidebarFooter>
		</Sidebar>
	);
}
