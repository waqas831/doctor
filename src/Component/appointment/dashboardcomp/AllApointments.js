
import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Select,
  MenuItem,
  Box,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  Button,
  Tooltip,
  TablePagination,
  CircularProgress,
} from "@mui/material";
import { Assignment } from "@mui/icons-material";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import { toast, ToastContainer } from "react-toastify";
import BACKEND_LOCAL from "../../../Api";
import EuroIcon from '@mui/icons-material/Euro';
import PublishedWithChangesOutlinedIcon from '@mui/icons-material/PublishedWithChangesOutlined';
const Transition = React.forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));

function AllAppointments() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [appointmentData, setAppointmentData] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [refundDialogOpen, setRefundDialogOpen] = useState(false);
  const [resendDialogOpen, setResendDialogOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const token = localStorage.getItem("authToken");
  const back = process.env.REACT_APP_BACKEND_LOCAL;
  const fetchAppointmentData = async () => {
    setLoading(true);
    const query = new URLSearchParams({
      Status: statusFilter || "",
      AppointmentDate: dateFilter || "",
      IsDetail: "true",
    }).toString();

    try {
      const res = await axios.get(
        `${back}/api/v0.1/Appointment/GetAppointmentWithPatientAndDoctor?${query}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAppointmentData(res.data.reverse());
      console.log("Appointments fetched:", res.data);
    } catch (error) {
      toast.error("Error fetching appointments.");
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDoctorsData = async () => {
    try {
      const res = await axios.get(`${back}/api/v0.1/Doctor`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDoctors(res.data.reverse());
      console.log("Doctors fetched:", res.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  useEffect(() => {
    fetchAppointmentData();
    fetchDoctorsData();
  }, [statusFilter, dateFilter]);

  const handleClickOpen = (appointment) => {
    setSelectedAppointment(appointment);
    setOpen(true);
  };

  const handleRefundDialogOpen = (appointment) => {
    setSelectedAppointment(appointment);
    setRefundDialogOpen(true);
  };

  const handleResendDialogOpen = (appointment) => {
    setSelectedAppointment(appointment);
    setResendDialogOpen(true);
  };

  const handleClose = () => setOpen(false);
  const handleRefundDialogClose = () => setRefundDialogOpen(false);
  const handleResendDialogClose = () => {
    setResendDialogOpen(false);
    setSelectedAppointment({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedAppointment((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // const handleUpdateData = async () => {
  //   const { appointmentId, appointmentDate, doctorId, appointmentStatus, appointmentLink } =
  //     selectedAppointment;

  //   try {
  //     await axios.put(
  //       `${back}/api/v0.1/Appointment/${appointmentId}`,
  //       {
  //         appointmentDate,
  //         doctorId: parseInt(doctorId),
  //         appointmentStatus: parseInt(appointmentStatus),
  //         appointmentLink,
  //       },
  //       { headers: { Authorization: `Bearer ${token}` } }
  //     );

  //     toast.success("Appointment updated successfully!");
  //     console.log("Appointment updated:", selectedAppointment);
  //     fetchAppointmentData();
  //     handleClose();
  //   } catch (error) {
  //     toast.error("Error updating appointment.");
  //     console.error("Update error:", error);
  //   }
  // };
  const handleUpdateData = async () => {
    const {
      appointmentId,
      appointmentDate,
      doctorId,
      appointmentStatus,
      appointmentLink,
      status,
    } = selectedAppointment;
  
    // Check if status is "Completed"
    if (status === "Completed") {
      toast.error("Completed appointments cannot be updated.");
      return;
    }
  
    try {
      await axios.put(
        `${back}/api/v0.1/Appointment/${appointmentId}`,
        {
          appointmentDate,
          doctorId: parseInt(doctorId),
          appointmentStatus: parseInt(appointmentStatus),
          appointmentLink,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      toast.success("Appointment updated successfully!");
      console.log("Appointment updated:", selectedAppointment);
      fetchAppointmentData();
      handleClose();
    } catch (error) {
      toast.error("Error updating appointment.");
      console.error("Update error:", error);
    }
  };
  
  const handleRefund = async () => {
    const { appointmentId } = selectedAppointment;
  
    try {
      const version = "0.1";
      const response = await axios.post(
        `${back}/api/v${version}/Payment/RefundPayment`,
        null,
        {
          params: { appointmentId },
          headers: { Authorization: `Bearer ${token}` },
        }
      );
  
      if (response.status === 200) {
        toast.success("Refund processed successfully!");
        console.log(`Refund successful for Appointment ID: ${appointmentId}`);
        setRefundDialogOpen(false);
        fetchAppointmentData(); 
      }else if (response.status === 500) {
        toast.error("Refund processed successfully!");
        console.log(`Already: ${appointmentId}`);
        setRefundDialogOpen(false); 
        fetchAppointmentData(); 
      }  else {
        throw new Error("Refund failed : "); 
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Refund failed. Please try again.");
      console.error("Refund error:", error);
    }
  };
  

  const resendEmailToPatient = async () => {
    try {
      const { appointmentId } = selectedAppointment;
      await axios.post(
        `${back}/api/v0.1/Email/ResendEmailToPatient`,
        {},
        {
          params: { appointmentId },
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Email sent successfully!");
      handleResendDialogClose();
    } catch (error) {
      toast.error("Failed to send email. Email may completed / canceled causes failure.");
      console.error("Email resend error:", error);
    }
  };

  const handlePageChange = (event, newPage) => setPage(newPage);
  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const renderTableRows = useMemo(
    () =>
      appointmentData
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((data) => (
          <TableRow key={data.appointmentId}>
            <TableCell>{data.appointmentId}</TableCell>
            <TableCell>{new Date(data.appointmentDate).toLocaleString()}</TableCell>
            <TableCell>{data.appointmentReason}</TableCell>
            <TableCell
              sx={{
                color:
                  data.status === "Completed" ? "green" : data.status === "Active" ? "orange" : "red",
                fontWeight: "bold",
              }}
            >
              {data.status}
            </TableCell>
            <TableCell>
              {data.appointmentLink ? (
                <a href={data.appointmentLink} target="_blank" rel="noopener noreferrer">
                  Link
                </a>
              ) : (
                "N/A"
              )}
            </TableCell>
            <TableCell>{data.doctor?.name || "N/A"}</TableCell>
            <TableCell onClick={() => handleClickOpen(data)}>
              <Tooltip title="Assign Doctor, Status, Link, Date">
                <Assignment color="primary" sx={{ cursor: "pointer" }} />
              </Tooltip>
            </TableCell>
            <TableCell onClick={() => handleResendDialogOpen(data)}>
              <Tooltip title="Resend Appointment">
                <EuroIcon color="success" sx={{ cursor: "pointer" }} />
              </Tooltip>
            </TableCell>
            <TableCell onClick={() => handleRefundDialogOpen(data)}>
              <Tooltip title="Refund Appointment">
                <PublishedWithChangesOutlinedIcon color="warning" sx={{ cursor: "pointer" }} />
              </Tooltip>
            </TableCell>
          </TableRow>
        )),
    [appointmentData, page, rowsPerPage]
  );


  return (
    <div style={{ padding: "20px" }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom={2}>
        <Typography variant="h4" color="#14467b" fontWeight="bold">
          All Appointments
        </Typography>
        <Box display="flex" gap={2}>
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            displayEmpty
          sx={{bgcolor:"white"}}

          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="1">Active</MenuItem>
            <MenuItem value="2">Completed</MenuItem>
            <MenuItem value="3">Canceled</MenuItem>
          </Select>
          <TextField
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            sx={{bgcolor:"white"}}
            />
        </Box>
      </Box>
      <TableContainer component={Paper}>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="300px">
            <CircularProgress />
          </Box>
        ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{fontWeight:"bold"}}>Appointment ID</TableCell>
              <TableCell sx={{fontWeight:"bold"}}>Date / Time</TableCell>
              <TableCell sx={{fontWeight:"bold"}}>Reason</TableCell>
              <TableCell sx={{fontWeight:"bold"}}>Status</TableCell>
              <TableCell sx={{fontWeight:"bold"}}>Link</TableCell>
              <TableCell sx={{fontWeight:"bold"}}>Doctor</TableCell>
              <TableCell sx={{fontWeight:"bold"}}>Assign</TableCell>
              <TableCell sx={{fontWeight:"bold"}}>Resend</TableCell>
              <TableCell sx={{fontWeight:"bold"}}>Refund</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{renderTableRows}</TableBody>
        </Table>
        )}
      </TableContainer>
      <TablePagination
        component="div"
        count={appointmentData.length}
        page={page}
        onPageChange={handlePageChange}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
      >
        <DialogTitle>Update Appointment</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Box display="flex" flexDirection="column" gap={2}>
              <Box>
                <Typography fontWeight={"bold"} fontSize={15}>
                  Select Appointment Date
                </Typography>

                <TextField
                  type="datetime-local"
                  name="appointmentDate"
                  value={selectedAppointment.appointmentDate || ""}
                  onChange={handleInputChange}
                  fullWidth
                />
              </Box>
              <Box>
                <Typography fontWeight={"bold"} fontSize={15}>
                  Select Doctor
                </Typography>

                <Select
                  name="doctorId"
                  value={selectedAppointment.doctorId || ""}
                  onChange={handleInputChange}
                  fullWidth
                >
                  {doctors.map((doctor) => (
                    <MenuItem key={doctor.id} value={doctor.id}>
                      {`${doctor.name} - ${doctor.id}`}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
              <Box>
                <Typography fontWeight={"bold"} fontSize={15}>
                  Select Status
                </Typography>

                <Select
                  name="appointmentStatus"
                  value={selectedAppointment.appointmentStatus || ""}
                  onChange={handleInputChange}
                  fullWidth
                >
                  <MenuItem value={1}>Booked</MenuItem>
                  <MenuItem value={2}>Completed</MenuItem>
                  <MenuItem value={3}>Canceled</MenuItem>
                </Select>
              </Box>

              <Box>
                <Typography fontWeight={"bold"} fontSize={15}>
                  Set Appointment Link
                </Typography>
                <TextField
                  name="appointmentLink"
                  value={selectedAppointment.appointmentLink || ""}
                  onChange={handleInputChange}
                  fullWidth
                />
              </Box>
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error">
            Cancel
          </Button>
          <Button onClick={handleUpdateData} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={refundDialogOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleRefundDialogClose}
      >
        <DialogTitle>Confirm Refund</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to refund this appointment?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRefundDialogClose} color="error">
            Cancel
          </Button>
          <Button onClick={handleRefund} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
  open={resendDialogOpen}
  TransitionComponent={Transition}
  keepMounted
  onClose={handleResendDialogClose}
>
  <DialogTitle>Resend Email</DialogTitle>
  <DialogContent>
    <DialogContentText>
      Are you sure you want to resend the email to the patient?
    </DialogContentText>
  </DialogContent>
  <DialogActions>
    <Button onClick={handleResendDialogClose} color="error">
      Cancel
    </Button>
    <Button onClick={resendEmailToPatient} color="primary">
      Confirm
    </Button>
  </DialogActions>
</Dialog>
<ToastContainer/>

    </div>
  );
}

export default AllAppointments;
