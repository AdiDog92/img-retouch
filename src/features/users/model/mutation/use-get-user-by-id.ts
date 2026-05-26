import { useQuery } from '@tanstack/react-query';
import { getUserById } from '../../api/get-user-by-id';
import type { User } from '../type';

export const useGetUserById = (id: number) => {
	return useQuery<User, Error>({
		queryKey: ['user', id],
		queryFn: () => getUserById(id),
	});
};
