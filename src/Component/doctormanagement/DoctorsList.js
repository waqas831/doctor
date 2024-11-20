


// import React, { useEffect, useState } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Button,
//   Typography,
//   Box,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   TextField,
//   CircularProgress,
//   IconButton,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Tooltip,
// } from "@mui/material";
// import { FaPlusCircle } from "react-icons/fa";
// import { Delete, Edit } from "@mui/icons-material";
// import { toast, ToastContainer } from "react-toastify";
// import axios from "axios";
// import BACKEND_LOCAL from "../../Api";
// import { Link } from "react-router-dom";

// const DoctorList = () => {
//   const [doctors, setDoctors] = useState([]);
//   const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
//   const [openEditDialog, setOpenEditDialog] = useState(false);
//   const [selectedDoctor, setSelectedDoctor] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [openAdd, setOpenAdd] = useState(false);
//   const back = process.env.REACT_APP_BACKEND_LOCAL;
//   const [formData, setFormData] = useState({
//     Name: "",
//     UserName: "",
//     Specialization: "",
//     Experience: "",
//     Address: "",
//     PhoneNumber: "",
//     Email: "",
//     Password: "",
//     License: "",
//     Certification: "",
//     LicenseDocument: null,
//     Identification: null,
//     CertificateDocument: null,
//     ProfilePictureUrl: "https://gplineblobstorage.blob.core.windows.net/documents/noimage.png",
//     // ProfilePictureUrl: ""
//     IMC:"",

//   });

//   const token = localStorage.getItem("authToken");

//   const fetchDoctorsData = async () => {
//     try {
//       const res = await axios.get(`${back}/api/v0.1/Doctor`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setDoctors(res.data.reverse());
//       console.log("Doctors fetched successfully", res.data);
//     } catch (error) {
//       console.error("Error fetching doctors:", error);
//     }
//   };

//   const handleOpenAdd = () => setOpenAdd(true);
//   const handleCloseAdd = () => {
//     setOpenAdd(false);
//     resetForm();
//   };

//   const handleOpenEdit = (doctor) => {
//     setSelectedDoctor(doctor);
//     setFormData({
//       Name: doctor.userName,
//       UserName: doctor.userName,
//       Specialization: doctor.specialization,
//       Experience: doctor.experience,
//       Address: doctor.address,
//       PhoneNumber: doctor.phoneNumber,
//       Email: doctor.email,
//       License: doctor.license,
//       Certification: doctor.certification,
//       LicenseDocument: null,
//       Identification: null,
//       CertificateDocument: null,
//       // ProfilePictureUrl: " "
      
//     });
//     setOpenEditDialog(true);
//   };

//   const handleCloseEdit = () => {
//     setOpenEditDialog(false);
//     setSelectedDoctor(null);
//   };

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     setFormData((prev) => ({ 
//       ...prev, 
//       [name]: files ? files[0] : value 
//     }));
//   };
//   const prepareFormData = () => {
//     const data = new FormData();
//     Object.entries(formData).forEach(([key, value]) => {
//       if (value) data.append(key, value);
//     });
//     return data;
//   };
  

// const handleSubmitAdd = async (e) => {
//   e.preventDefault();
//   setLoading(true);
//   const data = new FormData();
//   Object.entries(formData).forEach(([key, value]) => {
//     if (value) data.append(key, value);
//   });
//   try {
//     const response = await axios.post(`${back}/api/v0.1/Doctor`, data, {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     if (response.status === 200) {
//       toast.success("Doctor added successfully!");
//       fetchDoctorsData();
//       handleCloseAdd();
//     }
//   } catch (error) {
//     toast.error("Failed to add doctor.");
//   } finally {
//     setLoading(false);
//   }
// };

//   const handleSubmitEdit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     const data = new FormData();

//     for (const key in formData) {
//       if (formData[key] !== null && formData[key] !== "") {
//         data.append(key, formData[key]);
//       }
//     }

//     try {
//       const response = await axios.put(
//         `${back}/api/v0.1/Doctor/${selectedDoctor.id}`,
//         data,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       console.log("Response from edit API:", response.data); 

//       if (response.status === 200) {
//         toast.success("Doctor updated successfully!", {autoClose:2000});
//         fetchDoctorsData();
//         handleCloseEdit();
//       } else {
//         const errorText = response.data; 
//         toast.error(`Error: ${errorText || "Something went wrong"}`);
//       }
//     } catch (error) {
//       console.error("Error updating doctor:", error);
//       toast.error("An error occurred. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const resetForm = () => {
//     setFormData({
//       Name: "",
//       UserName: "",
//       Specialization: "",
//       Experience: "",
//       Address: "",
//       PhoneNumber: "",
//       Email: "",
//       Password: "",
//       License: "",
//       Certification: "",
//       LicenseDocument: null,
//       Identification: null,
//       CertificateDocument: null,
//       ProfilePictureUrl:""
//     });
//   };

//   const deleteDoctorApi = async (doctorId) => {
//     try {
//       await axios.delete(`${back}/api/v0.1/Doctor/${doctorId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setDoctors((prev) => prev.filter((doc) => doc.id !== doctorId));
//       toast.success("Doctor deleted successfully!", {autoClose:2000});
//     } catch (error) {
//       console.error("Error deleting doctor:", error);
//       toast.error("Failed to delete doctor.");
//     }
//   };

//   const handleDeleteDoctor = () => {
//     if (selectedDoctor) {
//       deleteDoctorApi(selectedDoctor.id);
//       setOpenDeleteDialog(false);
//     }
//   };

//   useEffect(() => {
//     fetchDoctorsData();
//   }, []);

//   return (
//     <Box width={"auto"}>
//       <Box
//         sx={{ display: "flex", justifyContent: "space-between", my: 2, mx: 1 }}
//       >
//         <Typography variant="h4" color="#14467b" fontWeight={"bold"} >Doctor List</Typography>
//         <Button
//           onClick={handleOpenAdd}
//           variant="contained"
//           sx={{ bgcolor: "#14467b", color: "white" }}
//           startIcon={<FaPlusCircle />}
//         >
//           Add Doctor
//         </Button>
//       </Box>
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
//               <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
//               <TableCell sx={{ fontWeight: "bold" }}>Specialization</TableCell>
//               <TableCell sx={{ fontWeight: "bold" }}>License</TableCell>
//               <TableCell sx={{ fontWeight: "bold" }}>Identification</TableCell>
//               <TableCell sx={{ fontWeight: "bold" }}>Certificate</TableCell>
//               <TableCell sx={{ fontWeight: "bold" }}>Experience</TableCell>
//               <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
//             </TableRow>
//           </TableHead>
          
//           <TableBody>
//   {doctors.length > 0 ? (
//     doctors.map((doctor) => (
//       <TableRow key={doctor.id || doctor.doctorId}>
//         <TableCell>
//           <Tooltip title="Click for more info" placement="top">
//             <Link to="/doctor-details" state={{ doctor }}>
//               <Typography
//                 sx={{ ":hover": { color: "purple" }, fontSize: 14 }}
//               >
//                 {doctor.userName}
//               </Typography>
//             </Link>
//           </Tooltip>
//         </TableCell>
//         <TableCell>{doctor.email}</TableCell>
//         <TableCell>{doctor.specialization}</TableCell>
//         <TableCell>
//           <Tooltip title="Click to download license Document" placement="top">
//             <a
//               href={doctor.licenseDocument}
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               Download
//             </a>
//           </Tooltip>
//         </TableCell>
//         <TableCell>
//           <Tooltip title="Click to download identification Document" placement="top">
//             <a
//               href={doctor.identification}
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               Download
//             </a>
//           </Tooltip>
//         </TableCell>
//         <TableCell>
//           <Tooltip title="Click to download certificate Document" placement="top">
//             <a
//               href={doctor.certificateDocument}
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               Download
//             </a>
//           </Tooltip>
//         </TableCell>
//         <TableCell>{doctor.experience}</TableCell>
//         <TableCell>
//           <IconButton onClick={() => handleOpenEdit(doctor)}>
//             <Tooltip title="Click to edit doctor">
//               <Edit color="primary" />
//             </Tooltip>
//           </IconButton>
//           <IconButton
//             onClick={() => {
//               setOpenDeleteDialog(true);
//               setSelectedDoctor(doctor);
//             }}
//           >
//             <Tooltip title="Click to delete doctor">
//               <Delete color="error" />
//             </Tooltip>
//           </IconButton>
//         </TableCell>
//       </TableRow>
//     ))
//   ) : (
//     <TableRow>
//       <TableCell colSpan={8} align="center">
//         <CircularProgress />
//       </TableCell>
//     </TableRow>
//   )}
// </TableBody>

//         </Table>
//       </TableContainer>

//       <Dialog open={openAdd} onClose={handleCloseAdd}>
//         <DialogTitle style={{ marginLeft: "10px" }}>Add Doctor</DialogTitle>
//         <DialogContent>
//           <form onSubmit={handleSubmitAdd}>
//             <TextField
//               name="Name"
//               label="Name"
//               fullWidth
//               required
//               onChange={handleChange}
//               style={{ marginBottom: "15px", marginTop: "10px" }}
//             />
//             <TextField
//               name="UserName"
//               label="User Name"
//               fullWidth
//               required
//               onChange={handleChange}
//               style={{ marginBottom: "15px" }}
//             />
//             <TextField
//               name="Specialization"
//               label="Specialization"
//               fullWidth
//               required
//               onChange={handleChange}
//               style={{ marginBottom: "15px" }}
//             />
//             <TextField
//               name="Experience"
//               label="Experience"
//               fullWidth
//               required
//               onChange={handleChange}
//               style={{ marginBottom: "15px" }}
//             />
//             <TextField
//               name="Address"
//               label="Address"
//               fullWidth
//               required
//               onChange={handleChange}
//               style={{ marginBottom: "15px" }}
//             />
//             <TextField
//               name="PhoneNumber"
//               label="Phone Number"
//               type="number"
//               fullWidth
//               required
//               onChange={handleChange}
//               style={{ marginBottom: "15px" }}
//             />
//             <TextField
//               name="Email"
//               label="Email"
//               type="email"
//               fullWidth
//               required
//               onChange={handleChange}
//               style={{ marginBottom: "15px" }}
//             />
//             <TextField
//               name="Password"
//               type="password"
//               label="Password"
//               fullWidth
//               required
//               onChange={handleChange}
//               style={{ marginBottom: "15px" }}
//             />
//              {/* <TextField
//               name="ProfilePictureUrl"
//               type="text"
//               label="ProfilePictureUrl"
//               fullWidth
//               // required
//               onChange={(e)=>setProfilePictureUrl(e.target.value)}
//               style={{ marginBottom: "15px" }}
//               // sx={{display:"none"}}
//               value={"https://gplineblobstorage.blob.core.windows.net/documents/noimage.png"}
//             /> */}
//             <TextField
//   name="ProfilePictureUrl"
//   type="text"
//   label="Profile Picture URL"
//   fullWidth
//   style={{ marginBottom: "15px" }}
//   disabled
//   value={formData.ProfilePictureUrl}
// />

//             <FormControl fullWidth required style={{ marginBottom: "15px" }}>
//               <InputLabel id="license-label">License</InputLabel>
//               <Select
//                 labelId="license-label"
//                 name="License"
//                 onChange={handleChange}
//                 defaultValue=""
//               >
//                 <MenuItem value="Yes">Yes</MenuItem>
//                 <MenuItem value="No">No</MenuItem>
//               </Select>
//             </FormControl>

//             <FormControl fullWidth required style={{ marginBottom: "15px" }}>
//               <InputLabel id="certification-label">Certification</InputLabel>
//               <Select
//                 labelId="certification-label"
//                 name="Certification"
//                 onChange={handleChange}
//                 defaultValue=""
//               >
//                 <MenuItem value="Yes">Yes</MenuItem>
//                 <MenuItem value="No">No</MenuItem>
//               </Select>
//             </FormControl>

//             <Box>
//               <Typography
//                 fontWeight={"bold"}
//                 fontSize={14}
//                 style={{ marginBottom: "5px" }}
//               >
//                 License Document
//               </Typography>
//               <input
//                 type="file"
//                 name="LicenseDocument"
//                 onChange={handleChange}
//                 required
//                 style={{ marginBottom: "15px" }}
//               />
//             </Box>
//             <Box>
//               <Typography
//                 fontWeight={"bold"}
//                 fontSize={14}
//                 style={{ marginBottom: "5px" }}
//               >
//                 Identification Document
//               </Typography>
//               <input
//                 type="file"
//                 name="Identification"
//                 onChange={handleChange}
//                 required
//                 style={{ marginBottom: "15px" }}
//               />
//             </Box>
//             <Box>
//               <Typography
//                 fontWeight={"bold"}
//                 fontSize={14}
//                 style={{ marginBottom: "5px" }}
//               >
//                 Certificate Document
//               </Typography>
//               <input
//                 type="file"
//                 name="CertificateDocument"
//                 onChange={handleChange}
//                 required
//                 style={{ marginBottom: "15px" }}
//               />
//             </Box>

//             <DialogActions>
//               <Button onClick={handleCloseAdd}>Cancel</Button>
//               <Button type="submit" disabled={loading}>
//                 {loading ? <CircularProgress size={24} /> : "Add"}
//               </Button>
//             </DialogActions>
//           </form>
//         </DialogContent>
//       </Dialog>

//       <Dialog open={openEditDialog} onClose={handleCloseEdit}>
//         <DialogTitle>Edit Doctor</DialogTitle>
//         <DialogContent>
//           <form onSubmit={handleSubmitEdit}>
//             <TextField
//               name="Name"
//               label="Name"
//               fullWidth
//               required
//               value={formData.Name}
//               onChange={handleChange}
//               style={{ marginBottom: "15px", marginTop: "10px" }}
//             />
//             <TextField
//               name="UserName"
//               label="User Name"
//               fullWidth
//               required
//               value={formData.UserName}
//               onChange={handleChange}
//               style={{ marginBottom: "15px" }}
//             />
//             <TextField
//               name="Specialization"
//               label="Specialization"
//               fullWidth
//               required
//               value={formData.Specialization}
//               onChange={handleChange}
//               style={{ marginBottom: "15px" }}
//             />
//             <TextField
//               name="Experience"
//               label="Experience"
//               fullWidth
//               required
//               value={formData.Experience}
//               onChange={handleChange}
//               style={{ marginBottom: "15px" }}
//             />
//             <TextField
//               name="Address"
//               label="Address"
//               fullWidth
//               required
//               value={formData.Address}
//               onChange={handleChange}
//               style={{ marginBottom: "15px" }}
//             />
//             <TextField
//               name="PhoneNumber"
//               label="Phone Number"
//               fullWidth
//               required
//               value={formData.PhoneNumber}
//               onChange={handleChange}
//               style={{ marginBottom: "15px" }}
//             />
//             <TextField
//               name="Email"
//               label="Email"
//               fullWidth
//               required
//               value={formData.Email}
//               onChange={handleChange}
//               style={{ marginBottom: "15px" }}
//             />
           
//             <FormControl fullWidth required style={{ marginBottom: "15px" }}>
//               <InputLabel id="license-label">License</InputLabel>
//               <Select
//                 labelId="license-label"
//                 name="License"
//                 value={formData.License}
//                 onChange={handleChange}
//                 // defaultValue={0}
//               >
//               <MenuItem value={formData.License}>{formData.License}</MenuItem>
//                 <MenuItem value="Yes">Yes</MenuItem>
//                 <MenuItem value="No">No</MenuItem>
//               </Select>
//             </FormControl>

//             <FormControl fullWidth required style={{ marginBottom: "15px" }}>
//               <InputLabel id="certification-label">Certification</InputLabel>
//               <Select
//                 labelId="certification-label"
//                 name="Certification"
//                 value={formData.Certification}
//                 onChange={handleChange}
//                 defaultValue={formData.Certification}
//               >
//               <MenuItem value={formData.Certification}>{formData.Certification}</MenuItem>
//                 <MenuItem value="Yes">Yes</MenuItem>
//                 <MenuItem value="No">No</MenuItem>
//               </Select>
//             </FormControl>

//             <Box>
//               <Typography
//                 fontWeight={"bold"}
//                 fontSize={14}
//                 style={{ marginBottom: "5px" }}
//               >
//                 License Document
//               </Typography>
//               <input
//                 type="file"
//                 name="LicenseDocument"
//                 onChange={handleChange}
//                 style={{ marginBottom: "15px" }}
//                 required
//               />
//             </Box>
//             <Box>
//               <Typography
//                 fontWeight={"bold"}
//                 fontSize={14}
//                 style={{ marginBottom: "5px" }}
//               >
//                 Identification Document
//               </Typography>
//               <input
//                 type="file"
//                 name="Identification"
//                 onChange={handleChange}
//                 style={{ marginBottom: "15px" }}
//                 required
//               />
//             </Box>
//             <Box>
//               <Typography
//                 fontWeight={"bold"}
//                 fontSize={14}
//                 style={{ marginBottom: "5px" }}
//               >
//                 Certificate Document
//               </Typography>

//               <input
//                 type="file"
//                 name="CertificateDocument"
//                 onChange={handleChange}
//                 style={{ marginBottom: "15px" }}
//                 required
//               />
//             </Box>

//             <DialogActions>
//               <Button onClick={handleCloseEdit}>Cancel</Button>
//               <Button type="submit" disabled={loading}>
//                 {loading ? <CircularProgress size={24} /> : "Update"}
//               </Button>
//             </DialogActions>
//           </form>
//         </DialogContent>
//       </Dialog>

//       <Dialog
//         open={openDeleteDialog}
//         onClose={() => setOpenDeleteDialog(false)}
//       >
//         <DialogTitle>Delete Doctor</DialogTitle>
//         <DialogContent>
//           <p style={{fontSize:"17px",marginTop:"20px"}}>Are you sure you want to delete this doctor?</p>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
//           <Button onClick={handleDeleteDoctor} color="error">
//             Delete
//           </Button>
//         </DialogActions>
//       </Dialog>

//       <ToastContainer />
//     </Box>
//   );
// };

// export default DoctorList;



import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  CircularProgress,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { FaPlusCircle } from "react-icons/fa";
import { Delete, Edit } from "@mui/icons-material";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const back = process.env.REACT_APP_BACKEND_LOCAL;

  const [formData, setFormData] = useState({
    Name: "",
    UserName: "",
    Specialization: "",
    Experience: "",
    Address: "",
    PhoneNumber: "",
    Email: "",
    Password: "",
    License: "",
    Certification: "",
    LicenseDocument: null,
    Identification: null,
    CertificateDocument: null,
    ProfilePictureUrl:
      "https://gplineblobstorage.blob.core.windows.net/documents/noimage.png",
    IMC: "",
    SignatureUrl: null,
  });

  const token = localStorage.getItem("authToken");

  const fetchDoctorsData = async () => {
    try {
      const res = await axios.get(`${back}/api/v0.1/Doctor`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDoctors(res.data.reverse());
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => {
    setOpenAdd(false);
    resetForm();
  };

  const handleOpenEdit = (doctor) => {
    setSelectedDoctor(doctor);
    setFormData({
      Name: doctor.userName,
      UserName: doctor.userName,
      Specialization: doctor.specialization,
      Experience: doctor.experience,
      Address: doctor.address,
      PhoneNumber: doctor.phoneNumber,
      Email: doctor.email,
      License: doctor.license,
      Certification: doctor.certification,
      LicenseDocument: null,
      Identification: null,
      CertificateDocument: null,
      IMC: doctor.imc || "",
      SignatureUrl: null,
      ProfilePictureUrl:
        doctor.profilePictureUrl ||
        "https://gplineblobstorage.blob.core.windows.net/documents/noimage.png",
    });
    setOpenEditDialog(true);
  };

  const handleCloseEdit = () => {
    setOpenEditDialog(false);
    setSelectedDoctor(null);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const resetForm = () => {
    setFormData({
      Name: "",
      UserName: "",
      Specialization: "",
      Experience: "",
      Address: "",
      PhoneNumber: "",
      Email: "",
      Password: "",
      License: "",
      Certification: "",
      LicenseDocument: null,
      Identification: null,
      CertificateDocument: null,
      ProfilePictureUrl:
        "https://gplineblobstorage.blob.core.windows.net/documents/noimage.png",
      IMC: "",
      SignatureUrl: null,
    });
  };

  const deleteDoctorApi = async (doctorId) => {
    try {
      await axios.delete(`${back}/api/v0.1/Doctor/${doctorId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDoctors((prev) => prev.filter((doc) => doc.id !== doctorId));
      toast.success("Doctor deleted successfully!", { autoClose: 2000 });
    } catch (error) {
      console.error("Error deleting doctor:", error);
      toast.error("Failed to delete doctor.");
    }
  };

  const handleDeleteDoctor = () => {
    if (selectedDoctor) {
      deleteDoctorApi(selectedDoctor.id);
      setOpenDeleteDialog(false);
    }
  };

  const handleSubmitAdd = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${back}/api/v0.1/Doctor`,
        prepareFormData(),
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        toast.success("Doctor added successfully!");
        fetchDoctorsData();
        handleCloseAdd();
      }
    } catch (error) {
      toast.error("Failed to add doctor.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.put(
        `${back}/api/v0.1/Doctor/${selectedDoctor.id}`,
        prepareFormData(),
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        toast.success("Doctor updated successfully!");
        fetchDoctorsData();
        handleCloseEdit();
      }
    } catch (error) {
      toast.error("Failed to update doctor.");
    } finally {
      setLoading(false);
    }
  };

  const prepareFormData = () => {
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) data.append(key, value);
    });
    return data;
  };

  useEffect(() => {
    fetchDoctorsData();
  }, []);


  return (
    <Box width={"auto"}>
      <Box
        sx={{ display: "flex", justifyContent: "space-between", my: 2, mx: 1 }}
      >
        <Typography variant="h4" color="#14467b" fontWeight={"bold"} >Doctor List</Typography>
        <Button
          onClick={handleOpenAdd}
          variant="contained"
          sx={{ bgcolor: "#14467b", color: "white" }}
          startIcon={<FaPlusCircle />}
        >
          Add Doctor
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Specialization</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>License</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Identification</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Certificate</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Experience</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          
          <TableBody>
  {doctors.length > 0 ? (
    doctors.map((doctor) => (
      <TableRow key={doctor.id || doctor.doctorId}>
        <TableCell>
          <Tooltip title="Click for more info" placement="top">
            <Link to="/doctor-details" state={{ doctor }}>
              <Typography
                sx={{ ":hover": { color: "purple" }, fontSize: 14 }}
              >
                {doctor.userName}
              </Typography>
            </Link>
          </Tooltip>
        </TableCell>
        <TableCell>{doctor.email}</TableCell>
        <TableCell>{doctor.specialization}</TableCell>
        <TableCell>
          <Tooltip title="Click to download license Document" placement="top">
            <a
              href={doctor.licenseDocument}
              target="_blank"
              rel="noopener noreferrer"
            >
              Download
            </a>
          </Tooltip>
        </TableCell>
        <TableCell>
          <Tooltip title="Click to download identification Document" placement="top">
            <a
              href={doctor.identification}
              target="_blank"
              rel="noopener noreferrer"
            >
              Download
            </a>
          </Tooltip>
        </TableCell>
        <TableCell>
          <Tooltip title="Click to download certificate Document" placement="top">
            <a
              href={doctor.certificateDocument}
              target="_blank"
              rel="noopener noreferrer"
            >
              Download
            </a>
          </Tooltip>
        </TableCell>
        <TableCell>{doctor.experience}</TableCell>
        <TableCell>
          <IconButton onClick={() => handleOpenEdit(doctor)}>
            <Tooltip title="Click to edit doctor">
              <Edit color="primary" />
            </Tooltip>
          </IconButton>
          <IconButton
            onClick={() => {
              setOpenDeleteDialog(true);
              setSelectedDoctor(doctor);
            }}
          >
            <Tooltip title="Click to delete doctor">
              <Delete color="error" />
            </Tooltip>
          </IconButton>
        </TableCell>
      </TableRow>
    ))
  ) : (
    <TableRow>
      <TableCell colSpan={8} align="center">
        <CircularProgress />
      </TableCell>
    </TableRow>
  )}
</TableBody>

        </Table>
      </TableContainer>

      <Dialog open={openAdd} onClose={handleCloseAdd}>
        <DialogTitle style={{ marginLeft: "10px" }}>Add Doctor</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmitAdd}>
            <TextField
              name="Name"
              label="Name"
              fullWidth
              required
              onChange={handleChange}
              style={{ marginBottom: "15px", marginTop: "10px" }}
            />
            <TextField
              name="UserName"
              label="User Name"
              fullWidth
              required
              onChange={handleChange}
              style={{ marginBottom: "15px" }}
            />
            <TextField
              name="Specialization"
              label="Specialization"
              fullWidth
              required
              onChange={handleChange}
              style={{ marginBottom: "15px" }}
            />
            <TextField
              name="Experience"
              label="Experience"
              fullWidth
              required
              onChange={handleChange}
              style={{ marginBottom: "15px" }}
            />
            <TextField
              name="Address"
              label="Address"
              fullWidth
              required
              onChange={handleChange}
              style={{ marginBottom: "15px" }}
            />
            <TextField
              name="PhoneNumber"
              label="Phone Number"
              type="number"
              fullWidth
              required
              onChange={handleChange}
              style={{ marginBottom: "15px" }}
            />
            <TextField
              name="Email"
              label="Email"
              type="email"
              fullWidth
              required
              onChange={handleChange}
              style={{ marginBottom: "15px" }}
            />
            <TextField
              name="Password"
              type="password"
              label="Password"
              fullWidth
              required
              onChange={handleChange}
              style={{ marginBottom: "15px" }}
            />
             {/* <TextField
              name="ProfilePictureUrl"
              type="text"
              label="ProfilePictureUrl"
              fullWidth
              // required
              onChange={(e)=>setProfilePictureUrl(e.target.value)}
              style={{ marginBottom: "15px" }}
              // sx={{display:"none"}}
              value={"https://gplineblobstorage.blob.core.windows.net/documents/noimage.png"}
            /> */}
            {/* <TextField
  name="ProfilePictureUrl"
  type="text"
  label="Profile Picture URL"
  fullWidth
  style={{ marginBottom: "15px" }}
  disabled
  value={formData.ProfilePictureUrl}
/> */}

            <FormControl fullWidth required style={{ marginBottom: "15px" }}>
              <InputLabel id="license-label">License</InputLabel>
              <Select
                labelId="license-label"
                name="License"
                onChange={handleChange}
                defaultValue=""
              >
                <MenuItem value="Yes">Yes</MenuItem>
                <MenuItem value="No">No</MenuItem>
              </Select>
            </FormControl>
            

            <FormControl fullWidth required style={{ marginBottom: "15px" }}>
              <InputLabel id="certification-label">Certification</InputLabel>
              <Select
                labelId="certification-label"
                name="Certification"
                onChange={handleChange}
                defaultValue=""
              >
                <MenuItem value="Yes">Yes</MenuItem>
                <MenuItem value="No">No</MenuItem>
              </Select>
            </FormControl>
            <TextField
              name="IMC"
              label="IMC"
              type="number"
              fullWidth
              onChange={handleChange}
              required
              style={{ marginBottom: "15px" }}
            />
            <Box>
              <Typography fontWeight={"bold"}>Signature</Typography>
              <input
                type="file"
                name="SignatureUrl"
                onChange={handleChange}
                accept="image/*"
                required
              />
            </Box>
            <Box>
              <Typography
                fontWeight={"bold"}
                fontSize={14}
                style={{ marginBottom: "5px" }}
              >
                License Document
              </Typography>
              <input
                type="file"
                name="LicenseDocument"
                onChange={handleChange}
                required
                style={{ marginBottom: "15px" }}
              />
            </Box>
            <Box>
              <Typography
                fontWeight={"bold"}
                fontSize={14}
                style={{ marginBottom: "5px" }}
              >
                Identification Document
              </Typography>
              <input
                type="file"
                name="Identification"
                onChange={handleChange}
                required
                style={{ marginBottom: "15px" }}
              />
            </Box>
            <Box>
              <Typography
                fontWeight={"bold"}
                fontSize={14}
                style={{ marginBottom: "5px" }}
              >
                Certificate Document
              </Typography>
              <input
                type="file"
                name="CertificateDocument"
                onChange={handleChange}
                required
                style={{ marginBottom: "15px" }}
              />
            </Box>

            <DialogActions>
              <Button onClick={handleCloseAdd}>Cancel</Button>
              <Button type="submit" disabled={loading}>
                {loading ? <CircularProgress size={24} /> : "Add"}
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={openEditDialog} onClose={handleCloseEdit}>
        <DialogTitle>Edit Doctor</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmitEdit}>
            <TextField
              name="Name"
              label="Name"
              fullWidth
              required
              value={formData.Name}
              onChange={handleChange}
              style={{ marginBottom: "15px", marginTop: "10px" }}
            />
            <TextField
              name="UserName"
              label="User Name"
              fullWidth
              required
              value={formData.UserName}
              onChange={handleChange}
              style={{ marginBottom: "15px" }}
            />
            <TextField
              name="Specialization"
              label="Specialization"
              fullWidth
              required
              value={formData.Specialization}
              onChange={handleChange}
              style={{ marginBottom: "15px" }}
            />
            <TextField
              name="Experience"
              label="Experience"
              fullWidth
              required
              value={formData.Experience}
              onChange={handleChange}
              style={{ marginBottom: "15px" }}
            />
            <TextField
              name="Address"
              label="Address"
              fullWidth
              required
              value={formData.Address}
              onChange={handleChange}
              style={{ marginBottom: "15px" }}
            />
            <TextField
              name="PhoneNumber"
              label="Phone Number"
              fullWidth
              required
              value={formData.PhoneNumber}
              onChange={handleChange}
              style={{ marginBottom: "15px" }}
            />
            <TextField
              name="Email"
              label="Email"
              fullWidth
              required
              value={formData.Email}
              onChange={handleChange}
              style={{ marginBottom: "15px" }}
            />
              <TextField
              name="IMC"
              label="IMC"
              fullWidth
              required
              value={formData.IMC}
              onChange={handleChange}
              style={{ marginBottom: "15px" }}
            />
           
            <FormControl fullWidth required style={{ marginBottom: "15px" }}>
              <InputLabel id="license-label">License</InputLabel>
              <Select
                labelId="license-label"
                name="License"
                value={formData.License}
                onChange={handleChange}
                // defaultValue={0}
              >
              <MenuItem value={formData.License}>{formData.License}</MenuItem>
                <MenuItem value="Yes">Yes</MenuItem>
                <MenuItem value="No">No</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth required style={{ marginBottom: "15px" }}>
              <InputLabel id="certification-label">Certification</InputLabel>
              <Select
                labelId="certification-label"
                name="Certification"
                value={formData.Certification}
                onChange={handleChange}
                defaultValue={formData.Certification}
              >
              <MenuItem value={formData.Certification}>{formData.Certification}</MenuItem>
                <MenuItem value="Yes">Yes</MenuItem>
                <MenuItem value="No">No</MenuItem>
              </Select>
            </FormControl>

            <Box>
              <Typography
                fontWeight={"bold"}
                fontSize={14}
                style={{ marginBottom: "5px" }}
              >
                License Document
              </Typography>
              <input
                type="file"
                name="LicenseDocument"
                onChange={handleChange}
                style={{ marginBottom: "15px" }}
               
              />
            </Box>
            <Box>
              <Typography
                fontWeight={"bold"}
                fontSize={14}
                style={{ marginBottom: "5px" }}
              >
                Identification Document
              </Typography>
              <input
                type="file"
                name="Identification"
                onChange={handleChange}
                style={{ marginBottom: "15px" }}
                
              />
            </Box>
            <Box>
              <Typography
                fontWeight={"bold"}
                fontSize={14}
                style={{ marginBottom: "5px" }}
              >
                Certificate Document
              </Typography>

              <input
                type="file"
                name="CertificateDocument"
                onChange={handleChange}
                style={{ marginBottom: "15px" }}
                
              />
            </Box>
            <Box>
              <Typography
                fontWeight={"bold"}
                fontSize={14}
                style={{ marginBottom: "5px" }}
              >
                E-Signture
              </Typography>

              <input
                type="image"
                name="CertificateDocument"
                onChange={handleChange}
                style={{ marginBottom: "15px" }}
                
              />
            </Box>
            

            <DialogActions>
              <Button onClick={handleCloseEdit}>Cancel</Button>
              <Button type="submit" disabled={loading}>
                {loading ? <CircularProgress size={24} /> : "Update"}
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      >
        <DialogTitle>Delete Doctor</DialogTitle>
        <DialogContent>
          <p style={{fontSize:"17px",marginTop:"20px"}}>Are you sure you want to delete this doctor?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
          <Button onClick={handleDeleteDoctor} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <ToastContainer />
    </Box>
  );
};

export default DoctorList;
