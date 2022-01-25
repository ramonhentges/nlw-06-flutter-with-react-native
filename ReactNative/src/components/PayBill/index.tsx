import React, {
  ForwardedRef,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { Button, Text, View } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import { useTailwind } from 'tailwind-rn/dist';
import { ContainedButton } from '..';
import { Bill } from '../../entities';
import { useBillStore } from '../../stores';
import { TextStyles } from '../../themes';

export const PayBill = forwardRef((props, ref: ForwardedRef<unknown>) => {
  const refRBSheet = useRef<any>();
  const { payBill } = useBillStore();
  const tailwind = useTailwind();
  const [currentBill, setCurrentBill] = useState<Bill | undefined>();

  const handleOpen = useCallback(
    (bill: Bill) => {
      setCurrentBill(bill);
      refRBSheet.current.open();
    },
    [refRBSheet],
  );

  useImperativeHandle(ref, () => {
    return {
      handlePayBill: handleOpen,
    };
  });

  return (
    <RBSheet ref={refRBSheet} closeOnDragDown={true} closeOnPressMask={false}>
      <View style={tailwind('w-3/5 self-center mb-4')}>
        <Text style={tailwind(`${TextStyles.titleBoldHeading} text-center`)}>
          {`O boleto ${currentBill?.name} no valor de R$ ${currentBill?.value
            .toString()
            .replace('.', ',')} foi pago?`}
        </Text>
      </View>
      <View style={tailwind('self-center flex-row mb-4 px-8')}>
        <ContainedButton
          color="secondary"
          text="Ainda não"
          onPress={() => {}}
          className="w-1/2 mr-2"
        />
        <ContainedButton
          color="primary"
          text="Sim"
          onPress={() => {}}
          className="w-1/2 ml-2"
        />
      </View>
      <View style={tailwind('border-b border-stroke')} />
    </RBSheet>
  );
});
