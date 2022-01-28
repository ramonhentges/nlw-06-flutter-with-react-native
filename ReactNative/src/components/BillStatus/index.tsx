import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTailwind } from 'tailwind-rn/dist';
import { Bill } from '../../entities';
import { TextStyles } from '../../themes/text-styles';
export const BillStatus = ({ bill, onPress }: BillStatusProps) => {
  const tailwind = useTailwind();

  return (
    <TouchableOpacity onPress={() => onPress && onPress(bill)}>
      <View style={tailwind('flex-row justify-between mb-5')}>
        <View>
          <View style={tailwind('flex-row')}>
            <Text style={tailwind(`${TextStyles.titleListTile}`)}>
              {bill.name}
            </Text>
            {!bill.sended && (
              <Icon
                style={tailwind('text-primary ml-2')}
                name="alert-octagon-outline"
                size={24}
              />
            )}
          </View>
          <Text style={tailwind(`${TextStyles.captionBody}`)}>
            {'Vence em '}
            <Text style={tailwind(`${TextStyles.captionBoldBody}`)}>
              {bill.dueDate.toLocaleDateString('pt-BR')}
            </Text>
          </Text>
        </View>
        <View style={tailwind('justify-self-end')}>
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
                {bill.payDate.toLocaleDateString('pt-BR')}
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
