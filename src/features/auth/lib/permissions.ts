import { UserRole } from '@/features/users/model/type';

export function normalizeUserRole(role: string | null | undefined): UserRole | null {
	const normalized = String(role ?? '')
		.trim()
		.toUpperCase();

	return (Object.values(UserRole) as string[]).includes(normalized) ? (normalized as UserRole) : null;
}

/** Администратор и менеджер — полный доступ к заказам и пользователям. */
export function isOrderManager(role: string | null | undefined): boolean {
	const normalized = normalizeUserRole(role);
	return normalized === UserRole.ADMIN || normalized === UserRole.MANAGER;
}

export const canCreateOrder = isOrderManager;
export const canDeleteOrder = isOrderManager;
export const canChangeOrderDesigner = isOrderManager;
export const canViewUsersPage = isOrderManager;
