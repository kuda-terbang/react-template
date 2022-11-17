import { Box, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';

import apiStrapiService from '@kudaterbang/data-access-strapi';
import { useAuth } from '../../../utils/auth-strapi';
import { websiteName } from '../../../config/envValue';

const PageHome = () => {
  const { isAuthenticated, logout, login } = useAuth();

  const [isLogin, setisLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogout = () => {
    logout();
  };
  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    let result;
    if (isLogin) {
      result = await apiStrapiService.loginPost({
        data: {
          identifier: email,
          password,
        },
      });
    } else if (!!username && !!email && !!password) {
      result = await apiStrapiService.registerPost({
        data: {
          username,
          email,
          password,
        },
      });
    }
    if (result?.data?.jwt) {
      login(result.data.jwt);
      setUsername('');
      setEmail('');
      setPassword('');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
      }}
    >
      <Box
        component="form"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          padding: '16px',
        }}
      >
        <Typography variant="h2" component="h1">
          {websiteName}
        </Typography>
        {isAuthenticated ? (
          <>
            <Typography textAlign="center" variant="h5">
              Welcome
            </Typography>
            <Button onClick={handleLogout}>Logout</Button>
          </>
        ) : (
          <>
            <Typography textAlign="center" variant="h5">
              {isLogin ? 'Login' : 'Register'}
            </Typography>
            <Button onClick={() => setisLogin(!isLogin)}>
              Change to {isLogin ? 'Register' : 'Login'}
            </Button>
            {!isLogin && (
              <TextField
                value={username}
                onChange={(e) => setUsername(e.currentTarget.value)}
                label="Username"
              />
            )}
            <TextField
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
              label="Email"
              sx={{
                marginBottom: '8px',
              }}
            />
            <TextField
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
              label="Password"
              type="password"
              sx={{
                marginBottom: '8px',
              }}
            />
            <Button variant="contained" color="success" type="submit" onClick={handleSubmit}>
              Submit
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
};

export default PageHome;
