import { useContext } from 'react';
import { AuthState, AuthContext } from '~app/contexts/AuthContext';

export const useAuth = (): AuthState => {
  return useContext(AuthContext);
};
