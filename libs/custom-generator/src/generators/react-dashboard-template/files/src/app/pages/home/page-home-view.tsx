import React from 'react'
import { styled } from '@mui/system';
import Button from '@mui/material/Button';
import GoogleIcon from '@mui/icons-material/Google';
import Typography from '@mui/material/Typography';

import logo from '../../../assets/img/logo.svg';

import './page-home-style.css'

const LayoutHome = styled('div')(() => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
}))

const StyledTitleHome = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  marginTop: theme.spacing(2),
}))

const PageHomeView = () => {
  return (
    <LayoutHome>
      <img src={logo} className="App-logo" alt="logo" />
      <StyledTitleHome variant="h6">Welcome to {process.env['NX_WEBSITE_NAME']}</StyledTitleHome>
      <Button variant="outlined" startIcon={<GoogleIcon />}>
        Signin with Google
      </Button>
    </LayoutHome>
  )
}

export default PageHomeView