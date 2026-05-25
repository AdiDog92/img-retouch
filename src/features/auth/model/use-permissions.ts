import { useMemo } from 'react';
import { useAuth } from '@/app/providers/auth-provider/use-auth';
import {
	canChangeOrderDesigner,
	canCreateOrder,
	canDeleteOrder,
	canViewUsersPage,
} from '@/features/auth/lib/permissions';

export function usePermissions() {
	const { user } = useAuth();
	const role = user?.role;

	return useMemo(
		() => ({
			canCreateOrder: canCreateOrder(role),
			canDeleteOrder: canDeleteOrder(role),
			canChangeOrderDesigner: canChangeOrderDesigner(role),
			canViewUsersPage: canViewUsersPage(role),
		}),
		[role],
	);
}
