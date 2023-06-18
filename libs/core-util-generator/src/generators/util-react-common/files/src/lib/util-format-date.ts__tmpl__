import dayjs from 'dayjs';
import 'dayjs/locale/id';

export const setDayJsLocale = (locale: string) => {
  dayjs.locale(locale);
};

export const formatDate = (date: string) => dayjs(date).format('YYYY-MM-DD');
export const formatDateFullMonth = (date: string) => dayjs(date).format('MMM DD, YYYY');
export const formatDateTime = (date: string) => dayjs(date).format('YYYY-MM-DD HH:mm:ss');
export const formatDateTimeFullMonth = (date: string) =>
  dayjs(date).format('MMM DD, YYYY, HH:mm A');
