import React from 'react';

import { useBorrowResourceMutation } from '~app/apollo/generated/graphql';
import { useSnackbar } from '~app/hooks';
import { ResourceActionContext } from '.';

const ResourceActionProvider: React.FC = ({ children }) => {
  const { addSnackbar } = useSnackbar();

  const [borrow] = useBorrowResourceMutation({
    onCompleted() {
      addSnackbar({
        content: 'Resource has been checked out.'
      });
    },
    onError() {
      addSnackbar({
        content: 'Failed to borrow resource. Please try again later.',
        error: true
      });
    }
  });

  return (
    <ResourceActionContext.Provider value={{ borrow }}>{children}</ResourceActionContext.Provider>
  );
};

export default ResourceActionProvider;
