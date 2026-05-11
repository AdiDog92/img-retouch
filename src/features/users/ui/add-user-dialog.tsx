import { Button } from '@/shared/ui/shadcn/button';
import {
	Dialog,
	DialogHeader,
	DialogContent,
	DialogTitle,
	DialogTrigger,
	DialogDescription,
	DialogClose,
	DialogFooter,
} from '@/shared/ui/shadcn/dialog';
import { Field, FieldGroup } from '@/shared/ui/shadcn/field';
import { Input } from '@/shared/ui/shadcn/input';
import { Label } from '@/shared/ui/shadcn/label';
import { useCreateUser } from '../model/mutation/use-create-user';
import { useState } from 'react';
import { UserRole } from '../model/type';
import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue } from '@/shared/ui/shadcn/select';
import { toast } from 'sonner';

const ROLE_LABELS: Record<UserRole, string> = {
	[UserRole.ADMIN]: 'Администратор',
	[UserRole.MANAGER]: 'Менеджер',
	[UserRole.DESIGNER]: 'Дизайнер',
	[UserRole.FREELANCER]: 'Фрилансер',
};

export const AddUserDialog = () => {
	const { mutate: createUser, isPending } = useCreateUser();

	const [isOpen, setIsOpen] = useState(false);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');
	const [fullName, setFullName] = useState('');
	const [role, setRole] = useState<UserRole>(UserRole.DESIGNER);

	const resetFormFields = () => {
		setUsername('');
		setPassword('');
		setEmail('');
		setFullName('');
		setRole(UserRole.DESIGNER);
	};

	const handleOpenChange = (open: boolean) => {
		setIsOpen(open);
		if (!open) {
			resetFormFields();
		}
	};

	const handleCreateUser = () => {
		createUser(
			{
				username,
				password,
				email,
				fullName,
				role,
				isActive: true,
			},
			{
				onSuccess: () => {
					toast.success('Пользователь успешно создан');
					setIsOpen(false);
					resetFormFields();
				},
			},
		);
	};

	return (
		<>
			<Dialog open={isOpen} onOpenChange={handleOpenChange}>
				<DialogTrigger>
					<Button variant="outline">Добавить пользователя</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-sm">
					<DialogHeader>
						<DialogTitle>Добавить пользователя</DialogTitle>
						<DialogDescription>Заполните форму ниже для добавления нового пользователя.</DialogDescription>
					</DialogHeader>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							handleCreateUser();
						}}
					>
						<FieldGroup className="mb-4">
							<Field>
								<Label htmlFor="username">Логин</Label>
								<Input id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
							</Field>
							<Field>
								<Label htmlFor="password">Пароль</Label>
								<Input id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
							</Field>
							<Field>
								<Label htmlFor="email">Email</Label>
								<Input id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
							</Field>
							<Field>
								<Label htmlFor="fullName">ФИО</Label>
								<Input id="fullName" name="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} />
							</Field>
							<Field>
								<Label htmlFor="role">Роль</Label>
								<div className="relative w-full">
									<Select id="role" name="role" value={role} onValueChange={(value) => setRole(value as UserRole)}>
										<SelectTrigger className="w-full">
											<SelectValue placeholder="Выберите роль">
												{(selected) => (selected != null ? ROLE_LABELS[selected as UserRole] : null)}
											</SelectValue>
										</SelectTrigger>
										<SelectContent align="start">
											{Object.values(UserRole).map((userRole) => (
												<SelectItem key={userRole} value={userRole}>
													{ROLE_LABELS[userRole]}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>
							</Field>
						</FieldGroup>
						<DialogFooter>
							<DialogClose>
								<Button variant="outline" type="button">
									Отменить
								</Button>
							</DialogClose>
							<Button type="submit" disabled={isPending}>
								{isPending ? 'Создание...' : 'Создать пользователя'}
							</Button>
						</DialogFooter>
					</form>
				</DialogContent>
			</Dialog>
		</>
	);
};
