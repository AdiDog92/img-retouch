import { useGetOrderById } from '@/features/tasks/model/mutation/use-get-order-by-id';
import { useUpdateOrder } from '@/features/tasks/model/mutation/use-update-order';
import { ORDER_STATUS_LABEL, OrderStatus } from '@/features/tasks/model/type';
import { formatDate } from '@/shared/lib/format-date';
import { downloadFilesAsZip } from '@/shared/lib/download-files-as-zip';
import { resolveOrderImageSrc } from '@/shared/lib/resolve-order-image-src';
import { Button } from '@/shared/ui/shadcn/button';
import { Input } from '@/shared/ui/shadcn/input';
import { Skeleton } from '@/shared/ui/shadcn/skeleton';
import { useNavigate, useParams } from '@tanstack/react-router';
import { ChevronDownIcon } from 'lucide-react';
import { useGetUsers } from '@/features/users/model/mutation/use-get-users';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/shadcn/select';
import { useEffect, useState, type FormEvent } from 'react';
import { toast } from 'sonner';
import { usePermissions } from '@/features/auth/model/use-permissions';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/shadcn/popover';
import { Calendar } from '@/shared/ui/shadcn/calendar';
import { BackButton } from '@/shared/ui/back-button';

const ORDER_STATUSES = Object.values(OrderStatus) as OrderStatus[];

function normalizeOrderStatus(raw: unknown): OrderStatus {
	const s = String(raw ?? '').trim();
	const upper = s.toUpperCase();
	const values = Object.values(OrderStatus) as string[];
	if (values.includes(s)) return s as OrderStatus;
	if (values.includes(upper)) return upper as OrderStatus;
	return OrderStatus.PENDING;
}

function OrderPageSkeleton() {
	return (
		<div className="flex flex-col gap-4">
			<div className="mb-4 flex items-center gap-2">
				<Skeleton className="h-9 w-24" />
				<Skeleton className="h-8 w-56" />
			</div>
			<div className="flex justify-between gap-2">
				<div className="flex w-1/3 flex-col gap-3">
					{Array.from({ length: 5 }).map((_, i) => (
						<Skeleton key={i} className="h-4 w-full max-w-xs" />
					))}
				</div>
				<div className="flex w-2/3 flex-col gap-4">
					<Skeleton className="h-6 w-48" />
					<div className="rounded-lg border border-border bg-muted p-4">
						<div className="flex flex-wrap gap-2">
							<Skeleton className="h-[250px] w-[250px] rounded-lg" />
							<Skeleton className="h-[250px] w-[250px] rounded-lg" />
						</div>
					</div>
					<Skeleton className="h-10 w-52" />
					<Skeleton className="h-6 w-48" />
					<div className="rounded-lg border border-border bg-muted p-4">
						<div className="flex flex-wrap gap-2">
							<Skeleton className="h-[250px] w-[250px] rounded-lg" />
						</div>
					</div>
					<Skeleton className="h-9 w-full" />
					<Skeleton className="h-10 w-52" />
				</div>
			</div>
		</div>
	);
}

export const OrderPage = () => {
	const navigate = useNavigate();
	const { orderId } = useParams({ from: '/dashboard/tasks/$orderId' });
	const [readyFile, setReadyFile] = useState<File | null>(null);
	const [readyFileInputKey, setReadyFileInputKey] = useState<number>(0);
	const [isDownloading, setIsDownloading] = useState<boolean>(false);

	const { data: order, isLoading, error } = useGetOrderById(orderId);
	const { mutateAsync: updateOrder, isPending: isUploadingReadyFile } = useUpdateOrder();
	const { canChangeOrderDesigner } = usePermissions();
	const { data: users = [] } = useGetUsers('');
	const [designerId, setDesignerId] = useState<number | null>(null);
	const [status, setStatus] = useState<OrderStatus | null>(null);
	const [readyDate, setReadyDate] = useState<Date | null>(null);

	const handleUpdateOrder = async () => {
		try {
			await updateOrder({
				orderId,
				description: order?.description ?? order?.description,
				...(canChangeOrderDesigner ? { designerId: designerId ?? order?.designerId } : {}),
				readyDate: readyDate ?? order?.readyDate,
				status: status ?? order?.status,
			});
		} catch (err) {
			toast.error(err instanceof Error ? err.message : 'Не удалось внести изменения');
		}
	};

	useEffect(() => {
		if (!order) return;
		const match = users.find((u) => u.id === order.designerId);
		setDesignerId(match?.id ?? order.designerId);
		setReadyDate(order.readyDate ?? null);
		setStatus(normalizeOrderStatus(order.status));
	}, [order, users]);

	const handleDownloadImages = async () => {
		if (!order?.filePaths.length) return;

		setIsDownloading(true);
		try {
			await downloadFilesAsZip(
				order.filePaths.map((f) => f.storagePath),
				resolveOrderImageSrc,
				`order_${order.orderNumber}_images.zip`,
			);
			toast.success('Архив скачан');
		} catch (err) {
			toast.error(err instanceof Error ? err.message : 'Не удалось скачать изображения');
		} finally {
			setIsDownloading(false);
		}
	};

	const handleUploadReadyFile = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!readyFile) {
			toast.error('Выберите файл');
			return;
		}
		try {
			await updateOrder({
				orderId,
				readyFile,
			});
			setReadyFile(null);
			setReadyFileInputKey((k) => k + 1);
		} catch (err) {}
	};

	return (
		<>
			{isLoading && <OrderPageSkeleton />}
			{error && <div>Ошибка: {error.message}</div>}
			{order && (
				<>
					<div className="flex items-center gap-2 mb-4">
						<BackButton />
					</div>
					<div className="flex justify-between gap-2">
						<div className="w-1/3 flex flex-col gap-2">
							<p>
								<small className="text-muted-foreground text-sm">Заказ №:</small> {order.orderNumber}
							</p>
							<p>
								<small className="text-muted-foreground text-sm">Клиентский номер:</small> {order.clientNumber}
							</p>
							<p>
								<small className="text-muted-foreground text-sm">Дата создания:</small> {formatDate(order.createDate)}
							</p>
							<p>
								<small className="text-muted-foreground text-sm">Описание:</small> {order.description}
							</p>
							<p className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-2">
								<small className="text-muted-foreground text-sm shrink-0">Исполнитель:</small>
								{canChangeOrderDesigner ? (
									<Select value={designerId} onValueChange={(value) => setDesignerId(value ?? null)}>
										<SelectTrigger className="w-full min-w-0 sm:max-w-xs">
											<SelectValue placeholder="Выберите исполнителя">
												{(id) =>
													id != null ? (users.find((u) => u.id === id)?.fullName ?? String(id)) : 'Выберите исполнителя'
												}
											</SelectValue>
										</SelectTrigger>
										<SelectContent align="start">
											{users.map((user) => (
												<SelectItem key={user.id} value={user.id}>
													{user.fullName}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								) : (
									<span>{users.find((u) => u.id === order.designerId)?.fullName ?? '—'}</span>
								)}
							</p>
							<p className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-2">
								<small className="text-muted-foreground text-sm shrink-0">Статус:</small>
								<Select value={status} onValueChange={(value) => setStatus(value ?? null)}>
									<SelectTrigger className="w-full min-w-0 sm:max-w-xs">
										<SelectValue placeholder="Выберите статус">
											{(value) =>
												value != null ? (ORDER_STATUS_LABEL[value as OrderStatus] ?? String(value)) : 'Выберите статус'
											}
										</SelectValue>
									</SelectTrigger>
									<SelectContent align="start">
										{ORDER_STATUSES.map((item) => (
											<SelectItem key={item} value={item}>
												{ORDER_STATUS_LABEL[item]}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</p>
							<p>
								<small className="text-muted-foreground text-sm">Дата готовности:</small>
								<Popover>
									<PopoverTrigger>
										<Button
											variant="outline"
											data-empty={!readyDate}
											className="w-[212px] justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
										>
											{readyDate ? formatDate(readyDate) : <span>Pick a date</span>}
											<ChevronDownIcon />
										</Button>
									</PopoverTrigger>
									<PopoverContent className="w-auto p-0" align="start">
										<Calendar mode="single" selected={readyDate} onSelect={setReadyDate} defaultMonth={readyDate} />
									</PopoverContent>
								</Popover>
							</p>
							<Button size="lg" onClick={() => void handleUpdateOrder()}>
								Внести изменения
							</Button>
						</div>
						<div className="w-2/3 flex flex-col gap-[16px]">
							<div>
								<h3 className="text-lg font-semibold mb-4">Исходные изображения</h3>
								<div className="p-4 bg-muted rounded-lg border border-border mb-2">
									<div className="flex flex-wrap gap-2">
										{order.filePaths.length === 0 && (
											<p className="text-sm text-muted-foreground mx-auto">Нет исходных изображений</p>
										)}
										{order.filePaths.map((f) => (
											<img
												key={f.id}
												className="overflow-hidden rounded-lg"
												src={resolveOrderImageSrc(f.storagePath)}
												alt="Исходное изображение"
												width={250}
											/>
										))}
									</div>
								</div>
								<Button
									onClick={() => void handleDownloadImages()}
									disabled={order.filePaths.length === 0 || isDownloading}
									className="mt-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
									variant="default"
									size="lg"
								>
									{isDownloading ? 'Скачивание…' : 'Скачать изображения'}
								</Button>
							</div>
							<div>
								<h3 className="text-lg font-semibold mb-4">Готовые изображения</h3>
								<div className="flex flex-wrap gap-2 p-4 bg-muted rounded-lg border border-border mb-3">
									{order.readyFilePath.length === 0 && (
										<p className="text-sm text-muted-foreground mx-auto">Нет готовых изображений</p>
									)}
									{order.readyFilePath.map((f) => (
										<img
											key={f.id}
											className="overflow-hidden rounded-lg"
											src={resolveOrderImageSrc(f.storagePath)}
											alt="Готовое изображение"
											width={250}
										/>
									))}
								</div>
								<form onSubmit={(e) => void handleUploadReadyFile(e)}>
									<Input
										key={readyFileInputKey}
										type="file"
										accept="image/*"
										onChange={(e) => setReadyFile(e.target.files?.[0] ?? null)}
									/>
									<Button
										type="submit"
										disabled={!readyFile || isUploadingReadyFile}
										className="mt-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
										variant="default"
										size="lg"
									>
										{isUploadingReadyFile ? 'Загрузка…' : 'Загрузить изображение'}
									</Button>
								</form>
							</div>
						</div>
					</div>
				</>
			)}
		</>
	);
};
