import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useTailwind } from 'tailwind-rn';
import { GoogleSignIn, StatusBar } from '../../components';
import { LogoMini, Person } from '../../images';
import { TextStyles } from '../../themes/text-styles';

export const Login = () => {
  const tailwind = useTailwind();
  return (
    <>
      <StatusBar />
      <View style={tailwind('bg-background h-full')}>
        <View style={tailwind('bg-primary h-1/3')} />
        <View style={tailwind('absolute h-72 inset-x-1/4 inset-y-10 ')}>
          <Image
            style={{
              ...tailwind('h-72'),
              ...styles.image,
            }}
            source={Person}
          />
          <LinearGradient
            colors={['rgba(0,0,0,0.0)', '#FFFFFF']}
            style={styles.linearGradient}
          />
        </View>
        <View style={tailwind('inset-y-36 w-2/3 flex self-center')}>
          <Image style={tailwind('self-center mb-2')} source={LogoMini} />
          <Text style={tailwind(`${TextStyles.titleHome} text-center mb-4`)}>
            Organize seus boletos em um só lugar
          </Text>
          <GoogleSignIn />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  image: { resizeMode: 'contain' },
  linearGradient: {
    position: 'absolute',
    top: '70%',
    width: '100%',
    height: '30%',
  },
});
