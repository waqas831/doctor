


import React, { useState } from "react";
import {
  Box,
  Grid,
  TextField,
  Typography,
  Button,
  MenuItem,
  Select,
  FormControl,
  Checkbox,
  FormControlLabel,
  CircularProgress,
} from "@mui/material";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import LandingPageFooter from "../LandingPageFooter/LandingPageFooter";

function BookOnly() {
  // const [appointmentDate, setAppointmentDate] = useState(null);
  const [appointmentReason, setAppointmentReason] = useState("");
  const [appointmentType, setAppointmentType] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);
  const [name, setName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [email, setEmail] = useState("");
  const [contactInformation, setContactInformation] = useState("");
  const [gender, setGender] = useState("");
  const [drugAllergy, setDrugAllergy] = useState("");
  const [medicineHistory, setMedicineHistory] = useState("");
  const [address, setAddress] = useState("");
  const [termsChecked, setTermsChecked] = useState(false);
  const [consentChecked, setConsentChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  const backendlink = process.env.REACT_APP_BACKEND_LOCAL;

  const typeMapping = {
    video: 1,
    phone: 2,
    other: 3,
  };

  const fetchGoogleMeetLink = async (startTime, endTime, summary) => {
    try {
      const response = await fetch(`${backendlink}/api/v0.1/GoogleCalendar/create-meeting`, {
        method: "POST",
        headers: {
          accept: "*/*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          startTime: startTime,
          endTime: endTime,
          summary: summary,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Failed to fetch Google Meet link:", error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const now = new Date();
    const selectedDate = new Date(appointmentDate);
    if (!appointmentDate || selectedDate < now) {
      toast.error("Appointment date and time cannot be in the past.");
      setLoading(false);
      return;
    }
    
    
    const mappedAppointmentType = typeMapping[appointmentType];
    if (!mappedAppointmentType) {
      toast.error("Please select a valid appointment type.");
      setLoading(false);
      return;
    }

    const startTime = appointmentDate ? new Date(appointmentDate) : null;
    const endTime = startTime ? new Date(startTime.getTime() + 60 * 60 * 1000) : null;

    const formattedStartTime = startTime ? startTime.toISOString() : "";
    console.log("Formatted Start Time:", formattedStartTime);
    
    const formattedEndTime = endTime ? endTime.toISOString() : "";

    const summary = "Consultation Appointment";
    const meetingLinkData = await fetchGoogleMeetLink(formattedStartTime, formattedEndTime, summary);
    const { meetLink } = meetingLinkData || {};

    if (!stripe || !elements) {
      toast.error("Stripe.js has not loaded yet. Please try again.");
      setLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);
    const { token, error } = await stripe.createToken(cardElement);

    if (error) {
      console.error("Stripe Token Error:", error);
      toast.info("Payment failed. Please try again.");
      setLoading(false);
      return;
    }

    const appointmentData = {
      appointmentDate,
      appointmentReason,
      status: 1,
      appointmentLink: meetLink,
      drugAllergy,
      appointmentType: mappedAppointmentType,
      medicineHistory,
      doctorId: 0,
      patientId: 0,
      description,
      amount: Number(amount),
      currency: "eur",
      token: token.id,
      name,
      dateOfBirth,
      email,
      contactInformation,
      gender: Number(gender),
      address
    };

    try {
      const response = await axios.post(
        `${backendlink}/api/v0.1/Appointment/BookAppointment`,
        appointmentData
      );

      if (response.status === 200) {
        toast.success("Appointment booked successfully!");
        resetForm();
        window.location.reload();
      }
    } catch (error) {
      console.error("API Error:", error);
      toast.error("Error booking appointment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  
  
  const resetForm = () => {
    setAppointmentDate(null);
    setAppointmentReason("");
    setAppointmentType("");
    setDescription("");
    setDateOfBirth("");
    setEmail("");
    setContactInformation("");
    setGender("");
    setDrugAllergy("");
    setMedicineHistory("");
    setConsentChecked(false);
    setTermsChecked(false);
    setName("");
    setAmount(0);
    setAmount("")
  };

  const isButtonEnabled = termsChecked && consentChecked;

  return (
    <>
    <Link to={"/"}>
    <Button variant='contained' sx={{position:"fixed"}}>
    back
    </Button></Link>
    <Box bgcolor={"#14457b"} p={2} pt={14}>
       
      <Box
        width={["95%", "95%", "60%"]}
        bgcolor={"white"}
        padding={2}
        border={"1px solid blue"}
        mx={"auto"}
        my={2}
        py={4}
        px={4}
        borderRadius={4}
      >
        <Typography
          style={{
            fontWeight: "bold",
            color: "#14457b",
            textAlign: "center",
            fontSize: 26,
          }}
          mb={2}
        >
          Appointment Form
        </Typography>
        <form onSubmit={handleSubmit}>
        <Grid container spacing={4} sx={{mt:2}}>
            <Grid item xs={12} sm={6} md={4}>
              <Typography fontSize={15} fontWeight={"bold"}>Name</Typography>
              <TextField
                placeholder="Enter your full name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                InputProps={
                  {
                    style: {
                      borderRadius: "5px",
                      height: "50px"
                    }
                  }
                }

              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography fontSize={15} fontWeight={"bold"}>Email</Typography>
              <TextField
               
                placeholder="Enter your email address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                InputProps={
                  {
                    style: {
                      borderRadius: "5px",
                      height: "50px"
                    }
                  }
                }
 type="email"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Typography fontSize={15} fontWeight={"bold"}>Date of Birth</Typography>
              <TextField
                type="date"
                required
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                fullWidth
                InputProps={
                  {
                    style: {
                      borderRadius: "5px",
                      height: "50px"
                    }
                  }
                }
              />
            </Grid>
            <Grid item xs={12} md={12} >
              <Typography fontSize={15} fontWeight={"bold"}>Address</Typography>
              <TextField
                placeholder="Enter address"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                fullWidth
                InputProps={
                  {
                    style: {
                      borderRadius: "5px",
                      height: "50px"
                    }
                  }
                }
              />
            </Grid>
            <Grid item xs={12} md={12} >
              <Typography fontSize={15} fontWeight={"bold"}>Appointment Reason</Typography>
              <TextField
                placeholder="Enter reason for the appointment"
                required
                value={appointmentReason}
                onChange={(e) => setAppointmentReason(e.target.value)}
                fullWidth
                InputProps={
                  {
                    style: {
                      borderRadius: "5px",
                      height: "50px"
                    }
                  }
                }
              />
            </Grid>
           
            <Grid item xs={12} sm={12} md={12}>
  <Typography fontSize={15} fontWeight={"bold"}>
    Appointment Date and Time
  </Typography>
  <TextField
    type="datetime-local"
    required
    value={appointmentDate}
    onChange={(e) => setAppointmentDate(e.target.value)}
    fullWidth
    InputProps={{
      style: {
        borderRadius: "5px",
        height: "50px",
      },
    }}
    inputProps={{
      min: new Date().toISOString().slice(0, 16), 
    }}
  />
</Grid>


            <Grid item xs={12} md={6}>
              <Typography fontSize={15} fontWeight={"bold"}>Appointment Type</Typography>
              <Select
  fullWidth
  onChange={(e) => {
    const selectedValue = e.target.value;

    if (selectedValue === "video" || selectedValue === "phone") {
      setAmount(35); // Set amount for video and phone consultations
    } else {
      setAmount(0); // Reset amount for "other"
    }
    setAppointmentType(selectedValue);
  }}
  value={appointmentType || ""} // Ensure value is always valid
  required
>
  <MenuItem value="" disabled>
    Select Appointment Type
  </MenuItem>
  <MenuItem value="video">Video Consultation</MenuItem>
  <MenuItem value="phone">Phone Consultation</MenuItem>
  <MenuItem value="other">Other</MenuItem>
</Select>

            </Grid>


            <Grid item xs={12} md={6}>
              <FormControl fullWidth required InputProps={
                {
                  style: {
                    borderRadius: "5px",
                    height: "50px"
                  }
                }
              }>
                <Typography fontWeight={"bold"}>Gender</Typography>
                <Select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  fullWidth

                >
                  <MenuItem value={1}>Male</MenuItem>
                  <MenuItem value={2}>Female</MenuItem>
                  <MenuItem value={3}>Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} >
              <Typography fontSize={15} fontWeight={"bold"}>Description</Typography>
              <TextField
                placeholder="appointment description here"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                fullWidth
                InputProps={
                  {
                    style: {
                      borderRadius: "5px",
                      height: "50px"
                    }
                  }
                }
              />
            </Grid>
            <Grid item xs={12} md={6} >
              <Typography fontSize={15} fontWeight={"bold"}>Drug Allergy</Typography>
              <TextField
                placeholder="Any symptoms related to drug allergy"
                required
                value={drugAllergy}
                onChange={(e) => setDrugAllergy(e.target.value)}
                fullWidth
                InputProps={
                  {
                    style: {
                      borderRadius: "5px",
                      height: "50px"
                    }
                  }
                }
              />
            </Grid>

            <Grid item xs={12} md={6} >
              <Typography fontSize={15} fontWeight={"bold"}>Past Medical History</Typography>
              <TextField
                placeholder="Define past medical history here"
                required
                value={medicineHistory}
                onChange={(e) => setMedicineHistory(e.target.value)}
                fullWidth
                InputProps={
                  {
                    style: {
                      borderRadius: "5px",
                      height: "50px"
                    }
                  }
                }
              />
            </Grid>


            <Grid item xs={12} md={6}>
              <Typography fontSize={15} fontWeight={"bold"}>Contact Information</Typography>
              <TextField
                placeholder="Enter your contact number"
                required
                value={contactInformation}
                onChange={(e) => setContactInformation(e.target.value)}
                fullWidth
                InputProps={
                  {
                    style: {
                      borderRadius: "5px",
                      height: "50px"
                    }
                  }
                }
                type="number"

              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography fontSize={15} fontWeight={"bold"}>Currency</Typography>
              <TextField
                value="eur"
                InputProps={{
                  readOnly: true
                  ,
                  style: {
                    borderRadius: "5px",
                    height: "50px"
                  }
                }
                }
                fullWidth
              />
            </Grid>

            <Grid item xs={12} md={6}>
  <Typography fontSize={15} fontWeight={"bold"}>Amount</Typography>
  <TextField
    placeholder="Enter amount"
    value={amount}
    onChange={(e) => setAmount(e.target.value)}
    fullWidth
    InputProps={{
      style: {
        borderRadius: "5px",
        height: "50px"
      }
    }}
    disabled={appointmentType === "video" || appointmentType === "phone"} // Disable for video and phone types
  />
</Grid>

            <Grid item xs={12} md={6} >
              <Typography fontSize={15} fontWeight={"bold"}>Card Information</Typography>
              <CardElement options={{ hidePostalCode: true }} />
            </Grid>

          </Grid>
           <Box display="flex" flexDirection="column" gap={4}>
<Box display={"flex"} mt={3}>
  <FormControlLabel
    control={
      <Checkbox
        checked={termsChecked}
        onChange={(e) => setTermsChecked(e.target.checked)}
      />
    }
  />
  <Box
    sx={{
      height: "150px",
      overflowY: "scroll",
      padding: "10px",
      border: "1px solid #ddd",
      mt: 2,
      "&::-webkit-scrollbar": { width: "8px" },
      "&::-webkit-scrollbar-track": { backgroundColor: "#f1f1f1" },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "#888",
        borderRadius: "4px",
      },
      "&::-webkit-scrollbar-thumb:hover": { backgroundColor: "#555" },
    }}
  >
    <Typography >
      <strong>GPLINE Telemedicine Platform Terms and Conditions</strong>
      <br />
     <strong>Effective Date:</strong> [Date] *
      <br />
      Welcome to GPLINE. By accessing or using our telemedicine platform, you agree to be bound by these Terms and Conditions, which govern your use of our services. Please review them carefully.
      <br />

      <strong>1. Acceptance of Terms</strong>
      <br />
      - By using GPLINE’s telemedicine services, you agree to comply with these Terms and Conditions, as well as applicable laws and regulations in the Republic of Ireland.
      <br />
      - If you do not agree with these terms, please refrain from using our platform.
      <br />
      <strong>2. Description of Services</strong>
      - GPLINE provides a secure, virtual platform for telemedicine consultations between healthcare providers and patients within the Republic of Ireland. All consultations are conducted remotely via video, phone, or messaging.
      <br />
      <strong>3. Use of Services</strong>
      <br />
      - You must be 18 years or older to register on GPLINE. Minors (below 18) must have a parent or legal guardian’s consent and accompaniment during consultations.
      <br />
      - You agree to provide accurate, up-to-date information and to notify us of any changes.
      <br />
      <strong>4. Consent to Telemedicine</strong>
      <br />
      - By using GPLINE, you consent to telemedicine, acknowledging that it differs from in-person consultations and may have limitations in diagnosis and treatment.
      <br />
      - GPLINE does not replace in-person healthcare services, and users are encouraged to seek face-to-face medical evaluation as needed.
      <br />
      <strong>5. Data Privacy and Security</strong>
      <br />
      - GPLINE prioritizes patient privacy and complies with GDPR regulations in the Republic of Ireland.
      <br />
      - Your personal data is stored transiently during consultations and will be deleted immediately after the session ends, in accordance with our commitment to data security and privacy.
      <br />
      <strong>6. Limitation of Liability</strong>
      <br />
      - GPLINE and its providers are not liable for any damages arising from your use of the platform, including any indirect, incidental, or consequential damages.
      <br />
      - While GPLINE strives to provide accurate information and effective treatment, we do not guarantee specific outcomes from the use of our services.
      <br />
      <strong>7. User Conduct</strong>
      <br />
      - Users are expected to conduct themselves respectfully and truthfully. Misrepresentation or misuse of the platform will lead to account suspension or termination.
      <br />
      - GPLINE is not for emergency use. For urgent medical issues, please contact emergency services in Ireland immediately by dialing 112 or 999.
      <br />
      <strong>8. Intellectual Property</strong>
      <br />
      - All content, software, and materials provided by GPLINE are protected by intellectual property laws. Users may not copy, distribute, or create derivative works from any GPLINE content without prior permission.
      <br />
      <strong>9. Payment and Refunds</strong>
      <br />
      - All fees for services are due at the time of booking. Payments are securely processed through [Payment Provider Stripe].
      <br />
      - Refunds may be available on a case-by-case basis in alignment with our cancellation policy, detailed separately.
      <br />
      <strong>10. Changes to Terms</strong>
      <br />
      - GPLINE reserves the right to update these Terms and Conditions at any time. Changes will be posted on our website and communicated to registered users. Continued use of the platform constitutes acceptance of the revised terms.
      <br />
      <strong>11. Governing Law</strong>
      <br />
      - These Terms and Conditions are governed by the laws of the Republic of Ireland.
      <br />
      <strong>12. Contact Information</strong>
      <br />
      - For any questions or concerns regarding these Terms and Conditions, please contact us at [Contact Email or Phone Number].
      <br />

      <em>By using GPLINE’s services, you acknowledge that you have read, understood, and agree to these Terms and Conditions.</em>
    </Typography>
  </Box>
</Box>

<Box display={"flex"}>
  <FormControlLabel
    control={
      <Checkbox
        checked={consentChecked}
        onChange={(e) => setConsentChecked(e.target.checked)}
      />
    }
  />
  <Box
    sx={{
      height: "150px",
      overflowY: "scroll",
      padding: "10px",
      border: "1px solid #ddd",
      "&::-webkit-scrollbar": { width: "8px" },
      "&::-webkit-scrollbar-track": { backgroundColor: "#f1f1f1" },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "#888",
        borderRadius: "4px",
      },
      "&::-webkit-scrollbar-thumb:hover": { backgroundColor: "#555" },
    }}
  >
    <Typography>
      <strong>GPLINE Telemedicine Consent Form</strong>
      <br /><br />
      Thank you for choosing GPLINE for your healthcare needs. Before proceeding with your telemedicine appointment, please review and agree to the following terms:
      <br /><br />
      <strong>1. Purpose of Telemedicine</strong>
      <ul>
        <li>GPLINE provides a platform for virtual healthcare consultations, allowing you to connect with healthcare providers remotely.</li>
      </ul>
      <strong>2. Data Use and Privacy</strong>
      <ul>
        <li>GPLINE collects and uses personal data strictly for the purpose of providing medical consultation and does so in compliance with data protection laws.</li>
        <li>Your personal data will be stored only during the consultation session and deleted immediately after the appointment ends, ensuring transient data storage.</li>
      </ul>
      <strong>3. Consent to Treatment</strong>
      <ul>
        <li>By consenting, you acknowledge that you understand the limitations of telemedicine compared to in-person consultations. You agree to seek further in-person consultation if advised by the provider.</li>
      </ul>
      <strong>4. Risks and Benefits of Telemedicine</strong>
      <ul>
        <li>Telemedicine allows for convenient access to healthcare but may have limitations in diagnostic accuracy due to the lack of a physical examination.</li>
      </ul>
      <strong>5. Confidentiality and Security</strong>
      <ul>
        <li>All communication between you and the healthcare provider on GPLINE is encrypted to maintain confidentiality.</li>
        <li>GPLINE only retains data for the duration of your consultation. Following your session, all patient data, including conversation history and images, is permanently deleted.</li>
      </ul>
      <br /><br />
      <strong>GPLINE Telemedicine is not for acute emergencies. For severe symptoms like chest pain or shortness of breath, please call 112 or 999 immediately.</strong>
     
      <br /><br />
      <strong>6. Acknowledgment and Consent</strong>
      <br />
      I, the undersigned, confirm that I have read and understood the terms outlined above. By signing, I voluntarily consent to telemedicine services through GPLINE and understand that my data will be stored transiently for the consultation's duration.
    </Typography>
  </Box>
</Box>
</Box> 

          <Grid container justifyContent="center" spacing={2} marginTop={2}>
            <Grid item>
              <Button
                type="submit"
                disabled={!isButtonEnabled || !stripe}
                sx={{ bgcolor: "#3ab6bb", color: "white", padding: 2, px: 6 }}
              >
                {loading ? <CircularProgress size={24} /> : "Submit"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
      <ToastContainer />
      <LandingPageFooter/>
    </Box></>
  );
}

export default BookOnly;

 

