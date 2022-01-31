import React, { useCallback, useEffect, useState } from 'react';
import { Animated, LayoutChangeEvent } from 'react-native';
import { useTailwind } from 'tailwind-rn/dist';

export const LeftRightView = ({
  children,
  className = '',
  direction = 'right',
}: LeftToRightViewProps) => {
  const [anim, setAnim] = useState<Animated.Value | undefined>();
  const tailwind = useTailwind();

  useEffect(() => {
    anim &&
      Animated.timing(anim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: false,
      }).start();
  }, [anim]);

  const getWidth = useCallback(
    (event: LayoutChangeEvent) => {
      if (!anim) {
        const { width } = event.nativeEvent.layout;
        if (direction === 'right') {
          setAnim(new Animated.Value(-width));
        } else {
          setAnim(new Animated.Value(width));
        }
      }
    },
    [anim, direction],
  );

  return (
    <Animated.View
      onLayout={getWidth}
      style={{ ...tailwind(className), left: anim }}>
      {children}
    </Animated.View>
  );
};

type LeftToRightViewProps = {
  children: React.ReactNode;
  className?: string;
  direction?: 'left' | 'right';
};
