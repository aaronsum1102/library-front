import { createContext } from 'react';
import firebase from 'firebase/app';

export interface AuthState {
  user: firebase.User | null;
  sendSignInLink: (email: string) => Promise<void>;
  isSignInWithEmailLink: boolean;
  signIn: (email: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const defaultContext = {} as AuthState;

export const AuthContext = createContext<AuthState>(defaultContext);
