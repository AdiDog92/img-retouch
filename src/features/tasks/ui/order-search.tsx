import { Input } from '@/shared/ui/shadcn/input';

export const OrderSearch = ({
	orderNumber,
	setOrderNumber,
}: {
	orderNumber: string;
	setOrderNumber: (orderNumber: string) => void;
}) => {
	return (
		<div className="w-[400px]">
			<Input
				value={orderNumber}
				onChange={(e) => setOrderNumber(e.target.value)}
				placeholder="Поиск заказа по номеру..."
			/>
		</div>
	);
};
