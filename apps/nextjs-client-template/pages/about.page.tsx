import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import type { GetStaticProps } from 'next';

import { trackChangeLocale } from '../src/utils/analytics-event';
import { useTrackScreen } from '../src/services/analytics.service';
import i18nConfig from '../next-i18next.config';

const About: NextPageWithLayout = (props) => {
  const trackScreen = useTrackScreen();
  const { t } = useTranslation('common');

  React.useEffect(() => {
    trackScreen('about');
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
        <Typography variant="h4" component="h1" gutterBottom>
          MUI v5 + Next.js with TypeScript example About with custom layout
        </Typography>
        <Typography variant="h4" component="h1" gutterBottom>
          {t('h1')}
        </Typography>
        <Link href="/about" locale="id">
          <Button
            onClick={() => {
              trackChangeLocale('en', 'id');
            }}
          >
            {t('change-locale')} indonesia
          </Button>
        </Link>
        <Link href="/about" locale="en">
          <Button
            onClick={() => {
              trackChangeLocale('id', 'en');
            }}
          >
            {t('change-locale')} english
          </Button>
        </Link>
        <Box maxWidth="sm">
          <Button variant="contained" href="/">
            {t('to-home')}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

About.layoutType = 'LayoutEmpty';

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'id', ['common'], i18nConfig)),
      // Will be passed to the page component as props
    },
  };
};

export default About;
