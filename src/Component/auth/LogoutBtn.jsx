// import React from 'react';
// import { Button } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import LogoutIcon from '@mui/icons-material/Logout';
// import axiosInstance from '../interceptors/AxiosInstance';
// function LogoutBtn() {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem('authToken'); 
//     localStorage.removeItem("doctorId")
//     navigate('/'); 
//   };

// const logoutApi = async () =>{
//   try {

//     const res = await axiosInstance.post("/api/v{version}/Auth/logout")
//     localStorage.removeItem('authToken'); 
//     localStorage.removeItem("doctorId")
//     navigate('/'); 
//   } catch (error) {
    
//   }
// }

//   return (
//     <Button 
//       variant="contained" 
//       color="error"
//       size='small' 
//       onClick={handleLogout}
//       endIcon={<LogoutIcon/>}
//     >
//       Logout
//     </Button>
//   );
// }

// export default LogoutBtn;


import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import axiosInstance from '../interceptors/AxiosInstance'; 

function LogoutBtn() {
  const navigate = useNavigate();


  const logoutApi = async () => {
    try {
    
      const response = await axiosInstance.post("/api/v0.1/Auth/logout");
      localStorage.removeItem('authToken');
      localStorage.removeItem("doctorId");
      localStorage.removeItem("token");
      navigate('/doctorLogin'); 
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <Button 
      variant="contained" 
      color="error"
      size='small' 
      onClick={logoutApi}
      endIcon={<LogoutIcon />}
    >
      Logout
    </Button>
  );
}

export default LogoutBtn;
