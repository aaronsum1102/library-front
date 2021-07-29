import { createContext } from 'react';

export interface User {
  email: string;
  isNewUser: boolean;
}

export interface AuthActionResult {
  success: boolean;
  errorMessage?: string;
}

export interface AuthState {
  user: User | null | undefined;
  sendSignInLink: (email: string) => Promise<AuthActionResult>;
  isSignInWithEmailLink: boolean;
  signIn: (email: string) => Promise<AuthActionResult>;
  signOut: () => Promise<AuthActionResult>;
  isInitAuth: boolean;
}

const defaultContext = {} as AuthState;

export const AuthContext = createContext<AuthState>(defaultContext);
