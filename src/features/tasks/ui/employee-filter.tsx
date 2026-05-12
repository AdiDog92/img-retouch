import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/shadcn/select';
import { useGetUsers } from '@/features/users/model/mutation/use-get-users';

export const EmployeeFilter = ({
	employeeId,
	setEmployeeId,
}: {
	employeeId: string | null;
	setEmployeeId: (employeeId: string) => void;
}) => {
	const { data: users = [] } = useGetUsers('');

	return (
		<div className="w-[150px]">
			<Select value={employeeId ?? ''} onValueChange={(value) => setEmployeeId(value ?? '')}>
				<SelectTrigger className="w-full">
					<SelectValue placeholder="Укажите сотрудника">
						{(id: string | null) => (id ? (users.find((u) => u.id === id)?.fullName ?? id) : 'Укажите сотрудника')}
					</SelectValue>
				</SelectTrigger>
				<SelectContent>
					<SelectItem key="all" value="">
						Все сотрудники
					</SelectItem>
					{users.map((user) => (
						<SelectItem key={user.id} value={user.id}>
							{user.fullName}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);
};
