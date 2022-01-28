import { useNavigation } from '@react-navigation/native';
import { Boleto } from 'broleto';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import BarcodeMask from 'react-native-barcode-mask';
import { BarCodeReadEvent, RNCamera } from 'react-native-camera';
import { useTailwind } from 'tailwind-rn/dist';
import { OutlinedButton } from '..';

export const BarcodeScanner = ({
  onBarcodeReaded,
  insertBarcodeManually,
}: BarcodeScannerProps) => {
  const tailwind = useTailwind();
  const navigation = useNavigation();
  const readBarcode = (event: BarCodeReadEvent) => {
    const boleto = new Boleto(event.data);
    if (boleto.valid()) {
      const bill: BarcodeInfoProps = {
        amount: boleto.amount(),
        dueDate: boleto.expirationDate(),
        barcode: event.data,
      };
      onBarcodeReaded(bill);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      title: 'Escaneie o código de barras do boleto',
    });
    return () => {
      navigation.setOptions({
        title: '',
      });
    };
  }, [navigation, tailwind]);

  return (
    <View style={tailwind('flex-1')}>
      <RNCamera
        style={tailwind('grow')}
        captureAudio={false}
        onBarCodeRead={readBarcode}>
        <BarcodeMask width={'70%'} height={100} animatedLineWidth={'100%'} />
      </RNCamera>
      <View style={tailwind('flex-row items-end')}>
        <OutlinedButton
          text="Inserir código do boleto"
          onPress={insertBarcodeManually}
          color="secondary"
          className="grow"
        />
      </View>
    </View>
  );
};

type BarcodeScannerProps = {
  onBarcodeReaded: (barcode: BarcodeInfoProps) => void;
  insertBarcodeManually: () => void;
};

export type BarcodeInfoProps = {
  amount: number;
  dueDate: Date;
  barcode: string;
};
