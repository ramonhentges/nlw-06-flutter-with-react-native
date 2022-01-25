import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { TailwindProvider } from 'tailwind-rn';
import { AuthProvider } from './src/contexts';
import { Routes } from './src/routes/routes';
import utilities from './tailwind.json';

const App = () => {
  return (
    <NavigationContainer>
      <TailwindProvider utilities={utilities}>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </TailwindProvider>
    </NavigationContainer>
  );
};

export default App;
