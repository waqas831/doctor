
// import React, { useState, useEffect } from 'react';
// import { Button, Box, Typography, CircularProgress, TextField, IconButton, InputAdornment } from '@mui/material';
// import { Visibility, VisibilityOff } from '@mui/icons-material';
// import { Link, useNavigate, useLocation } from 'react-router-dom';
// import axios from 'axios';
// import BACKEND_LOCAL from '../../../Api';
// import Login from '../../../assets/login.png';
// import gp from '../../../assets/gp.png';
// import { ToastContainer } from 'react-toastify';


// function CreatePassword() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [email, setEmail] = useState('');
//   const [token, setToken] = useState('');
//   const version = 'v0.1'; 
//   const back = process.env.REACT_APP_BACKEND_LOCAL;
//   const apiClient = axios.create({ baseURL: back });
//   useEffect(() => {
//     const params = new URLSearchParams(location.search);
//     setEmail(params.get('email'));
//     setToken(params.get('token'));
//   }, [location]);

//   const handleTogglePassword = () => setShowPassword((prev) => !prev);

//   const handlePasswordReset = async () => {
//     try {
//       const response = await apiClient.post(`/api/${version}/Auth/reset-password`, { email, token, newPassword });
//       if (response.status === 200) navigate('/doctorLogin');
//     } catch (error) {
//       console.error('Password Reset Error:', error);
//     }
//   };

//   const handleClick = async () => {
//     if (newPassword !== confirmPassword) {
//       console.error('Passwords do not match');
//       return;
//     }
//     setLoading(true);
//     await handlePasswordReset();
//     setLoading(false);
//   };

//   return (
//     <>
//       <Box bgcolor="#f4f4f4">
//         <Box width="100%" display="flex" flexDirection={['column-reverse', 'row']} justifyContent="center" alignItems="center">
//           <Box width={['100%', '50%']} display="flex" justifyContent="center">
//             <img src={Login} alt="Login" style={{ height: 'auto', width: 'auto' }} />
//           </Box>

//           <Box width={['100%', '50%']} bgcolor="white" display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="100vh">
//             <img src={gp} alt="Logo" style={{ height: '50px', width: '130px', margin: '30px' }} />
//             <Box sx={{ width: '100%', maxWidth: 400 }}>
//               <Typography fontWeight="bold">New Password</Typography>
//               <TextField
//                 fullWidth
//                 type={showPassword ? 'text' : 'password'}
//                 placeholder="Enter New Password"
//                 margin="normal"
//                 required
//                 onChange={(e) => setNewPassword(e.target.value)}
//                 sx={{ bgcolor: '#eeeeee' }}
//                 InputProps={{
//                   endAdornment: (
//                     <InputAdornment position="end">
//                       <IconButton onClick={handleTogglePassword} edge="end">
//                         {showPassword ? <VisibilityOff /> : <Visibility />}
//                       </IconButton>
//                     </InputAdornment>
//                   ),
//                 }}
//               />

//               <Typography fontWeight="bold">Confirm Password</Typography>
//               <TextField
//                 fullWidth
//                 type={showPassword ? 'text' : 'password'}
//                 placeholder="Confirm New Password"
//                 margin="normal"
//                 required
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//                 sx={{ bgcolor: '#eeeeee' }}
//                 InputProps={{
//                   endAdornment: (
//                     <InputAdornment position="end">
//                       <IconButton onClick={handleTogglePassword} edge="end">
//                         {showPassword ? <VisibilityOff /> : <Visibility />}
//                       </IconButton>
//                     </InputAdornment>
//                   ),
//                 }}
//               />

//               <Button
//                 fullWidth
//                 variant="contained"
//                 sx={{ marginTop: 2, bgcolor: '#3ab6bb', color: 'white' }}
//                 onClick={handleClick}
//                 disabled={loading}
//                 startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
//               >
//                 {loading ? 'Updating...' : 'Update Password'}
//               </Button>

//               <Button sx={{ mt: 2 }}>
//                 <Link to="/doctorLogin" style={{ color: 'gray', fontSize: 12, fontWeight: 'bold', textDecoration: 'none' }}>
//                   Back to login?
//                 </Link>
//               </Button>
//             </Box>
//           </Box>
//         </Box>
//       </Box>
//       <ToastContainer />
//     </>
//   );
// }

// export default CreatePassword;
import React, { useState, useEffect } from 'react';
import { Button, Box, Typography, CircularProgress, TextField, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Login from '../../../assets/login.png';
import gp from '../../../assets/gp.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CreatePassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const version = 'v0.1'; 
  const apiClient = axios.create({ baseURL: process.env.REACT_APP_BACKEND_LOCAL });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setEmail(params.get('email'));
    setToken(params.get('token'));
  }, [location]);

  const handleTogglePassword = () => setShowPassword((prev) => !prev);

  const handlePasswordReset = async () => {
    try {
      const response = await apiClient.post(`/api/${version}/Auth/reset-password`, {
        email,
        token,
        newPassword,
      });
      if (response.status === 200) {
        toast.success("Password updated successfully!");
        navigate('/doctorLogin');
      }
    } catch (error) {
      toast.error("Password reset failed. Please try again.");
      console.error('Password Reset Error:', error);
    }
  };

  const handleClick = async () => {
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    setLoading(true);
    await handlePasswordReset();
    setLoading(false);
  };

  return (
    <>
      <Box bgcolor="#f4f4f4">
        <Box width="100%" display="flex" flexDirection={['column-reverse', 'row']} justifyContent="center" alignItems="center">
          <Box width={['100%', '50%']} display="flex" justifyContent="center">
            <img src={Login} alt="Login" style={{ height: 'auto', width: 'auto' }} />
          </Box>

          <Box width={['100%', '50%']} bgcolor="white" display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="100vh">
            <img src={gp} alt="Logo" style={{ height: '50px', width: '130px', margin: '30px' }} />
            <Box sx={{ width: '100%', maxWidth: 400 }}>
              <Typography fontWeight="bold">New Password</Typography>
              <TextField
                fullWidth
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter New Password"
                margin="normal"
                required
                onChange={(e) => setNewPassword(e.target.value)}
                sx={{ bgcolor: '#eeeeee' }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleTogglePassword} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Typography fontWeight="bold">Confirm Password</Typography>
              <TextField
                fullWidth
                type={showPassword ? 'text' : 'password'}
                placeholder="Confirm New Password"
                margin="normal"
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
                sx={{ bgcolor: '#eeeeee' }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleTogglePassword} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                fullWidth
                variant="contained"
                sx={{ marginTop: 2, bgcolor: '#3ab6bb', color: 'white' }}
                onClick={handleClick}
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
              >
                {loading ? 'Updating...' : 'Update Password'}
              </Button>

              <Button sx={{ mt: 2 }}>
                <Link to="/doctorLogin" style={{ color: 'gray', fontSize: 12, fontWeight: 'bold', textDecoration: 'none' }}>
                  Back to login?
                </Link>
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
      <ToastContainer />
    </>
  );
}

export default CreatePassword;
