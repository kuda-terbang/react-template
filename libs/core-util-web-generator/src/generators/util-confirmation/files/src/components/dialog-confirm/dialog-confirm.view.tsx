import React, { memo, useContext } from 'react';
import Typography from '@mui/material/Typography';

import { DialogBasic } from '@kuda-terbang/ui-mui-react-example';

import { ConfirmationPopupStateContext, ConfirmationPopupDispatchContext } from '../..';

const ConfirmationPopup = memo(function ConfirmationPopup() {
  const { isOpen, title, message, textButtonConfirm, textButtonCancel } = useContext(
    ConfirmationPopupStateContext
  );
  const { closeConfirmation, onSubmitConfirmation } = useContext(ConfirmationPopupDispatchContext);

  return (
    <DialogBasic
      onClose={closeConfirmation}
      isOpen={isOpen}
      maxWidth="xs"
      onClickSubmit={onSubmitConfirmation}
      textButtonCancel={textButtonCancel}
      textButtonSubmit={textButtonConfirm}
      title={title}
    >
      <Typography variant="body2">{message}</Typography>
    </DialogBasic>
  );
});

export default ConfirmationPopup;
