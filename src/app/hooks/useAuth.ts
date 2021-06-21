import { useContext } from 'react';
import { AuthState, AuthContext } from '~app/contexts/AuthContext';

const useAuth = (): AuthState => {
  return useContext(AuthContext);
};

export default useAuth;
