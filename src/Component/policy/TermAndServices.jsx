// File: TermAndServices.jsx

import React from 'react';
import {
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  Button,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from 'react-router-dom';

const TermAndServices = () => {
  return (
<>
<Link to={"/"}>
<Button variant='contained' sx={{position:"fixed"}}>
back
</Button></Link>
    <Container maxWidth="md" style={{ marginTop: '2rem', marginBottom: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        GPLINE Telemedicine Platform Terms and Conditions
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Effective Date: [Date]
      </Typography>
      <Typography variant="body1" paragraph>
        Welcome to GPLINE. By accessing or using our telemedicine platform, you agree to be bound by these Terms and Conditions, which govern your use of our services. Please review them carefully.
      </Typography>
      <Divider style={{ margin: '1rem 0' }} />

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">1. Acceptance of Terms</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1">
            - By using GPLINE’s telemedicine services, you agree to comply with these Terms and Conditions, as well as applicable laws and regulations in the Republic of Ireland.
            <br />
            - If you do not agree with these terms, please refrain from using our platform.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">2. Description of Services</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1">
            - GPLINE provides a secure, virtual platform for telemedicine consultations between healthcare providers and patients within the Republic of Ireland.
            <br />
            - All consultations are conducted remotely via video, phone, or messaging.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">3. Use of Services</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1">
            - You must be 18 years or older to register on GPLINE. Minors (below 18) must have a parent or legal guardian’s consent and accompaniment during consultations.
            <br />
            - You agree to provide accurate, up-to-date information and to notify us of any changes.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">4. Consent to Telemedicine</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1">
            - By using GPLINE, you consent to telemedicine, acknowledging that it differs from in-person consultations and may have limitations in diagnosis and treatment.
            <br />
            - GPLINE does not replace in-person healthcare services, and users are encouraged to seek face-to-face medical evaluation as needed.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">5. Data Privacy and Security</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1">
            - GPLINE prioritizes patient privacy and complies with GDPR regulations in the Republic of Ireland.
            <br />
            - Your personal data is stored transiently during consultations and will be deleted immediately after the session ends, in accordance with our commitment to data security and privacy.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">6. Limitation of Liability</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1">
            - GPLINE and its providers are not liable for any damages arising from your use of the platform, including any indirect, incidental, or consequential damages.
            <br />
            - While GPLINE strives to provide accurate information and effective treatment, we do not guarantee specific outcomes from the use of our services.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">7. User Conduct</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1">
            - Users are expected to conduct themselves respectfully and truthfully. Misrepresentation or misuse of the platform will lead to account suspension or termination.
            <br />
            - GPLINE is not for emergency use. For urgent medical issues, please contact emergency services in Ireland immediately by dialing 112 or 999.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">8. Intellectual Property</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1">
            - All content, software, and materials provided by GPLINE are protected by intellectual property laws. Users may not copy, distribute, or create derivative works from any GPLINE content without prior permission.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">9. Payment and Refunds</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1">
            - All fees for services are due at the time of booking. Payments are securely processed through [Payment Provider Stripe].
            <br />
            - Refunds may be available on a case-by-case basis in alignment with our cancellation policy, detailed separately.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">10. Changes to Terms</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1">
            - GPLINE reserves the right to update these Terms and Conditions at any time. Changes will be posted on our website and communicated to registered users. Continued use of the platform constitutes acceptance of the revised terms.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">11. Governing Law</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1">
            - These Terms and Conditions are governed by the laws of the Republic of Ireland.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">12. Contact Information</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1">
            - For any questions or concerns regarding these Terms and Conditions, please contact us at [Contact Email or Phone Number].
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Divider style={{ margin: '1rem 0' }} />
      <Typography variant="body2" color="textSecondary" align="center">
        By using GPLINE’s services, you acknowledge that you have read, understood, and agree to these Terms and Conditions.
      </Typography>
    </Container></>
  );
};

export default TermAndServices;
