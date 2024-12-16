import { toast } from 'react-toastify';

export const handleDelete = async (deleteTransaction, data, closeModal) => {
  try {
    const success = await deleteTransaction(data.id);
    if (success) {
      toast.success('Transaction deleted successfully');
      closeModal();
      return true;
    } else {
      toast.error('Failed to delete transaction');
      return false;
    }
  } catch (error) {
    console.error('Error deleting transaction:', error);
    toast.error('Failed to delete transaction');
    return false;
  }
};