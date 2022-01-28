import React, { useMemo } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTailwind } from 'tailwind-rn/dist';
import { TextStyles } from '../../../themes';

export const IconButton = ({
  text,
  color = 'primary',
  onPress,
  className = '',
  icon,
}: IconButtonProps) => {
  const tailwind = useTailwind();

  const textColor = useMemo(() => {
    return {
      primary: TextStyles.buttonPrimary,
      secondary: TextStyles.buttonHeading,
      caution: TextStyles.buttonDelete,
    };
  }, []);

  const iconColor = useMemo(() => {
    return {
      primary: 'text-primary',
      secondary: 'text-secondary',
      caution: 'text-delete',
    };
  }, []);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={tailwind(`flex-row p-4 ${className}`)}>
      <Icon
        style={tailwind(`mr-2 text-primary  ${iconColor[color]}`)}
        name={icon}
        size={24}
      />
      <Text style={tailwind(`ml-2 text-center ${textColor[color]}`)}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

type IconButtonProps = {
  icon: string;
  text: string;
  color?: 'primary' | 'secondary' | 'caution';
  onPress: () => void;
  className?: string;
};
