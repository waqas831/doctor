import React from 'react';
import { Box, Container, Grid, Typography, IconButton, Divider } from '@mui/material';
import { Facebook, WhatsApp, Instagram, LocationOn, AccessTime, Email } from '@mui/icons-material';
import footerlogo from '../../images/logo-footer.svg';
import american from "../../images/american.png";
import dic from "../../images/dic.png";
import master from "../../images/master.png";
import visa from "../../images/visa.png";
import card from "../../images/card.png";
import { Link } from 'react-router-dom';

const LandingPageFooter = () => {
  const message = "How can I assist you today?";
  const encodedMessage = encodeURIComponent(message);
  const number = 353831695440;
  const whatsappUrl = `https://wa.me/${number}?text=${encodedMessage}`;

  const handleClick = () => {
    window.open(whatsappUrl, "_blank");
  };
  return (
    <Box sx={{ bgcolor: '#003366', color: 'white', py: 4 }}>
    <Container maxWidth="lg">
      <Grid container spacing={3} alignItems="flex-start">
        <Grid item xs={12} sm={6} md={2} textAlign="center">
          <img src={footerlogo} alt="Clinic Logo" style={{ width: '120px', marginBottom: '16px' }} />
          <Box>
            <IconButton component="a" onClick={handleClick}  rel="noopener noreferrer">
              <WhatsApp sx={{ color: '#25D366' }} />
            </IconButton>
            <IconButton component="a" href="https://www.facebook.com/profile.php?id=61566471099931" target="_blank" rel="noopener noreferrer">
              <Facebook sx={{ color: '#1877F2' }} />
            </IconButton>
            <IconButton component="a" href="https://www.instagram.com/onetech_and.ai/" target="_blank" rel="noopener noreferrer">
              <Instagram sx={{ color: '#E4405F' }} />
            </IconButton>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6} md={2}  >
          <Typography variant="h5" gutterBottom>Quick Links</Typography>
          <Box display="flex" flexDirection="column" textAlign="left">
            {/* {['Home', 'About Us', 'Services', 'Contact'].map((link) => (
              <Link key={link} href="#" color="inherit" sx={{ mb: 0.5 }}>
                {link}
              </Link>
            ))} */}
            <Typography sx={{":hover":{color:"#3ab6bb",cursor:"pointer"}}}><Link to={"/"}> Home </Link></Typography>
            <Typography  sx={{":hover":{color:"#3ab6bb",cursor:"pointer"}}}> <Link to={"/"}>About</Link></Typography>
            <Typography  sx={{":hover":{color:"#3ab6bb",cursor:"pointer"}}}> <Link to={"/"}>Services </Link></Typography>
            <Typography onClick={handleClick} sx={{":hover":{color:"#3ab6bb",cursor:"pointer"}}}>Contact</Typography>
            </Box>
        </Grid>

        <Grid item xs={12} sm={6} md={2}>
          <Typography variant="h5" gutterBottom>Legal</Typography>
          <Box display="flex" flexDirection="column" textAlign="left">
          <Box display="flex" flexDirection="column" textAlign="left">
            {/* {['Privacy Policy', 'Terms of Service', 'Return Policy', ].map((link) => ( */}
              <Link to={"/privayPolicy"} color="inherit" sx={{ mb: 0.5 }}>
                {/* {link} */}Privacy Policy
              </Link>
               <Link to={"/termsAndServices"}>
               {/* {link} */} Terms And Services
             </Link>
              <Link  to={"/refundAndCancellation"}>
              {/* {link} */} Payment And Cancellation
            </Link>
            {/* // ))} */}
          </Box>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h5" gutterBottom>Contact Us</Typography>
          <Box display="flex" alignItems="center" mb={1}>
            <LocationOn sx={{ mr: 1 }} />
            <Typography fontSize={14}>
              Frenchpark Medical Centre, Boyle Rd, Co. Roscommon, F45 FX62
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" mb={1}>
            <AccessTime sx={{ mr: 1 }} />
            <Typography fontSize={14}>24/7 Services</Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <Email sx={{ mr: 1 }} />
            <Typography fontSize={14}>
              <Link href="mailto:info@gpline.ie" color="inherit">info@gpline.ie</Link>
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h5" gutterBottom>Payment Methods</Typography>
          <Typography fontSize={14} mb={1}>
            All checkout and card processing on our site are carried out securely. We support all major payment methods including:
          </Typography>
          <Box display="flex" flexWrap="wrap">
            {[american, dic, master, visa, card].map((src, index) => (
              <img key={index} src={src} alt={`Payment Method ${index + 1}`} style={{ height: "45px", width: "60px", margin: "5px" }} />
            ))}
          </Box>
        </Grid>
      </Grid>

      <Divider sx={{ my: 3, bgcolor: 'gray' }} />

      <Box textAlign="center">
        <Typography variant="body2" sx={{ color: 'gray' }}>
          © {new Date().getFullYear()} GPLine. All rights reserved.
        </Typography>
      </Box>
    </Container>
  </Box>
  );
};

export default LandingPageFooter;
