
// import React, { useEffect, useState } from "react";
// import {
//   Box, Button, Divider, TextField, CircularProgress, Table, TableBody,
//   TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Dialog,
//   DialogTitle, DialogContent, DialogActions,
//   Tooltip, TablePagination,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem
// } from "@mui/material";
// import { toast, ToastContainer } from 'react-toastify';
// import axios from 'axios';
// import BACKEND_LOCAL from "../../Api";
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';
// import axiosInstance from "../interceptors/AxiosInstance";
// import EuroOutlinedIcon from '@mui/icons-material/EuroOutlined';

// const Invoice = () => {
//   const [date, setDate] = useState('');
//   const [doctorReports, setDoctorReports] = useState([]);
//   const [loadingReports, setLoadingReports] = useState(false);
//   const [loadingInvoice, setLoadingInvoice] = useState(false);
//   const [month, setMonth] = useState('');
//   const [year, setYear] = useState('');
//   const token = localStorage.getItem('authToken');
//   const doctorId = localStorage.getItem('doctorId');
//   const [open, setOpen] = useState(false);
//   const [filteredReports, setFilteredReports] = useState([]);
//   const back = process.env.REACT_APP_BACKEND_LOCAL;
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const fetchInvoice = async () => {
//     if (!doctorId || !month || !year) return;
//     setLoadingInvoice(true);
//     try {
//       const version = '0.1';
//       const res = await axiosInstance.get(
//         `/api/v${version}/Doctor/GetDoctorInvoice/${doctorId}`,
//         {
//           params: { month, year },
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       setFilteredReports(res.data.dailySummaries || []);
//       toast.success("Invoices created");
//       console.log('Filtered Invoice Data:', res.data.dailySummaries);
//     } catch (error) {
//       toast.error('Failed to fetch invoice.');
//       console.error('Invoice fetch error:', error);
//     } finally {
//       setLoadingInvoice(false);
//     }
//   };

//   const doctInvoice = async () => {
//     setLoadingReports(true);
//     try {
//       const res = await axiosInstance.get(`${back}/api/v0.1/Invoice`, {
//         params: { doctorId: doctorId, isDetails: true }
//       });
//       setDoctorReports(res.data.reverse());
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoadingReports(false);
//     }
//   };

//   const handleDialogOpen = () => {
//     setOpen(true);
//   };

//   const handleDialogClose = () => {
//     setOpen(false);
//   };

//   const generatePDF = () => {
//     const doc = new jsPDF();
//     const dateNow = new Date().toLocaleDateString();
//     doc.setFontSize(18);
//     doc.text("Doctor Invoice", 14, 20);
//     doc.setFontSize(12);
//     doc.text(`Date: ${dateNow}`, 14, 30);

//     doc.autoTable({
//       head: [['Doctor ID', 'Doctor Name', 'Total Patients', 'Total Amount']],
//       body: filteredReports.map((report) => [
//         report.doctorId,
//         report.doctorName,
//         report.totalPatients,
//         report.totalAmount,
//       ]),
//       startY: 40,
//     });

//     doc.save('DoctorInvoice.pdf');
//   };

//   useEffect(() => {
//     doctInvoice();
//     fetchInvoice();
//   }, []);

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   return (
//     <Box p={3}>
//       <Box display="flex" justifyContent={"space-between"} alignItems="center" gap={2} mb={3}>
//         <Typography fontSize={28} fontWeight={"bold"}>Invoices</Typography>
//         <Tooltip title="Click to generate Invoice">
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={handleDialogOpen}
//           >
//             Generate Invoice
//           </Button>
//         </Tooltip>
//       </Box>

//       <Dialog open={open} onClose={handleDialogClose}>
//         <DialogTitle>Generate Doctor Invoice</DialogTitle>
//         <DialogContent>
//         <FormControl fullWidth margin="dense">
//           <InputLabel>Month</InputLabel>
//           <Select
//             value={month}
//             onChange={(e) => setMonth(e.target.value)}
//             label="Month"
//           >
//             {[...Array(12).keys()].map((m) => (
//               <MenuItem key={m + 1} value={m + 1}>{m + 1}</MenuItem>
//             ))}
//           </Select>
//         </FormControl>

//         <FormControl fullWidth margin="dense">
//           <InputLabel>Year</InputLabel>
//           <Select
//             value={year}
//             onChange={(e) => setYear(e.target.value)}
//             label="Year"
//           >
//             {[2023, 2024, 2025, 2026 ,2027,2028,2029,2030,2031].map((y) => (
//               <MenuItem key={y} value={y}>{y}</MenuItem>
//             ))}
//           </Select>
//         </FormControl>
//           <Button
//             variant="contained"
//             color="primary"
//             fullWidth
//             onClick={fetchInvoice}
//             sx={{ mt: 2 }}
//           >
//             Create
//           </Button>

//           {loadingInvoice && <CircularProgress sx={{ mt: 2 }} />}
//           {filteredReports.length > 0 && (
//             <>
//               <Typography variant="h6" style={{ marginTop: "20px" }}>
//                 Invoice Details
//               </Typography>
//               <Divider sx={{ mb: 2 }} />
//               {filteredReports.map((report, index) => (
//                 <Box
//                   key={index}
//                   display="flex"
//                   justifyContent="space-between"
//                   alignItems="center"
//                   my={1}
//                   p={1}
//                   borderRadius={1}
//                   bgcolor="#F8F9FA"
//                   sx={{
//                     "&:hover": {
//                       bgcolor: "#E2E6EA",
//                     },
//                   }}
//                 >
//                   <Typography>{index + 1}</Typography>
//                   <Typography>{new Date(report.date).toLocaleDateString()}</Typography>
//                   <Typography><EuroOutlinedIcon sx={{width:16}}/>{report.dailyTotal}</Typography>
//                   <Typography fontWeight="bold">{report.numberOfPatients}</Typography>
//                 </Box>
//               ))}
//             </>
//           )}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleDialogClose} color="secondary">
//             Cancel
//           </Button>
//           <Button onClick={generatePDF} color="primary" autoFocus>
//             Download PDF
//           </Button>
//         </DialogActions>
//       </Dialog>

//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell sx={{ fontWeight: "bold" }}>Invoice ID</TableCell>
//               <TableCell sx={{ fontWeight: "bold" }}>Doctor ID</TableCell>
//               <TableCell sx={{ fontWeight: "bold" }}>Invoice Date</TableCell>
//               <TableCell sx={{ fontWeight: "bold" }}>Doctor Name</TableCell>
//               <TableCell sx={{ fontWeight: "bold" }}>Total Amount</TableCell>
//               <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {doctorReports.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((report) => (
//               <TableRow key={report.invoiceId}>
//                 <TableCell style={{ fontWeight: "bold" }}>{report.invoiceId}</TableCell>
//                 <TableCell>{report.doctor.id}</TableCell>
//                 <TableCell>{new Date(report.invoiceDate).toLocaleString()}</TableCell>
//                 <TableCell>{report.doctor.name}</TableCell>
//                 <TableCell><EuroOutlinedIcon sx={{width:16}}/>{report.totalAmount}</TableCell>
//                 <TableCell style={{ color: report.status === 'Paid' ? 'green' :  report.status === 'Pending' ? 'darkorange' : 'black', fontWeight: "bold" }}>
//                   {report.status}
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       <TablePagination
//         rowsPerPageOptions={[5, 10, 25]}
//         component="div"
//         count={doctorReports.length}
//         rowsPerPage={rowsPerPage}
//         page={page}
//         onPageChange={handleChangePage}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//       />

//       <ToastContainer />
//     </Box>
//   );
// };

// export default Invoice;
import React, { useEffect, useState } from "react";
import {
  Box, Button, Divider, TextField, CircularProgress, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Dialog,
  DialogTitle, DialogContent, DialogActions,
  Tooltip, TablePagination,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@mui/material";
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import BACKEND_LOCAL from "../../Api";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import axiosInstance from "../interceptors/AxiosInstance";
import EuroOutlinedIcon from '@mui/icons-material/EuroOutlined';

const Invoice = () => {
  const [date, setDate] = useState('');
  const [doctorReports, setDoctorReports] = useState([]);
  const [loadingReports, setLoadingReports] = useState(false);
  const [loadingInvoice, setLoadingInvoice] = useState(false);
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const token = localStorage.getItem('authToken');
  const doctorId = localStorage.getItem('doctorId');
  const [open, setOpen] = useState(false);
  const [filteredReports, setFilteredReports] = useState([]);
  const back = process.env.REACT_APP_BACKEND_LOCAL;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const fetchInvoice = async () => {
    if (!doctorId || !month || !year) return;
    setLoadingInvoice(true);
    try {
      const version = '0.1';
      const res = await axiosInstance.get(
        `/api/v${version}/Doctor/GetDoctorInvoice/${doctorId}`,
        {
          params: { month, year },
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setFilteredReports(res.data.dailySummaries || []);
      toast.success("Invoices created");
      console.log('Filtered Invoice Data:', res.data.dailySummaries);
      doctInvoice(); // Ensure instant table update after invoice creation
    } catch (error) {
      toast.error('Failed to fetch invoice.');
      console.error('Invoice fetch error:', error);
    } finally {
      setLoadingInvoice(false);
    }
  };

  const doctInvoice = async () => {
    setLoadingReports(true);
    try {
      const res = await axiosInstance.get(`${back}/api/v0.1/Invoice`, {
        params: { doctorId: doctorId, isDetails: true }
      });
      setDoctorReports(res.data.reverse());
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingReports(false);
    }
  };

  const handleDialogOpen = () => {
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const dateNow = new Date().toLocaleDateString();
    doc.setFontSize(18);
    doc.text("Doctor Invoice", 14, 20);
    doc.setFontSize(12);
    doc.text(`Date: ${dateNow}`, 14, 30);

    doc.autoTable({
      head: [['Doctor ID', 'Doctor Name', 'Total Patients', 'Total Amount']],
      body: filteredReports.map((report) => [
        report.doctorId,
        report.doctorName,
        report.totalPatients,
        report.totalAmount,
      ]),
      startY: 40,
    });

    doc.save('DoctorInvoice.pdf');
  };

  useEffect(() => {
    doctInvoice();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box p={3}>
      <Box display="flex" justifyContent={"space-between"} alignItems="center" gap={2} mb={3}>
        <Typography fontSize={28} fontWeight={"bold"}>Invoices</Typography>
        <Tooltip title="Click to generate Invoice">
          <Button
            variant="contained"
            color="primary"
            onClick={handleDialogOpen}
          >
            Generate Invoice
          </Button>
        </Tooltip>
      </Box>

      <Dialog open={open} onClose={handleDialogClose}>
        <DialogTitle>Generate Doctor Invoice</DialogTitle>
        <DialogContent>
        <FormControl fullWidth margin="dense">
          <InputLabel>Month</InputLabel>
          <Select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            label="Month"
          >
            {[...Array(12).keys()].map((m) => (
              <MenuItem key={m + 1} value={m + 1}>{m + 1}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="dense">
          <InputLabel>Year</InputLabel>
          <Select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            label="Year"
          >
            {[2023, 2024, 2025, 2026 ,2027,2028,2029,2030,2031].map((y) => (
              <MenuItem key={y} value={y}>{y}</MenuItem>
            ))}
          </Select>
        </FormControl>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={fetchInvoice}
            sx={{ mt: 2 }}
          >
            Create
          </Button>

          {loadingInvoice && <CircularProgress sx={{ mt: 2 }} />}
          {filteredReports.length > 0 && (
            <>
              <Typography variant="h6" style={{ marginTop: "20px" }}>
                Invoice Details
              </Typography>
              <Divider sx={{ mb: 2 }} />
              {filteredReports.map((report, index) => (
                <Box
                  key={index}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  my={1}
                  p={1}
                  borderRadius={1}
                  bgcolor="#F8F9FA"
                  sx={{
                    "&:hover": {
                      bgcolor: "#E2E6EA",
                    },
                  }}
                >
                  <Typography>{index + 1}</Typography>
                  <Typography>{new Date(report.date).toLocaleDateString()}</Typography>
                  <Typography><EuroOutlinedIcon sx={{width:16}}/>{report.dailyTotal}</Typography>
                  <Typography fontWeight="bold">{report.numberOfPatients}</Typography>
                </Box>
              ))}
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={generatePDF} color="primary" autoFocus>
            Download PDF
          </Button>
        </DialogActions>
      </Dialog>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Invoice ID</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Doctor ID</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Invoice Date</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Doctor Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Total Amount</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {doctorReports.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((report) => (
              <TableRow key={report.invoiceId}>
                <TableCell style={{ fontWeight: "bold" }}>{report.invoiceId}</TableCell>
                <TableCell>{report.doctor.id}</TableCell>
                <TableCell>{new Date(report.invoiceDate).toLocaleString()}</TableCell>
                <TableCell>{report.doctor.name}</TableCell>
                <TableCell><EuroOutlinedIcon sx={{width:16}}/>{report.totalAmount}</TableCell>
                <TableCell style={{ color: report.status === 'Paid' ? 'green' :  report.status === 'Pending' ? 'darkorange' : 'black', fontWeight: "bold" }}>
                  {report.status}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={doctorReports.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default Invoice;
