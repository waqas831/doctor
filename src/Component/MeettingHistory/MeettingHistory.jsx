

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Typography,
  Pagination,
  Box,
} from "@mui/material";
import BACKEND_LOCAL from "../../Api";
import axiosInstance from "../interceptors/AxiosInstance";

const MeettingHistory = () => {
  const [patientHistory, setPatientHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const token = localStorage.getItem("authToken");
  const Id = localStorage.getItem("doctorId");
  const back = process.env.REACT_APP_BACKEND_LOCAL;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(
          `/api/v0.1/Doctor/GetDoctorLogs?doctorId=${Id}`,
          {
            // params: { doctorId: 24 },
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setPatientHistory(response.data);
      } catch (error) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const totalPages = Math.ceil(patientHistory.length / rowsPerPage);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = patientHistory.slice(indexOfFirstRow, indexOfLastRow);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Box sx={{ padding: 2 }}>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center">
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error" align="center">
          {error}
        </Typography>
      ) : (
        <>
          <TableContainer component={Paper} elevation={3}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Doctor Name</strong></TableCell>
                  <TableCell><strong>Login Time</strong></TableCell>
                  <TableCell><strong>Logout Time</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentRows.map((log, index) => (
                  <TableRow key={index}>
                    <TableCell>{log.doctorName}</TableCell>
                    <TableCell>{new Date(log.loginTime).toLocaleString()}</TableCell>
                    <TableCell>{log.logoutTime ? new Date(log.logoutTime).toLocaleString() : "Still logged in"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box display="flex" justifyContent="center" mt={2}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              shape="rounded"
              showFirstButton
              showLastButton
            />
          </Box>
        </>
      )}
    </Box>
  );
};

export default MeettingHistory;
