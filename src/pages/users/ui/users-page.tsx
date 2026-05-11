import { useGetUsers } from '@/features/users/model/mutation/use-get-users';
import { columns } from '@/features/users/ui/users-column';
import { DataTable } from '@/shared/ui/data-table';
import { UsersToolbar } from '@/features/users/ui/users-toolbar';
import { useState } from 'react';
import { useDebounce } from '@/shared/hooks/use-debounce';

export const UsersPage = () => {
	const [search, setSearch] = useState('');

	const debouncedSearch = useDebounce(search, 300);

	const { data: users = [], isLoading, error } = useGetUsers(debouncedSearch);

	return (
		<div>
			<UsersToolbar search={search} setSearch={setSearch} />
			{/* TODO: edit in place */}
			{/* TODO: use edit user */}
			<DataTable data={users} isLoading={isLoading} error={error} columns={columns} />
		</div>
	);
};
