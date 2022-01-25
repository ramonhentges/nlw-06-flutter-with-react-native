import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import { useTailwind } from 'tailwind-rn/dist';
import {
  BarcodeInfoProps,
  MaskedTextField,
  OutlinedButton,
  TextField,
} from '../..';
import { Bill } from '../../../entities';
import { useBillForm } from '../../../hooks';

export const BillForm = ({ initialValues, handleSuccess }: BillFormProps) => {
  const { values, handleChange, handleSubmit } = useBillForm({
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
        className="mb-4"
      />
      <MaskedTextField
        value={values.dueDate}
        startIcon="close-circle-outline"
        onChangeText={handleChange('dueDate')}
        placeholder="Vencimento"
        className="mb-4"
        mask="[99]/[99]/[99]"
      />
      <MaskedTextField
        value={values.value}
        startIcon="cash"
        onChangeText={handleChange('value')}
        placeholder="Valor"
        className="mb-4"
        mask="R$ [999990],[00]"
      />
      <TextField
        value={values.barcode}
        startIcon="barcode"
        onChangeText={handleChange('barcode')}
        placeholder="Código"
        className="mb-4"
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
