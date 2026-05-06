import { getUsers } from '@/features/users/api/get-users';
import type { User } from '@/features/users/model/type';
import { columns } from '@/features/users/ui/users-column';
import { DataTable } from '@/shared/ui/data-table';
import { useCallback, useEffect, useState } from 'react';

export const UsersPage = () => {
	const [users, setUsers] = useState<User[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<Error | null>(null);

	const fetchUsers = useCallback(async () => {
		try {
			setIsLoading(true);
			setError(null);
			const data = await getUsers();
			setUsers(data);
		} catch (error) {
			setError(error instanceof Error ? error : new Error('Произошла ошибка при загрузке пользователей'));
		} finally {
			setIsLoading(false);
		}
	}, []);

	useEffect(() => {
		const ac = new AbortController();

		void fetchUsers();

		return () => {
			ac.abort();
		};
	}, []);

	return (
		<div>
			<DataTable data={users} isLoading={isLoading} error={error} columns={columns} />
		</div>
	);
};
