import React, { useCallback, useState } from 'react';
import {
  NativeSyntheticEvent,
  TextInput,
  TextInputFocusEventData,
  TextInputProps,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTailwind } from 'tailwind-rn/dist';
import { TextStyles, theme } from '../../../themes';

export const TextField = ({
  startIcon,
  className,
  onFocus,
  onBlur,
  ...rest
}: TextFieldProps) => {
  const tailwind = useTailwind();
  const [isActive, setIsActive] = useState(false);

  const handleFocus = useCallback(
    (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setIsActive(true);
      onFocus && onFocus(e);
    },
    [onFocus],
  );

  const handleBlur = useCallback(
    (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setIsActive(false);
      onBlur && onBlur(e);
    },
    [onBlur],
  );

  return (
    <View
      style={tailwind(
        'flex-row items-center border-b border-stroke ' + (className || ''),
      )}>
      {startIcon && (
        <Icon
          style={
            isActive
              ? tailwind('text-primary px-3')
              : tailwind('text-body px-3 ')
          }
          name={startIcon}
          size={24}
        />
      )}
      <View
        style={tailwind(
          `${TextStyles.input} pl-3 border-l border-stroke grow shrink`,
        )}>
        <TextInput
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={tailwind(`${TextStyles.input} pl-3`)}
          placeholderTextColor={theme.theme.colors.input}
          {...rest}
        />
      </View>
    </View>
  );
};

interface TextFieldProps extends TextInputProps {
  startIcon?: string;
  className?: string;
  prefix?: string;
}
