import { useNavigation } from '@react-navigation/native';
import { Boleto } from 'broleto';
import React, { useCallback, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import BarcodeMask from 'react-native-barcode-mask';
import { BarCodeReadEvent, RNCamera } from 'react-native-camera';
import Orientation from 'react-native-orientation-locker';
import { useTailwind } from 'tailwind-rn/dist';
import { OutlinedButton } from '..';
import { TextStyles } from '../../themes';

export const BarcodeScanner = ({
  onBarcodeReaded,
  insertBarcodeManually,
}: BarcodeScannerProps) => {
  const [takingMuchTime, setTakingMuchTime] = useState(false);
  const tailwind = useTailwind();
  const navigation = useNavigation();

  const readBarcode = useCallback(
    (event: BarCodeReadEvent) => {
      const boleto = new Boleto(event.data);
      if (boleto.valid()) {
        const bill: BarcodeInfoProps = {
          amount: boleto.amount(),
          dueDate: boleto.expirationDate(),
          barcode: event.data,
        };
        onBarcodeReaded(bill);
      }
    },
    [onBarcodeReaded],
  );

  const scanAgain = useCallback(() => {
    setTakingMuchTime(false);
  }, []);

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

  useEffect(() => {
    Orientation.lockToLandscape();

    return Orientation.lockToPortrait;
  }, []);

  useEffect(() => {
    let timeout: NodeJS.Timeout | undefined;
    if (!takingMuchTime) {
      timeout = setTimeout(() => {
        setTakingMuchTime(true);
      }, 10000);
    }

    return () => {
      timeout && clearTimeout(timeout);
    };
  }, [takingMuchTime]);

  return (
    <View style={tailwind('flex-1')}>
      <RNCamera
        style={tailwind('grow')}
        captureAudio={false}
        onBarCodeRead={readBarcode}>
        <BarcodeMask width={'70%'} height={100} animatedLineWidth={'100%'} />
      </RNCamera>
      {takingMuchTime ? (
        <View style={tailwind('bg-background')}>
          <View style={tailwind('p-4')}>
            <Text style={tailwind(`${TextStyles.captionBoldBody} text-center`)}>
              Não foi possível identificar um código de barras.
            </Text>
            <Text style={tailwind(`${TextStyles.captionBody} text-center`)}>
              Tente escanear novamente ou digite o código do seu boleto.
            </Text>
          </View>
          <View style={tailwind('flex-row')}>
            <OutlinedButton
              text="Escanear Novamente"
              onPress={scanAgain}
              color="primary"
              className="grow"
            />
            <OutlinedButton
              text="Digitar código"
              onPress={insertBarcodeManually}
              color="secondary"
              className="grow"
            />
          </View>
        </View>
      ) : (
        <View style={tailwind('flex-row items-end')}>
          <OutlinedButton
            text="Inserir código do boleto"
            onPress={insertBarcodeManually}
            color="secondary"
            className="grow"
          />
        </View>
      )}
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
