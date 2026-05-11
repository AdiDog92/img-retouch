import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createUser } from '../../api/create-user';
import type { CreateUserPayload, User } from '../type';
import { usersQueryKey } from './use-get-users';

export const useCreateUser = () => {
	const queryClient = useQueryClient();

	return useMutation<User, Error, CreateUserPayload>({
		mutationFn: createUser,

		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: usersQueryKey,
			});
		},
	});
};
