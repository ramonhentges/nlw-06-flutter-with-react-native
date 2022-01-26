import React, { useMemo } from 'react';
import { Text } from 'react-native';
import { useTailwind } from 'tailwind-rn/dist';
import { TextStyles } from '../../themes';

export const HelperText = ({
  text = '',
  error = false,
  className = '',
}: HelperTextProps) => {
  const tailwind = useTailwind();

  const textColor = useMemo(
    () => (error ? 'text-delete' : 'text-heading'),
    [error],
  );
  return (
    <Text
      style={tailwind(`${TextStyles.captionBody} ${textColor} ${className}`)}>
      {text}
    </Text>
  );
};

type HelperTextProps = {
  text?: string | false;
  error?: boolean;
  className?: string;
};
