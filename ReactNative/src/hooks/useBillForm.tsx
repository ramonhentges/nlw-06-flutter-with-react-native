import { useFormik } from 'formik';
import { BarcodeInfoProps } from '../components';
import { Bill } from '../entities';
import { useBillStore } from '../stores';
import { BillSchema } from '../validators';

export const useBillForm = ({
  initialValues,
  handleSuccess,
}: useBillFormProps) => {
  const { addBill } = useBillStore();

  const formik = useFormik({
    initialValues: {
      name: '',
      dueDate: initialValues?.dueDate.toLocaleDateString() || '',
      value: initialValues?.amount.toString().replace('.', ',') || '',
      barcode: initialValues?.barcode || '',
    },
    validationSchema: BillSchema,
    onSubmit: values => {
      const bill = new Bill();
      bill.barcode = values.barcode;
      bill.dueDate = new Date(values.dueDate);
      bill.name = values.name;
      bill.value = Number(values.value.replace('R$ ', '').replace(',', '.'));

      const { status, data } = addBill(bill);
      if (status === 'ok') {
        handleSuccess && handleSuccess(data);
      }
    },
  });

  return formik;
};

type useBillFormProps = {
  initialValues?: BarcodeInfoProps;
  handleSuccess?: (bill: Bill) => void;
};
