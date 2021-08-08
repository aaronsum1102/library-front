import { useContext } from 'react';
import { ResourceAction, ResourceActionContext } from '~app/contexts';

const useResourceAction = (): ResourceAction => {
  const result = useContext(ResourceActionContext);

  if (!result) {
    throw new Error('Resource action context provider is not found');
  }

  return result;
};

export default useResourceAction;
