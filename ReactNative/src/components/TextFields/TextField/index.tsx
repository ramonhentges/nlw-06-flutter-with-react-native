import React, { useCallback, useMemo, useState } from 'react';
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
  error = false,
  ...rest
}: TextFieldProps) => {
  const tailwind = useTailwind();
  const [isActive, setIsActive] = useState(false);

  const handleFocus = useCallback(
    (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setIsActive(true);
      onFocus?.(e);
    },
    [onFocus],
  );

  const handleBlur = useCallback(
    (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setIsActive(false);
      onBlur?.(e);
    },
    [onBlur],
  );

  const borderColor = useMemo(
    () => (error ? 'border-delete' : 'border-stroke'),
    [error],
  );

  const iconStyle = useMemo(
    () =>
      error
        ? tailwind('text-delete px-3')
        : isActive
        ? tailwind('text-primary px-3')
        : tailwind('text-body px-3 '),
    [error, isActive, tailwind],
  );

  return (
    <View
      style={tailwind(
        `flex-row items-center border-b ${borderColor} ${className || ''}`,
      )}>
      {startIcon && <Icon style={iconStyle} name={startIcon} size={24} />}
      <View
        style={tailwind(
          `${TextStyles.input} pl-3 border-l ${borderColor} grow shrink`,
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
  error?: boolean;
}
