import React, { useCallback, useMemo, useState, useRef } from 'react';
import { Box, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import { ResourceTableData, ResourceData } from '~app/contexts';
import { useResources, useResourceAction, useAuth } from '~app/hooks';
import { DataTabel, DataTabelProps, Loader } from '~app/components';
import UserInfoForm from '../UserInfoForm';

const fields: Array<keyof ResourceTableData> = [
  'title',
  'ebook',
  'available',
  'availableFrom',
  'borrowerPhoneNumber'
];

const ResourcesTable = (): JSX.Element => {
  const materialToCheckout = useRef<ResourceData | null>(null);

  const { resources, loading, error, order, orderBy, onRequestSort, refetchResources } =
    useResources();
  const { borrow, remove } = useResourceAction();
  const { user } = useAuth();

  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  const headDetails: DataTabelProps<ResourceTableData>['headDetails'] = {
    title: {
      label: t('general:title'),
      sortable: true,
      width: '35%'
    },
    ebook: {
      label: t('general:materialType')
    },
    available: {
      label: t('general:available')
    },
    availableFrom: {
      label: t('material:availableFrom'),
      sortable: true
    },
    borrowerPhoneNumber: {
      label: t('material:borrowerPhoneNumber'),
      hide: true
    }
  };

  const onRequestBorrow = useCallback(
    async (id: number) => {
      if (user) {
        const material = resources[id];
        materialToCheckout.current = material;
        const { title, createdDate, ebook } = materialToCheckout.current;

        if (!user.displayName || !user.phoneNumber) {
          setOpen(true);
          return;
        }

        await borrow({
          variables: {
            input: {
              title,
              createdDate,
              ebook,
              available: false,
              borrowerId: user.uid,
              borrower: {
                name: user.displayName,
                phoneNumber: user.phoneNumber
              }
            }
          }
        });

        materialToCheckout.current = null;

        await refetchResources();
      }
    },
    [resources, borrow, user, refetchResources]
  );

  const userInfoUpdated = useCallback(
    async (name: string, phoneNumber: string) => {
      if (user && materialToCheckout.current) {
        setOpen(false);

        const { title, createdDate, ebook } = materialToCheckout.current;

        await borrow({
          variables: {
            input: {
              title,
              createdDate,
              ebook,
              available: false,
              borrowerId: user.uid,
              borrower: {
                name,
                phoneNumber
              }
            }
          }
        });

        materialToCheckout.current = null;
        await refetchResources();
      }
    },
    [borrow, user, refetchResources]
  );

  const onRequestRemove = useCallback(
    async (id: number) => {
      const { title, createdDate } = resources[id];

      await remove({
        variables: {
          input: {
            title,
            createdDate
          }
        }
      });

      await refetchResources();
    },
    [resources, remove, refetchResources]
  );

  const actions = useMemo(() => {
    const defaultAction = [{ label: t('material:borrow'), onClick: onRequestBorrow }];

    if (user?.admin) {
      return [
        {
          label: t('material:remove'),
          onClick: onRequestRemove
        },
        ...defaultAction
      ];
    }
    return defaultAction;
  }, [user, onRequestBorrow, onRequestRemove]);

  const items = resources.map((item) => ({
    title: item.title,
    ebook: item.ebook ? t('general:eBook') : t('general:book'),
    available: item.available ? t('general:yes') : t('general:no'),
    availableFrom: item.availableFrom,
    borrowerPhoneNumber: item.borrower?.phoneNumber || '-'
  }));

  if (user?.admin) {
    headDetails.borrowerPhoneNumber.hide = false;
  }

  return (
    <>
      <Box>
        <DataTabel
          fields={fields}
          headDetails={headDetails}
          items={items}
          actions={actions}
          order={order}
          orderBy={orderBy}
          onRequestSort={onRequestSort}
        />

        <Box padding="1rem">
          {loading && <Loader />}

          {!loading && error && <Typography>{t('material:loadMaterialsError')}</Typography>}

          {!loading && !error && items.length === 0 && (
            <Typography>{t('material:noMaterials')}</Typography>
          )}
        </Box>
      </Box>
      <UserInfoForm
        open={open}
        handleClose={() => setOpen(false)}
        onSubmitCallback={userInfoUpdated}
        helperText={t('material:userInfoText')}
      />
    </>
  );
};

export default ResourcesTable;
