import React, { useState, useEffect, useRef } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { useTranslation } from 'react-i18next';

import {
  User,
  useVerifyUserMutation,
  useUpdateUserInfoMutation
} from '~app/apollo/generated/graphql';
import { AuthContext, AuthActionResult } from './AuthContext';
import { useSnackbar } from '~app/hooks';
import getConfig from '~config/index';

const { firebase: firebaseConfig, app } = getConfig();

export const firebaseApp = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

const actionCodeSettings: firebase.auth.ActionCodeSettings = {
  url: `${app.baseUrl}verify`,
  handleCodeInApp: true
};

const AuthContextProvider: React.FC = ({ children }) => {
  const isInitAuth = useRef(true);

  const [user, setUser] = useState<User | null | undefined>(undefined);

  const { addSnackbar } = useSnackbar();
  const { t } = useTranslation();

  const [verifyUser] = useVerifyUserMutation();
  const [updateUserInfo] = useUpdateUserInfoMutation({
    onCompleted(data) {
      setUser((prevUser) => {
        if (prevUser) {
          return {
            ...prevUser,
            ...data.updateUserInfo
          };
        }

        return prevUser;
      });

      addSnackbar({
        content: t('user:informationSaved')
      });
    },
    onError() {
      addSnackbar({
        content: t('user:errorSaveInformation'),
        error: true
      });
    }
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((newUserState) => {
      isInitAuth.current = false;

      if (newUserState?.email) {
        newUserState.getIdTokenResult().then((idTokenResult) => {
          const admin = !!idTokenResult.claims.admin;

          setUser({
            uid: newUserState.uid,
            email: newUserState.email as string,
            displayName: newUserState.displayName,
            phoneNumber: newUserState.phoneNumber,
            admin
          });
        });

        window.localStorage.setItem('userId', newUserState.uid);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const sendSignInLink = async (email: string): Promise<AuthActionResult> => {
    try {
      const { data } = await verifyUser({ variables: { email } });

      if (data?.verifyUser) {
        const language = window.localStorage.getItem('userLanguage');
        auth.languageCode = language;

        await auth.sendSignInLinkToEmail(email, actionCodeSettings);
        window.localStorage.setItem('emailForSignIn', email);

        return {
          success: true
        };
      }

      return {
        success: false,
        errorMessage: t('login:noAccountError')
      };
    } catch (error) {
      return {
        success: false,
        errorMessage: t('error:general')
      };
    }
  };

  const isSignInWithEmailLink = auth.isSignInWithEmailLink(window.location.href);

  const signIn = async (email: string): Promise<AuthActionResult> => {
    if (isSignInWithEmailLink) {
      try {
        const result = await auth.signInWithEmailLink(email, window.location.href);
        window.localStorage.removeItem('emailForSignIn');

        setUser({
          ...user,
          isNewUser: result.additionalUserInfo?.isNewUser
        } as User);

        return {
          success: true
        };
      } catch (error) {
        return {
          success: false,
          errorMessage: t('error:general')
        };
      }
    }

    return {
      success: false
    };
  };

  const signOut = async (): Promise<AuthActionResult> => {
    try {
      await auth.signOut();
      setUser(null);
      window.localStorage.removeItem('userId');

      return {
        success: true
      };
    } catch (error) {
      return {
        success: false,
        errorMessage: t('error:general')
      };
    }
  };

  const value = {
    user,
    sendSignInLink,
    isSignInWithEmailLink,
    signIn,
    signOut,
    isInitAuth: isInitAuth.current,
    updateUserInfo
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
