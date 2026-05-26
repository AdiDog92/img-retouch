import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { User } from '../type';
import { updateUser } from '../../api/update-user';
import { toast } from 'sonner';

export const useUpdateUser = () => {
	const queryClient = useQueryClient();

	return useMutation<User, Error, { id: number; user: User }>({
		mutationFn: ({ id, user }) => updateUser(String(id), user),
		onSuccess: async (_, { id }) => {
			await queryClient.invalidateQueries({ queryKey: ['user', id] });
			toast.success('Пользователь успешно обновлен');
		},
		onError: (err) => {
			toast.error('Ошибка при обновлении пользователя');
		},
	});
};
