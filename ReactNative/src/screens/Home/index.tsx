import React, { useRef } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useTailwind } from 'tailwind-rn/dist';
import { BillStatus, BottomSheet, PayBill, ToPayInfo } from '../../components';
import { useBillStore } from '../../stores';
import { TextStyles } from '../../themes/text-styles';

export const Home = () => {
  const tailwind = useTailwind();
  const payBillRef = useRef<any>();
  const { unpaidBills } = useBillStore();
  return (
    <>
      <View style={tailwind('bg-background h-full')}>
        <ToPayInfo quantity={14} />
        <View style={tailwind('px-6 mt-5')}>
          <Text style={tailwind(`${TextStyles.titleBoldHeading}`)}>
            Meus boletos
          </Text>
          <View style={tailwind('border-t border-stroke my-5')} />
          <ScrollView
            style={tailwind('h-1/2')}
            contentContainerStyle={tailwind('pb-6')}>
            {unpaidBills.map(item => (
              <BillStatus
                key={item.id}
                bill={item}
                onPress={payBillRef.current?.handlePayBill}
              />
            ))}
          </ScrollView>
        </View>
      </View>
      <PayBill ref={payBillRef} />
      <BottomSheet />
    </>
  );
};
