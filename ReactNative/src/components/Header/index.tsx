import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useTailwind } from 'tailwind-rn/dist';
import { useAuth } from '../../contexts';
import { TextStyles } from '../../themes/text-styles';

export const Header = () => {
  const tailwind = useTailwind();
  const { user, signOut } = useAuth();

  return (
    <View style={tailwind('bg-primary px-4 py-6')}>
      <View style={tailwind('flex-row justify-between items-center')}>
        <View>
          <Text style={tailwind(`${TextStyles.titleLight}`)}>
            {'Olá, '}
            <Text style={tailwind(`${TextStyles.titleRegular}`)}>
              {user?.fullName}
            </Text>
          </Text>
          <Text style={tailwind(`${TextStyles.captionBackground}`)}>
            Mantenha suas contas em dia
          </Text>
        </View>
        <TouchableOpacity onPress={signOut}>
          <View>
            <Image
              style={tailwind('rounded-md')}
              width={60}
              height={60}
              source={{ uri: user?.photoUrl }}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
