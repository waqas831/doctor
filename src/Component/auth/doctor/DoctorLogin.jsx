

import React, { useState } from 'react';
import { Button, Box, Typography, CircularProgress } from '@mui/material'; 
import { TextField, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux'; 
import { loginSuccess } from '../../../redux/authSlice'; 
import BACKEND_LOCAL from '../../../Api';
import Login from "../../../assets/login.png"
import gp from "../../../assets/gp.png"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { toast, ToastContainer } from 'react-toastify';
const back = process.env.REACT_APP_BACKEND_LOCAL;
const apiClient = axios.create({
  baseURL: back,
});
function DoctorLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); 

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const userLogin = async () => {
    try {
      const response = await apiClient.post('/api/v0.1/Auth/login', { email, password });
      console.log('Login Response:', response);

      if (response.status === 200) {
        const { token, roles, name, email ,doctorId} = response.data;
        toast.success("Logged In Successfully", { autoClose: 2000 });
        localStorage.setItem('authToken', token);
        localStorage.setItem("doctorId" ,doctorId)
        dispatch(
          loginSuccess({
            user: { name, email, role: roles[0] },
            token,
            doctorId,
          })
        );

        apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        if (roles.includes('Admin')) {
          navigate('/dashboard');
        } else if (roles.includes('Doctor')) {
          navigate('/userDashboard');
        } else {
          toast.warning('Unauthorized Access',{autoClose:2000});
        }
      } else {
        toast.warning('Unauthorized Access',{autoClose:2000});

      }
    } catch (error) {
      console.error('Login Error:', error);
      const errorMessage = error.response?.data?.message || 'Invalid credentials. Please try again.';
      toast.error("Invalid Criedentials",{autoClose:2000})
      setError(errorMessage);
    }
  };

  const handleClick = async () => {
    setLoading(true); 
    await userLogin();
        setLoading(false);
  };

  return (
    <>
   <Box bgcolor={"#f4f4f4"}>
 
    <Box width={["100%"]} bgcolor={"white"}  display={"flex"} flexDirection={["column-reverse","column-reverse","row"]}    justifyContent="center"
        alignItems="center"  >
           
    <Box width={["100%","100%" ,"50%"]}  display={"flex"} justifyContent={"center"}>
  <img src={Login} alt='No Login Image' style={{height:"auto" ,width:"auto"}} />
    </Box>
    <Box width={["90%", "90%", "50%"]} bgcolor={"white"}>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <img src={gp} alt='no logo' style={{ height: "50px", width: "130px", margin: "30px" }} />
        <Typography style={{ fontSize: 16 }}>Login to your account</Typography>
        <Box component="form" sx={{ width: '100%', maxWidth: 400 }}>
          <Typography fontWeight={"bold"}>Email Id</Typography>
          <TextField
            fullWidth
            placeholder='e.g: info@onetechai@gmail.com'
            type="email"
            margin="normal"
            required
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              bgcolor: "#eeeeee",
              borderColor: "#eeeeee",
              color: "black", 
              '& .MuiInputBase-input': {
      color: "black", 
    },
    '& .MuiInputBase-input::placeholder': {
      color: "black",
      opacity: 1,
      fontSize: '0.8rem' 
    },
            }}
           
          />
          <Typography fontWeight={"bold"}>Password</Typography>
          <TextField
            fullWidth
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            placeholder='Password'
            margin="normal"
            required
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              bgcolor: "#eeeeee",
              borderColor: "#eeeeee",
              color: "black",
              '& .MuiInputBase-input': {
      color: "black", 
    },
    '& .MuiInputBase-input::placeholder': {
      color: "black",
      opacity: 1,
      fontSize: '0.8rem' 
    },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleTogglePassword}
                    edge="end"
                    aria-label="toggle password visibility"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Link
            to="/doctorforget"
            style={{ color: 'gray', fontSize: 12, display: 'block', textAlign: 'right', }}
            
          >
            Forgot Password?
          </Link>
          {error && (
            <Typography color="error" variant="body2" sx={{ marginTop: 1 }}>
              {error}
            </Typography>
          )}
          <Button
            fullWidth
            variant="contained"
            
            sx={{ marginTop: 2 ,bgcolor:"#3ab6bb",color:"white"}}
            size="medium"
            onClick={handleClick}
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
          >
            {loading ? 'Logging in...' : 'Login'}
          </Button>
          <Typography  sx={{ textAlign:"center" }}  >
        <Link to="/" style={{color:"gray",marginTop:"10px"}}> back</Link>
      </Typography>
        </Box>
      </Box>
     
    </Box>
    </Box>
   </Box>
   <ToastContainer/>
    </>
  );
}

export default DoctorLogin;
