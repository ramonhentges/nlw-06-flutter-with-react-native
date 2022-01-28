import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { useTailwind } from 'tailwind-rn/dist';
import { TextStyles } from '../../../themes';

export const OutlinedButton = ({
  text,
  color = 'primary',
  onPress,
  className = '',
}: OutlindedButtonProps) => {
  const tailwind = useTailwind();

  const buttonColor = {
    primary: TextStyles.buttonPrimary,
    secondary: TextStyles.buttonHeading,
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={tailwind(`border border-stroke p-4 bg-background ${className}`)}>
      <Text style={tailwind(`text-center ${buttonColor[color]}`)}>{text}</Text>
    </TouchableOpacity>
  );
};

type OutlindedButtonProps = {
  text: string;
  color?: 'primary' | 'secondary';
  onPress: () => void;
  className?: string;
};
