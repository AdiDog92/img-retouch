import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '@/shared/ui/shadcn/drawer';
import { Button } from '@/shared/ui/shadcn/button';
import { Skeleton } from '@/shared/ui/shadcn/skeleton';
import { cn } from '@/shared/lib/utils';
import { useGetOrderById } from '../model/mutation/use-get-order-by-id';
import { CalendarIcon, XIcon } from 'lucide-react';
import { formatDate } from '@/shared/lib/format-date';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/shadcn/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/shadcn/popover';
import { Calendar } from '@/shared/ui/shadcn/calendar';
import { useEffect, useState, type FormEvent } from 'react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { ORDER_STATUS_LABEL, OrderStatus } from '../model/type';
import { useGetUsers } from '@/features/users/model/mutation/use-get-users';
import { Field, FieldDescription, FieldLabel } from '@/shared/ui/shadcn/field';
import { Input } from '@/shared/ui/shadcn/input';
import { useUpdateOrder } from '../model/mutation/use-update-order';
import { toast } from 'sonner';

interface OrderDetailDrawerProps {
	orderId: string;
	orderNumber: string;
	isOpen: boolean;
	handleOpenChange: (open: boolean) => void;
}

function resolveOrderImageSrc(path: string): string {
	const trimmed = path.trim();
	if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return trimmed;
	const base = String(import.meta.env.VITE_API_URL ?? '').replace(/\/$/, '');
	const relative = trimmed.replace(/^\//, '');
	if (relative.startsWith('uploads/')) {
		return `${base}/${relative}`;
	}
	return `${base}/uploads/${relative}`;
}

export const OrderDetailDrawer = ({ orderId, orderNumber, isOpen, handleOpenChange }: OrderDetailDrawerProps) => {
	const {
		data: order,
		isPending,
		isFetching,
		isError,
		error,
	} = useGetOrderById(orderId, {
		enabled: isOpen && Boolean(orderId),
	});

	const { data: users = [] } = useGetUsers('');
	const { mutate: runUpdateOrder, isPending: isUpdatePending } = useUpdateOrder();
	const showSkeleton = isOpen && !order && (isPending || isFetching);
	const [statusDraft, setStatusDraft] = useState<OrderStatus | null>(null);
	const [readyDateDraft, setReadyDateDraft] = useState<Date | undefined>();
	const [designerDraft, setDesignerDraft] = useState<string>('');
	const [readyImageFile, setReadyImageFile] = useState<File | null>(null);
	const [readyFileInputKey, setReadyFileInputKey] = useState(0);

	useEffect(() => {
		if (!order) return;
		setStatusDraft(order.status);
		setReadyDateDraft(order.readyDate ? new Date(order.readyDate) : undefined);
		setDesignerDraft(String(order.designerId));
	}, [order]);

	const resolveDesignerId = (): number | undefined => {
		if (designerDraft.trim() === '') return undefined;
		const n = Number(designerDraft);
		return Number.isFinite(n) ? n : undefined;
	};

	const handleSaveOrderFields = () => {
		if (!order) return;
		const designerId = resolveDesignerId();
		runUpdateOrder({
			orderId,
			description: order.description,
			...(designerId !== undefined ? { designerId } : {}),
		});
	};

	const handleReadyImageSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!order) return;
		if (!readyImageFile) {
			toast.error('Выберите файл изображения');
			return;
		}
		const designerId = resolveDesignerId();
		runUpdateOrder(
			{
				orderId,
				description: order.description,
				...(designerId !== undefined ? { designerId } : {}),
				readyFile: readyImageFile,
			},
			{
				onSuccess: () => {
					setReadyImageFile(null);
					setReadyFileInputKey((k) => k + 1);
				},
			},
		);
	};

	return (
		<Drawer open={isOpen} onOpenChange={handleOpenChange} direction="right">
			<DrawerTrigger asChild>
				<Button variant="link" className="text-left cursor-pointer max-w-full">
					{orderNumber}
				</Button>
			</DrawerTrigger>
			<DrawerContent
				className={cn('data-[vaul-drawer-direction=right]:w-full sm:data-[vaul-drawer-direction=right]:max-w-[1280px]')}
			>
				<DrawerHeader className="border-b mb-4 pb-2">
					<div className="flex items-center justify-between">
						<DrawerTitle className="text-2xl font-bold mx-auto w-fit">
							Заказ № {order?.orderNumber ?? orderNumber}
						</DrawerTitle>
						<DrawerDescription></DrawerDescription>
						<div className="flex items-center gap-2">
							<DrawerClose asChild>
								<Button variant="ghost" size="icon-lg">
									<XIcon className="size-6" />
								</Button>
							</DrawerClose>
						</div>
					</div>
				</DrawerHeader>
				<div className="flex flex-1 flex-col gap-4 overflow-auto px-4 pb-6">
					{isError && <p className="text-sm text-destructive">{error?.message ?? 'Не удалось загрузить заказ'}</p>}
					{showSkeleton && (
						<div className="flex flex-col gap-3">
							<Skeleton className="h-4 w-2/3" />
							<Skeleton className="h-4 w-full" />
							<Skeleton className="h-24 w-full" />
						</div>
					)}
					{order && (
						<div className="flex gap-6 text-sm">
							<div className="flex flex-col gap-6 w-1/2">
								<div className="min-w-0">
									<h3 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
										Исходные изображения
									</h3>
									<div className="mt-2 flex min-h-[120px] flex-wrap gap-2 rounded-md border border-dashed border-muted-foreground/25 p-2">
										{order.filePaths.length > 0 ? (
											order.filePaths.map((filePath) => (
												<img
													className="max-h-40 max-w-[calc(50%-0.25rem)] rounded object-contain"
													key={filePath}
													src={resolveOrderImageSrc(filePath)}
													alt="Исходное изображение"
												/>
											))
										) : (
											<span className="m-auto text-sm text-muted-foreground">Нет изображений</span>
										)}
									</div>
									{/* <form>
										<Field className="mt-2 flex flex-col gap-2">
											<FieldLabel htmlFor="picture">Добавить изображение</FieldLabel>
											<Input id="picture" type="file" />
											<FieldDescription>Выберите изображение для добавления</FieldDescription>
										</Field>
										<Button type="submit">Добавить</Button>
									</form> */}
								</div>
								<div className="min-w-0">
									<h3 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
										Готовые изображения
									</h3>
									<div className="mt-2 flex min-h-[120px] flex-wrap gap-2 rounded-md border border-dashed border-muted-foreground/25 p-2">
										{order.readyFilePath.length > 0 ? (
											order.readyFilePath.map((filePath) => (
												<img
													className="max-h-40 max-w-[calc(50%-0.25rem)] rounded object-contain"
													key={filePath}
													src={resolveOrderImageSrc(filePath)}
													alt="Готовое изображение"
												/>
											))
										) : (
											<span className="m-auto text-sm text-muted-foreground">Нет изображений</span>
										)}
									</div>
									<form className="mt-2 flex flex-col gap-2" onSubmit={handleReadyImageSubmit}>
										<Field>
											<FieldLabel htmlFor="order-ready-image">Добавить готовое изображение</FieldLabel>
											<Input
												id="order-ready-image"
												key={readyFileInputKey}
												type="file"
												accept="image/*"
												disabled={isUpdatePending}
												onChange={(ev) => setReadyImageFile(ev.target.files?.[0] ?? null)}
											/>
											<FieldDescription>Изображение после обработки</FieldDescription>
										</Field>
										<Button type="submit" disabled={isUpdatePending}>
											{isUpdatePending ? 'Отправка…' : 'Добавить'}
										</Button>
									</form>
								</div>
							</div>
							<div className="w-1/2 min-w-0 flex flex-col gap-3">
								<h3 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
									Информация о заказе
								</h3>
								<ul className="flex flex-col gap-3">
									<li className="flex flex-col gap-1.5 sm:grid sm:grid-cols-[minmax(0,7.5rem)_1fr] sm:items-center sm:gap-3">
										<span className="text-xs font-medium text-muted-foreground">Статус</span>
										<Select
											value={statusDraft ?? order.status}
											onValueChange={(value) => setStatusDraft(value as OrderStatus)}
										>
											<SelectTrigger className="w-full min-w-0" size="sm">
												<SelectValue placeholder="Выберите статус" />
											</SelectTrigger>
											<SelectContent align="start">
												{(Object.values(OrderStatus) as OrderStatus[]).map((item) => (
													<SelectItem key={item} value={item}>
														{ORDER_STATUS_LABEL[item]}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</li>
									<li className="flex flex-col gap-1.5 sm:grid sm:grid-cols-[minmax(0,7.5rem)_1fr] sm:items-start sm:gap-3 sm:pt-0.5">
										<span className="text-xs font-medium text-muted-foreground">Дата создания</span>
										<span className="min-w-0 wrap-break-word">{formatDate(order.createDate)}</span>
									</li>
									<li className="flex flex-col gap-1.5 sm:grid sm:grid-cols-[minmax(0,7.5rem)_1fr] sm:items-center sm:gap-3">
										<span className="text-xs font-medium text-muted-foreground">Дата готовности</span>
										<Popover>
											<PopoverTrigger>
												<Button
													variant="outline"
													size="sm"
													className="w-full min-w-0 justify-start gap-2 px-2.5 font-normal"
												>
													<CalendarIcon className="size-4 shrink-0 text-muted-foreground" />
													<span className="min-w-0 truncate text-left">
														{readyDateDraft ? (
															format(readyDateDraft, 'd MMMM yyyy', { locale: ru })
														) : (
															<span className="text-muted-foreground">Выберите дату</span>
														)}
													</span>
												</Button>
											</PopoverTrigger>
											<PopoverContent className="w-auto p-0" align="start">
												<Calendar
													mode="single"
													locale={ru}
													selected={readyDateDraft}
													onSelect={setReadyDateDraft}
													defaultMonth={readyDateDraft ?? new Date()}
												/>
											</PopoverContent>
										</Popover>
									</li>
									<li className="flex flex-col gap-1.5 sm:grid sm:grid-cols-[minmax(0,7.5rem)_1fr] sm:items-start sm:gap-3 sm:pt-0.5">
										<span className="text-xs font-medium text-muted-foreground">№ заказа</span>
										<span>{order.orderNumber}</span>
									</li>
									<li className="flex flex-col gap-1.5 sm:grid sm:grid-cols-[minmax(0,7.5rem)_1fr] sm:items-start sm:gap-3 sm:pt-0.5">
										<span className="text-xs font-medium text-muted-foreground">№ клиента</span>
										<span>{order.clientNumber}</span>
									</li>
									<li className="flex flex-col gap-1.5 sm:grid sm:grid-cols-[minmax(0,7.5rem)_1fr] sm:items-center sm:gap-3">
										<span className="text-xs font-medium text-muted-foreground">Исполнитель</span>
										<Select value={designerDraft} onValueChange={(value) => setDesignerDraft(value ?? '')}>
											<SelectTrigger className="w-full min-w-0" size="sm">
												<SelectValue placeholder="Выберите исполнителя" />
											</SelectTrigger>
											<SelectContent align="start">
												{users.map((user) => (
													<SelectItem key={user.id} value={user.id}>
														{user.fullName}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</li>
									<li className="flex flex-col gap-1.5 sm:grid sm:grid-cols-[minmax(0,7.5rem)_1fr] sm:items-start sm:gap-3">
										<span className="text-xs font-medium text-muted-foreground">Описание</span>
										<span className="min-w-0 whitespace-pre-wrap wrap-break-word">{order.description}</span>
									</li>
								</ul>
								<Button
									type="button"
									className="mt-2 w-full sm:w-auto"
									disabled={isUpdatePending}
									onClick={handleSaveOrderFields}
								>
									{isUpdatePending ? 'Сохранение…' : 'Сохранить описание и исполнителя'}
								</Button>
							</div>
						</div>
					)}
				</div>
			</DrawerContent>
		</Drawer>
	);
};
