
import * as React from 'react';
import {
  Box, Button, Typography, Dialog, DialogTitle, DialogContent,
  DialogActions, TextField, Stack, CircularProgress
} from '@mui/material';
import { FaPlusCircle } from 'react-icons/fa';
import BACKEND_LOCAL from '../../Api';
import { toast, ToastContainer } from 'react-toastify';

export default function DoctorDialog() {
  const [open, setOpen] = React.useState({ add: false });
  const [fileNames, setFileNames] = React.useState({
    LicenseDocument: '', Identification: '', CertificateDocument: ''
  });
  
  const [formData, setFormData] = React.useState({
    Name: '', UserName: '', Specialization: '', Experience: '',
    Address: '', PhoneNumber: '', Email: '', Password: '',
    License: '', Certification: '', LicenseDocument: null,
    Identification: null, CertificateDocument: null,
  });

  const [loading, setLoading] = React.useState(false); 
  const back = process.env.REACT_APP_BACKEND_LOCAL;
  const handleOpen = () => setOpen((prev) => ({ ...prev, add: true }));
  const handleClose = () => setOpen({ add: false });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files.length > 0) {
      setFormData((prevData) => ({ ...prevData, [name]: files[0] }));
      setFileNames((prevNames) => ({ ...prevNames, [name]: files[0].name }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const version = '0.1';
    const data = new FormData();

    for (const key in formData) {
      if (formData[key]) data.append(key, formData[key]);
    }

    try {
      const token = localStorage.getItem('authToken');

      const response = await fetch(`${back}/api/v${version}/Doctor`, {
        method: 'POST',
        body: data,
        headers: {
          'Authorization': `Bearer ${token}`, 
        },
      });

      if (response.ok) {
        toast.success('Doctor added successfully!');
        handleClose();
        resetForm();
      } else {
        const errorText = await response.text(); 
        console.error('Error response:', errorText); 
        toast.error(`Error: ${errorText || 'Something went wrong'}`);
      }
    } catch (error) {
      console.error('Error adding doctor:', error);
      toast.error('An error occurred. Please try again.');
    } finally {
      setLoading(false); 
    }
  };

  const resetForm = () => {
    setFormData({
      Name: '', UserName: '', Specialization: '', Experience: '',
      Address: '', PhoneNumber: '', Email: '', Password: '',
      License: '', Certification: '', LicenseDocument: null,
      Identification: null, CertificateDocument: null,
    });
    setFileNames({
      LicenseDocument: '', Identification: '', CertificateDocument: ''
    });
  };

  return (
    <Box>
      <Button
        onClick={handleOpen}
        variant="contained"
        sx={{ bgcolor: '#14467b', color: 'white', p: 1 }}
        fullWidth
        startIcon={<FaPlusCircle />}
      >
        <Typography fontSize={12}>Add Doctor</Typography>
      </Button>

      <Dialog open={open.add} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Add Doctor</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={2} component="form" onSubmit={handleSubmit} encType="multipart/form-data">
            <TextField label="Name" name="Name" value={formData.Name} onChange={handleChange} required fullWidth />
            <TextField label="Username" name="UserName" value={formData.UserName} onChange={handleChange} required fullWidth />
            <TextField label="Specialization" name="Specialization" value={formData.Specialization} onChange={handleChange} required fullWidth />
            <TextField label="Experience" name="Experience" type="number" value={formData.Experience} onChange={handleChange} required fullWidth />
            <TextField label="Address" name="Address" value={formData.Address} onChange={handleChange} fullWidth />
            <TextField label="Phone Number" name="PhoneNumber" value={formData.PhoneNumber} onChange={handleChange} required fullWidth />
            <TextField label="Email" name="Email" type="email" value={formData.Email} onChange={handleChange} required fullWidth />
            <TextField label="Password" name="Password" type="password" value={formData.Password} onChange={handleChange} required fullWidth />
            <TextField label="License" name="License" value={formData.License} onChange={handleChange} fullWidth />
            <TextField label="Certification" name="Certification" value={formData.Certification} onChange={handleChange} fullWidth />

            <Button variant="outlined" component="label" fullWidth>
              Upload License Document
              <input type="file" name="LicenseDocument" hidden onChange={handleChange} />
            </Button>
            <Typography>{fileNames.LicenseDocument}</Typography>

            <Button variant="outlined" component="label" fullWidth>
              Upload Identification
              <input type="file" name="Identification" hidden onChange={handleChange} />
            </Button>
            <Typography>{fileNames.Identification}</Typography>

            <Button variant="outlined" component="label" fullWidth>
              Upload Certificate Document
              <input type="file" name="CertificateDocument" hidden onChange={handleChange} />
            </Button>
            <Typography>{fileNames.CertificateDocument}</Typography>

            <Button 
              type="submit" 
              variant="contained" 
              sx={{ bgcolor: '#14467b', position: 'relative' }} 
              fullWidth
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} sx={{ position: 'absolute', left: '50%', top: '50%', marginLeft: '-12px', marginTop: '-12px' }} />
              ) : (
                'Submit'
              )}
            </Button>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined" fullWidth>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer/>
    </Box>
  );
}
