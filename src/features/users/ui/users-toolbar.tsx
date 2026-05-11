import { Input } from '@/shared/ui/shadcn/input';
import { AddUserDialog } from './add-user-dialog';

interface UsersToolbarProps {
	search: string;
	setSearch: (search: string) => void;
}

export const UsersToolbar = ({ search, setSearch }: UsersToolbarProps) => {
	return (
		<div className="flex items-center justify-between gap-2 mb-4">
			<Input
				className="w-[400px]"
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				placeholder="Поиск пользователей по ФИО..."
			/>
			<AddUserDialog />
		</div>
	);
};
