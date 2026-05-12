import { useGetUsers } from '@/features/users/model/mutation/use-get-users';
import { useCreateOrder } from '@/features/tasks/model/mutation/use-create-order';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/shadcn/button';
import {
	DialogTitle,
	DialogContent,
	DialogTrigger,
	Dialog,
	DialogHeader,
	DialogDescription,
	DialogFooter,
	DialogClose,
} from '@/shared/ui/shadcn/dialog';
import { Field, FieldGroup, FieldLabel } from '@/shared/ui/shadcn/field';
import { Input } from '@/shared/ui/shadcn/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/shadcn/select';
import { Textarea } from '@/shared/ui/shadcn/textarea';
import { useState } from 'react';
import { toast } from 'sonner';

export const AddOrder = ({ className }: { className?: string }) => {
	const { data: users = [] } = useGetUsers('');
	const { mutate, isPending } = useCreateOrder();
	const [isOpen, setIsOpen] = useState(false);
	const [clientNumber, setClientNumber] = useState('');
	const [orderNumber, setOrderNumber] = useState('');
	const [description, setDescription] = useState('');
	const [employeeId, setEmployeeId] = useState('');
	const [file, setFile] = useState<File | null>(null);
	const [fileInputKey, setFileInputKey] = useState(0);

	const resetForm = () => {
		setClientNumber('');
		setOrderNumber('');
		setDescription('');
		setEmployeeId('');
		setFile(null);
		setFileInputKey((k) => k + 1);
	};

	const handleOpenChange = (open: boolean) => {
		setIsOpen(open);
		if (!open) {
			resetForm();
		}
	};

	const handleSubmit = () => {
		const client = Number.parseInt(clientNumber.trim(), 10);
		const order = Number.parseInt(orderNumber.trim(), 10);

		if (!Number.isFinite(client) || client < 1) {
			toast.error('Укажите корректный клиентский номер');
			return;
		}
		if (!Number.isFinite(order) || order < 1) {
			toast.error('Укажите корректный номер заказа');
			return;
		}
		if (!employeeId) {
			toast.error('Выберите исполнителя');
			return;
		}
		if (!file) {
			toast.error('Выберите файл');
			return;
		}

		mutate(
			{
				clientNumber: client,
				orderNumber: order,
				description: description.trim(),
				designerId: employeeId,
				file,
			},
			{
				onSuccess: () => {
					setIsOpen(false);
					resetForm();
				},
			},
		);
	};

	return (
		<div className={cn('ml-auto', className)}>
			<Dialog open={isOpen} onOpenChange={handleOpenChange}>
				<DialogTrigger>
					<Button variant="outline">Добавить заказ</Button>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Добавить заказ</DialogTitle>
						<DialogDescription>Заполните форму ниже для добавления нового заказа.</DialogDescription>
					</DialogHeader>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							handleSubmit();
						}}
					>
						<FieldGroup>
							<Field>
								<FieldLabel>Клиентский номер</FieldLabel>
								<Input value={clientNumber} onChange={(e) => setClientNumber(e.target.value)} />
							</Field>
							<Field>
								<FieldLabel>Номер заказа</FieldLabel>
								<Input value={orderNumber} onChange={(e) => setOrderNumber(e.target.value)} />
							</Field>
							<Field>
								<FieldLabel>Описание</FieldLabel>
								<Textarea
									className="min-h-24 resize-none"
									value={description}
									onChange={(e) => setDescription(e.target.value)}
								/>
							</Field>
							<Field>
								<Select value={employeeId} onValueChange={(value) => setEmployeeId(value ?? '')}>
									<FieldLabel>Исполнитель</FieldLabel>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="Выберите сотрудника" />
									</SelectTrigger>
									<SelectContent>
										{users.map((user) => (
											<SelectItem key={user.id} value={user.id}>
												{user.fullName}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</Field>
							<Field>
								<FieldLabel>Выберите файл</FieldLabel>
								<Input
									key={fileInputKey}
									type="file"
									onChange={(e) => setFile(e.target.files?.[0] ?? null)}
								/>
								{file ? <p className="mt-1 text-sm text-muted-foreground">{file.name}</p> : null}
							</Field>
							<DialogFooter>
								<DialogClose>
									<Button variant="outline" type="button">
										Отменить
									</Button>
								</DialogClose>
								<Button variant="outline" type="submit" disabled={isPending}>
									{isPending ? 'Создание…' : 'Добавить заказ'}
								</Button>
							</DialogFooter>
						</FieldGroup>
					</form>
				</DialogContent>
			</Dialog>
		</div>
	);
};
