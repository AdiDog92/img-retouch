import { useQuery } from '@tanstack/react-query';
import type { User } from '../type';
import { getUsers } from '../../api/get-users';

export const usersQueryKey = ['users'] as const;

export const useGetUsers = () =>
	useQuery<User[], Error>({
		queryKey: usersQueryKey,
		queryFn: getUsers,
	});
