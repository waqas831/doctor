

// import React, { useState } from "react";
// import {
//   Box, Button, CircularProgress, Table, TableBody,
//   TableCell, TableContainer, TableHead, TableRow, Paper, Typography, TextField
// } from "@mui/material";
// import { toast, ToastContainer } from 'react-toastify';
// import axiosInstance from "../interceptors/AxiosInstance";
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';
// import EuroIcon from '@mui/icons-material/Euro';
// const PaymentSection = () => {
//   const [fromDate, setFromDate] = useState('');
//   const [toDate, setToDate] = useState('');
//   const [doctorReports, setDoctorReports] = useState([]);
//   const [loadingReports, setLoadingReports] = useState(false);
//   const token = localStorage.getItem('authToken');
//   const doctorId = localStorage.getItem('doctorId');

//   const fetchDoctorReports = async () => {
//     if (!doctorId || !fromDate || !toDate) return;

//     // Date validation: Check if FromDate is earlier than ToDate
//     if (new Date(fromDate) > new Date(toDate)) {
//       toast.error("From Date cannot be later than To Date.");
//       return;
//     }

//     setLoadingReports(true);
//     try {
//       const version = '0.1';
//       const res = await axiosInstance.get(
//         `/api/v${version}/Reports/DoctorReports`,
//         {
//           params: {
//             DoctorId: doctorId,
//             Status: 1, // Adjust this if necessary
//             FromDate: fromDate,
//             ToDate: toDate,
//           },
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       setDoctorReports(res.data || []);
//       console.log('Doctor Reports fetched:', res.data);
//     } catch (error) {
//       toast.error('Failed to fetch doctor reports.');
//       console.error('Reports fetch error:', error);
//     } finally {
//       setLoadingReports(false);
//     }
//   };

//   const generatePDF = () => {
//     const doc = new jsPDF();
//     const dateNow = new Date().toLocaleDateString();
//     doc.setFontSize(18);
//     doc.text("Doctor Report", 14, 20);
//     doc.setFontSize(12);
//     doc.text(`Date: ${dateNow}`, 14, 30);

//     doc.autoTable({
//       head: [['Doctor ID', 'Doctor Name', 'Total Patients', 'Total Amount']],
//       body: doctorReports.map((report) => [
//         report.doctorId,
//         report.doctorName,
//         report.totalPatients,
//         report.totalAmount,
//       ]),
//       startY: 40,
//     });

//     doc.save('DoctorInvoice.pdf');
//   };

//   return (
//     <Box p={3}>
//       <Box display="flex" alignItems="center" gap={2} mb={3}>
//         <TextField
//           label="From Date"
//           type="date"
//           value={fromDate}
//           onChange={(e) => setFromDate(e.target.value)}
//           InputLabelProps={{ shrink: true }}
//         />
//         <TextField
//           label="To Date"
//           type="date"
//           value={toDate}
//           onChange={(e) => setToDate(e.target.value)}
//           InputLabelProps={{ shrink: true }}
//         />
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={fetchDoctorReports}
//           disabled={!fromDate || !toDate}
//         >
//           Fetch Reports
//         </Button>
//       </Box>

//       {loadingReports ? (
//         <CircularProgress />
//       ) : doctorReports.length ? (
//         <>
//           <Box display="flex" justifyContent="end" p={1}>
//             <Button variant="contained" size="small" onClick={generatePDF}>
//               Download Invoice
//             </Button>
//           </Box>

//           <TableContainer component={Paper} sx={{ my: 3, mx: 'auto' }}>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell><strong>Doctor ID</strong></TableCell>
//                   <TableCell><strong>Doctor Name</strong></TableCell>
//                   <TableCell><strong>Total Patients</strong></TableCell>
//                   <TableCell><strong>Total Amount</strong></TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {doctorReports.map((report, index) => (
//                   <TableRow key={index} hover>
//                     <TableCell>{report.doctorId}</TableCell>
//                     <TableCell>{report.doctorName}</TableCell>
//                     <TableCell>{report.totalPatients}</TableCell>
//                     <TableCell fontWeight="bold"><EuroIcon sx={{width:"15px"}} />{report.totalAmount}</TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </>
//       ) : (
//         <Typography>No reports found for the selected doctor and date range.</Typography>
//       )}
//       <ToastContainer/>
//     </Box>
//   );
// };

// export default PaymentSection;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EuroOutlinedIcon from '@mui/icons-material/EuroOutlined';
import {
  Typography,
  Select,
  MenuItem,
  Box,
  CircularProgress,
  Button,
  Divider,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
} from '@mui/material';
import { toast } from 'react-toastify';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const BillingComponent = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState('');
  const [doctorReports, setDoctorReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentDoctor, setCurrentDoctor] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const token = localStorage.getItem('authToken');
  const back = process.env.REACT_APP_BACKEND_LOCAL;
  const doctorId = localStorage.getItem('doctorId');
  // const fetchDoctors = async () => {
  //   try {
  //     const version = '0.1';
  //     const res = await axios.get(`${back}/api/v${version}/Doctor`, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });
  //     setDoctors(res.data.reverse());
  //   } catch (error) {
  //     toast.error('Failed to fetch doctors.');
  //   }
  // };

  const fetchDoctorReports = async () => {
    if ( !fromDate || !toDate) {
      toast.error('Please select a doctor and both dates.');
      return;
    }

    // Validate date range
    if (new Date(fromDate) > new Date(toDate)) {
      toast.error('From Date cannot be later than To Date.');
      return;
    }

    setLoading(true);
    try {
      const version = '0.1';
      const res = await axios.get(
        `${back}/api/v${version}/Reports/DoctorReports`,
        {
          params: {
            DoctorId: doctorId,
            Status: 2,
            FromDate: fromDate,
            ToDate: toDate,
          },
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setDoctorReports(res.data);
    } catch (error) {
      toast.error('Failed to fetch doctor reports.');
    } finally {
      setLoading(false);
    }
  };



  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const dateNow = new Date().toLocaleDateString();
    doc.setFontSize(18);
    doc.text('Doctor Reports', 14, 20);
    doc.setFontSize(12);
    doc.text(`Generated on: ${dateNow}`, 14, 30);
    doc.autoTable({
      head: [['Doctor ID', 'Doctor Name', 'Total Patients', 'Total Amount']],
      body: doctorReports.map((report) => [
        report.doctorId,
        report.doctorName,
        report.totalPatients,
        report.totalAmount,
      ]),
      startY: 40,
    });
    doc.save('DoctorReports.pdf');
  };

  useEffect(() => {
    fetchDoctorReports()
  }, []);

  return (
    <Box p={3}>
      <Typography variant="h4" color="primary" fontWeight="bold" gutterBottom>
        Doctor Reports
      </Typography>
      <Divider sx={{ mb: 3 }} />

      <Box display="flex" gap={2} mb={2} flexDirection={{ xs: 'column', sm: 'row' }}>
       
        <TextField
          label="From Date"
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="To Date"
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
      </Box>

      <Button
        variant="contained"
        color="primary"
        onClick={fetchDoctorReports}
        fullWidth
        sx={{ py: 1.5, mb: 3 }}
      >
        Fetch Reports
      </Button>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={2}>
          <CircularProgress />
        </Box>
      ) : doctorReports.length ? (
        <>
          <Box display={"flex"} justifyContent={"flex-end"}>
          <Button
            variant="contained"
            color="primary"
            onClick={generatePDF}
            sx={{ mb: 2 ,}}
          >
            Download PDF
          </Button>
          </Box>
          <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{fontWeight:"bold"}}>Doctor ID</TableCell>
                  <TableCell sx={{fontWeight:"bold"}}>Doctor Name</TableCell>
                  <TableCell sx={{fontWeight:"bold"}}>Total Patients</TableCell>
                  <TableCell sx={{fontWeight:"bold"}}>Total Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {doctorReports
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((report, index) => (
                    <TableRow key={index}>
                      <TableCell>{report.doctorId}</TableCell>
                      <TableCell>{report.doctorName}</TableCell>
                      <TableCell>{report.totalPatients}</TableCell>
                      <TableCell>
                        <EuroOutlinedIcon sx={{ height: 17 }} />
                        {report.totalAmount}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            <TablePagination
              component="div"
              count={doctorReports.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        </>
      ) : (
        <Typography align="center" mt={3}>
          No reports found for the selected doctor and date range.
        </Typography>
      )}
    </Box>
  );
};

export default BillingComponent;
