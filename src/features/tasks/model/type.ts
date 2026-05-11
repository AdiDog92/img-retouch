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

export enum OrderStatus {
	PENDING = 'В ожидании',
	IN_PROGRESS = 'В обработке',
	REVIEW = 'На проверке',
	REVISION = 'На доработке',
	COMPLETED = 'Завершено',
	ARCHIVE = 'Архив, отменен и прочие',
}
