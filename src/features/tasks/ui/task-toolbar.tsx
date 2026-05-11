import { DateRange } from './date-range';
import { AddOrder } from './add-order';
import { StatusFilter } from './status-filter';
import { EmployeeFilter } from './employee-filter';
import { OrderSearch } from './order-search';

export const TaskToolbar = () => {
	return (
		<div className="flex items-center gap-2 mb-4">
			{/* TODO: Add search input */}
			<OrderSearch />
			{/* TODO: Add date range picker */}
			<DateRange />
			{/* TODO: Add status filter */}
			<StatusFilter />
			{/* TODO: Add employee filter */}
			<EmployeeFilter />
			{/*  TODO: Reset filters button */}
			{/* TODO: Add add order button */}
			<AddOrder className="ml-auto" />
		</div>
	);
};
