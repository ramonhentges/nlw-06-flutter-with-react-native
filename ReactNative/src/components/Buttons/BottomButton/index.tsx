import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTailwind } from 'tailwind-rn/dist';

export const BottomButton = ({
  icon,
  selected,
  onPress,
}: BottomButtonProps) => {
  const tailwind = useTailwind();

  const getIconName = () => {
    if (selected) {
      return icon;
    }
    return `${icon}-outline`;
  };

  return (
    <TouchableOpacity onPress={onPress} style={tailwind('pt-6 px-3')}>
      <Icon
        style={selected ? tailwind('text-primary') : tailwind('text-body')}
        name={getIconName()}
        size={24}
      />
    </TouchableOpacity>
  );
};

type BottomButtonProps = {
  icon: string;
  selected: boolean;
  onPress: () => void;
};
