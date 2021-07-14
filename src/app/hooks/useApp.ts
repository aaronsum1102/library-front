import { useContext } from 'react';
import { AppState, AppContext } from '~app/contexts';

const useApp = (): AppState => {
  const state = useContext(AppContext);

  if (!state) {
    throw new Error('AppContext is not provided');
  }

  return state;
};

export default useApp;
