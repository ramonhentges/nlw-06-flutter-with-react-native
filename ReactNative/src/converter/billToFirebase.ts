import { Bill } from '../entities';

export const billToFirebase = (bill: Bill) => {
  return {
    ...bill,
    dueDate: bill.dueDate.toLocaleDateString(),
    payDate: bill.payDate?.toLocaleDateString(),
  };
};
