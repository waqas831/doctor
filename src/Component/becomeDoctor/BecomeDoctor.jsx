import React, { useState } from "react";
import { Box, Container, TextField, Typography, Button, Snackbar, FormControl, InputLabel, Select, MenuItem, Grid, CircularProgress } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { Link } from "react-router-dom";
import axios from "axios";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const BecomeDoctor = () => {
  const backendlink = process.env.REACT_APP_BACKEND_LOCAL;
  const [formData, setFormData] = useState({
    name: "",
    contactInfo: "",
    email: "",
    experience: "",
    specialty: "",
    qualifications: "",
    imcNumber: "",  
    availability: "",
  });

  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.values(formData).some((field) => field === "")) {
      setError(true);
      setOpen(true);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${backendlink}/api/v0.1/Email/SendDoctorRequestEmail`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200 && response.data.result) {
        setSuccess(true);
        setFormData({
          name: "",
          contactInfo: "",
          email: "",
          experience: "",
          specialty: "",
          qualifications: "",
          imcNumber: "",
          availability: "",
        });
      } else {
        setError(true);
      }
    } catch (error) {
      console.error("Error sending doctor request email:", error);
      setError(true);
    } finally {
      setLoading(false);
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSuccess(false);
    setError(false);
  };

  return (
    <>
      <Box>
        <Link to={"/"}>
          <Button variant="contained" sx={{ position: "fixed" }}>Back</Button>
        </Link>
      </Box>
      <Container maxWidth="sm">
        <Box
          sx={{
            bgcolor: '#ffffff',
            p: 4,
            borderRadius: 2,
            mt: 4,
            boxShadow: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography variant="h4" align="center" gutterBottom sx={{ color: '#003366', fontWeight: 'bold', mb: 3 }}>
            Apply as Doctor
          </Typography>
          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  sx={{ backgroundColor: '#f7f9fc' }}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="contactInfo"
                  value={formData.contactInfo}
                  onChange={handleChange}
                  required
                  type="number"
                  sx={{ backgroundColor: '#f7f9fc' }}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  type="email"
                  sx={{ backgroundColor: '#f7f9fc' }}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Years of Experience"
                  name="experience"
                  type="number"
                  value={formData.experience}
                  onChange={handleChange}
                  required
                  sx={{ backgroundColor: '#f7f9fc' }}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Specialty"
                  name="specialty"
                  value={formData.specialty}
                  onChange={handleChange}
                  required
                  sx={{ backgroundColor: '#f7f9fc' }}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Qualifications"
                  name="qualifications"
                  value={formData.qualifications}
                  onChange={handleChange}
                  required
                  sx={{ backgroundColor: '#f7f9fc' }}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="IMC Number"
                  name="imcNumber"
                  type="number"
                  value={formData.imcNumber}
                  onChange={handleChange}
                  required
                  sx={{ backgroundColor: '#f7f9fc' }}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth required sx={{ backgroundColor: '#f7f9fc' }}>
                  <InputLabel>Availability</InputLabel>
                  <Select
                    name="availability"
                    value={formData.availability}
                    onChange={handleChange}
                  >
                    <MenuItem value="full-time">Full-Time</MenuItem>
                    <MenuItem value="part-time">Part-Time</MenuItem>
                    <MenuItem value="on-call">On-Call</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ bgcolor: '#003366', '&:hover': { bgcolor: '#00509E' }, position: 'relative' }}
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Submit Application'}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={success ? "success" : "error"} sx={{ width: '100%' }}>
            {success ? "Your application has been submitted successfully!" : "An error occurred. Please try again."}
          </Alert>
        </Snackbar>
      </Container>
    </>
  );
};

export default BecomeDoctor;
