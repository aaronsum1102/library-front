import { useContext } from 'react';
import { UserContext, UserState } from '~app/contexts';

const useUser = (): UserState => {
  const result = useContext(UserContext);

  if (!result) {
    throw new Error('User context provider is not found');
  }

  return result;
};

export default useUser;
