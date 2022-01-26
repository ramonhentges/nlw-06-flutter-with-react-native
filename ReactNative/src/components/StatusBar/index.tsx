import React, { useMemo } from 'react';
import { StatusBar as StatusBarNative, StatusBarStyle } from 'react-native';
import { theme } from '../../themes';

export const StatusBar = ({ color = 'primary' }: StatusBarProps) => {
  const barStyle = useMemo(() => {
    return {
      primary: 'light-content' as StatusBarStyle,
      background: 'dark-content' as StatusBarStyle,
    };
  }, []);

  return (
    <StatusBarNative
      barStyle={barStyle[color]}
      backgroundColor={theme.theme.colors[color]}
    />
  );
};

type StatusBarProps = {
  color?: 'primary' | 'background';
};
