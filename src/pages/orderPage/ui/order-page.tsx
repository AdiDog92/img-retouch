import { useGetOrderById } from '@/features/tasks/model/mutation/use-get-order-by-id';
import { formatDate } from '@/shared/lib/format-date';
import { downloadFilesAsZip } from '@/shared/lib/download-files-as-zip';
import { resolveOrderImageSrc } from '@/shared/lib/resolve-order-image-src';
import { Button } from '@/shared/ui/shadcn/button';
import { useNavigate, useParams } from '@tanstack/react-router';
import { ArrowLeftIcon } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export const OrderPage = () => {
	const { orderId } = useParams({ from: '/dashboard/tasks/$orderId' });
	const { data: order, isLoading, error } = useGetOrderById(orderId);
	const navigate = useNavigate();
	const [isDownloading, setIsDownloading] = useState(false);

	const handleDownloadImages = async () => {
		if (!order?.filePaths.length) return;

		setIsDownloading(true);
		try {
			await downloadFilesAsZip(order.filePaths, resolveOrderImageSrc, `order_${order.orderNumber}_images.zip`);
			toast.success('Архив скачан');
		} catch (err) {
			toast.error(err instanceof Error ? err.message : 'Не удалось скачать изображения');
		} finally {
			setIsDownloading(false);
		}
	};

	return (
		<>
			{isLoading && <div>Загрузка...</div>}
			{error && <div>Ошибка: {error.message}</div>}
			{order && (
				<>
					<div className="flex items-center gap-2 mb-4">
						<Button className="cursor-pointer" variant="outline" onClick={() => navigate({ to: '/dashboard/tasks' })}>
							<ArrowLeftIcon className="w-4 h-4" />
							Назад
						</Button>
						<h1 className="text-2xl font-bold">Заказ №{order.orderNumber}</h1>
					</div>
					<div className="flex justify-between gap-2">
						<div className="w-1/3">
							<p>Статус: {order.status}</p>
							<p>Дата создания: {formatDate(order.createDate)}</p>
							<p>Дата готовности: {formatDate(order.readyDate ?? null)}</p>
							<p>Описание: {order.description}</p>
							<p>Дизайнер: {order.designerId}</p>
						</div>
						<div className="w-2/3">
							<h3 className="text-lg font-bold mb-4">Исходные изображения</h3>
							<div>
								<div className="flex flex-wrap gap-2">
									{order.filePaths.map((filePath) => (
										<img
											key={filePath}
											className="overflow-hidden rounded-lg"
											src={resolveOrderImageSrc(filePath)}
											alt="Исходное изображение"
											width={250}
										/>
									))}
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
							<h3>Готовые изображения: </h3>
							<div className="flex flex-wrap gap-2">
								{order.readyFilePath.map((filePath) => (
									<img
										key={filePath}
										src={resolveOrderImageSrc(filePath)}
										alt="Готовое изображение"
										width={100}
										height={100}
									/>
								))}
							</div>
						</div>
					</div>
				</>
			)}
		</>
	);
};
