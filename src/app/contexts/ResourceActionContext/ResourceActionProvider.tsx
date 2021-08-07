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

  const [remove] = useRemoveResourceMutation({
    onCompleted() {
      addSnackbar({
        content: 'Resource has been removed.'
      });
    },
    onError() {
      addSnackbar({
        content: 'Failed to remove resource. Please try again later.',
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
