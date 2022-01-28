import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useTailwind } from 'tailwind-rn/dist';
import {
  BillStatus,
  BottomSheet,
  LoadingIndicator,
  StatusBar,
} from '../../components';
import { useBillStore } from '../../stores';
import { TextStyles } from '../../themes/text-styles';

export const Extract = () => {
  const tailwind = useTailwind();
  const { paidBills, loading } = useBillStore();

  return (
    <>
      <StatusBar />
      <View style={tailwind('bg-background h-full')}>
        {loading ? (
          <LoadingIndicator message="Carregando dados" />
        ) : (
          <View style={tailwind('px-6 mt-5')}>
            <View style={tailwind('flex-row justify-between items-center')}>
              <Text style={tailwind(`${TextStyles.titleBoldHeading}`)}>
                Meus extratos
              </Text>
              <Text style={tailwind(`${TextStyles.captionBody}`)}>
                {`${paidBills.length} pagos`}
              </Text>
            </View>
            <View style={tailwind('border-t border-stroke my-5')} />
            <ScrollView
              style={tailwind('h-3/4')}
              contentContainerStyle={tailwind('pb-6')}>
              {paidBills.map((item, idx) => (
                <BillStatus key={idx} bill={item} />
              ))}
            </ScrollView>
          </View>
        )}
      </View>
      <BottomSheet />
    </>
  );
};
