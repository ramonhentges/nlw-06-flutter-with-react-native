import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useTailwind } from 'tailwind-rn/dist';
import { Bill } from '../../entities';
import { TextStyles } from '../../themes/text-styles';
export const BillStatus = ({ bill, onPress }: BillStatusProps) => {
  const tailwind = useTailwind();

  return (
    <TouchableOpacity onPress={() => onPress && onPress(bill)}>
      <View style={tailwind('flex-row justify-between mb-5')}>
        <View>
          <Text style={tailwind(`${TextStyles.titleListTile}`)}>
            {bill.name}
          </Text>
          <Text style={tailwind(`${TextStyles.captionBody}`)}>
            {'Vence em '}
            <Text style={tailwind(`${TextStyles.captionBoldBody}`)}>
              {bill.dueDate.toLocaleDateString()}
            </Text>
          </Text>
        </View>
        <View style={tailwind('items-end')}>
          <Text style={tailwind(`${TextStyles.trailingRegular}`)}>
            {'R$ '}
            <Text style={tailwind(`${TextStyles.trailingBold}`)}>
              {bill.formatedValue()}
            </Text>
          </Text>
          {bill.payDate && (
            <Text style={tailwind(`${TextStyles.captionBody}`)}>
              {'Pago em '}
              <Text style={tailwind(`${TextStyles.captionBoldBody}`)}>
                {bill.payDate.toLocaleDateString()}
              </Text>
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

type BillStatusProps = {
  bill: Bill;
  onPress?: (bill: Bill) => void;
};
