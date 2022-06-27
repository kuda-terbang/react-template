import React from 'react';
import { OptionsObject, useSnackbar } from 'notistack';
import { Button, Typography } from '@mui/material';

import { useConfirmation } from '@kudaterbang/util-confirmation';

import Strapi from './strapi';

const PageCommonView = () => {
  const { openConfirmation } = useConfirmation();
  const { enqueueSnackbar } = useSnackbar();
  const handleClickSnackbar = (option: OptionsObject['variant']) => {
    enqueueSnackbar(option, {
      variant: option,
    });
  };

  return (
    <div>
      <div>
        <Typography variant="h2">Snackbar</Typography>
        <Button onClick={() => handleClickSnackbar('default')}>Default</Button>
        <Button onClick={() => handleClickSnackbar('error')}>Error</Button>
        <Button onClick={() => handleClickSnackbar('info')}>Info</Button>
        <Button onClick={() => handleClickSnackbar('success')}>Success</Button>
        <Button onClick={() => handleClickSnackbar('warning')}>Warning</Button>
      </div>
      <div>
        <Typography variant="h2">Confirmation</Typography>
        <Button
          onClick={() =>
            openConfirmation({
              title: 'Title',
              message: 'Are you sure?',
            })
          }
        >
          Confirm with title
        </Button>
        <Button
          onClick={() =>
            openConfirmation({
              message: 'Are you sure?',
            })
          }
        >
          Confirm without title
        </Button>
      </div>
      <Strapi />
    </div>
  );
};

export default PageCommonView;
