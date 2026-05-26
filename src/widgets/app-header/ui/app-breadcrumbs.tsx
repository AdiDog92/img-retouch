import { Fragment } from 'react';
import { Link, useMatches, useParams } from '@tanstack/react-router';
import { useGetOrderById } from '@/features/tasks/model/mutation/use-get-order-by-id';
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/shared/ui/shadcn/breadcrumb';

type BreadcrumbItemConfig = {
	label: string;
	to?: string;
};

function useBreadcrumbItems(): BreadcrumbItemConfig[] {
	const matches = useMatches();
	const orderId = useParams({ strict: false, select: (params) => params.orderId as string | undefined });
	const { data: order } = useGetOrderById(orderId ?? '', { enabled: Boolean(orderId) });

	const routeIds = new Set(matches.map((match) => match.routeId));

	if (routeIds.has('/dashboard/tasks/$orderId')) {
		return [{ label: 'Задачи', to: '/dashboard/tasks' }, { label: order ? `Заказ №${order.orderNumber}` : 'Заказ' }];
	}

	if (routeIds.has('/dashboard/tasks/')) {
		return [{ label: 'Задачи' }];
	}

	if (routeIds.has('/dashboard/users')) {
		return [{ label: 'Пользователи' }];
	}

	if (routeIds.has('/dashboard/profile')) {
		return [{ label: 'Профиль' }];
	}

	if (routeIds.has('/dashboard/')) {
		return [{ label: 'Статистика' }];
	}

	return [];
}

export const AppBreadcrumbs = () => {
	const items = useBreadcrumbItems();

	if (items.length === 0) {
		return null;
	}

	return (
		<Breadcrumb>
			<BreadcrumbList>
				{items.map((item, index) => {
					const isLast = index === items.length - 1;

					return (
						<Fragment key={`${item.to ?? 'current'}-${item.label}`}>
							{index > 0 ? <BreadcrumbSeparator /> : null}
							<BreadcrumbItem>
								{isLast || !item.to ? (
									<BreadcrumbPage>{item.label}</BreadcrumbPage>
								) : (
									<BreadcrumbLink render={<Link to={item.to} />}>{item.label}</BreadcrumbLink>
								)}
							</BreadcrumbItem>
						</Fragment>
					);
				})}
			</BreadcrumbList>
		</Breadcrumb>
	);
};
