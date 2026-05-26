import dayjs from 'dayjs';
import 'dayjs/locale/ru';

export const formatDate = (date: Date | string | null, format: string = 'DD MMMM YYYY'): string => {
	if (!date) return '';
	return dayjs(date).locale('ru-Ru').format(format);
};
