// File: RefundCancellation.jsx

import React from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
} from '@mui/material';
import { Link } from 'react-router-dom';

const RefundCancellation = () => {
  return (
 <>
<Link to={"/"}>
<Button variant='contained' sx={{position:"fixed"}}>
back
</Button></Link>

 <Container maxWidth="md" style={{ marginTop: '2rem' }}>
      <Card>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Refund and Cancellation Policy
          </Typography>
          <Typography variant="body1" paragraph>
            We understand that sometimes plans change. Our refund and cancellation policy ensures clarity
            and fairness for all patients while maintaining the quality of our services.
          </Typography>

          <Typography variant="h5" gutterBottom>
            Cancellation and Refund Policy for In-Person and Virtual Appointments
          </Typography>

          <Typography variant="h6" gutterBottom>
            Cancellation by the Patient:
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary="Notify us at least 24 hours before the scheduled time to cancel your appointment."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Refunds for cancellations will be issued after deducting 20% of the total charges as a cancellation fee."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Refund requests must be submitted in writing to admin@gpline.ie. Include your full name, appointment date, and payment details."
              />
            </ListItem>
          </List>

          <Divider style={{ margin: '1rem 0' }} />

          <Typography variant="h6" gutterBottom>
            Virtual Consultations:
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary="Once the doctor initiates the virtual consultation, no refunds will be issued, even if you cancel mid-session."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="If you cancel before the doctor begins, the 20% deduction policy applies."
              />
            </ListItem>
          </List>

          <Divider style={{ margin: '1rem 0' }} />

          <Typography variant="h6" gutterBottom>
            Rescheduling Appointments:
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary="Patients cannot reschedule appointments independently. Email admin@gpline.ie for assistance."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Rescheduling is subject to availability and may not always be possible."
              />
            </ListItem>
          </List>

          <Divider style={{ margin: '1rem 0' }} />

          <Typography variant="h6" gutterBottom>
            No-Show Policy:
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary="Failure to attend an appointment without prior cancellation will result in the full charge being non-refundable."
              />
            </ListItem>
          </List>

          <Divider style={{ margin: '1rem 0' }} />

          <Typography variant="h6" gutterBottom>
            Refund Processing:
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary="Refunds will be processed within 7-10 business days after approval."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Refunds will be issued to the original payment method used during booking."
              />
            </ListItem>
          </List>

          <Divider style={{ margin: '1rem 0' }} />

          <Typography variant="body1" paragraph>
            We appreciate your understanding and cooperation. For any questions or further assistance,
            please contact us at <a href="mailto:admin@gpline.ie">admin@gpline.ie</a>.
          </Typography>
        </CardContent>
      </Card>
    </Container>
 </>
  );
};

export default RefundCancellation;
