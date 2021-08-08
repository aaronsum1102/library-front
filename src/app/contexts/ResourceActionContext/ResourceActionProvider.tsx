import React from 'react';

import {
  useBorrowResourceMutation,
  useAddResourceMutation,
  useRemoveResourceMutation
} from '~app/apollo/generated/graphql';
import { useSnackbar } from '~app/hooks';
import { ResourceActionContext } from '.';

const ResourceActionProvider: React.FC = ({ children }) => {
  const { addSnackbar } = useSnackbar();

  const [borrow] = useBorrowResourceMutation({
    onCompleted() {
      addSnackbar({
        content: 'Material has been checked out.'
      });
    },
    onError(error) {
      if (error.message === 'RESOURCE_UNAVAILABLE') {
        addSnackbar({
          content: 'The material is unavailable.',
          error: true
        });
      } else {
        addSnackbar({
          content: 'Failed to borrow material. Please try again later.',
          error: true
        });
      }
    }
  });

  const [add] = useAddResourceMutation({
    onCompleted() {
      addSnackbar({
        content: 'Material has been added.'
      });
    },
    onError() {
      addSnackbar({
        content: 'Failed to add material. Please try again later.',
        error: true
      });
    }
  });

  const [remove] = useRemoveResourceMutation({
    onCompleted() {
      addSnackbar({
        content: 'Material has been removed.'
      });
    },
    onError() {
      addSnackbar({
        content: 'Failed to remove material. Please try again later.',
        error: true
      });
    }
  });

  return (
    <ResourceActionContext.Provider value={{ borrow, add, remove }}>
      {children}
    </ResourceActionContext.Provider>
  );
};

export default ResourceActionProvider;
