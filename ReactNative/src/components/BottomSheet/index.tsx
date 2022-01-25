import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTailwind } from 'tailwind-rn/dist';
import { BottomButton } from '..';

export const BottomSheet = () => {
  const tailwind = useTailwind();
  const navigation = useNavigation();
  const route = useRoute();
  return (
    <View
      style={tailwind(
        'absolute bottom-0 pb-6 pt-4 bg-background w-full flex-row justify-evenly items-end',
      )}>
      <BottomButton
        selected={route.name === 'Home'}
        icon="home-minus"
        onPress={() => {
          navigation.navigate('Home');
        }}
      />
      <TouchableOpacity
        style={tailwind('bg-primary rounded p-3')}
        onPress={() => {
          navigation.navigate('CreateBill');
        }}>
        <Icon
          style={tailwind('text-background')}
          name="plus-box-outline"
          size={24}
        />
      </TouchableOpacity>
      <BottomButton
        selected={route.name === 'Extract'}
        icon="text-box"
        onPress={() => {
          navigation.navigate('Extract');
        }}
      />
    </View>
  );
};
