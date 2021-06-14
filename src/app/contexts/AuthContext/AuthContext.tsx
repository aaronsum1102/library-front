import { createContext } from 'react';
import firebase from 'firebase/app';

export interface AuthState {
  user: firebase.User | null | undefined;
  sendSignInLink: (email: string) => Promise<void>;
  isSignInWithEmailLink: boolean;
  signIn: (email: string) => Promise<boolean>;
  signOut: () => Promise<void>;
  isInitAuth: boolean;
}

const defaultContext = {} as AuthState;

export const AuthContext = createContext<AuthState>(defaultContext);
