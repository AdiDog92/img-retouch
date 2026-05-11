import { createColumnHelper } from '@tanstack/react-table';
import type { User } from '../model/type';
import { Badge } from '@/shared/ui/shadcn/badge';
import { Button } from '@/shared/ui/shadcn/button';
import { TrashIcon } from 'lucide-react';
import { useDeleteUser } from '../model/mutation/use-delete-user';
import { toast } from 'sonner';

const columnHelper = createColumnHelper<User>();

const DeleteUserButton = ({ userId }: { userId: string }) => {
	const { mutate: deleteUser, isPending } = useDeleteUser();

	const handleDeleteUser = () => {
		deleteUser(userId, {
			onSuccess: () => {
				toast.success('Пользователь удален');
			},
			onError: (error) => {
				toast.error(error.message);
			},
		});
	};

	return (
		<Button variant="destructive" size="icon" onClick={handleDeleteUser} disabled={isPending}>
			<TrashIcon className="size-4" />
		</Button>
	);
};

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
	columnHelper.display({
		header: 'Действия',
		cell: (info) => <DeleteUserButton userId={info.row.original.id} />,
	}),
];
