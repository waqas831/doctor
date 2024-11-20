// File: PrivacyPolicy.jsx

import React from 'react';
import {
  Container,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
  Button,
} from '@mui/material';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  return (
  <>
    <Link to={"/"}>
<Button variant='contained' sx={{position:"fixed"}}>
back
</Button></Link>
    <Container maxWidth="md" style={{ marginTop: '2rem', marginBottom: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        Privacy Policy
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Effective Date: [Date]
      </Typography>
      <Typography variant="body1" paragraph>
        At GPLINE, we value your privacy and are committed to protecting your personal information.
        This Privacy Policy outlines how we collect, use, and safeguard your data when you use our telemedicine platform.
      </Typography>
      <Divider style={{ margin: '1rem 0' }} />

      <Typography variant="h6" gutterBottom>
        1. Information We Collect
      </Typography>
      <List>
        <ListItem>
          <ListItemText
            primary="Personal Identification Information: Name, address, phone number, and email address."
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Health Information: Details related to your medical history and consultations."
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Payment Information: Data required for processing payments securely."
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Technical Data: IP address, device type, and browsing information for platform optimization."
          />
        </ListItem>
      </List>

      <Divider style={{ margin: '1rem 0' }} />

      <Typography variant="h6" gutterBottom>
        2. How We Use Your Information
      </Typography>
      <List>
        <ListItem>
          <ListItemText
            primary="To provide telemedicine services, including consultations and follow-ups."
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="To process payments and manage billing."
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="To enhance the platform’s functionality and user experience."
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="To comply with legal and regulatory requirements."
          />
        </ListItem>
      </List>

      <Divider style={{ margin: '1rem 0' }} />

      <Typography variant="h6" gutterBottom>
        3. Data Sharing and Security
      </Typography>
      <List>
        <ListItem>
          <ListItemText
            primary="We do not sell or share your personal data with third parties, except as required to deliver services or comply with the law."
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Your data is encrypted and stored securely in compliance with GDPR regulations."
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Access to your information is restricted to authorized personnel only."
          />
        </ListItem>
      </List>

      <Divider style={{ margin: '1rem 0' }} />

      <Typography variant="h6" gutterBottom>
        4. Your Rights
      </Typography>
      <List>
        <ListItem>
          <ListItemText
            primary="You have the right to access, correct, or delete your personal data."
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="You can request a copy of your data or withdraw your consent at any time."
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="To exercise your rights, please contact us at [Contact Email]."
          />
        </ListItem>
      </List>

      <Divider style={{ margin: '1rem 0' }} />

      <Typography variant="h6" gutterBottom>
        5. Data Retention
      </Typography>
      <Typography variant="body1" paragraph>
        We retain your data only as long as necessary to provide our services and comply with legal
        obligations. Once the data is no longer required, it is securely deleted or anonymized.
      </Typography>

      <Divider style={{ margin: '1rem 0' }} />

      <Typography variant="h6" gutterBottom>
        6. Changes to this Policy
      </Typography>
      <Typography variant="body1" paragraph>
        We may update this Privacy Policy periodically. Any changes will be posted on our website, and we encourage you to review the policy regularly.
      </Typography>

      <Divider style={{ margin: '1rem 0' }} />

      <Typography variant="h6" gutterBottom>
        7. Contact Us
      </Typography>
      <Typography variant="body1" paragraph>
        If you have any questions about this Privacy Policy or how we handle your data, please contact us at [Contact Email] or [Phone Number].
      </Typography>

      <Divider style={{ margin: '1rem 0' }} />

      <Typography variant="body2" color="textSecondary" align="center">
        By using GPLINE’s telemedicine platform, you acknowledge that you have read, understood, and agree to this Privacy Policy.
      </Typography>
    </Container></>
  );
};

export default PrivacyPolicy;
