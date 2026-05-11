import { useGetUsers } from '@/features/users/model/mutation/use-get-users';
import { columns } from '@/features/users/ui/users-column';
import { DataTable } from '@/shared/ui/data-table';
import { UsersToolbar } from '@/features/users/ui/users-toolbar';

export const UsersPage = () => {
	const { data: users = [], isLoading, error } = useGetUsers();

	return (
		<div>
			<UsersToolbar />
			<DataTable data={users} isLoading={isLoading} error={error} columns={columns} />
		</div>
	);
};
