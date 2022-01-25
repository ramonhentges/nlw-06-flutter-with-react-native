import { useTailwind } from 'tailwind-rn/dist';
import { TextStyles } from '.';

export const useEmptyHeader = () => {
  const tailwind = useTailwind();
  return {
    headerOptions: {
      title: '',
      contentStyle: tailwind('bg-background'),
      headerTitleStyle: tailwind(`${TextStyles.input}`),
      headerShadowVisible: false,
    },
  };
};
