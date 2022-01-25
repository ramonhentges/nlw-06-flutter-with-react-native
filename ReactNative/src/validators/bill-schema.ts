import { date, object, string } from 'yup';

export const BillSchema = object().shape({
  name: string().required(),
  barcode: string().required(),
  dueDate: date().required(),
  value: string().not(['R$ ']).required(),
  payDate: date().optional(),
});
