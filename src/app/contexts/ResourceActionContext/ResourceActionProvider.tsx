import React from 'react';

import { useBorrowResourceMutation, useAddResourceMutation } from '~app/apollo/generated/graphql';
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

  const [add] = useAddResourceMutation({
    onCompleted() {
      addSnackbar({
        content: 'Resource has been added.'
      });
    },
    onError() {
      addSnackbar({
        content: 'Failed to add resource. Please try again later.',
        error: true
      });
    }
  });

  return (
    <ResourceActionContext.Provider value={{ borrow, add }}>
      {children}
    </ResourceActionContext.Provider>
  );
};

export default ResourceActionProvider;
