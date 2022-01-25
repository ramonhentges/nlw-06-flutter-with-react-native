import { Bill } from '../entities';

export const firebaseToBill = (key: string, data: any) => {
  const bill = new Bill();
  bill.id = key;
  bill.barcode = data.barcode;
  bill.dueDate = new Date(data.dueDate);
  bill.name = data.name;
  bill.value = data.value;
  if (data?.payDate) {
    bill.payDate = new Date(data.payDate);
  }
  return bill;
};
