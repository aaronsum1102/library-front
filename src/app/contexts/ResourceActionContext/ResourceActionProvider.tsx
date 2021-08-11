import React from 'react';
import { useTranslation } from 'react-i18next';

import {
  useBorrowResourceMutation,
  useAddResourceMutation,
  useRemoveResourceMutation
} from '~app/apollo/generated/graphql';
import { useSnackbar } from '~app/hooks';
import { ResourceActionContext } from '.';

const ResourceActionProvider: React.FC = ({ children }) => {
  const { addSnackbar } = useSnackbar();
  const { t } = useTranslation();

  const [borrow] = useBorrowResourceMutation({
    onCompleted() {
      addSnackbar({
        content: t('material:borrowSuccessMessage')
      });
    },
    onError(error) {
      addSnackbar({
        content:
          error.message === 'RESOURCE_UNAVAILABLE'
            ? t('material:materialUnavailable')
            : t('material:borrowFailureMessage'),
        error: true
      });
    }
  });

  const [add] = useAddResourceMutation({
    onCompleted() {
      addSnackbar({
        content: t('material:addSuccessMessage')
      });
    },
    onError() {
      addSnackbar({
        content: t('material:addFailureMessage'),
        error: true
      });
    }
  });

  const [remove] = useRemoveResourceMutation({
    onCompleted() {
      addSnackbar({
        content: t('material:removeSuccessMessage')
      });
    },
    onError() {
      addSnackbar({
        content: t('material:removeFailureMessage'),
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
