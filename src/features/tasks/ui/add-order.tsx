import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/shadcn/button';
import { DialogTitle, DialogContent, DialogTrigger, Dialog, DialogHeader } from '@/shared/ui/shadcn/dialog';

export const AddOrder = ({ className }: { className?: string }) => {
	return (
		<div className={cn('ml-auto', className)}>
			<Dialog>
				<DialogTrigger>
					<Button variant="outline">Добавить заказ</Button>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Добавить заказ</DialogTitle>
					</DialogHeader>
				</DialogContent>
			</Dialog>
		</div>
	);
};
