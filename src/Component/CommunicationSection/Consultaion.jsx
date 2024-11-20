
import React, { useState } from "react";
import Usewrapper from "../Usewrapper/Usewrapper";
import TopBorderImage from "../../assets/logo.png"; // Adjust the path if needed
import { useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import {
  Button,
  Box,
  Dialog,
  Divider,
  DialogContent,
  TextField,
  Typography,
  IconButton,
  DialogContentText,
  CircularProgress
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { generatePDFWithDataRED } from "./pdfgenerator"; 
import { generatePDFWithDataClinicalNotes} from "./pdfgenerator"; 
import { generatePDFWithDataMedCer } from "./pdfgenerator"; 
import { generatePDFWithDataPrescribe } from "./pdfgenerator"; 
import { 
  TableContainer, 
  Paper, 
  Table, 
  TableHead, 
  TableRow, 
  TableCell, 
  TableBody, 
  Card
} from '@mui/material';
import { useDropzone } from 'react-dropzone';
import {  DialogTitle, DialogActions } from '@mui/material';
import { useLocation } from 'react-router-dom';
import EmailIcon from '@mui/icons-material/Email';


// Sample image imports
import ButtonImage1 from "../../images/clinical.svg";
import ButtonImage2 from "../../images/file_sharingicon.svg";
import ButtonImage4 from "../../images/medcert.svg";
import ButtonImage5 from "../../images/prescription.svg";
import ButtonImage6 from "../../images/refletter.svg";
import axiosInstance from "../interceptors/AxiosInstance";



// Form Header component
const FormHeader = ({ title }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: 60,
        backgroundColor: "#3ab6bb",
        color: "#fff",
        padding: 1,
        width: "100%"
        //maxWidth: "1200px",
      }}
    >
      <Box display="flex" alignItems="center">
        <Box
          component="img"
          src={TopBorderImage}
          alt="icon"
          sx={{
            height: 40,
            width: "auto",
            marginRight: 2,
          }}
        />
      </Box>

      <Typography
        variant="h6"
        align="center"
        sx={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          textDecoration: "underline",
          fontWeight: "bold",
        }}
      >
        {title}
      </Typography>

      <Box display="flex" flexDirection="column" alignItems="flex-end">
        <Typography variant="body2" sx={{ fontSize: "10px" }}>
        Clinic Name: GPLine
        </Typography>
        <Typography variant="body2" sx={{ fontSize: "10px" }}>
          Address: Boyle Rd, Frenchpark Demesne,
        </Typography>
        <Typography variant="body2" sx={{ fontSize: "10px" }}>
        Frenchpark, Co. Roscommon, F45 FX62
        </Typography>
        <Typography variant="body2" sx={{ fontSize: "10px" }}>
          Email: info@gpline.ie
        </Typography>
      </Box>
    </Box>
  );
};

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  margin: theme.spacing(1),
}));

const formatDateToDDMMYYYY = (date) => {
  const d = new Date(date);
  let day = d.getDate();
  let month = d.getMonth() + 1; 
  const year = d.getFullYear();

  
  day = `day < 10 ? 0${day} : day`;
  month = `month < 10 ? 0${month} : month`;

  return `${day}-${month}-${year}`; 
};


const Consultation = () => {
  const [openForm, setOpenForm] = useState(null);
  const [openPdfOptionsDialog, setOpenPdfOptionsDialog] = useState(false); 
  const [pdfUrl, setPdfUrl] = useState(null); 
  const location = useLocation();
  const { user, patient, doctor, consultationActive: initialConsultationActive} = location.state || {}; // Retrieve the patient object from state
  
  const patientName = patient?.name || ""; // Default to an empty string if patient is undefined
  const patientDOB = patient?.DOB || "";
  const patientGender = patient?.Gender || null;
  const doctoremail = doctor?.doctor_email || "";
  const patientemail = patient?.patient_email || "";
  const doctore_imc = doctor?.doctor_IMC || "";
  const doctor_Sign = doctor?.doctor_signature || "";
  //console.log("on main consultation page this is being fetched from appointment page: ", doctor_Sign)
  const doctor_ID = doctor?.doctor_id || "";
  const doctor_SIGN = doctor?.doctor_signature || "";
  //console.log("THIS IS THE CURRENT DOCTOR ID:   ", doctor_ID)
  
  
  const patientContact = patient?.contactno || "";
  const Appointmentid = user?.appointmentID || null;
  const Address_patient = user?.Patient_Address || "";
  const doctorname = doctor?.doctor_name || "";
  const AppointmentDate = user?.appointmentDATE || "";
  const DrugAllergy = user?.Drug_Allergy || "";
  const MedicinalHistory = user?.MedicineHistory || "";
  const todaysdate = new Date().toISOString().split('T')[0];
  const backendlink = process.env.REACT_APP_BACKEND_LOCAL;

  const [consultationActive, setConsultationActive] = useState(initialConsultationActive || false);
  

  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [isLoadingbar, setIsLoadingbar] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [users, setUsers] = useState(null); 
  const [signatureUrl, setSignatureUrl] = useState(null); 


  const [uploadedFiles, setUploadedFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => setUploadedFiles(acceptedFiles)
  });
  const corrected_dob = new Date(patientDOB);
  // Format the Date object into day-month-year format
  const formattedDob = corrected_dob.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  useEffect(() => {
    //console.log(" THIS IS IN USE EFFECT Doctor ID being fetched:", doctor_ID); // Debug log

    //fetchDoctor(doctor_ID);
  }, []);

  // State to capture the form values
  const [formData, setFormData] = useState({
    name: patientName,
    //dob: patientDOB,
    dob: formattedDob,
    address: Address_patient,
    phoneNumber: patientContact,
    doctor_SIGNATURE: doctor_Sign,
    //referralDate: patientDOB,
    doctorName: doctorname,
    Doctor_Id: doctor_ID,
    Patient_email: patientemail,
    Doctor_email: doctoremail,
    Drug_Allergy: DrugAllergy,
    Medicinal_History: MedicinalHistory,
    imcNumber: doctore_imc,
    PatientGENDER: patientGender,
    //doctorSignature: doctor_Sign,
    AppointmentID: Appointmentid || null,
    AppointmentDATE: AppointmentDate || "",
    date: "",
    history: "",
    examination: "",
    managementplan: "",
    specialinstructions: "",
    sufferingdisease: "",
    todaysdate: todaysdate,
    datee: todaysdate,
    startdate: "",
    enddate: "",
    referralinfo: "",
    Email_Subject: "",
    GenderString:"",
    Email_Message: "",
    sender_email: "",
    prescriptions: [
      { sno: "1", medicationname: "", strength: "", dosageform: "", quantity: "", directions: "" }
      
    ] // Initial 1 rows for the prescriptions
    

  });

  
  // const fetchDoctor = async (idparam) => {
  //   try {
  //     localStorage.removeItem('doctorSignatureUrl');
  //     const token = localStorage.getItem('authToken');
  //     const response = await axiosInstance.get(`/api/v0.1/Doctor`, {
  //       headers: { Authorization: `Bearer ${token}` },
  //       params: { id: idparam },
  //     });

  //     // Log full API response
  //     console.log("Full API Response:", response.data);

  //     // Check if the response is an array and if it has data
  //     if (Array.isArray(response.data) && response.data.length > 0) {
  //       const doctorData = response.data[0]; // Access the first item in the array
        
  //       // Directly access the signatureUrl from the doctor data
  //       const fetchedSignatureUrl = doctorData.signatureUrl;
  //       console.log("this is signature: ",fetchedSignatureUrl)
  //       //localStorage.setItem('doctorSignatureUrl', fetchedSignatureUrl);

  //       // Check if the signatureUrl exists and update the state
  //       setSignatureUrl(fetchedSignatureUrl);
  //       setUsers(doctorData);
  //       // Set the whole doctor data to users state
       
  //     } else {
  //       console.log("No doctor data found or the data is empty.");
  //     }

  //   } catch (error) {
  //     console.error("Error fetching doctor's details:", error.message);
  //   }
  // };
  
  
  

  const handleSendEmail = async () => {
    try {
        const token = localStorage.getItem('authToken');
        if (!token) {
            alert('No token found. Please log in first.');
            return;
        }

        if (uploadedFiles.length === 0) {
            //alert("No files selected to send.");

            showDialog("No files selected to send.");

            return;
        }
        if (!formData.Email_Subject || formData.Email_Subject.trim() === "") {
          showDialog("Email Subject Required.");

          return;
        }
        if (!formData.Email_Message || formData.Email_Message.trim() === "") {
          showDialog("Please add a message.");

          return;
        }
        
        
        //setDialogMessage("Sending email..."); // Initial loading message
        //setIsLoadingbar(true);
        //setDialogOpen(true);
        showDialog("Sending email...", true); // Show loading message


        // Create FormData payload for binary file upload
        const formPayload = new FormData();
        formPayload.append('ToEmail', formData.Patient_email || ""); // Patient's email
        formPayload.append('subject', formData.Email_Subject || "");          // Subject text
        formPayload.append('message', formData.Email_Message || ""); // Message content

        // Append each file with the same key 'File'
        uploadedFiles.forEach((file) => {
            formPayload.append('File', file); // Use 'File' key for each attachment
        });

        // Log payload for verification
        console.log("Form Payload Content:");
        for (let [key, value] of formPayload.entries()) {
            console.log(`${key}: ${value.name || value}`);
        }

        // Send the email request with FormData (multipart/form-data)
        const response = await axiosInstance.post(
            `/api/v0.1/Email`,
            formPayload,
            {
                headers: {
                    'Content-Type': 'multipart/form-data', // Required for binary upload
                    'Authorization': `Bearer ${token}`,
                }
            }
        );
        

        // Show success message and stop loading
        setIsLoadingbar(false);
        showDialog("Email sent successfully!");
        setOpenForm(null); // Close the form after sending email successfully
        //showDialog("Email sent successfully!");
        //setOpenForm(null); // Close the dialog after sending email successfully

    } catch (error) {
        console.error('Error sending email:', error.response ? error.response.data : error);
        alert('Failed to send email.');
    }
};

    const showDialog = (message, loading = false) => {
      setDialogMessage(message);
      setIsLoadingbar(loading);
      setDialogOpen(true);
    };

    const handleCloseDialog = () => {
      setDialogOpen(false);
    };
  

  const handleOpenForm = (formIndex) => {
    //todaydate: formatDateToDDMMYYYY(new Date()); // changing to dd-mm--yyyy format here in todaydate var
    
    const today = new Date().toISOString().slice(0, 10); // Format as yyyy-mm-dd
    
    setOpenForm(formIndex);
  };

  const handleCloseForm = () => {
    setOpenForm(null);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  //Function to handle prescription field changes
  const handlePrescriptionChange = (index, field, value) => {
    const updatedPrescriptions = [...formData.prescriptions];
    updatedPrescriptions[index][field] = value;
    setFormData({ ...formData, prescriptions: updatedPrescriptions });
  };
  // Function add a new prescription row
  // Function add a new prescription row
  const handleAddRow = () => {
    setFormData((prevData) => ({
      ...prevData,
      prescriptions: [
        ...prevData.prescriptions,
        { sno:  formData.prescriptions.length + 1, medicationname: "", strength: "", dosageform: "", quantity: "", directions: "" }
      ]
    }));
  };
  // Function to delete a new prescription row
  // Function to delete the last prescription row
  const handleDeleteRow = () => {
    setFormData((prevData) => {
      // Ensure there is at least one row remaining
      if (prevData.prescriptions.length > 1) {
        return {
          ...prevData,
          prescriptions: prevData.prescriptions.slice(0, -1), // Remove the last row
        };
      }
      return prevData; // If only one row is left, do nothing ok???
      return prevData; // If only one row is left, do nothing ok???
    });
  };
  
  const handleSaveAndGeneratePDF3 = () => {
    //console.log(generatePDFWithDataMedCer("Medical Certificate", formData));

    generatePDFWithDataMedCer("Medical Certificate", formData)
      .then((pdfBlob) => {
        
        if (pdfBlob instanceof Blob) {
          const pdfUrl = URL.createObjectURL(pdfBlob); // Create URL for the PDF
          setPdfUrl(pdfUrl); // Store the URL for later use
          setOpenPdfOptionsDialog(true); // Open the modal after successful PDF generation
          //handleCloseForm(); // Optionally close the form dialog
        }
      })
      .catch((error) => {
        console.error('PDF generation failed:', error);
      });
  };

  const handleSaveAndGeneratePDF2 = () => {
    //console.log(generatePDFWithDataMedCer("Medical Certificate", formData));

    generatePDFWithDataClinicalNotes("Clinical Notes", formData)
      .then((pdfBlob) => {
        
        if (pdfBlob instanceof Blob) {
          const pdfUrl = URL.createObjectURL(pdfBlob); // Create URL for the PDF
          setPdfUrl(pdfUrl); // Store the URL for later use
          setOpenPdfOptionsDialog(true); // Open the modal after successful PDF generation
          //handleCloseForm(); // Optionally close the form dialog
        }
      })
      .catch((error) => {
        console.error('PDF generation failed:', error);
      });
  };
  
  const handleSaveAndGeneratePDF1 = () => {
    //console.log(generatePDFWithDataMedCer("Medical Certificate", formData));

    generatePDFWithDataRED("Referral to Emergency Department", formData)
      .then((pdfBlob) => {
        
        if (pdfBlob instanceof Blob) {
          const pdfUrl = URL.createObjectURL(pdfBlob); // Create URL for the PDF
          setPdfUrl(pdfUrl); // Store the URL for later use
          setOpenPdfOptionsDialog(true); // Open the modal after successful PDF generation
          //handleCloseForm(); // Optionally close the form dialog
        }
      })
      .catch((error) => {
        console.error('PDF generation failed:', error);
      });
  };
  const handleSaveAndGeneratePDF4 = () => {
    //console.log(generatePDFWithDataMedCer("Medical Certificate", formData));

    generatePDFWithDataPrescribe("Prescription", formData)
      .then((pdfBlob) => {
        
        if (pdfBlob instanceof Blob) {
          const pdfUrl = URL.createObjectURL(pdfBlob); 
          setPdfUrl(pdfUrl); 
          setOpenPdfOptionsDialog(true); 
          //handleCloseForm(); // Optionally close the form dialog
        }
      })
      .catch((error) => {
        console.error('PDF generation failed:', error);
      });
  };

  const handleDownload = (fileName = 'Medical_Certificate.pdf') => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setOpenPdfOptionsDialog(false);
  };
  const handleOpenInNewTab = () => {
    window.open(pdfUrl, '_blank');
    setOpenPdfOptionsDialog(false);
  };


  const handleEndConsultation = async () => {
    try {

      setLoading(true); 
      const token = localStorage.getItem("token"); 
      //console.log("this is appointment id still check here mathcing???:", user?.appointmentID);

      const response = await axiosInstance.put(
        `/api/v0.1/Appointment/${user?.appointmentID}`, 
        {
          appointmentStatus: 2        // status for the consultation 1 or "Completed" ??? FOUDN OUT ITS 2!
        },  
        {
          headers: {
            Authorization:` Bearer ${token}`
          }
        }
      );
      
      // should only set some values to null 
      setFormData(prevFormData => ({
        ...prevFormData,
        name: null,
        dob: null,
        PatientGENDER: null,
        Drug_Allergy:null,
        Medicinal_History:null,
      }));
      //toast.success("Consultation completed successfully.")
      setDialogMessage("Consultation Ended.");
      setDialogOpen(true);


      setConsultationActive(false);
      //setFormData({ name: '', dob: '', PatientGENDER: '' }); // Clear formData

    } catch (error) {
      console.error("Error ending consultation:", error);
      alert("Failed to end consultation. Please try again.");
    } finally {
      setLoading(false); 
    }
  };



  return (
    <>

      <Usewrapper title="Patients Management">
      
      
       {/* Box to arrange buttons and labels */}
      <Box display="flex" justifyContent="center" flexDirection={"row"} alignItems="center" flexWrap="wrap" marginTop={0} marginLeft={0}>

        
        {/* Button 1  all of these comments added by me signifyinh no of current button*/}
        <Box display="flex" flexDirection="column" alignItems="center" marginX={4}>
          <StyledIconButton onClick={() => handleOpenForm(1)}>
            <img src={ButtonImage1} alt="Prescription" width={30} height={30} />
          </StyledIconButton>
          <Typography variant="caption">Prescription</Typography> 
          
        </Box>
      
        {/* Button 4 */}
        <Box display="flex" flexDirection="column" alignItems="center" marginX={4}>
          <StyledIconButton onClick={() => handleOpenForm(4)}>
            <img src={ButtonImage4} alt="Medical Certificate" width={30} height={30} />
          </StyledIconButton>
          <Typography variant="caption">Medical Certificate</Typography> {/* Add name/label here */}
        </Box>

        {/* Button 5 */}
        <Box display="flex" flexDirection="column" alignItems="center" marginX={4}>
          <StyledIconButton onClick={() => handleOpenForm(5)}>
            <img src={ButtonImage5} alt="Clinical Notes" width={30} height={30} />
          </StyledIconButton>
          <Typography variant="caption">Clinical Notes</Typography> {/* Add name/label here */}
        </Box>

        {/* Button 6 */}
        <Box display="flex" flexDirection="column" alignItems="center" marginX={4}>
          <StyledIconButton onClick={() => handleOpenForm(6)}>
            <img src={ButtonImage6} alt="Referral Letter" width={30} height={30} />
          </StyledIconButton>
          <Typography variant="caption">Referral Letter</Typography> {/* Add name/label here */}
        </Box>
        {/* Button 2 which needs to be moved */}
        <Box display="flex" flexDirection="column" alignItems="center" marginX={4}>
          <StyledIconButton onClick={() => handleOpenForm(2)}>
           <EmailIcon 
              style={{ 
              fontSize: 30, 
              //color: '#4A90E2',      // doesnt wokr rn
              backgroundColor: 'transparent' 
              }} 
            />
          </StyledIconButton>
          <Typography variant="caption">Share Files</Typography>
        </Box>
        



      </Box>
      

      {/* <Card sx={{ maxWidth: 300, padding: 1, marginLeft: 5, marginTop: 5, boxShadow: 3, backgroundColor:"#14467B" }}> */}
  {/* <Typography variant="h7" sx={{ fontWeight: 'normal', marginBottom: 3, color:"white" }}></Typography> */}

  
  <Card sx={{ maxWidth: 300, padding: 1, marginLeft: 5, marginTop: 5, boxShadow: 3, backgroundColor:"#14467B" }}>
    <Typography variant="h7" sx={{ fontWeight: 'normal', marginBottom: 2, color: "white" }}>
      Current Patient
    </Typography>
    <Divider sx={{ marginBottom: 2 }} />
    
    {/* Name */}
    <Box display="flex" flexDirection="row" alignItems="center" gap={1} marginBottom={2}>
      <Typography variant="h8" sx={{ fontWeight: 'normal', color: "white" }}>
        Name:
      </Typography>
      <Typography variant="h8" sx={{ fontWeight: 'normal', color: "white" }}>
        {formData.name}
      </Typography>
    </Box>

    {/* Date of Birth */}
    <Box display="flex" flexDirection="row" alignItems="center" gap={1} marginBottom={2}>
      <Typography variant="h8" sx={{ fontWeight: 'normal', color: "white" }}>
        Date Of Birth:
      </Typography>
      <Typography variant="h8" sx={{ fontWeight: 'normal', color: "white" }}>
        {formData.dob}
      </Typography>
    </Box>

    {/* Gender */}
    <Box display="flex" flexDirection="row" alignItems="center" gap={1} marginBottom={2}>
      <Typography variant="h8" sx={{ fontWeight: 'normal', color: "white" }}>
        Gender:
      </Typography>
      <Typography variant="h8" sx={{ fontWeight: 'normal', color: "white" }}>
        {formData.PatientGENDER === 1 ? "Male" : (formData.PatientGENDER === 2 ? "Female" : (formData.PatientGENDER === 3 ? "Other" : ""))}
      </Typography>
    </Box>
    {/* Drug allergy*/}
    <Box display="flex" flexDirection="row" alignItems="center" gap={1} marginBottom={2}>
          <Typography variant="h8" sx={{ fontWeight: 'normal', color: "white" }}>
            Drug Allergies:
          </Typography>
          <Typography variant="h8" sx={{ fontWeight: 'normal', color: "white" }}>
            {formData.Drug_Allergy}
          </Typography>
        </Box>

    {/* Date of Birth */}
    <Box display="flex" flexDirection="row" alignItems="center" gap={1} marginBottom={2}>
      <Typography variant="h8" sx={{ fontWeight: 'normal', color: "white" }}>
        Past Medical History:
      </Typography>
      <Typography variant="h8" sx={{ fontWeight: 'normal', color: "white" }}>
        {formData.Medicinal_History}
      </Typography>
    </Box>

  </Card>

  



        

<Button
  variant="contained"
  color="error"
  sx={{
    marginTop: 2,
    marginLeft: 5,
    backgroundColor: consultationActive ? "#d32f2f" : "grey",
    "&:hover": {
      backgroundColor: consultationActive && !loading ? "#b71c1c" : "grey"
    }
  }}
  onClick={handleEndConsultation}
  disabled={!consultationActive || loading} // Only enabled if active and not loading
>
  {loading ? "Ending Consultation..." : "End Consultation"}
</Button>


      

        {/* Form for Button 6 Referral to Emergency Department */}
        <Dialog open={openForm === 6} onClose={handleCloseForm} sx={{ '& .MuiDialog-paper': { width: '600px', maxWidth: 'none' } }}>
          <DialogContent sx={{ padding: 0 }}>
            <FormHeader title="" />

            <Box sx={{ padding: 3, mt: 3 }}>
              <Typography
                variant="h5"
                align="center"
                sx={{ marginTop: 2 }}
              >
                Referral to Emergency Department
              </Typography>

              <br />

              
              {/* Form content */}
              <form>
                <Box display="flex" alignItems="center" mb={2}>
                  <Typography variant="body1" sx={{ marginRight: 1 }}>
                    Patient's Name:
                  </Typography>
                  <Typography
                   
                    
                    variant="standard"
                    size="small"
                    sx={{ flex: 1 }}
                    
                  >
                    {formData.name}
                    </Typography>
                </Box>

                
                
                

                <Box display="flex" alignItems="center" mb={2} sx={{maxWidth:"250px"}}>
                <Typography variant="body1" sx={{ marginRight: 2,  fontWeight: "normal"}}>
                    Referral Date:
                  </Typography>
                  <TextField
                    name='date'
                    //variant="standard"
                    size="small"
                    type="date"  // This changes the input type to a date picker
                    value={formData.todaysdate}
                    onChange={handleInputChange}
                    InputProps={{
                        shrink: true,  // This ensures that the label behaves properly when the input type is 'date'
                        }}
                        sx={{ flex: 1, paddingLeft: '0px' }}
                    
                  />
                </Box>
                {/* Big Text Boxes with Headings */}
                <Typography variant="h6" sx={{ marginTop: 5, marginBottom: 2 }}>
                    Referral Reasons:
                </Typography>
                <TextField
                  label=""
                  name="referralinfo"
                  variant="outlined"
                  multiline
                  value={formData.referralinfo}
                  onChange={handleInputChange}
                  rows={4}
                  fullWidth
                  sx={{ width: '100%', backgroundColor: '#fff', marginBottom: 3 }}
                  />

                <Divider sx={{ my: 3, borderColor: "black" }} />

                
                <Box display="flex" alignItems="center" mb={2}>
                  <Typography variant="body1" sx={{ marginRight: 1 }}>
                    Doctor's Name:
                  </Typography>
                  <Typography
                   
                    
                    variant="standard"
                    size="small"
                    sx={{ flex: 1 }}
                    
                  >
                    {formData.doctorName}
                    </Typography>
                </Box>

                <Box display="flex" alignItems="center" mb={2}>
                  <Typography variant="body1" sx={{ marginRight: 2 }}>
                    Doctor's IMC Number:
                  </Typography>
                  <Typography
           
                    variant="standard"
                    size="small"
                    
                    sx={{ flex: 1 }}
                  >
                    {formData.imcNumber}
                    </Typography>
                </Box>

                {/* Save Button */}
                <Button
                  onClick={handleSaveAndGeneratePDF1} // Trigger the PDF generation with form data
                  size="small"
                  sx={{
                    backgroundColor: "#14467B",
                    color: "#fff",
                    "&:hover": {},
                    textTransform: "none"
                  }}
                >
                  Save
                </Button>
                <Dialog open={openPdfOptionsDialog} onClose={() => setOpenPdfOptionsDialog(false)}>
                  

                  <DialogContent>
                  Would you like to download the PDF or just view it in a new tab?
                </DialogContent>
                <DialogActions>
                <Button 
                  onClick={() => handleDownload('Referral_Emergency_Department.pdf')}  // Pass the custom name here
                  sx={{
                    backgroundColor: "#14467B", // Button background color
                    color: "#fff", // Text color
                    textTransform: "none",
                    "&:hover": {
                    backgroundColor: "#0a3a59", // Hover color
                              },

                      }} 
                  >Download</Button>


                  <Button onClick={handleOpenInNewTab} sx={{
                    backgroundColor: "#14467B", // Button background color
                    color: "#fff", // Text color
                    textTransform: "none",
                    "&:hover": {
                    backgroundColor: "#0a3a59", // Hover color
                      },
                    }} 
                  >Open in New Tab</Button>
                  
                </DialogActions>
                </Dialog>
                <></>
              </form>
            </Box>
          </DialogContent>
        </Dialog>
        
        

        {/* Form for Button 5 Prescription */}
        <Dialog open={openForm === 1} onClose={handleCloseForm} sx={{ '& .MuiDialog-paper': { width: '600px', maxWidth: 'none' } }}>
          <DialogContent sx={{ padding: 0 }}>
            <FormHeader title="" />

            <Box sx={{ padding: 3, mt: 3 }}>
              <Typography
                variant="h5"
                align="center"
                sx={{ marginTop: 2}}
              >
                Prescription
              </Typography>

              <br />

              

              {/* Form content */}
              <form>
                <Box display="flex" alignItems="center" mb={2}>
                  <Typography variant="body1" sx={{ marginRight: 1 }}>
                    Patient's Name:
                  </Typography>
                  <Typography
                    
                    
                    variant="standard"
                    size="small"
                    sx={{ flex: 1, paddingLeft: '0px' }}
                  >
                    {formData.name}
                    </Typography>
                </Box>

                
                <Box display="flex" alignItems="center" mb={2} sx={{ maxWidth: '300px'}}>
                  <Typography variant="body1" sx={{ marginRight: 2,  fontWeight: "normal"}}>
                    Prescription Date:
                  </Typography>
                  <TextField
                    name='date'
                    //variant="standard"
                    size="small"
                    type="date"  // This changes the input type to a date picker
                    value={formData.todaysdate}
                    onChange={handleInputChange}
                    InputProps={{
                        shrink: true,  // This ensures that the label behaves properly when the input type is 'date'
                        }}
                        sx={{ flex: 1, paddingLeft: '0px' }}
                    
                  />
                  
              </Box>
                  
                <Box sx={{ marginTop: 3 }}>
  <Typography variant="h6" gutterBottom>
    Prescription Details:
  </Typography>

  <TableContainer component={Paper} sx={{ marginBottom: 2 , backgroundColor: '#808080' }}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>S No</TableCell>
          <TableCell>Medication Name</TableCell>
          <TableCell>Strength</TableCell>
          <TableCell>Dosage Form</TableCell>
          <TableCell>Quantity</TableCell>
          <TableCell>Directions for Use</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {formData.prescriptions.map((row, index) => (
          <TableRow key={index} sx={{ backgroundColor: '#d9d9d9' }}>
            <TableCell>
              <TextField
                value={String(row.sno )}
                //onChange={(e) => handlePrescriptionChange(index, "sno", e.target.value)}
                variant="standard"
                fullWidth
                disabled
              />
            </TableCell>
            <TableCell>
              <TextField
                value={row.medicationname || ""}
                onChange={(e) => handlePrescriptionChange(index, "medicationname", e.target.value)}
                variant="standard"
                fullWidth
              />
            </TableCell>
            <TableCell>
              <TextField
                value={row.strength || ""}
                onChange={(e) => handlePrescriptionChange(index, "strength", e.target.value)}
                variant="standard"
                fullWidth
              />
            </TableCell>
            <TableCell>
              <TextField
                value={row.dosageform || ""}
                onChange={(e) => handlePrescriptionChange(index, "dosageform", e.target.value)}
                variant="standard"
                fullWidth
              />
            </TableCell>
            <TableCell>
              <TextField
                value={row.quantity || ""}
                onChange={(e) => handlePrescriptionChange(index, "quantity", e.target.value)}
                variant="standard"
                fullWidth
              />
            </TableCell>
            <TableCell>
              <TextField
                value={row.directions || ""}
                onChange={(e) => handlePrescriptionChange(index, "directions", e.target.value)}
                variant="standard"
                fullWidth
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>

  {/* Button to add more rows */}
  <Button
    variant="contained"
    //color="primary"
    onClick={handleAddRow}
    sx={{ marginBottom: 2, backgroundColor: "#14467B", textTransform: "none"  }}
  >
    Add Row
  </Button>
  {/* Button to delete the last row */}
  <Button
      variant="contained"
      onClick={handleDeleteRow}
      disabled={formData.prescriptions.length <= 1} // Disable when there's 1 or fewer rows

      sx={{ marginBottom: 2, backgroundColor: "#D32F2F", marginLeft: 2, textTransform: "none" }} // Red background for delete
    >
      Delete Row
    </Button>
</Box>

                <Divider sx={{ my: 3, borderColor: "black" }} />




                {/* box here like history for special instructions*/}

                {/* Big Text Boxes with Headings */}
                <Typography variant="h6" sx={{ marginTop: 5, marginBottom: 2 }}>
                    Special Instructions:
                </Typography>
                <TextField
                  label=""
                  name="specialinstructions"
                  variant="outlined"
                  multiline
                  value={formData.specialinstructions}
                  onChange={handleInputChange}
                  rows={4}
                  fullWidth
                  sx={{ width: '100%', backgroundColor: '#fff', marginBottom: 3 }}
                />

                <Box display="flex" alignItems="center" mb={2}>
                  <Typography variant="body1" sx={{ marginRight: 1 }}>
                    Doctor's Name:
                  </Typography>
                  <Typography
                   
                    
                    variant="standard"
                    size="small"
                    sx={{ flex: 1 }}
                    
                  >
                    {formData.doctorName}
                    </Typography>
                </Box>
                <Box display="flex" alignItems="center" mb={2}>
                  <Typography variant="body1" sx={{ marginRight: 2 }}>
                    Doctor's IMC Number:
                  </Typography>
                  <Typography
           
                    variant="standard"
                    size="small"
                    
                    sx={{ flex: 1 }}
                  >
                    {formData.imcNumber}
                    </Typography>
                </Box>
                

                
                {/* Save Button */}
                <Button
                  onClick={handleSaveAndGeneratePDF4} // Trigger the PDF generation with form data
                  size="small"
                  sx={{
                    backgroundColor: "#14467B",
                    color: "#fff",
                    "&:hover": {},
                    textTransform: "none" 
                  }}
                >
                  Save
                </Button>
                <Dialog open={openPdfOptionsDialog} onClose={() => setOpenPdfOptionsDialog(false)}>
                  
                  <DialogContent>
                  Would you like to download the PDF or just view it in a new tab?
                </DialogContent>
                <DialogActions>
                <Button 
                  onClick={() => handleDownload('Prescription.pdf')}  // Pass the custom name here
                  sx={{
                    backgroundColor: "#14467B", // Button background color
                    color: "#fff", // Text color
                    textTransform: "none" ,
                    "&:hover": {
                    backgroundColor: "#0a3a59", // Hover color
                    
                              },
                      }} 
                  >Download</Button>


                  <Button onClick={handleOpenInNewTab} 
                  sx={{
                    backgroundColor: "#14467B", // Button background color
                    color: "#fff", // Text color
                    textTransform: "none" ,
                    "&:hover": {
                    backgroundColor: "#0a3a59", // Hover color
                      },
                    }} 
                  >Open in New Tab</Button>
                  
                </DialogActions>
                </Dialog>
                <></>
                
              </form>
            </Box>
          </DialogContent>
        </Dialog>


        {/* Form for Button 4 Medical Certificate , also padding etc corrected here (dialog and dialogcontent lines) and box starting line copy and paste everywhere else*/} 
        <Dialog open={openForm === 4} onClose={handleCloseForm} sx={{ '& .MuiDialog-paper': { width: '600px', maxWidth: 'none' } }}>
          <DialogContent sx={{ padding: 0 }}>
            <FormHeader title="" />

            <Box sx={{ padding: 3, mt: 3 }}>
              <Typography
                variant="h5"
                align="center"
                sx={{ marginTop: 2 }}
              >
                Medical Certificate
              </Typography>

              <br />

              {/* Form content */}
              <form>
              <Box display="flex" alignItems="center" mb={2}>
                  <Typography variant="body1" sx={{ marginRight: 1 }}>
                    Patient's Name:
                  </Typography>
                  <Typography
                    
                    
                    variant="standard"
                    size="small"
                    sx={{ flex: 1, paddingLeft: '0px' }}
                  >
                    {formData.name}
                    </Typography>
                </Box>


         
                

                
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                This is to certify that in my opinion the above patient,
              </Typography>
              <Box display="flex" alignItems="center" mb={2} sx={{ maxWidth: '300px'}}>
                  <Typography variant="body1" sx={{ marginRight: 2,  fontWeight: "bold"}}>
                    Examined On:
                  </Typography>
                  <TextField
                    name='date'
                    //variant="standard"
                    size="small"
                    type="date"  // This changes the input type to a date picker
                    value={formData.todaysdate}
                    onChange={handleInputChange}
                    InputProps={{
                        shrink: true,  // This ensures that the label behaves properly when the input type is 'date'
                        }}
                        sx={{ flex: 1, paddingLeft: '10px' }}
                    
                  />
              </Box>

              {/* ADD HERE THE BOX FOR IS WAS SUFFERING LIKE HISTORY */}
              
              {/* Big Text Boxes with Headings */}
      <Typography variant="h6" sx={{ marginTop: 5, marginBottom: 2 }}>
        Is/Was Suffering From:
      </Typography>
      <TextField
        label=""
        name="sufferingdisease"
        variant="outlined"
        multiline
        value={formData.sufferingdisease}
        onChange={handleInputChange}
        rows={4}
        fullWidth
        sx={{ width: '100%',
          backgroundColor: '#fff',
          marginBottom: 3,
          
          overflowY: 'scroll', // Always show the scrollbar
          maxHeight: 150,  }}
      />
              <Typography> 
                And is unable to attend Work: 
              </Typography>
              <Box display="flex" alignItems="center" mb={2}>
                  <Typography variant="body1" sx={{ marginRight: 2,  fontWeight: "normal"}}>
                    From:
                  </Typography>
                  <TextField
                    name="startdate"
                    //variant="standard"
                    size="small"
                    type="date"  // This changes the input type to a date picker
                    value={formData.startdate}
                    onChange={handleInputChange}
                    InputProps={{
                        shrink: true,  // This ensures that the label behaves properly when the input type is 'date'
                        }}
                        sx={{ flex: 1 ,paddingLeft: '10px', maxWidth:"175px"}}
                  />
              </Box>
              <Box display="flex" alignItems="center" mb={2} >
                  <Typography variant="body1" sx={{ marginRight: 2,  fontWeight: "normal"}}>
                    Until/Inclusive:
                  </Typography>
                  <TextField
                    name="enddate"
                    //variant="standard"
                    size="small"
                    type="date"  // This changes the input type to a date picker
                    value={formData.enddate}
                    onChange={handleInputChange}
                    InputProps={{
                        shrink: true,  // This ensures that the label behaves properly when the input type is 'date'
                        }}
                        sx={{ flex: 1, paddingLeft: '10px', maxWidth:"175px" }}
                  />
              </Box>
              <Box display="flex" alignItems="center" mb={2}>
                  <Typography variant="body1" sx={{ marginRight: 1 }}>
                    Doctor's Name:
                  </Typography>
                  <Typography
                   
                    
                    variant="standard"
                    size="small"
                    sx={{ flex: 1 }}
                    
                  >
                    {formData.doctorName}
                    </Typography>
                </Box>
                <Box display="flex" alignItems="center" mb={2}>
                  <Typography variant="body1" sx={{ marginRight: 2 }}>
                    Doctor's IMC Number:
                  </Typography>
                  <Typography
           
                    variant="standard"
                    size="small"
                    
                    sx={{ flex: 1 }}
                  >
                    {formData.imcNumber}
                    </Typography>
                </Box>
              <Typography>
              Note: The letter is being issued on request of the patient named above and is not for Court /Medicolegal purposes. The information contained in this letter is based on the medical details provided by the patent. No physical examination was performed.
              </Typography>
              <Divider sx={{ my: 3, borderColor: 'black' }} />
              <Typography variant= "body1" align="center" sx={{ fontWeight: 'bold', marginBottom: 0 }}>
                FAQ Employer:
              </Typography>
              
              <Typography variant= "body1" align="left" sx={{ fontWeight: 'normal', marginTop: 0 }}>
              This Certificate is issued by GPline healthcare Services platform. GPline is a registered Online platform providing healthcare Services in Ireland. Please do not hesitate to contact us if you need further details.
              
              </Typography>
              <Typography>
                Email: <span style={{ fontWeight: 'bold' }}>info@gpline.ie</span>
              </Typography>
              <br></br>
              

                {/* Save Button */}
                <Button
                  onClick={handleSaveAndGeneratePDF3} // Trigger the PDF generation with form data
                  size="small"
                  sx={{
                    backgroundColor: "#14467B",
                    color: "#fff",
                    textTransform:"none",
                    "&:hover": {
                    backgroundColor: "#0a3a59", // Hover color
                    
                      }
                  }}
                >
                  Save
                </Button>


                <Dialog open={openPdfOptionsDialog} onClose={() => setOpenPdfOptionsDialog(false)}>
                  <DialogTitle sx={{
                        color: "#14467B", // Text color
                        fontWeight: "normal", // Optional: Make the title bold
                        }}>Choose an Option</DialogTitle>

                  <DialogContent>
                  Would you like to download the PDF or just view it in a new tab?
                </DialogContent>
                <DialogActions>
                <Button 
                  onClick={() => handleDownload('Medical_Certificate.pdf')}  // Pass the custom name here
                  sx={{
                    backgroundColor: "#14467B", // Button background color
                    color: "#fff", // Text color
                    textTransform:"none",
                    "&:hover": {
                    backgroundColor: "#0a3a59", // Hover color
                              },
                      }} 
                  >Download</Button>


                  <Button onClick={handleOpenInNewTab} sx={{
                    backgroundColor: "#14467B", // Button background color
                    color: "#fff", // Text color
                    textTransform:"none",
                    "&:hover": {
                    backgroundColor: "#0a3a59", // Hover color
                      },
                    }} 
                  >Open in New Tab</Button>
                  
                </DialogActions>
                </Dialog>
                <></>
              </form>
            </Box>
          </DialogContent>
        </Dialog>


        {/* Form for Clinical Notes BUTTON 5 */}
        {/* Form for Button 5 CLINICAL NOTES */}
        <Dialog open={openForm === 5} onClose={handleCloseForm} sx={{ '& .MuiDialog-paper': { width: '600px', maxWidth: 'none' } }}>
            <DialogContent sx={{ padding: 0 }}>

            {/* Call the reusable FormHeader and pass the title */}
            <FormHeader title="" /> 
            <Box sx={{ padding: 3, mt: 3 }}> {/* Adjust the value of mt to control the margin-top */}
            <Typography
                variant="h5"
                align="center"
                sx={{ marginTop: 2 }}
              >
                Clinical Notes
              </Typography>
              
              <br> 
              </br>

            
            {/* Form content */}
            <form>
            <Box display="flex" alignItems="center" mb={2}>
                  <Typography variant="body1" sx={{ marginRight: 1 }}>
                    Patient's Name:
                  </Typography>
                  <Typography
                    
                    
                    variant="standard"
                    size="small"
                    sx={{ flex: 1, paddingLeft: '0px' }}
                  >
                    {formData.name}
                    </Typography>
                </Box>

            
      {/* Big Text Boxes with Headings */}
      <Typography variant="h5" sx={{ marginTop: 5, marginBottom: 2 }}>
        History
      </Typography>
      <TextField
        label=""
        name="history"
        variant="outlined"
        multiline
        value={formData.history}
        onChange={handleInputChange}
        rows={4}
        fullWidth
        sx={{ width: '100%', backgroundColor: '#fff', marginBottom: 3 }}
      />

      <Typography variant="h5" sx={{ marginBottom: 2 }}>
        Examination
      </Typography>
      <TextField
        label=""
        name="examination"
        variant="outlined"
        multiline
        value={formData.examination}
        onChange={handleInputChange}

        rows={4}
        fullWidth
        sx={{ marginBottom: 3 }}  
      />
      <Typography variant="h5" sx={{ marginBottom: 2 }}>
        Management Plan
      </Typography>
      <TextField
        label=""
        variant="outlined"
        name="managementplan"
        multiline
        value={formData.managementplan}
        onChange={handleInputChange}

        rows={4}
        fullWidth
        sx={{ marginBottom: 3 }}  
      />
              <br />
              <Box display="flex" alignItems="center" mb={2}>
                  <Typography variant="body1" sx={{ marginRight: 1 }}>
                    Doctor's Name:
                  </Typography>
                  <Typography
                   
                    
                    variant="standard"
                    size="small"
                    sx={{ flex: 1 }}
                    
                  >
                    {formData.doctorName}
                    </Typography>
                </Box>

                <Box display="flex" alignItems="center" mb={2}>
                  <Typography variant="body1" sx={{ marginRight: 2 }}>
                    Doctor's IMC Number:
                  </Typography>
                  <Typography
           
                    variant="standard"
                    size="small"
                    
                    sx={{ flex: 1 }}
                  >
                    {formData.imcNumber}
                    </Typography>
                </Box>
              
                {/* Save Button */}
                <Button
                  onClick={handleSaveAndGeneratePDF2} // Trigger the PDF generation with form data
                  size="small"
                  sx={{
                    backgroundColor: "#14467B",
                    color: "#fff",
                    textTransform:"none",
                    "&:hover": {},
                  }}
                >
                  Save
                </Button>

                <Dialog open={openPdfOptionsDialog} onClose={() => setOpenPdfOptionsDialog(false)}>
                  
                  <DialogContent>
                  Would you like to download the PDF or just view it in a new tab?
                </DialogContent>
                <DialogActions>
                <Button 
                  onClick={() => handleDownload('Clinical_Notes.pdf')}  // Pass the custom name here
                  sx={{
                    backgroundColor: "#14467B", // Button background color
                    color: "#fff", // Text color
                    textTransform:"none",
                    "&:hover": {
                    backgroundColor: "#0a3a59", // Hover color
                              },
                      }} 
                  >Download</Button>


                  <Button onClick={handleOpenInNewTab} sx={{
                    backgroundColor: "#14467B", // Button background color
                    color: "#fff", // Text color
                    textTransform:"none",
                    "&:hover": {
                    backgroundColor: "#0a3a59", // Hover color
                      },
                    }} 
                  >Open in New Tab</Button>
                  
                </DialogActions>
                </Dialog>
                <></>
              </form>
            
          </Box>  
          </DialogContent>
        </Dialog>

        {/* form 2, now at the end! */}
        <Dialog open={openForm === 2} onClose={handleCloseForm} sx={{ '& .MuiDialog-paper': { width: '600px', maxWidth: 'none' } }}>
      <DialogContent sx={{ padding: 0 }}>
        <FormHeader title="" />

        <Box sx={{ padding: 3, mt: 3 }}>
          <Typography variant="h5" align="center" sx={{ marginTop: 2 }}>
            Email Files
          </Typography>
          <br />

          {/* Form content */}
          <form>
          <Box display="flex" alignItems="center" mb={2}>
                  <Typography variant="body1" sx={{ marginRight: 1 }}>
                    Recipient's Email:
                  </Typography>
                  <TextField
                    name="Patient_email"
                    value={formData.Patient_email}
                    onChange={handleInputChange}
                    variant="standard"
                    size="small"
                    
                    sx={{ flex: 1 }}>
                    </TextField>
                </Box>
                <Box display="flex" alignItems="center" mb={2}>
                  <Typography variant="body1" sx={{ marginRight: 1 }}>
                    Subject:
                  </Typography>
                  <TextField
                    name="Email_Subject"
                    value={formData.Email_Subject}
                    onChange={handleInputChange}
                    variant="standard"
                    size="small"
                    
                    sx={{ flex: 1 }}>
                    </TextField>
                </Box>
                
                <Box display="flex" alignItems="center" mb={2}>
                  <Typography variant="body1" sx={{ marginRight: 1 }}>
                    Message:
                  </Typography>
                  <TextField
                    name="Email_Message"
                    value={formData.Email_Message}
                    onChange={handleInputChange}
                    variant="standard"
                    size="small"
                    
                    sx={{ flex: 1 }}>
                    </TextField>
                </Box>
                
            {/* Other fields not needed rn */}

            {/* Date Field 
            <Box display="flex" alignItems="center" mb={2} sx={{ maxWidth: "250px" }}>
              <Typography variant="body1" sx={{ marginRight: 2, fontWeight: "normal" }}>
                Date:
              </Typography>
              <TextField
                name="date"
                size="small"
                type="date"
                value={formData.todaysdate}
                onChange={handleInputChange}
                InputProps={{ shrink: true }}
                sx={{ flex: 1, paddingLeft: '0px' }}
              />
            </Box>*/}

            {/* Drag-and-drop area */}
            <Box
              {...getRootProps()}
              sx={{
                border: '2px dashed #14467B',
                padding: 2,
                marginTop: 3,
                textAlign: 'center',
                borderRadius: 1,
                color: '#14467B',
                cursor: 'pointer'
              }}
            >
              <input {...getInputProps()} />
              <Typography variant="body1">Drag and drop files here, or click to select files</Typography>
            </Box>

            {/* Display selected files */}
            {uploadedFiles.length > 0 && (
              <Box mt={2}>
                <Typography variant="body2" fontWeight="bold">Selected Files:</Typography>
                {uploadedFiles.map((file, index) => (
                  <Typography key={index} variant="body2">{file.name}</Typography>
                ))}
              </Box>
            )}

            {/* Send Email Button */}
            <Button
              onClick={handleSendEmail}
              size="small"
              sx={{
                backgroundColor: "#14467B",
                color: "#fff",
                mt: 3,
                "&:hover": { backgroundColor: "#0a3a59" },
                textTransform: "none"
              }}
            >
              Send Email
            </Button>
            
            

          </form>
                  {/* Place dialog outside the form */}
              <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
                {!isLoadingbar && <DialogTitle>Notification</DialogTitle>}
                <DialogContent
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '100px',
                    minWidth: '200px',
                    textAlign: 'center',
                  }}
                >
                  {isLoadingbar ? (
                    <DialogContentText>
                      <CircularProgress sx={{ marginRight: "10px", color:"#14467B" }} />
                      <span style={{ marginLeft: "10px" }}>{dialogMessage}</span>
                    </DialogContentText>
                  ) : (
                    <DialogContentText>{dialogMessage}</DialogContentText>
                  )}
                </DialogContent>
                {!isLoadingbar && (
                  <DialogActions>
                    <Button onClick={() => setDialogOpen(false)} color="primary">
                      Ok
                    </Button>
                  </DialogActions>
                )}
              </Dialog>
        </Box>
      </DialogContent>
    </Dialog>



      </Usewrapper>
    </>
  );
};

export default Consultation;