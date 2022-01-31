import React, { useRef } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useTailwind } from 'tailwind-rn/dist';
import {
  BillStatus,
  BottomSheet,
  LeftRightView,
  LoadingIndicator,
  PayBill,
  StatusBar,
  ToPayInfo,
} from '../../components';
import { useBillStore } from '../../stores';
import { TextStyles } from '../../themes/text-styles';

export const Home = () => {
  const tailwind = useTailwind();
  const payBillRef = useRef<any>();
  const { unpaidBills, loading } = useBillStore();
  return (
    <>
      <StatusBar />
      <View style={tailwind('bg-background h-full')}>
        {loading ? (
          <LoadingIndicator message="Carregando dados" />
        ) : (
          <>
            <ToPayInfo quantity={unpaidBills.length} />
            <LeftRightView className={'px-6 mt-5'}>
              <Text style={tailwind(`${TextStyles.titleBoldHeading}`)}>
                Meus boletos
              </Text>
              <View style={tailwind('border-t border-stroke my-5')} />
              {unpaidBills.length > 0 ? (
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
              ) : (
                <Text style={tailwind(`${TextStyles.trailingRegular}`)}>
                  Não há boletos cadastrados para pagar :D
                </Text>
              )}
            </LeftRightView>
          </>
        )}
        <PayBill ref={payBillRef} />
      </View>
      <BottomSheet />
    </>
  );
};
