import { useAuth } from '@/app/providers/auth-provider/use-auth';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/shadcn/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/shadcn/card';
import { Field, FieldGroup, FieldLabel } from '@/shared/ui/shadcn/field';
import { Input } from '@/shared/ui/shadcn/input';
import { useNavigate } from '@tanstack/react-router';
import { useState, type FormEvent } from 'react';
import { toast } from 'sonner';

export function LoginForm({ className, ...props }: React.ComponentProps<'div'>) {
	const navigate = useNavigate();
	const { login } = useAuth();

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		setIsSubmitting(true);

		try {
			await login({ username, password });
			toast.success('Вы успешно авторизовались');

			void navigate({ to: '/dashboard/tasks' });
		} catch {
			toast.error('Неверный логин или пароль');
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className={cn('flex flex-col gap-6', className)} {...props}>
			<Card>
				<CardHeader>
					<CardTitle className="text-2xl font-bold text-center">Авторизация</CardTitle>
					<CardDescription className="text-center">Введите ваш логин и пароль</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit}>
						<FieldGroup>
							<Field>
								<FieldLabel htmlFor="username">Логин</FieldLabel>
								<Input
									id="username"
									name="username"
									type="text"
									autoComplete="username"
									placeholder="Введите ваш логин"
									required
									value={username}
									onChange={(e) => setUsername(e.target.value)}
									disabled={isSubmitting}
								/>
							</Field>
							<Field>
								<div className="flex items-center">
									<FieldLabel htmlFor="password">Пароль</FieldLabel>
								</div>
								<Input
									id="password"
									name="password"
									type="password"
									autoComplete="current-password"
									placeholder="Введите ваш пароль"
									required
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									disabled={isSubmitting}
								/>
							</Field>
							<Field>
								<Button type="submit" size="lg" disabled={isSubmitting}>
									{isSubmitting ? 'Вход...' : 'Войти'}
								</Button>
							</Field>
						</FieldGroup>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
