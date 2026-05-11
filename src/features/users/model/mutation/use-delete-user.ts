import { deleteUser } from '../../api/delete-user';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { usersQueryKey } from './use-get-users';

export const useDeleteUser = () => {
	const queryClient = useQueryClient();

	return useMutation<void, Error, string>({
		mutationFn: deleteUser,
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: usersQueryKey });
		},
	});
};
