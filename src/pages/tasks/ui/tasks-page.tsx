import { TaskToolbar } from '@/features/tasks/ui/task-toolbar';
import { DataTable } from '@/shared/ui/data-table';
import { useGetOrders } from '@/features/tasks/model/mutation/use-get-orders';
import { getTaskColumns } from '@/features/tasks/ui/task-column';
import { useState, useMemo } from 'react';
import type { OrderStatus } from '@/features/tasks/model/type';
import { useDebounce } from '@/shared/hooks/use-debounce';
import { usePermissions } from '@/features/auth/model/use-permissions';

export const TasksPage = () => {
	const { canDeleteOrder } = usePermissions();
	const columns = useMemo(() => getTaskColumns({ canDeleteOrder }), [canDeleteOrder]);
	const [orderNumber, setOrderNumber] = useState('');
	const [dateFrom, setDateFrom] = useState<string>('');
	const [dateTo, setDateTo] = useState<string>('');
	const [status, setStatus] = useState<OrderStatus | null>(null);
	const [employeeId, setEmployeeId] = useState<string | null>(null);
	const debouncedOrderNumber = useDebounce(orderNumber, 300);
	const debouncedDateFrom = useDebounce(dateFrom, 300);
	const debouncedDateTo = useDebounce(dateTo, 300);
	const debouncedStatus = useDebounce(status, 300);
	const debouncedEmployeeId = useDebounce(employeeId, 300);

	const handleResetFilters = () => {
		setOrderNumber('');
		setDateFrom('');
		setDateTo('');
		setStatus(null);
		setEmployeeId(null);
	};

	const {
		data: orders = [],
		isLoading,
		error,
	} = useGetOrders(
		Number(debouncedOrderNumber),
		debouncedDateFrom,
		debouncedDateTo,
		debouncedStatus as OrderStatus | undefined,
		debouncedEmployeeId as string | undefined,
	);

	return (
		<div>
			<TaskToolbar
				orderNumber={orderNumber}
				setOrderNumber={setOrderNumber}
				dateFrom={dateFrom}
				setDateFrom={setDateFrom}
				dateTo={dateTo}
				setDateTo={setDateTo}
				status={status}
				setStatus={setStatus}
				employeeId={employeeId}
				setEmployeeId={setEmployeeId}
				handleResetFilters={handleResetFilters}
			/>
			<DataTable data={orders} isLoading={isLoading} error={error} columns={columns} />
		</div>
	);
};
