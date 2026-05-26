import { Button } from '@/shared/ui/shadcn/button';
import { ArrowLeftIcon } from 'lucide-react';
import { useRouter } from '@tanstack/react-router';

export const BackButton = () => {
	const router = useRouter();

	return (
		<Button className="cursor-pointer" variant="outline" onClick={() => router.history.go(-1)}>
			<ArrowLeftIcon className="w-4 h-4" />
			Назад
		</Button>
	);
};
