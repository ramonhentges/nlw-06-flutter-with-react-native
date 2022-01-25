import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useTailwind } from 'tailwind-rn/dist';
import { BarcodeInfoProps, BarcodeScanner, BillForm } from '../../components';
import { TextStyles } from '../../themes';

export const CreateBill = () => {
  const tailwind = useTailwind();
  const navigation = useNavigation();
  const [step, setStep] = useState(CreateBillSteps.ReadBarcode);
  const [initialValues, setInitialValues] = useState<BarcodeInfoProps>();

  const nextStep = useCallback(() => {
    setStep(CreateBillSteps.FillData);
  }, []);

  const onBarcodeReaded = useCallback(
    (barcode: BarcodeInfoProps) => {
      setInitialValues(barcode);
      nextStep();
    },
    [nextStep],
  );

  const handleCreated = useCallback(() => {
    navigation.navigate('Home');
  }, [navigation]);

  const stepPage = {
    [CreateBillSteps.ReadBarcode]: (
      <BarcodeScanner
        onBarcodeReaded={onBarcodeReaded}
        insertBarcodeManually={nextStep}
      />
    ),
    [CreateBillSteps.FillData]: (
      <KeyboardAwareScrollView>
        <View style={tailwind('px-5 grow')}>
          <Text
            style={tailwind(
              `${TextStyles.titleBoldHeading} self-center w-2/3 text-center mb-4`,
            )}>
            Preencha os dados do boleto
          </Text>
          <BillForm
            initialValues={initialValues}
            handleSuccess={handleCreated}
          />
        </View>
      </KeyboardAwareScrollView>
    ),
  };
  return stepPage[step];
};

enum CreateBillSteps {
  ReadBarcode,
  FillData,
}
