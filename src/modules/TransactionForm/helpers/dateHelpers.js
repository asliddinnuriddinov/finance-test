import { format, parse } from 'date-fns';

export const formatDate = (date) => {
  return format(date, 'MMMM dd, yyyy');
};

export const parseDate = (dateString) => {
  return parse(dateString, 'MMMM dd, yyyy', new Date());
};

export const getCurrentDate = () => {
  return formatDate(new Date());
};
