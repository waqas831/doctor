import React from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

function AdminDoctor() {
  return (
  <>
      <Button variant='contained'><Link to={"/"} style={{color:'white'}}> Back</Link></Button>
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Typography variant="h4" gutterBottom>
        Admin Login
      </Typography>
      <Box
        component="form"
        sx={{
          width: '100%',
          maxWidth: 400,
        }}
      >
        <TextField
          fullWidth
          label="Email"
          type="email"
          variant="outlined"
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          variant="outlined"
          margin="normal"
          required
        />
        <Link to={"/dashboard"} style={{color:"white"}}>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          sx={{ marginTop: 2 }}
        >
          Login
        </Button>
          </Link>
      </Box>
    </Box>
  </>
  );
}

export default AdminDoctor;
