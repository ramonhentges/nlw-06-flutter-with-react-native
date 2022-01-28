import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import { useTailwind } from 'tailwind-rn/dist';
import {
  BarcodeInfoProps,
  HelperText,
  MaskedTextField,
  OutlinedButton,
  TextField,
} from '../..';
import { Bill } from '../../../entities';
import { useBillForm } from '../../../hooks';

export const BillForm = ({ initialValues, handleSuccess }: BillFormProps) => {
  const { values, handleChange, handleSubmit, errors, touched, handleBlur } =
    useBillForm({
      initialValues,
      handleSuccess,
    });
  const tailwind = useTailwind();
  const navigation = useNavigation();

  return (
    <>
      <TextField
        value={values.name}
        startIcon="file-document-outline"
        onChangeText={handleChange('name')}
        placeholder="Nome do boleto"
        error={touched.name && Boolean(errors.name)}
        onBlur={handleBlur('name')}
      />
      <HelperText
        text={touched.name && errors.name}
        className="mb-2"
        error={true}
      />

      <MaskedTextField
        value={values.dueDate}
        startIcon="close-circle-outline"
        onChangeText={handleChange('dueDate')}
        placeholder="Vencimento"
        mask="[00]{/}[00]{/}[0000]"
        error={touched.dueDate && Boolean(errors.dueDate)}
        onBlur={handleBlur('dueDate')}
        keyboardType="numeric"
      />
      <HelperText
        text={touched.dueDate && errors.dueDate}
        className="mb-2"
        error={true}
      />

      <MaskedTextField
        value={values.value}
        startIcon="cash"
        onChangeText={handleChange('value')}
        placeholder="Valor"
        mask="R$ [999990]{,}[00]"
        error={touched.value && Boolean(errors.value)}
        onBlur={handleBlur('value')}
        keyboardType="numeric"
      />
      <HelperText
        text={touched.value && errors.value}
        className="mb-2"
        error={true}
      />

      <TextField
        value={values.barcode}
        startIcon="barcode"
        onChangeText={handleChange('barcode')}
        placeholder="Código"
        error={touched.barcode && Boolean(errors.barcode)}
        onBlur={handleBlur('barcode')}
        keyboardType="numeric"
      />
      <HelperText
        text={touched.barcode && errors.barcode}
        className="mb-2"
        error={true}
      />

      <View style={tailwind('grow flex-row items-end -mx-5')}>
        <OutlinedButton
          text="Cancelar"
          onPress={navigation.goBack}
          color="secondary"
          className="grow"
        />
        <OutlinedButton
          text="Cadastrar"
          onPress={handleSubmit}
          color="primary"
          className="grow"
        />
      </View>
    </>
  );
};

type BillFormProps = {
  initialValues?: BarcodeInfoProps;
  handleSuccess?: (bill: Bill) => void;
};
