import { DateRange } from './date-range';
import { AddOrder } from './add-order';
import { StatusFilter } from './status-filter';
import { EmployeeFilter } from './employee-filter';
import { OrderSearch } from './order-search';
import type { OrderStatus } from '../model/type';

export const TaskToolbar = ({
	orderNumber,
	setOrderNumber,
	dateFrom,
	setDateFrom,
	dateTo,
	setDateTo,
	status,
	setStatus,
	employeeId,
	setEmployeeId,
}: {
	orderNumber: string;
	setOrderNumber: (orderNumber: string) => void;
	dateFrom: string;
	setDateFrom: (dateFrom: string) => void;
	dateTo: string;
	setDateTo: (dateTo: string) => void;
	status: OrderStatus | null;
	setStatus: (status: OrderStatus | null) => void;
	employeeId: string | null;
	setEmployeeId: (employeeId: string) => void;
}) => {
	return (
		<div className="flex items-center gap-2 mb-4">
			<OrderSearch orderNumber={orderNumber} setOrderNumber={setOrderNumber} />
			<DateRange dateFrom={dateFrom} setDateFrom={setDateFrom} dateTo={dateTo} setDateTo={setDateTo} />
			<StatusFilter status={status} setStatus={setStatus} />
			<EmployeeFilter employeeId={employeeId} setEmployeeId={setEmployeeId} />
			{/*  TODO: Reset filters button */}
			{/* TODO: Add add order button */}
			<AddOrder className="ml-auto" />
		</div>
	);
};
