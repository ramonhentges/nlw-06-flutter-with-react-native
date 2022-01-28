import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useTailwind } from 'tailwind-rn/dist';
import { TextStyles, theme } from '../../themes';

export const LoadingIndicator = ({
  message,
  color = 'primary',
}: LoadingIndicatorProps) => {
  const tailwind = useTailwind();

  return (
    <View style={tailwind('p-4 justify-center items-center')}>
      {message && (
        <Text style={tailwind(`${TextStyles.captionBody} mb-2`)}>
          {message}
        </Text>
      )}
      <ActivityIndicator size={26} color={theme.theme.colors[color]} />
    </View>
  );
};

type LoadingIndicatorProps = {
  message?: string;
  color?: string;
};
