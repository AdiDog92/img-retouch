import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/shadcn/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/shadcn/card';
import { Field, FieldGroup, FieldLabel } from '@/shared/ui/shadcn/field';
import { Input } from '@/shared/ui/shadcn/input';

export function LoginForm({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div className={cn('flex flex-col gap-6', className)} {...props}>
			<Card>
				<CardHeader>
					<CardTitle className="text-2xl font-bold text-center">Авторизация</CardTitle>
					<CardDescription className="text-center">Введите ваш логин и пароль</CardDescription>
				</CardHeader>
				<CardContent>
					<form>
						<FieldGroup>
							<Field>
								<FieldLabel htmlFor="email">Логин</FieldLabel>
								<Input id="email" type="email" placeholder="Введите ваш логин" required />
							</Field>
							<Field>
								<div className="flex items-center">
									<FieldLabel htmlFor="password">Пароль</FieldLabel>
								</div>
								<Input id="password" type="password" placeholder="Введите ваш пароль" required />
							</Field>
							<Field>
								<Button type="submit" size="lg">
									Войти
								</Button>
							</Field>
						</FieldGroup>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
