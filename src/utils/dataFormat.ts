import dayjs from 'dayjs';

export const monthDayYear = (dateString: string): string =>
  dayjs(dateString).format('MMM D, YYYY');

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

export const truncateAddress = (address: string): string => {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};
