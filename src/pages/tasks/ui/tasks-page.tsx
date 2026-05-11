import { TaskToolbar } from '@/features/tasks/ui/task-toolbar';
import { DataTable } from '@/shared/ui/data-table';
import { useGetOrders } from '@/features/tasks/model/mutation/use-get-orders';
import { columns } from '@/features/tasks/ui/task-column';

export const TasksPage = () => {
	const { data: orders = [], isLoading, error } = useGetOrders();

	return (
		<div>
			<TaskToolbar />
			<DataTable data={orders} isLoading={isLoading} error={error} columns={columns} />
		</div>
	);
};
