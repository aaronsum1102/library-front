import React, { MouseEvent, useState, useCallback } from 'react';
import { IconButton, Menu, MenuItem, Fade, styled } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';

interface Action {
  label: string;
  onClick: (id: string) => void;
}

export interface ActionMenuProps {
  id: string;
  actions: Action[];
}

const StyledButton = styled(IconButton)({
  padding: '0px'
});

export const ActionMenu = ({ id, actions }: ActionMenuProps): JSX.Element => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);

  const handleClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    },
    [setAnchorEl]
  );

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, [setAnchorEl]);

  const handleMenuItemClick = useCallback(
    (onClickHandler: Action['onClick']) => {
      onClickHandler(id);
      handleClose();
    },
    [handleClose]
  );

  return (
    <div>
      <StyledButton aria-controls="action-menu" aria-haspopup="true" onClick={handleClick}>
        <MoreVertIcon />
      </StyledButton>

      <Menu
        id="action-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        {actions.map((action) => (
          <MenuItem key={action.label} onClick={() => handleMenuItemClick(action.onClick)}>
            {action.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};
