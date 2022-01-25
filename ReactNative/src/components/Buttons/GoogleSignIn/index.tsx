import React from 'react';
import { TouchableOpacity, Image, View, Text } from 'react-native';
import { useTailwind } from 'tailwind-rn/dist';
import { useAuth } from '../../../contexts/Auth';
import { Google } from '../../../images';
import { TextStyles } from '../../../themes/text-styles';

export const GoogleSignIn = () => {
  const tailwind = useTailwind();
  const { signIn } = useAuth();

  return (
    <TouchableOpacity
      onPress={signIn}
      style={tailwind(
        'flex flex-row bg-shape rounded-md border border-stroke p-3',
      )}>
      <Image source={Google} />
      <View style={tailwind('mx-3 -my-3 border-r border-stroke')} />
      <Text style={tailwind(`${TextStyles.buttonGray} grow text-center`)}>
        Entrar com Google
      </Text>
    </TouchableOpacity>
  );
};
