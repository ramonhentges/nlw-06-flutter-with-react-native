import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Header } from '../components';
import { useAuth } from '../contexts/Auth';
import { CreateBill, Extract, Home, Login } from '../screens';
import { useEmptyHeader } from '../themes';

declare global {
  namespace ReactNavigation {
    interface RootParamList {
      Home: void;
      Extract: void;
      CreateBill: void;
    }
  }
}

const Stack = createNativeStackNavigator();
export const Routes = () => {
  const { signed, loading } = useAuth();
  const { headerOptions } = useEmptyHeader();

  if (loading) {
    return null;
  }

  return (
    <Stack.Navigator>
      {signed ? (
        <>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              header: () => <Header />,
            }}
          />
          <Stack.Screen
            name="Extract"
            component={Extract}
            options={{
              header: () => <Header />,
            }}
          />
          <Stack.Screen
            name="CreateBill"
            component={CreateBill}
            options={headerOptions}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ header: () => <></> }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};
