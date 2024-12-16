import { format, parseISO } from 'date-fns';

export const formatDate = (dateString) => {
  try {
    // First try to parse as ISO string (for createdAt)
    return format(parseISO(dateString), 'MMMM dd, yyyy');
  } catch (error) {
    try {
      // If that fails, try to parse the date string directly
      return format(new Date(dateString), 'MMMM dd, yyyy');
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid Date';
    }
  }
};