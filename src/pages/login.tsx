import { FormEvent } from 'react';

import { NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';

import { Box, Button, TextField, Typography } from '@mui/material';

import { httpNext } from 'utils/http';

const LoginPage: NextPage = () => {
  const router = useRouter();

  async function onSubmit(event: FormEvent) {
    event.preventDefault();

    const token = (document.querySelector('#token') as HTMLInputElement).value;

    try {
      await httpNext.post('/login', { token });
      await router.push('/orders');
    } catch (e) {
      console.error(e);
      alert('Login deu zebra!!');
    }
  }

  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography component="h1" variant="h5">
        Login
      </Typography>
      <Box component="form" onSubmit={onSubmit} sx={{ mt: 1 }}>
        <TextField
          id="token"
          margin="normal"
          required
          fullWidth
          label="Token da conta"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default LoginPage;
