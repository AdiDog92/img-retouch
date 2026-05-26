import { useAuth } from '@/app/providers/auth-provider/use-auth';
import { useGetUserById } from '@/features/users/model/mutation/use-get-user-by-id';
import { useUpdateUser } from '@/features/users/model/mutation/use-update-user';
import { BackButton } from '@/shared/ui/back-button';
import { Avatar, AvatarFallback } from '@/shared/ui/shadcn/avatar';
import { Button } from '@/shared/ui/shadcn/button';
import { Calendar } from '@/shared/ui/shadcn/calendar';
import { Field, FieldGroup, FieldLabel } from '@/shared/ui/shadcn/field';
import { Input } from '@/shared/ui/shadcn/input';
import { useEffect, useState } from 'react';

export const ProfilePage = () => {
	const { user } = useAuth();
	const { data: userData } = useGetUserById(user?.id ?? 0);
	const { mutateAsync: updateUser } = useUpdateUser();
	const [userName, setUserName] = useState('');
	const [fullName, setFullName] = useState('');
	const [email, setEmail] = useState('');

	useEffect(() => {
		setUserName(userData?.username || '');
		setFullName(userData?.fullName || '');
		setEmail(userData?.email || '');
	}, [userData]);

	const handleUpdateUser = async () => {
		await updateUser({
			id: userData?.id ?? 0,
			user: {
				id: userData?.id ?? 0,
				role: userData?.role ?? '',
				isActive: userData?.isActive ?? true,
				username: userName,
				fullName: fullName,
				email: email,
			},
		});
	};

	return (
		<>
			<div className="flex items-center gap-2 mb-4">
				<BackButton />
			</div>
			<div className="flex gap-4">
				<div className="w-2/5 flex flex-col gap-2">
					<h1 className="text-2xl font-semibold">Профиль</h1>
					<div className="flex flex-col gap-2">
						<div className="flex flex-col gap-2">
							<Avatar className="size-24 after:rounded-full">
								<AvatarFallback className="rounded-full text-2xl">CN</AvatarFallback>
							</Avatar>
							<FieldGroup className="grid grid-cols-2 gap-4 [&_[data-slot=field-label]]:text-[14px] [&_[data-slot=field-label]]:text-muted-foreground [&_[data-slot=input]]:h-11">
								<Field>
									<FieldLabel>Роль</FieldLabel>
									<Input value={userData?.role || ''} disabled />
								</Field>
								<Field>
									<FieldLabel>Логин</FieldLabel>
									<Input value={userName} onChange={(e) => setUserName(e.target.value)} />
								</Field>
								<Field>
									<FieldLabel>ФИО</FieldLabel>
									<Input value={fullName} onChange={(e) => setFullName(e.target.value)} />
								</Field>
								<Field>
									<FieldLabel>Email</FieldLabel>
									<Input value={email} onChange={(e) => setEmail(e.target.value)} />
								</Field>
								<Button type="submit" className="col-span-2 h-11 w-fit" onClick={handleUpdateUser}>
									Сохранить
								</Button>
							</FieldGroup>
						</div>
					</div>
				</div>
				<div className="w-2/5 flex flex-col gap-2 mx-auto">
					<h1 className="text-2xl font-semibold">Рабочие дни</h1>
					<Calendar className="w-full h-full border-gray-50 border-2 rounded-md mb-2" mode="single" />
					<Button type="submit" className="col-span-2 h-11 w-fit">
						Сохранить
					</Button>
				</div>
			</div>
		</>
	);
};
