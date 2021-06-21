import { createContext } from 'react';

export interface User {
  email: string;
  isNewUser: boolean;
}

export interface AuthState {
  user: User | null | undefined;
  sendSignInLink: (email: string) => Promise<boolean>;
  isSignInWithEmailLink: boolean;
  signIn: (email: string) => Promise<boolean>;
  signOut: () => Promise<boolean>;
  isInitAuth: boolean;
}

const defaultContext = {} as AuthState;

export const AuthContext = createContext<AuthState>(defaultContext);
