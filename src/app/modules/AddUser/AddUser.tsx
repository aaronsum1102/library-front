import React, { useState } from 'react';
import { TextField, DialogContentText, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import {
  FormDialog,
  Dropdown,
  DropdownOption,
  Spacer,
  Spacings,
  Orientations
} from '~app/components';

const options: DropdownOption<boolean>[] = [
  {
    label: 'Normal User',
    value: false
  },
  {
    label: 'Admin',
    value: true
  }
];

const AddUser = (): JSX.Element => {
  const [admin, setAdmin] = useState(false);

  return (
    <FormDialog
      title="Add user"
      label={
        <>
          Add user <Spacer orientation={Orientations.vertical} space={Spacings.small} />
          <AddIcon />
        </>
      }
      content={
        <>
          <DialogContentText>
            Please enter the email address of a new user and select user type
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
          />
          <Spacer space={Spacings.large} />
          <Dropdown
            id="user-type"
            label="User type"
            value={admin}
            options={options}
            onChange={setAdmin}
          />
          <Spacer space={Spacings.xLarge} />
        </>
      }
      action={(onClose) => (
        <Button onClick={onClose} color="primary" variant="contained">
          Add
        </Button>
      )}
    />
  );
};

export default AddUser;
