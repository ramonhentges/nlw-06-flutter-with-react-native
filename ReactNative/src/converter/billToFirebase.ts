import { Bill } from '../entities';

export const billToFirebase = (bill: Bill) => {
  return {
    ...bill,
    dueDate: bill.dueDate.toDateString(),
    payDate: bill.payDate?.toDateString(),
  };
};
