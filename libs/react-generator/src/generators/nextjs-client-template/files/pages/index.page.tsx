import * as React from 'react';
import type { NextPage } from 'next';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { VariantType } from 'notistack';
import { styled } from '@mui/system';

import {
  DialogBasic,
  LayoutBasicContext,
	useSnackbar,
} from '@<%= npmScope %>/<%= designSystemProject %>';
import { useConfirmation } from '@<%= npmScope %>/util-confirmation';
import { useTrackScreen } from '../src/services/analytics.service';

import RemoteConfig from '../src/containers/home/remote-config';
import Strapi from '../src/containers/home/strapi';

const SnackbarContainer = styled('div')`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const Home: NextPage = () => {
  const trackScreen = useTrackScreen();

  // Dynamic props Layout
  const { setTitle } = React.useContext(LayoutBasicContext);

  // Snackbar
  const { showSnackbar } = useSnackbar();
  const handleClickSnackbar = (variant: VariantType) => () => {
    showSnackbar(variant, `Show snackbar ${variant}`);
  };
  const variants: VariantType[] = [
    'default',
    'info',
    'success',
    'error',
    'warning',
  ];

  // Dialog
  const { openConfirmation } = useConfirmation();
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const handleClickConfirm = () => {
    openConfirmation({
      title: 'Title Confirmation',
      message: 'Are you sure?',
      onClose: () => {
        console.log('click close');
      },
      onSubmit: () => {
        console.log('click submit');
      },
      textButtonCancel: 'Tutup',
      textButtonConfirm: 'Kirim',
    });
  };

  React.useEffect(() => {
    setTitle?.('Home');
    trackScreen('home');
  });

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="h2">i18n</Typography>
        <Link href="/about" color="secondary">
          Go to the about page utilize i18n
        </Link>
        <Typography variant="h2">Protected SSR</Typography>
        <Link href="/protected-ssr" color="secondary">
          Go to protected-ssr page utilize withProtectedSsr
        </Link>
        <Typography variant="h2">Snackbar</Typography>
        <SnackbarContainer>
          {variants.map((variant) => (
            <Button key={variant} onClick={handleClickSnackbar(variant)}>
              {`Show snackbar ${variant}`}
            </Button>
          ))}
        </SnackbarContainer>
        <Typography variant="h2">Dialog</Typography>
        <Button onClick={() => setIsDialogOpen(true)}>Dialog Basic</Button>
        <Button onClick={handleClickConfirm}>Imperative Dialog Confirm</Button>
        <Typography variant="h2">Sentry</Typography>
        <Button
          type="button"
          onClick={() => {
            throw new Error('Sentry Frontend Error');
          }}
        >
          Throw error send to sentry
        </Button>
        <RemoteConfig />
        <Strapi />
      </Box>
      <DialogBasic
        maxWidth="md"
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        title="Title dialog basic"
      >
        <Typography variant="body2">This is ialog basic</Typography>
      </DialogBasic>
    </Container>
  );
};

export default Home;
