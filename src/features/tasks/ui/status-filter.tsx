import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue } from '@/shared/ui/shadcn/select';
import { ORDER_STATUS_LABEL, OrderStatus } from '../model/type';

const ALL_STATUSES = '';

export const StatusFilter = ({
	status,
	setStatus,
}: {
	status: OrderStatus | null;
	setStatus: (status: OrderStatus | null) => void;
}) => {
	return (
		<div className="w-[150px]">
			<Select
				value={status ?? ALL_STATUSES}
				onValueChange={(value) => {
					if (value === ALL_STATUSES || value == null) {
						setStatus(null);
					} else {
						setStatus(value as OrderStatus);
					}
				}}
			>
				<SelectTrigger className="w-full">
					<SelectValue placeholder="Укажите статус заказа">
						{(value: string | null) => {
							if (value === ALL_STATUSES || value == null) return 'Все статусы';
							return ORDER_STATUS_LABEL[value as OrderStatus] ?? value;
						}}
					</SelectValue>
				</SelectTrigger>
				<SelectContent>
					<SelectItem value={ALL_STATUSES}>Все статусы</SelectItem>
					{(Object.values(OrderStatus) as OrderStatus[]).map((item) => (
						<SelectItem key={item} value={item}>
							{ORDER_STATUS_LABEL[item]}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);
};
