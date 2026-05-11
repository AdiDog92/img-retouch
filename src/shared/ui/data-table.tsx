import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './shadcn/table';

import {
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table';
import type { ColumnDef, SortingState } from '@tanstack/react-table';
import { useState } from 'react';
import { useDebounce } from '../hooks/use-debounce';

type DataTableProps<T> = {
	data: T[];
	columns: ColumnDef<T, any>[];
	isLoading: boolean;
	error: Error | null;
};

export const DataTable = <T,>({ data, columns, isLoading, error }: DataTableProps<T>) => {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [globalFilter, setGlobalFilter] = useState('');
	const debouncedGlobalFilter = useDebounce(globalFilter, 300);

	const table = useReactTable({
		data,
		columns,
		state: {
			sorting,
			globalFilter: debouncedGlobalFilter,
		},
		onSortingChange: setSorting,
		onGlobalFilterChange: setGlobalFilter,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getSortedRowModel: getSortedRowModel(),
	});

	return (
		<div className="flex flex-col">
			<Table containerClassName="max-h-[calc(100svh-12rem)] overflow-y-auto rounded-md border">
				<TableHeader>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<TableHead
									key={header.id}
									onClick={header.column.getToggleSortingHandler()}
									className={`${header.column.getCanSort() ? 'cursor-pointer select-none ' : ''}sticky top-0 z-10 bg-background`}
								>
									{header.isPlaceholder ? null : (
										<div className="flex items-center gap-2">
											{flexRender(header.column.columnDef.header, header.getContext())}
											{{
												asc: '↑',
												desc: '↓',
											}[header.column.getIsSorted() as string] ?? null}
										</div>
									)}
								</TableHead>
							))}
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{table.getRowModel().rows.length ? (
						table.getRowModel().rows.map((row) => (
							<TableRow key={row.id}>
								{row.getVisibleCells().map((cell) => (
									<TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
								))}
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell colSpan={columns.length} className="h-16 text-center">
								Список пуст.
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</div>
	);
};
