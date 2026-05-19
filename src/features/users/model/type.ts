export type User = {
	id: number;
	username: string;
	email: string;
	fullName: string;
	role: string;
	isActive: boolean;
};

export type CreateUserPayload = Omit<User, 'id'> & {
	password: string;
};

export enum UserRole {
	ADMIN = 'ADMIN',
	MANAGER = 'MANAGER',
	DESIGNER = 'DESIGNER',
	FREELANCER = 'FREELANCER',
}
