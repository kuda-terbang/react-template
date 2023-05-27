import React from 'react';
import { Button, Typography } from '@mui/material';

import { useConfirmation, useSnackbar } from '@<%= npmScope %>/<%= designSystemProject %>'

import Strapi from './strapi'

const PageCommonView = () => {
  const { openConfirmation } = useConfirmation()
  const { showSnackbar } = useSnackbar();

  return (
    <div>
      <div>
        <Typography variant="h2">Snackbar</Typography>
        <Button onClick={() => showSnackbar('default', 'default')}>Default</Button>
        <Button onClick={() => showSnackbar('error', 'error')}>Error</Button>
        <Button onClick={() => showSnackbar('info', 'info')}>Info</Button>
        <Button onClick={() => showSnackbar('success', 'success')}>Success</Button>
        <Button onClick={() => showSnackbar('warning', 'warning')}>Warning</Button>
      </div>
      <div>
        <Typography variant="h2">Confirmation</Typography>
        <Button onClick={() => openConfirmation({
          title: 'Title',
          message: 'Are you sure?'
        })}>Confirm with title</Button>
        <Button onClick={() => openConfirmation({
          message: 'Are you sure?'
        })}>Confirm without title</Button>
      </div>
      <Strapi />
    </div>
  );
};

export default PageCommonView;
