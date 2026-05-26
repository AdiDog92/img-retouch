'use client';

import type { AuthUser } from '@/features/auth/api/me';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/shadcn/avatar';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/shared/ui/shadcn/dropdown-menu';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/shared/ui/shadcn/sidebar';
import { useRouter } from '@tanstack/react-router';
import { ChevronsUpDownIcon, LogOutIcon, UserIcon } from 'lucide-react';

type NavUserType = {
	user: AuthUser | null;
	logout: () => void;
};

export function NavUser({ user, logout }: NavUserType) {
	const { isMobile } = useSidebar();

	const router = useRouter();

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger render={<SidebarMenuButton size="lg" className="aria-expanded:bg-muted" />}>
						<Avatar>
							<AvatarImage src={user ? user.avatar : ''} alt={user ? user.username : ''} />
							<AvatarFallback>CN</AvatarFallback>
						</Avatar>
						<div className="grid flex-1 text-left text-sm leading-tight">
							<span className="truncate font-medium">{user ? user.username : ''}</span>
							<span className="truncate text-xs">{user ? user.email : ''}</span>
						</div>
						<ChevronsUpDownIcon className="ml-auto size-4" />
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className="min-w-56 rounded-lg"
						side={isMobile ? 'bottom' : 'right'}
						align="end"
						sideOffset={4}
					>
						<DropdownMenuGroup>
							<DropdownMenuLabel className="p-0 font-normal">
								<div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
									<Avatar>
										<AvatarImage src={user ? user.avatar : ''} alt={user ? user.username : ''} />
										<AvatarFallback>CN</AvatarFallback>
									</Avatar>
									<div className="grid flex-1 text-left text-sm leading-tight">
										<span className="truncate font-medium">{user ? user.username : ''}</span>
										<span className="truncate text-xs">{user ? user.email : ''}</span>
									</div>
								</div>
							</DropdownMenuLabel>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuItem
							className="cursor-pointer mb-4"
							onClick={() => router.navigate({ to: '/dashboard/profile' })}
						>
							<UserIcon />
							Профиль
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem onClick={logout}>
							<LogOutIcon />
							Выход
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
