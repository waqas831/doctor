import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ErrorOutline } from '@mui/icons-material'; // Importing Material UI icon

const Error = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/'); 
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f5f5f5',
        textAlign: 'center',
        padding: 3,
        border: '1px solid #ccc',
        borderRadius: '10px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
      }}
    >
      <ErrorOutline sx={{ fontSize: '100px', color: '#FF6F61', mb: 2 }} />
      <Typography variant="h1" sx={{ fontSize: '6rem', fontWeight: 'bold', color: '#FF6F61' }}>
        404
      </Typography>
      <Typography variant="h4" sx={{ mb: 2, color: '#333' }}>
        Oops! Page Not Found
      </Typography>
      <Typography variant="body1" sx={{ mb: 4, color: '#666' }}>
        The page you are looking for does not exist or has been moved.
      </Typography>
      <Button variant="contained" color="primary" onClick={handleGoHome}>
        Go Back Home
      </Button>
    </Box>
  );
};

export default Error;
