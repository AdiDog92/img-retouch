import { useState } from 'react';
import { Calendar } from '@/shared/ui/shadcn/calendar';
import { Field } from '@/shared/ui/shadcn/field';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/shadcn/popover';
import { Button } from '@/shared/ui/shadcn/button';
import { CalendarIcon } from 'lucide-react';
import { addDays, format } from 'date-fns';
import type { DateRange as DayPickerDateRange } from 'react-day-picker';

export const DateRange = () => {
	const [date, setDate] = useState<DayPickerDateRange | undefined>({
		from: new Date(),
		to: new Date(),
	});

	return (
		<div className="w-[250px]">
			<Field className="w-full">
				<Popover>
					<PopoverTrigger>
						<Button variant="outline" id="date-picker-range" className="w-full justify-start px-2.5 font-normal">
							<CalendarIcon />
							{date?.from ? (
								date?.to ? (
									<>
										{format(date.from, 'dd LLL, y')} - {format(date.to, 'dd LLL, y')}
									</>
								) : (
									format(date.from, 'dd LLL, y')
								)
							) : (
								<span>Укажите дату</span>
							)}
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-auto p-0" align="start">
						<Calendar mode="range" defaultMonth={date?.from} selected={date} onSelect={setDate} numberOfMonths={2} />
					</PopoverContent>
				</Popover>
			</Field>
		</div>
	);
};
