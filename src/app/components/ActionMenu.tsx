import React, { MouseEvent, useState, useCallback } from 'react';
import { IconButton, Menu, MenuItem, Fade, styled, Tooltip } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';

export interface Action {
  label: string;
  onClick: (id: number) => void;
}

export interface ActionMenuProps {
  id: number;
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
    [handleClose, id]
  );

  return (
    <div>
      <Tooltip title="More">
        <StyledButton aria-controls="action-menu" aria-haspopup="true" onClick={handleClick}>
          <MoreVertIcon />
        </StyledButton>
      </Tooltip>

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
