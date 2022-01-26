import { date, object, string } from 'yup';
import { stringToDate } from '../converter';

export const BillSchema = object().shape({
  name: string().required('O nome do boleto é obrigatório'),
  barcode: string().required('O código de barras é obrigatório'),
  dueDate: date()
    .transform((_curr: Date, orig: string) => {
      return stringToDate(orig);
    })
    .required('A data de vencimento é obrigatória')
    .typeError('Data inválida'),
  value: string()
    .not(['R$ '], 'O valor é obrigatório')
    .required('O valor é obrigatório'),
  payDate: date().optional(),
});
