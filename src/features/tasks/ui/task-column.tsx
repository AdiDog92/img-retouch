import { createColumnHelper } from '@tanstack/react-table';
import { ORDER_STATUS_LABEL, OrderStatus, type Order } from '../model/type';
import { formatDate } from '@/shared/lib/format-date';
import { Badge } from '@/shared/ui/shadcn/badge';
import { cn } from '@/shared/lib/utils';
import { useGetUsers } from '@/features/users/model/mutation/use-get-users';
import { useDeleteOrder } from '../model/mutation/use-delete-order';
import { Button } from '@/shared/ui/shadcn/button';
import { TrashIcon } from 'lucide-react';
import { toast } from 'sonner';
import { OrderDetailDrawer } from './order-detail-drawer';
import { useState } from 'react';

const columnHelper = createColumnHelper<Order>();

const statusBadgeClass: Record<OrderStatus, string> = {
	[OrderStatus.COMPLETED]: 'bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300',
	[OrderStatus.ARCHIVE]: 'bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300',
	[OrderStatus.PENDING]: 'bg-yellow-50 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300',
	[OrderStatus.IN_PROGRESS]: 'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300',
	[OrderStatus.REVIEW]: 'bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300',
	[OrderStatus.REVISION]: 'bg-orange-50 text-orange-700 dark:bg-orange-950 dark:text-orange-300',
};

const apiCodeToOrderStatus: Record<string, OrderStatus> = {
	PENDING: OrderStatus.PENDING,
	IN_PROGRESS: OrderStatus.IN_PROGRESS,
	REVIEW: OrderStatus.REVIEW,
	REVISION: OrderStatus.REVISION,
	COMPLETED: OrderStatus.COMPLETED,
	ARCHIVE: OrderStatus.ARCHIVE,
};

const legacyLabelToOrderStatus: Record<string, OrderStatus> = {
	'В ожидании': OrderStatus.PENDING,
	'В обработке': OrderStatus.IN_PROGRESS,
	'На проверке': OrderStatus.REVIEW,
	'На доработке': OrderStatus.REVISION,
	Завершено: OrderStatus.COMPLETED,
	Отменен: OrderStatus.ARCHIVE,
};

function resolveOrderStatus(raw: unknown): OrderStatus | undefined {
	const s = String(raw ?? '').trim();
	const upper = s.toUpperCase();
	const values = Object.values(OrderStatus) as string[];
	if (values.includes(s)) return s as OrderStatus;
	if (values.includes(upper)) return upper as OrderStatus;
	return apiCodeToOrderStatus[s] ?? apiCodeToOrderStatus[upper] ?? legacyLabelToOrderStatus[s];
}

export const columns = [
	columnHelper.accessor('createDate', {
		header: 'Дата создания',
		cell: (info) => formatDate(info.getValue()),
	}),
	columnHelper.accessor('orderNumber', {
		header: '№ заказа',
		cell: (info) => {
			const [isOpen, setIsOpen] = useState(false);
			const orderId = info.row.original.id;

			const handleOpenChange = (open: boolean) => {
				setIsOpen(open);
			};

			return (
				<OrderDetailDrawer
					orderId={orderId}
					orderNumber={String(info.getValue())}
					isOpen={isOpen}
					handleOpenChange={handleOpenChange}
				/>
			);
		},
	}),
	columnHelper.accessor('clientNumber', {
		header: '№ клиента',
		cell: (info) => info.getValue(),
	}),
	columnHelper.accessor('description', {
		header: 'Описание',
		cell: (info) => info.getValue(),
	}),
	columnHelper.accessor('designerId', {
		header: 'Дизайнер',
		cell: (info) => {
			const { data: users } = useGetUsers('');

			const userId = info.getValue() || '';

			return users?.find((user) => user.id === userId)?.fullName ?? '';
		},
	}),
	columnHelper.accessor('readyDate', {
		header: 'Дата готовности',
		cell: (info) => formatDate(info.getValue()),
	}),
	columnHelper.accessor('status', {
		header: 'Статус',
		cell: (info) => {
			const raw = info.getValue();
			const normalized = resolveOrderStatus(raw);
			const label = normalized ? ORDER_STATUS_LABEL[normalized] : String(raw);
			const badgeClass = normalized ? statusBadgeClass[normalized] : 'bg-muted text-muted-foreground';

			return (
				<Badge variant="outline" className={cn('border-transparent', badgeClass)}>
					{label}
				</Badge>
			);
		},
	}),
	columnHelper.accessor('id', {
		header: 'Действия',
		cell: (info) => {
			const { mutate: deleteOrder, isPending } = useDeleteOrder();
			const orderId = info.getValue();

			const handleDeleteOrder = () => {
				deleteOrder(orderId, {
					onSuccess: () => {
						toast.success('Заказ удален');
					},
					onError: (error) => {
						toast.error(error.message);
					},
				});
			};

			return (
				<Button variant="destructive" size="icon" onClick={() => handleDeleteOrder()} disabled={isPending}>
					<TrashIcon className="size-4" />
				</Button>
			);
		},
	}),
];
