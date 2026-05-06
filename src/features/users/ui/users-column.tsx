import { createColumnHelper } from '@tanstack/react-table';
import type { User } from '../model/type';
import { Badge } from '@/shared/ui/shadcn/badge';

const columnHelper = createColumnHelper<User>();

export const columns = [
	columnHelper.accessor('id', {
		header: '№',
		cell: (info) => info.getValue(),
	}),
	columnHelper.accessor('username', {
		header: 'Пользователь',
		cell: (info) => info.getValue(),
	}),
	columnHelper.accessor('email', {
		header: 'Email',
		cell: (info) => info.getValue(),
	}),
	columnHelper.accessor('fullName', {
		header: 'ФИО',
		cell: (info) => info.getValue(),
	}),
	columnHelper.accessor('role', {
		header: 'Роль',
		cell: (info) => info.getValue(),
	}),
	columnHelper.accessor('isActive', {
		header: 'Статус',
		cell: (info) =>
			info.getValue() ? <Badge variant="secondary">Активный</Badge> : <Badge variant="destructive">Неактивный</Badge>,
	}),
];
