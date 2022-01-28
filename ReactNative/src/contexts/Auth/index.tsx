import React, { useCallback, useContext, useEffect, useState } from 'react';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { User } from '../../entities';
import { googleUserToUser } from '../../converter';
import Config from 'react-native-config';

interface AuthContextProps {
  signed: boolean;
  loading: boolean;
  user: User | null;
  signIn: () => Promise<boolean>;
  signOut: () => void;
}

const AuthContext = React.createContext<AuthContextProps>(
  {} as AuthContextProps,
);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  async function signIn() {
    try {
      await GoogleSignin.hasPlayServices();
      const { idToken, serverAuthCode } = await GoogleSignin.signIn();
      const credential = auth.GoogleAuthProvider.credential(
        idToken,
        serverAuthCode || undefined,
      );
      await auth().signInWithCredential(credential);
      return true;
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
      return false;
    }
  }

  const signOut = useCallback(async () => {
    try {
      await auth().signOut();
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      setUser(null);
    } catch (error) {
      setUser(null);
    }
  }, []);

  const onAuthStateChanged = useCallback(
    (authUser: any) => {
      if (authUser) {
        const convertedUser = googleUserToUser(authUser);
        setUser(convertedUser);
      } else {
        setUser(null);
      }
      if (loading) {
        setLoading(false);
      }
    },
    [loading],
  );

  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['email'], // what API you want to access on behalf of the user, default is email and profile
      webClientId: Config.WEB_CLIENT_ID, // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    });
  }, []);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, [onAuthStateChanged]);

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        loading,
        signIn,
        signOut,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
