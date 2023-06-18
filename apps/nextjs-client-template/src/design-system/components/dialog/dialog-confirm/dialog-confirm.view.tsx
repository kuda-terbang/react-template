import React, { memo, useContext } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

import DialogBasic from '../dialog-basic';

import {
  ConfirmationPopupStateContext,
  ConfirmationPopupDispatchContext,
} from '../../../utils/confirmation/context';

const ConfirmationPopup = memo(function ConfirmationPopup() {
  const {
    type = 'confirmation',
    isOpen,
    variant = 'success',
    title,
    message,
    textButtonConfirm,
    textButtonCancel,
  } = useContext(ConfirmationPopupStateContext);
  const { closeConfirmation, onCancelConfirmation, onSubmitConfirmation } = useContext(
    ConfirmationPopupDispatchContext
  );

  let usedTextButtonCancel = textButtonCancel;
  let usedTextButtonConfirm = textButtonConfirm;
  let body = <Typography variant="body2">{message}</Typography>;

  if (type === 'alert') {
    const usedIcon =
      variant === 'success' ? (
        <CheckCircleOutlineIcon fontSize="large" color="success" />
      ) : (
        <CancelIcon color="error" fontSize="large" />
      );
    usedTextButtonCancel = '';
    usedTextButtonConfirm = '';

    body = (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <Box>
          <Box sx={{ marginBottom: '12px' }}>{usedIcon}</Box>
          <Typography textAlign="center" variant="body2">
            {message}
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <DialogBasic
      onClose={closeConfirmation}
      isOpen={isOpen}
      maxWidth="xs"
      onClickCancel={onCancelConfirmation}
      onClickSubmit={onSubmitConfirmation}
      textButtonCancel={usedTextButtonCancel}
      textButtonSubmit={usedTextButtonConfirm}
      title={title}
    >
      {body}
    </DialogBasic>
  );
});

export default ConfirmationPopup;
