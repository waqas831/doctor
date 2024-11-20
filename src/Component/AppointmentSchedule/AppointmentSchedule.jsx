
import { Modal, Button, Form, Col, Row } from "react-bootstrap";
import AppointmentSchedule from "../../Component/AppointmentSchedule/AppointmentSchedule";
import Usewrapper from "../../Component/Usewrapper/Usewrapper";
import startImg from "../../images/Star 1.svg";
import Calendar from "react-calendar";
import closeModalIcon from "../../images/x-close.svg";
import CircularProgress from "@mui/material/CircularProgress"
import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { createContext, useContext } from 'react';
import React, { useState } from "react";
import {
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  Tooltip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { Assignment } from "@mui/icons-material";
import { toast } from "react-toastify";
import BACKEND_LOCAL from "../../Api";
import axiosInstance from "../interceptors/AxiosInstance";

const PatientContext = createContext();
const DoctorContext = createContext();

export const useDoctor = () => useContext(DoctorContext);

export const usePatient = () => useContext(PatientContext);

const AppointmentScheduleView = () => {
  const [users, setUsers] = useState([]); 
  const [anchorEl, setAnchorEl] = useState(null);  
  const [selectedUserId, setSelectedUserId] = useState(null);  
  const open = Boolean(anchorEl);
  const navigate = useNavigate();  
  const [selectedPatient, setSelectedPatient] = useState(null);
  const currentDoctorId = localStorage.getItem("doctorId");
  const back = process.env.REACT_APP_BACKEND_LOCAL;
  const [users2, setUsers2] = useState(null); 
  const [signatureUrl, setSignatureUrl] = useState(null); 
  const [loading, setLoading] = useState(true); 
  useEffect(() => {
    
    fetchPatients();
    fetchDoctor();
  }, []);


  const fetchPatients = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axiosInstance.get(`/api/v0.1/Appointment/GetAppointmentWithPatientAndDoctor`, {
        headers: { Authorization:   `Bearer ${token}` } ,
        params: { IsDetail: true },
      });
      setUsers(response.data);
      //console.log("Fetched data:", response.data);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };


  const fetchDoctor = async (idparam) => {
    try {
      //localStorage.removeItem('doctorSignatureUrl');
      const token = localStorage.getItem('authToken');
      const response = await axiosInstance.get(`/api/v0.1/Doctor`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { id: idparam },
      });

      // Log full API response
      //console.log("Full API Response:", response.data);

      // Check if the response is an array and if it has data
      if (Array.isArray(response.data) && response.data.length > 0) {
        const doctorData = response.data[0]; // Access the first item in the array
        
        // Directly access the signatureUrl from the doctor data
        const fetchedSignatureUrl = doctorData.signatureUrl;
        //console.log("THIS IS SIGNATURE FROM APPOINTMENT PAGE CODE: ",fetchedSignatureUrl)
        
        setSignatureUrl(fetchedSignatureUrl);

        return fetchedSignatureUrl;
       
      } else {
        console.log(".");
      }//No doctor data found or the data is empty upper was written

    } catch (error) {
      console.error("Error fetching doctor's details:", error.message);
    }
  };
 
  const handleClick = (event, userId) => {
    setAnchorEl(event.currentTarget);
    setSelectedUserId(userId);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const filteredUsers = users.filter(
    (user) =>
      user?.doctor &&
      user?.doctor?.id &&
      String(user.doctor.id) === currentDoctorId &&
      user?.status === "Active"
  );

  const handleMenuItemClick = async (action, user, users2) => {
    //console.log("User data:", user);
    const signatureUrl = await fetchDoctor(user.doctor?.id);
    //console.log("signature url constant: value:    ", signatureUrl)
    if (action === "Join Consultation") {
      
      setSelectedPatient({
        name: user.patient?.name || "",
        DOB: user.patient?.dateOfBirth || "",
        contactno: user.patient?.contactInformation || "",
        patient_email: user.patient?.email || "",
        Gender: user.patient?.gender || "",
      });
      navigate("/consultation", {
        state: {
          consultationActive: true, 

          user:{
            appointmentID: user?.appointmentId || null,
            appointmentDATE: user?.appointmentDate || "",
            Drug_Allergy: user?.drugAllergy || "",
            MedicineHistory: user?.medicineHistory || "",
            Patient_Address: user?.address || "",
          },

          patient: {
            name: user.patient?.name || "",
            DOB: user.patient?.dateOfBirth || "",
            contactno: user.patient?.contactInformation || "",
            Gender: user.patient?.gender || null,
            patient_email: user.patient?.email || "",
          },
          doctor: {
            doctor_email: user.doctor?.email || "",
            doctor_name: user.doctor?.name || "",
            doctor_id: user.doctor?.id || "",
            doctor_IMC: user.doctor?.imc || "",
            doctor_signature: signatureUrl || "",
            
            //setUsers2(doctorData);
          }
        }
      });
    }
    handleClose();
  };

  return (
    // <Box display={"flex"} justifyContent={"center"}>
    //   <Box
    //     sx={{
    //       bgcolor: "white",
    //       padding: 2,
    //       margin: 2,
    //       marginLeft: 2,
    //       borderRadius: 2,
    //       boxShadow: 3,
    //       height: '80vh',
    //       width: { xs: '100%', sm: '98%' },          
    //       overflowY: "scroll",
    //       overflowX: "auto", // Enable horizontal scrolling
    //       scrollbarWidth: "thin",
    //       "&::-webkit-scrollbar": { width: "12px" },
    //       "&::-webkit-scrollbar-track": { background: "black" },
    //       "&::-webkit-scrollbar-thumb": { backgroundColor: "#888", borderRadius: "10px" },
    //       display: "flex",
    //       flexDirection: "column",
    //       marginTop: "50"
    //     }}
    //   >
    //     <Box
    //       display="flex"
    //       justifyContent="space-between"
    //       alignItems="center"
    //       p={1}
    //       bgcolor="#14467B"
    //       borderRadius={2}
    //       height="70px"
    //       color="white"
    //       boxShadow={1}
    //       mb={2}
    //       sx={{ flexWrap: "nowrap" }} // Prevent wrapping, keep content in a row

    //     >
    //       <Typography variant="body1" sx={{ fontWeight: "bold", width: "10%", fontSize: "16px" }}>Doctor ID</Typography>
    //       <Typography variant="body1" sx={{ fontWeight: "bold", width: "15%", fontSize: "16px", textAlign: "left" }}>Appointment ID</Typography>
    //       <Typography variant="body1" sx={{ fontWeight: "bold", width: "15%", textAlign: "center" }}>Patient Name</Typography>
    //       <Typography variant="body1" sx={{ fontWeight: "bold", width: "15%", textAlign: "center" }}>Appointment Reason</Typography>
    //       <Typography variant="body1" sx={{ fontWeight: "bold", width: "20%", textAlign: "center" }}>Appointment Date</Typography>
    //       <Typography variant="body1" sx={{ fontWeight: "bold", width: "15%", textAlign: "center" }}>Link</Typography>
    //       <Typography variant="body1" sx={{ fontWeight: "bold", width: "10%", textAlign: "center" }}>Status</Typography>
    //     </Box>
  
    //     {/* Content */}
    //     {filteredUsers.length > 0 ? (
    //       filteredUsers.reverse().map((user) => (
    //         <Box
    //           key={user.appointmentId}
    //           display="flex"
    //           justifyContent="space-between"
    //           alignItems="center"
    //           mb={1}
    //           p={1}
    //           bgcolor="white"
    //           borderRadius={5}
    //           boxShadow={1}
    //           sx={{ flexWrap: "nowrap" }} // Prevent wrapping

    //         >
    //           <Typography variant="body2" sx={{ width: "10%", textAlign: "center" }}>{user.doctor.id}</Typography>
    //           <Typography variant="body2" sx={{ width: "10%", textAlign: "center" }}>{user.appointmentId}</Typography>
    //           <Typography variant="body2" sx={{ width: "15%", textAlign: "center" }}>{user.patient.name}</Typography>
    //           <Typography variant="body2" sx={{ width: "15%", textAlign: "center" }}>{user.appointmentReason}</Typography>
    //           <Typography variant="body2" sx={{ width: "25%", textAlign: "center" }}>{new Date(user.appointmentDate).toLocaleString()}</Typography>
    //           <Typography variant="body2" sx={{ width: "15%", wordBreak: "break-all", marginLeft: "-50px", textAlign: "center" }}>
    //             {user.appointmentLink ? (
    //               <a href={user.appointmentLink} target="_blank" rel="noopener noreferrer" style={{ color: "blue", textDecoration: "underline" }}>
    //                 Link
    //               </a>
    //             ) : (
    //               "N/A"
    //             )}
    //           </Typography>
    //           <Typography variant="body2" sx={{ width: "-15%", color: "#D4AF37", fontWeight: "bold", textAlign: "center" }}>{user.status}</Typography>
    //           <IconButton onClick={(e) => handleClick(e, user.appointmentId)}>
    //             <MoreVertIcon sx={{ fontSize: "1.5rem", color: "black" }} />
    //           </IconButton>
    //         </Box>
    //       ))
    //     ) : (
    //       // Message when no users are available
    //       <Typography variant="body2" sx={{ textAlign: "center", marginTop: 4 }}>
    //         No patients available currently
    //       </Typography>
    //     )}
  
    //     <Menu
    //       anchorEl={anchorEl}
    //       open={open}
    //       onClose={handleClose}
    //       PaperProps={{
    //         elevation: 3,
    //       }}
    //     >
    //       <MenuItem onClick={() => handleMenuItemClick('Join Consultation', users.find((user) => user.appointmentId === selectedUserId))}
    //         sx={{ fontSize: '1.1rem', padding: '12px 24px', marginBottom: '20px' }}
    //       >
    //         Join Consultation
    //       </MenuItem>
    //     </Menu>
    //   </Box>
    // </Box>
    <>
        {/* <Box display="flex" justifyContent="center">
      <Box
        sx={{
          bgcolor: "white",
          // padding: 2,
          margin: 2,
          borderRadius: 2,
          boxShadow: 3,
          width: { xs: "100%", sm: "98%", md: "95%" },
        }}
      >
        <TableContainer  sx={{ maxHeight: "80vh", overflow: "auto" ,p:1}}>
          <Table stickyHeader aria-label="appointments table">
            <TableHead>
              <TableRow sx={{ bgcolor: "#14467B" }}>
                <TableCell sx={{ color: "white", fontWeight: "bold" ,bgcolor: "#14467B"}}>Doctor ID</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold",bgcolor: "#14467B" }}>Appointment ID</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" ,bgcolor: "#14467B"}}>Patient Name</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold",bgcolor: "#14467B" }}>Appointment Reason</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" ,bgcolor: "#14467B"}}>Appointment Date</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" ,bgcolor: "#14467B"}}>Link</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold",bgcolor: "#14467B" }}>Status</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold",bgcolor: "#14467B" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.length > 0 ? (
                filteredUsers.reverse().map((user) => (
                  <TableRow key={user.appointmentId}>
                    <TableCell>{user.doctor.id}</TableCell>
                    <TableCell>{user.appointmentId}</TableCell>
                    <TableCell>{user.patient.name}</TableCell>
                    <TableCell>{user.appointmentReason}</TableCell>
                    <TableCell>{new Date(user.appointmentDate).toLocaleString()}</TableCell>
                    <TableCell>
                      {user.appointmentLink ? (
                        <a
                          href={user.appointmentLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: "blue", textDecoration: "underline" }}
                        >
                          Link
                        </a>
                      ) : (
                        "N/A"
                      )}
                    </TableCell>
                    <TableCell sx={{ color: "#D4AF37", fontWeight: "bold" }}>
                      {user.status}
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={(e) => handleClick(e, user.appointmentId)}>
                        <MoreVertIcon sx={{ fontSize: "1.5rem", color: "black" }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    <Typography variant="body2">No patients available currently</Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

      
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          PaperProps={{
            elevation: 3,
          }}
        >
          <MenuItem
            onClick={() =>
              handleMenuItemClick(
                "Join Consultation",
                filteredUsers.find((user) => user.appointmentId === selectedUserId)
              )
            }
            sx={{ fontSize: "1.1rem", padding: "12px 24px" }}
          >
            Join Consultation
          </MenuItem>
        </Menu>
      </Box>
    </Box> */}
    <Box display="flex" justifyContent="center">
  <Box
    sx={{
      bgcolor: "white",
      margin: 2,
      borderRadius: 2,
      boxShadow: 3,
      width: { xs: "100%", sm: "98%", md: "95%" },
      overflowX: { xs: "auto", sm: "hidden" }, 
    }}
  >
    <TableContainer sx={{ maxHeight: "80vh", overflow: "auto" }}>
      <Table stickyHeader aria-label="appointments table">
        <TableHead>
          <TableRow sx={{ bgcolor: "#14467B",p:1 }}>
            <TableCell sx={{ color: "white", fontWeight: "bold", bgcolor: "#14467B" }}>Doctor ID</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", bgcolor: "#14467B" }}>Appointment ID</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", bgcolor: "#14467B" }}>Patient Name</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", bgcolor: "#14467B" }}>Appointment Reason</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", bgcolor: "#14467B" }}>Appointment Date</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", bgcolor: "#14467B" }}>Link</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", bgcolor: "#14467B" }}>Status</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", bgcolor: "#14467B" }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredUsers.length > 0 ? (
            filteredUsers.reverse().map((user) => (
              <TableRow key={user.appointmentId}>
                <TableCell>{user.doctor.id}</TableCell>
                <TableCell>{user.appointmentId}</TableCell>
                <TableCell>{user.patient.name}</TableCell>
                <TableCell>{user.appointmentReason}</TableCell>
                <TableCell>{new Date(user.appointmentDate).toLocaleString()}</TableCell>
                <TableCell>
                  {user.appointmentLink ? (
                    <a
                      href={user.appointmentLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "blue", textDecoration: "underline" }}
                    >
                      Link
                    </a>
                  ) : (
                    "N/A"
                  )}
                </TableCell>
                <TableCell sx={{ color: "#D4AF37", fontWeight: "bold" }}>
                  {user.status}
                </TableCell>
                <TableCell>
                  <IconButton onClick={(e) => handleClick(e, user.appointmentId)}>
                    <MoreVertIcon sx={{ fontSize: "1.5rem", color: "black" }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8} align="center">
                <Typography variant="body2">No patients available currently</Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>

    {/* Menu for Actions */}
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      PaperProps={{
        elevation: 3,
      }}
    >
      <MenuItem
        onClick={() =>
          handleMenuItemClick(
            "Join Consultation",
            filteredUsers.find((user) => user.appointmentId === selectedUserId)
          )
        }
        sx={{ fontSize: "1.1rem", padding: "12px 24px" }}
      >
        Join Consultation
      </MenuItem>
    </Menu>
  </Box>
</Box>

    </>
  );
  

      
}


export default AppointmentScheduleView;


// import React, { useState, useEffect, createContext, useContext } from "react";
// import {
//   Box,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Typography,
//   IconButton,
//   Menu,
//   MenuItem,
//   CircularProgress,
//   Paper,
// } from "@mui/material";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import { useNavigate } from "react-router-dom";
// import axiosInstance from "../interceptors/AxiosInstance";

// const PatientContext = createContext();
// const DoctorContext = createContext();

// export const useDoctor = () => useContext(DoctorContext);
// export const usePatient = () => useContext(PatientContext);

// const AppointmentScheduleView = () => {
//   const [users, setUsers] = useState([]);
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [selectedUserId, setSelectedUserId] = useState(null);
//   const [loading, setLoading] = useState(true); 
//   const navigate = useNavigate();
//   const currentDoctorId = localStorage.getItem("doctorId");

//   const open = Boolean(anchorEl);

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true); 
//       await fetchPatients();
//       setLoading(false); 
//     };
//     fetchData();
//   }, []);

//   const fetchPatients = async () => {
//     try {
//       const token = localStorage.getItem("authToken");
//       const response = await axiosInstance.get(
//         `/api/v0.1/Appointment/GetAppointmentWithPatientAndDoctor`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//           params: { IsDetail: true },
//         }
//       );
//       setUsers(response.data);
//     } catch (error) {
//       console.error("Error fetching patients:", error);
//     }
//   };

//   const handleClick = (event, userId) => {
//     setAnchorEl(event.currentTarget);
//     setSelectedUserId(userId);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const handleMenuItemClick = (action, user) => {
//     if (action === "Join Consultation") {
//       navigate("/consultation", {
//         state: {
//           consultationActive: true,
//           user: {
//             appointmentID: user?.appointmentId || null,
//             appointmentDATE: user?.appointmentDate || "",
//             Drug_Allergy: user?.drugAllergy || "",
//             MedicineHistory: user?.medicineHistory || "",
//             Patient_Address: user?.address || "",
//           },
//           patient: {
//             name: user.patient?.name || "",
//             DOB: user.patient?.dateOfBirth || "",
//             contactno: user.patient?.contactInformation || "",
//             Gender: user.patient?.gender || null,
//             patient_email: user.patient?.email || "",
//           },
//           doctor: {
//             doctor_email: user.doctor?.email || "",
//             doctor_name: user.doctor?.name || "",
//             doctor_id: user.doctor?.id || "",
//             doctor_IMC: user.doctor?.imc || "",
//           },
//         },
//       });
//     }
//     handleClose();
//   };

//   const filteredUsers = users.filter(
//     (user) =>
//       user?.doctor &&
//       user?.doctor?.id &&
//       String(user.doctor.id) === currentDoctorId &&
//       user?.status === "Active"
//   );

//   return (
//     <Box display="flex" justifyContent="center">
//       <Box
//         sx={{
//           bgcolor: "white",
//           margin: 2,
//           borderRadius: 2,
//           boxShadow: 3,
//           width: { xs: "100%", sm: "98%", md: "95%" },
//         }}
//       >
//         {loading ? (
//           <Box
//             display="flex"
//             justifyContent="center"
//             alignItems="center"
//             height="80vh"
//           >
//             <CircularProgress />
//           </Box>
//         ) : (
//           <TableContainer component={Paper} sx={{ maxHeight: "80vh", overflow: "auto", p: 1 }}>
//             <Table stickyHeader aria-label="appointments table">
//               <TableHead>
//                 <TableRow sx={{ bgcolor: "#14467B" }}>
//                   <TableCell sx={{ color: "white", fontWeight: "bold", bgcolor: "#14467B"  }}>Doctor ID</TableCell>
//                   <TableCell sx={{ color: "white", fontWeight: "bold", bgcolor: "#14467B"  }}>Appointment ID</TableCell>
//                   <TableCell sx={{ color: "white", fontWeight: "bold" , bgcolor: "#14467B" }}>Patient Name</TableCell>
//                   <TableCell sx={{ color: "white", fontWeight: "bold", bgcolor: "#14467B"  }}>Appointment Reason</TableCell>
//                   <TableCell sx={{ color: "white", fontWeight: "bold" , bgcolor: "#14467B" }}>Appointment Date</TableCell>
//                   <TableCell sx={{ color: "white", fontWeight: "bold", bgcolor: "#14467B"  }}>Link</TableCell>
//                   <TableCell sx={{ color: "white", fontWeight: "bold", bgcolor: "#14467B"  }}>Status</TableCell>
//                   <TableCell sx={{ color: "white", fontWeight: "bold" , bgcolor: "#14467B" }}>Actions</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {filteredUsers.length > 0 ? (
//                   filteredUsers.reverse().map((user) => (
//                     <TableRow key={user.appointmentId}>
//                       <TableCell sx={{fontWeight:"bold"}}>{user.doctor.id}</TableCell>
//                       <TableCell>{user.appointmentId}</TableCell>
//                       <TableCell>{user.patient.name}</TableCell>
//                       <TableCell>{user.appointmentReason}</TableCell>
//                       <TableCell>{new Date(user.appointmentDate).toLocaleString()}</TableCell>
//                       <TableCell>
//                         {user.appointmentLink ? (
//                           <a
//                             href={user.appointmentLink}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             style={{ color: "blue", textDecoration: "underline" }}
//                           >
//                             Link
//                           </a>
//                         ) : (
//                           "N/A"
//                         )}
//                       </TableCell>
//                       <TableCell sx={{ color: "#1BC646", fontWeight: "bold" }}>
//                         {user.status}
//                       </TableCell>
//                       <TableCell>
//                         <IconButton onClick={(e) => handleClick(e, user.appointmentId)}>
//                           <MoreVertIcon sx={{ fontSize: "1.5rem", color: "black" }} />
//                         </IconButton>
//                       </TableCell>
//                     </TableRow>
//                   ))
//                 ) : (
//                   <TableRow>
//                     <TableCell colSpan={8} align="center">
//                       <Typography variant="body2">No patients available currently</Typography>
//                     </TableCell>
//                   </TableRow>
//                 )}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         )}

//         <Menu
//           anchorEl={anchorEl}
//           open={open}
//           onClose={handleClose}
//           PaperProps={{
//             elevation: 3,
//           }}
//         >
//           <MenuItem
//             onClick={() =>
//               handleMenuItemClick(
//                 "Join Consultation",
//                 filteredUsers.find((user) => user.appointmentId === selectedUserId)
//               )
//             }
//             sx={{ fontSize: "1.1rem", padding: "12px 24px" }}
//           >
//             Join Consultation
//           </MenuItem>
//         </Menu>
//       </Box>
//     </Box>
//   );
// };

// export default AppointmentScheduleView;
