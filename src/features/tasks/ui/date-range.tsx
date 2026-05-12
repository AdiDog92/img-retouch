import { useMemo } from 'react';
import { format, isValid, parse } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Calendar } from '@/shared/ui/shadcn/calendar';
import { Field } from '@/shared/ui/shadcn/field';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/shadcn/popover';
import { Button } from '@/shared/ui/shadcn/button';
import { CalendarIcon } from 'lucide-react';
import type { DateRange as DayPickerDateRange } from 'react-day-picker';

const API_DATE = 'yyyy-MM-dd';

function parseApiDate(value: string): Date | undefined {
	if (!value) return undefined;
	const parsed = parse(value, API_DATE, new Date());
	return isValid(parsed) ? parsed : undefined;
}

type DateRangeProps = {
	dateFrom: string;
	setDateFrom: (value: string) => void;
	dateTo: string;
	setDateTo: (value: string) => void;
};

export const DateRange = ({ dateFrom, setDateFrom, dateTo, setDateTo }: DateRangeProps) => {
	const selected = useMemo((): DayPickerDateRange | undefined => {
		const from = parseApiDate(dateFrom);
		const to = parseApiDate(dateTo);
		if (!from && !to) return undefined;
		if (from && to) return { from, to };
		if (from) return { from };
		if (to) return { from: to, to };
		return undefined;
	}, [dateFrom, dateTo]);

	const handleSelect = (range: DayPickerDateRange | undefined) => {
		if (!range?.from) {
			setDateFrom('');
			setDateTo('');
			return;
		}
		setDateFrom(format(range.from, API_DATE));
		setDateTo(range.to ? format(range.to, API_DATE) : '');
	};

	const from = selected?.from;
	const to = selected?.to;
	const isRange = Boolean(from && to && from.getTime() !== to.getTime());

	return (
		<div className="min-w-[260px] max-w-[320px]">
			<Field className="w-full">
				<Popover>
					<PopoverTrigger>
						<Button variant="outline" id="date-picker-range" className="w-full justify-start gap-2 px-2.5 font-normal">
							<CalendarIcon className="size-4 shrink-0" />
							<span className="truncate text-left">
								{from ? (
									isRange && to ? (
										<>
											{format(from, 'd MMM yyyy', { locale: ru })} — {format(to, 'd MMM yyyy', { locale: ru })}
										</>
									) : (
										format(from, 'd MMM yyyy', { locale: ru })
									)
								) : (
									<span className="text-muted-foreground">Укажите дату</span>
								)}
							</span>
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-auto p-0" align="start">
						<Calendar
							mode="range"
							locale={ru}
							defaultMonth={from ?? new Date()}
							selected={selected}
							onSelect={handleSelect}
							numberOfMonths={2}
						/>
					</PopoverContent>
				</Popover>
			</Field>
		</div>
	);
};
