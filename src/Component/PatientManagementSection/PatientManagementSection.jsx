
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import BACKEND_LOCAL from "../../Api";
import AddIcon from '@mui/icons-material/Add';
import axiosInstance from "../interceptors/AxiosInstance";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const PatientManagementSection = () => {
  const [patients, setPatients] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [patientForm, setPatientForm] = useState({
    id: 0,
    name: "",
    dateOfBirth: "",
    email: "",
    contactInformation: "",
    gender: "",
  });
  const back = process.env.REACT_APP_BACKEND_LOCAL;
  const fetchPatients = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const res = await axiosInstance.get(`/api/v0.1/Patients`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPatients(res.data);
    } catch (error) {
      toast.error("Error fetching patients.");
      console.error("Error fetching patients:", error);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPatientForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenderChange = (e) => {
    setPatientForm((prev) => ({ ...prev, gender: e.target.value }));
  };

  const handleOpenDialog = (patient = null) => {
    if (patient) {
      setEditMode(true);
      setPatientForm(patient);
    } else {
      setEditMode(false);
      setPatientForm({
        id: 0,  
        name: "",
        dateOfBirth: "",
        email: "",
        contactInformation: "",
        gender: "",
      });
    }
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const validateForm = () => {
    const { name, dateOfBirth, email, contactInformation, gender } = patientForm;
    if (!name || !dateOfBirth || !email || !contactInformation || !gender) {
      toast.error("All fields are required." , {autoClose:2000});
      return false;
    }
    
    if (!editMode && patientForm.id < 0) {
      toast.error("ID must be a non-negative number." , {autoClose:2000});
      return false;
    }
    return true;
  };

  const handleSavePatient = async () => {
    if (!validateForm()) return;

    try {
      const token = localStorage.getItem("authToken");
      if (editMode) {
        await axiosInstance.put(`/api/v0.1/Patients/${patientForm.id}`, patientForm, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Patient updated successfully." , {autoClose:2000});
      } else {
        
        const newPatientForm = { ...patientForm, id: parseInt(patientForm.id, 10) || 0 };
        await axiosInstance.post(`/api/v0.1/Patients`, newPatientForm, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Patient added successfully." , {autoClose:2000});
      }
      fetchPatients();
      handleCloseDialog();
    } catch (error) {
      toast.error("Error saving patient." , {autoClose:2000});
      console.error("Error saving patient:", error);
    }
  };

  const handleOpenDeleteDialog = (patient) => {
    setSelectedPatient(patient);
    setDeleteDialogOpen(true);
  };

  const handleDeletePatient = async () => {
    try {
      const token = localStorage.getItem("authToken");
      await axiosInstance.delete(`/api/v0.1/Patients/${selectedPatient.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Patient deleted successfully.");
      fetchPatients();
      setDeleteDialogOpen(false);
    } catch (error) {
      toast.error("Error deleting patient.");
      console.error("Error deleting patient:", error);
    }
  };

  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ padding: "10px",backgroundColor:"#f5f2f2" }}>
    

      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
        <TextField
          label="Search Patients"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{backgroundColor:"white"}}
        />
        <Button variant="contained" sx={{bgcolor:"#1f4e7a"}} onClick={() => handleOpenDialog()} startIcon={<AddIcon sx={{fontSize:52}}/>}>
          Add New Patient
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{bgcolor:"#3ab6bb",color:"white"}}>
              <TableCell sx={{fontWeight:"bold",color:"white"}}>ID</TableCell>
              <TableCell sx={{fontWeight:"bold",color:"white"}}>Name</TableCell>
              <TableCell sx={{fontWeight:"bold",color:"white"}}>Date of Birth</TableCell>
              <TableCell sx={{fontWeight:"bold",color:"white"}}>Email</TableCell>
              <TableCell sx={{fontWeight:"bold",color:"white"}}>Contact Information</TableCell>
              <TableCell sx={{fontWeight:"bold",color:"white"}}>Gender</TableCell>
              <TableCell sx={{fontWeight:"bold",color:"white"}}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPatients.length > 0 ? (
              filteredPatients.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell>{patient.id}</TableCell>
                  <TableCell>{patient.name}</TableCell>
                  <TableCell>{new Date(patient.dateOfBirth).toLocaleDateString()}</TableCell>
                
                  <TableCell>{patient.email}</TableCell>
                  <TableCell>{patient.contactInformation}</TableCell>
                  <TableCell>{patient.gender === 1 ? "Male" : "Female"}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleOpenDialog(patient)}>
                      <Edit color="success" />
                    </IconButton>
                    <IconButton onClick={() => handleOpenDeleteDialog(patient)}>
                      <Delete color="error" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  {/* No patients found. */}
                  <CircularProgress/>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={dialogOpen} onClose={handleCloseDialog} TransitionComponent={Transition}>
        <DialogTitle>{editMode ? "Edit Patient" : "Add Patient"}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Name"
            name="name"
            value={patientForm.name}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            margin="dense"
            name="dateOfBirth"
            type="date"
            value={patientForm.dateOfBirth}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Email"
            name="email"
            value={patientForm.email}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Contact Information"
            name="contactInformation"
            value={patientForm.contactInformation}
            onChange={handleInputChange}
            fullWidth
          />
          <Select
            value={patientForm.gender}
            onChange={handleGenderChange}
            fullWidth
            displayEmpty
          >
            <MenuItem value="" disabled>
              Select Gender
            </MenuItem>
            <MenuItem value={1}>Male</MenuItem>
            <MenuItem value={2}>Female</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSavePatient}>Save</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)} TransitionComponent={Transition}>
        <DialogTitle>Are you sure you want to delete this patient?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDeletePatient} color="error">Delete</Button>
        </DialogActions>
      </Dialog>

      <ToastContainer />
    </div>
  );
};

export default PatientManagementSection;
