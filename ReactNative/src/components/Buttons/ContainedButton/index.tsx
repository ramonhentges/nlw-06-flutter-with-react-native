import React, { useMemo } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { useTailwind } from 'tailwind-rn/dist';
import { TextStyles } from '../../../themes';

export const ContainedButton = ({
  text,
  color,
  onPress,
  className,
}: ContainedButtonProps) => {
  const tailwind = useTailwind();

  const textColor = useMemo(() => {
    return {
      primary: TextStyles.buttonBackground,
      secondary: TextStyles.buttonGray,
    };
  }, []);

  const background = useMemo(() => {
    return {
      primary: 'bg-primary',
      secondary: 'bg-shape border border-stroke',
    };
  }, []);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={tailwind(
        `rounded-md p-4 ${background[color]} ${className || ''}`,
      )}>
      <Text style={tailwind(`text-center ${textColor[color]}`)}>{text}</Text>
    </TouchableOpacity>
  );
};

type ContainedButtonProps = {
  text: string;
  color: 'primary' | 'secondary';
  onPress: () => void;
  className?: string;
};
