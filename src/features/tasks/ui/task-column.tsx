import { createColumnHelper } from '@tanstack/react-table';
import type { Order } from '../model/type';
import { formatDate } from '@/shared/lib/format-date';

const columnHelper = createColumnHelper<Order>();

export const columns = [
	columnHelper.accessor('id', {
		header: '№',
		cell: (info) => info.getValue(),
	}),
	columnHelper.accessor('createDate', {
		header: 'Дата создания',
		cell: (info) => formatDate(info.getValue()),
	}),
	columnHelper.accessor('orderNumber', {
		header: 'Номер заказа',
		cell: (info) => info.getValue(),
	}),
	columnHelper.accessor('description', {
		header: 'Описание',
		cell: (info) => info.getValue(),
	}),
	columnHelper.accessor('designerId', {
		header: 'Дизайнер',
		cell: (info) => info.getValue(),
	}),
	columnHelper.accessor('readyDate', {
		header: 'Дата готовности',
		cell: (info) => formatDate(info.getValue()),
	}),
	columnHelper.accessor('status', {
		header: 'Статус',
		cell: (info) => info.getValue(),
	}),
];
