import React from 'react';
import { Container, Typography, TextField, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

function ForgetPage() {
  return (
 <>
       <Button variant='contained'><Link to={"/"} style={{color:'white'}}> Back</Link></Button>
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 8,
          p: 3,
          borderRadius: 2,
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography component="h1" variant="h5" gutterBottom>
          Forgot Your Password?
        </Typography>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          Enter your email address below and we will send you instructions to reset your password.
        </Typography>

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Email Address"
          type="email"
          autoComplete="email"
          autoFocus
        />
<Typography>back to login? <Link to={"/doctorLogin"}>click here</Link></Typography>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            mt: 3,
            mb: 2,
            backgroundColor: '#1976d2',
            color: '#fff',
            '&:hover': {
              backgroundColor: '#1565c0',
            },
          }}
        >
          Send Reset Link
        </Button>
      </Box>
    </Container>
 </>
  );
}

export default ForgetPage;
