import { useContext } from 'react';
import { ResourcesContext, ResourcesState } from '~app/contexts';

const useResources = (): ResourcesState => {
  const result = useContext(ResourcesContext);

  if (!result) {
    throw new Error('Resources provider is not found');
  }

  return result;
};

export default useResources;
