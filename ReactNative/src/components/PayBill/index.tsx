import React, {
  ForwardedRef,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { Text, View } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import { useTailwind } from 'tailwind-rn/dist';
import { ContainedButton, IconButton } from '..';
import { Bill } from '../../entities';
import { useBillStore } from '../../stores';
import { TextStyles } from '../../themes';

export const PayBill = forwardRef((props, ref: ForwardedRef<unknown>) => {
  const refRBSheet = useRef<any>();
  const { payBill, removeBill } = useBillStore();
  const tailwind = useTailwind();
  const [currentBill, setCurrentBill] = useState<Bill | undefined>();

  const handleOpen = useCallback((bill: Bill) => {
    setCurrentBill(bill);
    refRBSheet.current.open();
  }, []);

  const handleClose = useCallback(() => {
    setCurrentBill(undefined);
    refRBSheet.current.close();
  }, []);

  const handlePayBill = useCallback(() => {
    payBill(currentBill as Bill);
    refRBSheet.current.close();
  }, [currentBill, payBill]);

  const handleDeleteBill = useCallback(() => {
    removeBill(currentBill as Bill);
    refRBSheet.current.close();
  }, [currentBill, removeBill]);

  useImperativeHandle(ref, () => {
    return {
      handlePayBill: handleOpen,
    };
  });

  return (
    <RBSheet ref={refRBSheet} closeOnDragDown={true} closeOnPressMask={false}>
      <View style={tailwind('w-3/5 self-center mb-4')}>
        <Text style={tailwind(`${TextStyles.titleLightHeading} text-center`)}>
          {'O boleto '}
          <Text style={tailwind(`${TextStyles.titleBoldHeading}`)}>
            {currentBill?.name}
          </Text>
          <Text style={tailwind(`${TextStyles.titleLightHeading}`)}>
            {' no valor de R$ '}
          </Text>
          <Text style={tailwind(`${TextStyles.titleBoldHeading}`)}>
            {currentBill?.formatedValue()}
          </Text>
          <Text style={tailwind(`${TextStyles.titleLightHeading}`)}>
            {' foi pago?'}
          </Text>
        </Text>
      </View>
      <View style={tailwind('self-center flex-row mb-4 px-8')}>
        <ContainedButton
          color="secondary"
          text="Ainda não"
          onPress={handleClose}
          className="w-1/2 mr-2"
        />
        <ContainedButton
          color="primary"
          text="Sim"
          onPress={handlePayBill}
          className="w-1/2 ml-2"
        />
      </View>
      <View style={tailwind('border-b border-stroke mb-2')} />
      <View style={tailwind('self-center')}>
        <IconButton
          text="Deletar boleto"
          icon="trash-can-outline"
          color="caution"
          onPress={handleDeleteBill}
        />
      </View>
    </RBSheet>
  );
});
