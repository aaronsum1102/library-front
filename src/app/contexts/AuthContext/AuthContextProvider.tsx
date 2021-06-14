import React, { useState, useEffect, useRef } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import { AuthContext } from './AuthContext';
import getConfig from '~config/index';

const { firebase: firebaseConfig, app } = getConfig();

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

const actionCodeSettings: firebase.auth.ActionCodeSettings = {
  url: app.baseUrl + 'verify',
  handleCodeInApp: true
};

export const AuthContextProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<firebase.User | null | undefined>(undefined);
  const isInitAuth = useRef(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      isInitAuth.current = false;
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleError = (error: firebase.auth.Error) => {
    console.log('Error', error);
  };

  const sendSignInLink = async (email: string) => {
    try {
      await auth.sendSignInLinkToEmail(email, actionCodeSettings);
      window.localStorage.setItem('emailForSignIn', email);
    } catch (error: unknown) {
      handleError(error as firebase.auth.Error);
    }
  };

  const isSignInWithEmailLink = auth.isSignInWithEmailLink(window.location.href);

  const signIn = async (email: string): Promise<boolean> => {
    if (isSignInWithEmailLink) {
      try {
        const result = await auth.signInWithEmailLink(email, window.location.href);
        window.localStorage.removeItem('emailForSignIn');
        // result.additionalUserInfo?.isNewUser
        console.log('check', result);
        return true;
      } catch (error) {
        handleError(error as firebase.auth.Error);
      }
    }
    return false;
  };

  const signOut = async () => {
    try {
      await auth.signOut();
      setUser(null);
    } catch (error) {
      handleError(error as firebase.auth.Error);
    }
  };

  const value = {
    user,
    sendSignInLink,
    isSignInWithEmailLink,
    signIn,
    signOut,
    isInitAuth: isInitAuth.current
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
