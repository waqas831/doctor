
            import React, { useState, useEffect, useCallback, useMemo } from 'react';
            import {
                TextField,
                MenuItem,
                Select,
                Button,
                Table,
                TableBody,
                TableCell,
                TableContainer,
                TableHead,
                TableRow,
                IconButton,
                Dialog,
                DialogTitle,
                DialogContent,
                DialogActions,
                CircularProgress,
                Typography,
                TablePagination,
                Box,
                Grid
            } from '@mui/material';
            import VisibilityIcon from '@mui/icons-material/Visibility';
            import AutorenewIcon from '@mui/icons-material/Autorenew';
            import axios from 'axios';
            import PropTypes from 'prop-types';
import { toast, ToastContainer } from 'react-toastify';
            
            const Reports = React.memo((props) => {
                const [doctors, setDoctors] = useState([]);
                const [doctorId, setDoctorId] = useState('');
                const [invoiceDate, setInvoiceDate] = useState('');
                const [statusFilter, setStatusFilter] = useState('');
                const [statusUpdate, setStatusUpdate] = useState('');
                const [invoices, setInvoices] = useState([]);
                const [dialogOpen, setDialogOpen] = useState(false);
                const [statusDialogOpen, setStatusDialogOpen] = useState(false);
                const [selectedInvoice, setSelectedInvoice] = useState(null);
                const [loading, setLoading] = useState(false);
                const [error, setError] = useState(null);
                const [page, setPage] = useState(0);
                const [rowsPerPage, setRowsPerPage] = useState(5);
                const { onClose, open } = props;
                const back = process.env.REACT_APP_BACKEND_LOCAL;
                const token = useMemo(() => localStorage.getItem("authToken"), []);
                const [buttonLoading, setButtonLoading] = useState(false);
                const fetchDoctors = useCallback(async () => {
                    setLoading(true);
                    try {
                        const res = await axios.get(`${back}/api/v0.1/Doctor`, {
                            headers: { Authorization: `Bearer ${token}` }
                        });
                        setDoctors(res.data);
                    } catch (error) {
                        console.error('Failed to fetch doctors:', error);
                        setError('Error fetching doctors. Please try again.');
                    } finally {
                        setLoading(false);
                    }
                }, [token]);
            
                useEffect(() => {
                    fetchDoctors();
                }, [fetchDoctors]);
            
                const handleFetchInvoices = useCallback(async () => {
                    setLoading(true);
                    setError(null);
            
                    const params = {
                        DoctorId: doctorId || undefined,
                        InvoiceDate: invoiceDate || undefined,
                        Status: statusFilter || undefined,
                        IsDetails: true
                    };
            
                    try {
                        const response = await axios.get(`${back}/api/v0.1/Invoice`, {
                            params,
                            headers: { Authorization: `Bearer ${token}` }
                        });
                        setInvoices(response.data.reverse());
                    } catch (error) {
                        console.error("Error fetching invoices:", error);
                        setError('Failed to fetch invoices. Please try again.');
                        setInvoices([]);
                    } finally {
                        setLoading(false);
                    }
                }, [doctorId, invoiceDate, statusFilter, token]);
            
                useEffect(() => {
                    handleFetchInvoices();
                }, [handleFetchInvoices]);
            
                const handleDialogOpen = (invoice) => {
                    setSelectedInvoice(invoice);
                    setDialogOpen(true);
                };
                const handleStatusDialogOpen = (invoice) => {
                    if (invoice.status === "Paid") {
                        toast.warning("This invoice is already paid.", {autoClose:"2000"});
                        return;
                    }
                    setSelectedInvoice(invoice);
                    setStatusUpdate(invoice.status);
                    setStatusDialogOpen(true);
                };
                
            
                const handleDialogClose = () => {
                    setDialogOpen(false);
                    setSelectedInvoice(null);
                };
            
                const handleStatusDialogClose = () => {
                    setStatusDialogOpen(false);
                    setSelectedInvoice(null);
                };
            
                const handleChangePage = (event, newPage) => {
                    setPage(newPage);
                };
            
                const handleChangeRowsPerPage = (event) => {
                    setRowsPerPage(parseInt(event.target.value, 10));
                    setPage(0);
                };
            
                const handleUpdateStatus = useCallback(async () => {
                    if (selectedInvoice) {
                        const invoiceId = selectedInvoice.invoiceId;
                        const version = '0.1'; 
                        setButtonLoading(true);  // Start loading when button is clicked
                
                        try {
                            await axios.put(`${back}/api/v${version}/Invoice/${invoiceId}/status`, {
                                status: Number(statusUpdate)
                            }, {
                                headers: { Authorization: `Bearer ${token}` }
                            });
                
                            setInvoices((prev) =>
                                prev.map((inv) =>
                                    inv.invoiceId === invoiceId ? { ...inv, status: statusUpdate === 1 ? 'Pending' : 'Paid' } : inv
                                )
                            );
                            handleStatusDialogClose();  // Close dialog after success
                        } catch (error) {
                            console.error('Error updating invoice status:', error);
                            setError('Failed to update status. Please try again.');
                        } finally {
                            setButtonLoading(false);  // Stop loading
                        }
                    }
                }, [selectedInvoice, statusUpdate, token]);
                return (
                    <Box px={2} py={1}>
                        <Box display={"flex"} justifyContent={"space-between"} alignContent={"center"} alignItems={"center"}>
                            <Typography variant="h5" gutterBottom>Doctor Invoice Reports</Typography>
                            <Button
                                variant="contained"
                                onClick={handleFetchInvoices}
                                sx={{ mt: 2, mb: 3 }}
                            >
                                Fetch Invoices
                            </Button>
                        </Box>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={4}>
                                <Select
                                    value={doctorId}
                                    onChange={(e) => setDoctorId(e.target.value)}
                                    displayEmpty
                                    fullWidth
                                    variant="outlined"
                                >
                                    <MenuItem value="" disabled>Select a Doctor</MenuItem>
                                    {doctors.map((doctor) => (
                                        <MenuItem key={doctor.id} value={doctor.id}>
                                            {doctor.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </Grid>
                            <Grid item xs={12} md={4} sx={{mt:-2}}>
                                <TextField
                                    type="date"
                                    value={invoiceDate}
                                    onChange={(e) => setInvoiceDate(e.target.value)}
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Select
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    displayEmpty
                                    fullWidth
                                    variant="outlined"
                                >
                                    <MenuItem value="">All Status</MenuItem>
                                    <MenuItem value="1">Pending</MenuItem>
                                    <MenuItem value="2">Paid</MenuItem>
                                </Select>
                            </Grid>
                        </Grid>
            
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: "bold" }}>Invoice ID</TableCell>
                                        <TableCell sx={{ fontWeight: "bold" }}>Date</TableCell>
                                        <TableCell sx={{ fontWeight: "bold" }}>Dr. Name</TableCell>
                                        <TableCell sx={{ fontWeight: "bold" }}>Total Amount</TableCell>
                                        <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
                                        <TableCell sx={{ fontWeight: "bold" }}>Details</TableCell>
                                        <TableCell sx={{ fontWeight: "bold" }}>Update Status</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {loading ? (
                                        <TableRow>
                                            <TableCell colSpan={7} align="center">
                                                <CircularProgress />
                                            </TableCell>
                                        </TableRow>
                                    ) : invoices.length > 0 ? (
                                        invoices.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((invoice) => (
                                            <TableRow key={invoice.invoiceId}>
                                                <TableCell sx={{ fontWeight: "bold" }}>{invoice.invoiceId}</TableCell>
                                                <TableCell>{new Date(invoice.invoiceDate).toLocaleString()}</TableCell>
                                                <TableCell>{invoice.doctor.name}</TableCell>
                                                <TableCell>{invoice.totalAmount}</TableCell>
                                                <TableCell sx={{
                                                    fontWeight: "bold",
                                                    color: invoice.status === "Paid" ? "green" : invoice.status === "Pending" ? "#EDAC22" : "inherit"
                                                }}>
                                                    {invoice.status}
                                                </TableCell>
                                                <TableCell>
                                                    <IconButton onClick={() => handleDialogOpen(invoice)}>
                                                        <VisibilityIcon />
                                                    </IconButton>
                                                </TableCell>
                                                <TableCell>
                                                    <IconButton onClick={() => handleStatusDialogOpen(invoice)}>
                                                        <AutorenewIcon color='primary' />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={7} align="center">
                                                <Typography>No Invoices Available</Typography>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={invoices.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
            
                        <Dialog open={statusDialogOpen} onClose={handleStatusDialogClose} maxWidth="xs" fullWidth>
                            <DialogTitle>Update Invoice Status</DialogTitle>
                            <DialogContent>
                                <Select
                                    value={statusUpdate}
                                    onChange={(e) => setStatusUpdate(e.target.value)}
                                    fullWidth
                                >
                                    <MenuItem value={1}>Pending</MenuItem>
                                    <MenuItem value={2}>Paid</MenuItem>
                                </Select>
                            </DialogContent>
                            <DialogActions>
                            <Button onClick={handleStatusDialogClose}>Cancel</Button>
    <Button
        onClick={handleUpdateStatus}
        variant="contained"
        color="primary"
        disabled={buttonLoading} 
        startIcon={buttonLoading && <CircularProgress size={20} color="inherit" />}
    >
        {buttonLoading ? "Updating..." : "Update Status"} 
    </Button>
                            </DialogActions>
                        </Dialog>
            
                        {error && (
                            <Box mt={2}>
                                <Typography color="error" variant="subtitle2">{error}</Typography>
                            </Box>
                        )}
                        <ToastContainer/>
                    </Box>
                );
            });
            
            Reports.propTypes = {
                onClose: PropTypes.func.isRequired,
                open: PropTypes.bool.isRequired
            };
            
            export default Reports;
            