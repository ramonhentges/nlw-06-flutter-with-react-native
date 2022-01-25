import React from 'react';
import { Image, Text, View } from 'react-native';
import { useTailwind } from 'tailwind-rn/dist';
import { LogoMini } from '../../images';
import { TextStyles } from '../../themes/text-styles';

export const ToPayInfo = ({ quantity }: ToPayProps) => {
  const tailwind = useTailwind();
  return (
    <View>
      <View style={tailwind('absolute bg-primary h-1/2 w-full')} />
      <View
        style={tailwind(
          'bg-secondary self-center w-3/4 px-5 py-6 rounded-md flex-row',
        )}>
        <View style={tailwind('mr-5 self-center')}>
          <Image source={LogoMini} />
        </View>
        <View style={tailwind('border-l border-stroke')} />
        <View style={tailwind('ml-5 break-normal shrink self-center')}>
          <Text style={tailwind(`${TextStyles.captionShape}`)}>
            {'Você tem '}
            <Text style={tailwind(`${TextStyles.captionBoldShape}`)}>
              {`${quantity} boletos `}
            </Text>
            {'cadastrados para pagar'}
          </Text>
        </View>
      </View>
    </View>
  );
};

type ToPayProps = {
  quantity: number;
};
