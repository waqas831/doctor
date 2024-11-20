// import React from 'react'

// function ActivityLogs() {
//   return (
//     <div>ActivityLogs</div>
//   )
// }

// export default ActivityLogs

import axios from 'axios';
import {
  Box,
  Select,
  MenuItem,
  Typography,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
} from '@mui/material';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import BACKEND_LOCAL from '../../../Api';

const ActivityLogs = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState('');
  const [doctorLogs, setDoctorLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10; 
  const token = localStorage.getItem('authToken');
  const back = process.env.REACT_APP_BACKEND_LOCAL;
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get(
          `${back}/api/v0.1/Doctor`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setDoctors(res.data.reverse());
      } catch (error) {
        toast.error('Failed to fetch doctors.');
        console.error('Doctor fetch error:', error);
      }
    };
    fetchDoctors();
  }, []);

  const fetchDoctorLogs = async (doctorId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `${back}/api/v0.1/Doctor/GetDoctorLogs`,
        {
          params: { doctorId },
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setDoctorLogs(response.data);
    } catch (error) {
      setError('Failed to fetch doctor logs');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDoctorChange = (event) => {
    const doctorId = event.target.value;
    setSelectedDoctorId(doctorId);
    if (doctorId) {
      fetchDoctorLogs(doctorId);
    } else {
      setDoctorLogs([]); 
    }
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const totalPages = Math.ceil(doctorLogs.length / rowsPerPage);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentLogs = doctorLogs.slice(indexOfFirstRow, indexOfLastRow);

  return (
    <Box p={3}>
      <Box mb={3}>
        <Select
          value={selectedDoctorId}
          onChange={handleDoctorChange}
          displayEmpty
          fullWidth
          variant="outlined"
        >
          <MenuItem value="" disabled>
            Select a Doctor
          </MenuItem>
          {doctors.map((doctor) => (
            <MenuItem key={doctor.id} value={doctor.id}>
              {doctor.name}
            </MenuItem>
          ))}
        </Select>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={3}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error" align="center">
          {error}
        </Typography>
      ) : (
        <>
          {doctorLogs.length > 0 ? (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Doctor Name</TableCell>
                    <TableCell>Login Time</TableCell>
                    <TableCell>Logout Time</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {currentLogs.map((log, index) => (
                    <TableRow key={index}>
                      <TableCell>{log.doctorName}</TableCell>
                      <TableCell>{new Date(log.loginTime).toLocaleString()}</TableCell>
                      <TableCell>
                        {log.logoutTime ? new Date(log.logoutTime).toLocaleString() : 'Still logged in'}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography variant="body1" align="center">
              No logs available for the selected doctor.
            </Typography>
          )}

          {totalPages > 1 && (
            <Box display="flex" justifyContent="center" mt={2}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
              />
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default ActivityLogs;
