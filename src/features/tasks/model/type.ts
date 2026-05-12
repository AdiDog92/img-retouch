export interface Order {
	id: number;
	description: string;
	orderNumber: number;
	clientNumber: number;
	designerId: number;
	createDate: Date;
	readyDate: Date | null;
	filePaths: string[];
	readyFilePath: string[] | null;
	status: OrderStatus;
}

export type CreateOrderPayload = {
	clientNumber: number;
	orderNumber: number;
	description: string;
	designerId: string;
	file: File;
};

export enum OrderStatus {
	PENDING = 'PENDING',
	IN_PROGRESS = 'IN_PROGRESS',
	REVIEW = 'REVIEW',
	REVISION = 'REVISION',
	COMPLETED = 'COMPLETED',
	ARCHIVE = 'ARCHIVE',
}

export const ORDER_STATUS_LABEL: Record<OrderStatus, string> = {
	[OrderStatus.PENDING]: 'В ожидании',
	[OrderStatus.IN_PROGRESS]: 'В обработке',
	[OrderStatus.REVIEW]: 'На проверке',
	[OrderStatus.REVISION]: 'На доработке',
	[OrderStatus.COMPLETED]: 'Завершено',
	[OrderStatus.ARCHIVE]: 'Отменен',
};
