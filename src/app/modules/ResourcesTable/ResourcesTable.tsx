import React, { useCallback, useMemo, useState, useRef } from 'react';
import { Box, Typography } from '@material-ui/core';

import { ResourceTableData, ResourceData } from '~app/contexts';
import { useResources, useResourceAction, useAuth } from '~app/hooks';
import { DataTabel, DataTabelProps, Loader } from '~app/components';
import UserInfoForm from '../UserInfoForm';

const fields: Array<keyof ResourceTableData> = ['title', 'ebook', 'available', 'availableFrom'];

const headDetails: DataTabelProps<ResourceTableData>['headDetails'] = {
  title: {
    label: 'Title',
    sortable: true,
    width: '40%'
  },
  ebook: {
    label: 'Material type'
  },
  available: {
    label: 'Available'
  },
  availableFrom: {
    label: 'Available from',
    sortable: true
  }
};

const borrowActionLabel = 'Borrow';
const removeActionLabel = 'Remove';

const ResourcesTable = (): JSX.Element => {
  const materialToCheckout = useRef<ResourceData | null>(null);

  const { resources, loading, error, order, orderBy, onRequestSort, refetchResources } =
    useResources();
  const { borrow, remove } = useResourceAction();
  const { user } = useAuth();

  const [open, setOpen] = useState(false);

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
    const defaultAction = [{ label: borrowActionLabel, onClick: onRequestBorrow }];

    if (user?.admin) {
      return [
        {
          label: removeActionLabel,
          onClick: onRequestRemove
        },
        ...defaultAction
      ];
    }
    return defaultAction;
  }, [user, onRequestBorrow, onRequestRemove]);

  const items = resources.map((item) => ({
    title: item.title,
    ebook: item.ebook ? 'eBook' : 'book',
    available: item.available ? 'Yes' : 'No',
    availableFrom: item.availableFrom
  }));

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

          {!loading && error && (
            <Typography>Failed to load resources. Please try again later.</Typography>
          )}

          {!loading && !error && items.length === 0 && (
            <Typography>No resources availiable</Typography>
          )}
        </Box>
      </Box>
      <UserInfoForm
        open={open}
        handleClose={() => setOpen(false)}
        onSubmitCallback={userInfoUpdated}
        helperText="Please provider your name and contact number."
      />
    </>
  );
};

export default ResourcesTable;
