


import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  Button,
  MenuItem,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  Popover,
  Grid,
  Container,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LoginIcon from '@mui/icons-material/Login';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import CallIcon from '@mui/icons-material/Call';
import { Link } from 'react-router-dom';
import logo from "../../images/logo.png";
import LandingPageFooter from '../../Component/LandingPageFooter/LandingPageFooter';
import LandingAward from '../../Component/LandingAward/LandingAward';
import WhatWeDo from '../../Component/LandingWhatWeDo/WhatWeDo';
import LandingPrice from '../../Component/LandingPrice/LandingPrice';
import LandingchooseUs from '../../Component/LandingchooseUs/LandingchooseUs';
import LandingPatient from '../../Component/LandingPatient/LandingPatient';
import AppointForm from '../../Component/doctormanagement/AppointForm';
import ChatbotComponent from '../../ChatbotComponent';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { Facebook, WhatsApp, Instagram, LocationOn, AccessTime, Email } from '@mui/icons-material';
import footerlogo from '../../images/logo-footer.svg';
import american from "../../images/american.png";
import dic from "../../images/dic.png";
import master from "../../images/master.png";
import visa from "../../images/visa.png";
import card from "../../images/card.png";
import MedicationIcon from '@mui/icons-material/Medication';
import ScaleIcon from '@mui/icons-material/Scale';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import Team from '../../Component/team/Team';
import ImageSlider from '../../imageSlider/ImageSlider';
import SettingsAccessibilityIcon from '@mui/icons-material/SettingsAccessibility';
import CookieOutlinedIcon from '@mui/icons-material/CookieOutlined';
import GoogleTranslate from '../../Component/GoogleTranslate/googletranslate';
const LandingPageView = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerCookieOpen, setDrawerCookieOpen] = useState(false);
  const chooseUsRef = useRef(null);
  const whatWeDoRef = useRef(null);
  const landingPriceRef = useRef(null);
  const homeRef = useRef(null);

  const navbarStyles = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    zIndex: 12,
    bgcolor: "#14457b",
  };

  const handlePopoverOpen = (event) => setAnchorEl(event.currentTarget);
  const handlePopoverClose = () => setAnchorEl(null);
  const openPopover = Boolean(anchorEl);

  const scrollToSection = (ref) => {
    ref.current && ref.current.scrollIntoView({ behavior: 'smooth' });
    handlePopoverClose();
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) return;
    setDrawerOpen(open);
  };

  useEffect(() => {
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieConsent) {
      setDrawerCookieOpen(true); 
    }
  }, []);

  const handleAcceptCookies = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setDrawerCookieOpen(false);
  };

  const handleRejectCookies = () => {
    localStorage.setItem('cookieConsent', 'rejected');
    setDrawerCookieOpen(false); 
  };
  const message = "How can I assist you today?";
  const encodedMessage = encodeURIComponent(message);
  const number = process.env.REACT_APP_WHATSAPP_NUMBER;
  const whatsappUrl = `https://wa.me/${number}?text=${encodedMessage}`;

  const handleClick = () => {
    window.open(whatsappUrl, "_blank");
  };
  const drawerContent = (
    <Box role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
     
  <List>
    {/* <ListItem>
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <GoogleTranslate />
      </Box>
    </ListItem> */}
        <ListItem button onClick={() => scrollToSection(homeRef)}>
          <ListItemText primary="Home" sx={{ color: "#14457b" }} />
        </ListItem>
        <ListItem button onClick={() => scrollToSection(whatWeDoRef)}>
          <ListItemText primary="About" sx={{ color: "#14457b" }} />
        </ListItem>
        <ListItem button onClick={() => scrollToSection(chooseUsRef)}>
          <ListItemText primary="Why Choose Us" sx={{ color: "#14457b" }} />
        </ListItem>
        <ListItem button onClick={() => scrollToSection(landingPriceRef)}>
          <ListItemText primary="Pricing" sx={{ color: "#14457b" }} />
        </ListItem>
        <ListItem button >
          <Link to={"/team"}>
          <ListItemText primary="Team" sx={{ color: "#14457b" }} />
          </Link>
        </ListItem>
        <Divider />
        <ListItem >
          <ListItemText primary="Services" sx={{ color: "#14457b" }} />
          
        </ListItem>
        <Box sx={{ p: 2 }}>
        <Link  to='/patientBookAppointment' >
            <MenuItem>
              <VideoCallIcon fontSize="small" sx={{ mr: 1 }} /> Video Call
            </MenuItem>
          </Link>
          <Link  to='/patientBookAppointment' >
            <MenuItem>
              <CallIcon fontSize="small" sx={{ mr: 1 }} /> Audio Call
            </MenuItem>
          </Link>
          <Link  to='/patientBookAppointment' >
            <MenuItem>
              <MedicationIcon fontSize="small" sx={{ mr: 1 }} /> Prescription
            </MenuItem>
          </Link>
          <Link  to='/patientBookAppointment' >
            <MenuItem>
              <ScaleIcon fontSize="small" sx={{ mr: 1 }} /> Weight Loss
            </MenuItem>
          </Link>
          <Link  to='/patientBookAppointment' >
            <MenuItem>
              <AutoFixHighIcon fontSize="small" sx={{ mr: 1 }} /> Dermatologist
            </MenuItem>
          </Link>
        </Box>

        {/* <ListItem button>
          <a
            href="/becomeADoctor"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#14457b", textDecoration: 'none' }}
          >
            <ListItemText primary="Become a Doctor" />
          </a>
        </ListItem> */}
      
        <Divider />
        <ListItem>
          <Box display="flex" flexDirection="column">
            <Button sx={{ bgcolor: "#3ab6bb", color: "white" }}>
              {/* <Link to="/patientBookAppointment" style={{ color: "white", textDecoration: 'none' }}> */}
               
              <Link  to='/patientBookAppointment' style={{color:"white"}} >
    Book Appointment <LocalHospitalIcon />
  </Link>
              {/* </Link> */}
            </Button>
            <Button sx={{ bgcolor: "#3ab6bb", color: "white", mt: 1 }}>
              <Link to={"applyAsDoctor"}
              
                style={{ color: "white", textDecoration: 'none' }}
              >
                Apply as Doctor <SettingsAccessibilityIcon />
              </Link>
            </Button>
            <Button sx={{ bgcolor: "#3ab6bb", color: "white", mt: 1 }}>
              <Link to="/doctorLogin" style={{ color: "white", textDecoration: 'none' }}>
                Login <LoginIcon />
              </Link>
            </Button>
          </Box>
        </ListItem>
      </List>
    </Box>
  );

  const drawerCookieContent = (
    <Box sx={{ p: 2, textAlign: 'center' }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
      <CookieOutlinedIcon sx={{color:"#FF8900"}}/>   We use cookies to enhance your experience on our website.
      </Typography>
      <Typography variant="body2" sx={{ mb: 3 }}>
        By accepting cookies, you consent to the use of cookies for analytics and personalized content.
      </Typography>
      <Box display="flex" justifyContent="center" gap={2}>
        <Button variant="contained" color="error" onClick={handleRejectCookies}>
          Reject
        </Button>
        <Button variant="contained" color="success" onClick={handleAcceptCookies}>
          Accept
        </Button>
      </Box>
    </Box>
  );

  return (
    <>
      <Box sx={navbarStyles} display="flex" justifyContent="space-between" p={1} alignItems="center">
        <Box>
          <img src={logo} alt="Logo" />
        </Box>
        <Box sx={{ display: { xs: 'none', md: 'none', lg: "flex" } }}>
          <Typography
            mx={2}
            onClick={() => scrollToSection(homeRef)}
            sx={{
              color: "white",
              fontSize: 16,
              ":hover": { color: "#14457b", bgcolor: "white", px: 1, cursor: "pointer", borderRadius: 1 },
              transition: "0.3s",
            }}
          >
            Home
          </Typography>
          <Typography
            mx={2}
            onClick={() => scrollToSection(whatWeDoRef)}
            sx={{
              color: "white",
              fontSize: 16,
              ":hover": { color: "#14457b", bgcolor: "white", px: 1, cursor: "pointer", borderRadius: 1 },
              transition: "0.3s",
            }}
          >
            About
          </Typography>
          <Typography
            mx={2}
            onClick={() => scrollToSection(chooseUsRef)}
            sx={{
              color: "white",
              fontSize: 16,
              ":hover": { color: "#14457b", bgcolor: "white", px: 1, cursor: "pointer", borderRadius: 1 },
              transition: "0.3s",
            }}
          >
            Why Choose Us
          </Typography>
          <Typography
            mx={2}
            onClick={handlePopoverOpen}
            sx={{
              color: "white",
              fontSize: 16,
              ":hover": { color: "#14457b", bgcolor: "white", px: 1, cursor: "pointer", borderRadius: 1 },
              transition: "0.3s",
            }}
          >
            Services <KeyboardArrowDownIcon />
          </Typography>
          
            <Link to={"/team"} style={{color:"white"}}>
            <Typography
            mx={2}
            // onClick={() => scrollToSection(landingPriceRef)}
            sx={{
              color: "white",
              fontSize: 16,
              ":hover": { color: "#14457b", bgcolor: "white", px: 1, cursor: "pointer", borderRadius: 1 },
              transition: "0.3s",
            }}
          >
              Team
          </Typography>
          
            </Link>
          <Typography
            mx={2}
            onClick={() => scrollToSection(landingPriceRef)}
            sx={{
              color: "white",
              fontSize: 16,
              ":hover": { color: "#14457b", bgcolor: "white", px: 1, cursor: "pointer", borderRadius: 1 },
              transition: "0.3s",
            }}
          >
            Pricing
          </Typography>
        </Box>
        <Box sx={{ display: { xs: 'block', md: 'block', lg: 'none' } }}>
          <IconButton onClick={toggleDrawer(true)} sx={{ color: "white" }}>
          
            <MenuIcon />
            
          </IconButton>
          

          <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
            {drawerContent}
          </Drawer>
        </Box>
        <Box display="flex" sx={{ display: { xs: 'none', md: 'none', lg: 'block' } }}>
          <Button sx={{ bgcolor: "#3ab6bb", color: "white", mr: 2 }}>
            <Link to={"/applyAsDoctor"}
              
              style={{ color: "white", textDecoration: 'none' }}
            >
              Apply as Doctor <SettingsAccessibilityIcon />
            </Link>
          </Button>
          <Button sx={{ bgcolor: "#3ab6bb", color: "white" }}>
          <Link  to='/patientBookAppointment' style={{ color: "white", textDecoration: 'none' }}>
              Book Appointment <LocalHospitalIcon />
            </Link>
          </Button>
          <Button sx={{ bgcolor: "#3ab6bb", color: "white", ml: 2 }}>
            <Link to="/doctorLogin" style={{ color: "white", textDecoration: 'none' }}>
              Login<LoginIcon />
            </Link>
          </Button>
          {/* <Box sx={{ 
            mt: 0.5, 
            display: { xs: 'block', md: 'block', lg: 'block' },
            width: { xs: '50%', sm: '40%', md: '30%' }, // Adjust width for mobile and larger screens
            height: 'auto', // Adjust height if needed
            fontSize: { xs: '0.8rem', sm: '1rem', md: '1.1rem' }, // Smaller text on mobile, bigger on larger screens
            padding: { xs: '5px', sm: '10px', md: '15px' }, // Adjust padding for mobile and larger screens
            textAlign: 'center', // Center the component inside the Box if needed
          }}>
            <GoogleTranslate />
          </Box> */}

        </Box>
        <Box sx={{ position: 'fixed', top: 65, right: 5, zIndex: 10 }} >
            <GoogleTranslate />
          </Box>
      </Box>
{/* <Box sx={{ position: 'fixed', top: 10, left: 50, zIndex: 50 }} display={{ xs: 'none', md: 'flex' }}>
            <GoogleTranslate />
          </Box> */}
      <Popover
        open={openPopover}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        disableRestoreFocus
      >
        <Box sx={{ p: 2 }}>
          <Link  to='/patientBookAppointment' >
            <MenuItem>
              <VideoCallIcon fontSize="small" sx={{ mr: 1 }} /> Video Call
            </MenuItem>
          </Link>
          <Link  to='/patientBookAppointment' >
            <MenuItem>
              <CallIcon fontSize="small" sx={{ mr: 1 }} /> Audio Call
            </MenuItem>
          </Link>
          <Link  to='/patientBookAppointment' >
            <MenuItem>
              <MedicationIcon fontSize="small" sx={{ mr: 1 }} /> Prescription
            </MenuItem>
          </Link>
          <Link  to='/patientBookAppointment' >
            <MenuItem>
              <ScaleIcon fontSize="small" sx={{ mr: 1 }} /> Weight Loss
            </MenuItem>
          </Link>
          <Link  to='/patientBookAppointment' >
            <MenuItem>
              <AutoFixHighIcon fontSize="small" sx={{ mr: 1 }} /> Dermatologist
            </MenuItem>
          </Link>
        </Box>
      </Popover>

      {/* Main Content */}
      <Box ref={homeRef}>
        <ImageSlider />
      </Box>
      <AppointForm />
      {/* <Box ref={teamRef} mt={12}>
        <Team />
      </Box> */}
      <Box ref={chooseUsRef}>
        <LandingchooseUs />
      </Box>
      <Box ref={whatWeDoRef}>
        <WhatWeDo />
      </Box>
      <Box ref={landingPriceRef}>
        <LandingPrice />
      </Box>
      {/* <LandingPatient /> */}
      <LandingAward />
      {/* <LandingPageFooter /> */}
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
              <Typography onClick={() => scrollToSection(homeRef)} sx={{":hover":{color:"#3ab6bb",cursor:"pointer"}}}>Home</Typography>
              <Typography onClick={() => scrollToSection(whatWeDoRef)} sx={{":hover":{color:"#3ab6bb",cursor:"pointer"}}}>About</Typography>
              <Typography onClick={() => scrollToSection(landingPriceRef)} sx={{":hover":{color:"#3ab6bb",cursor:"pointer"}}}>Services</Typography>
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
      <ChatbotComponent />

     
      <Drawer
        anchor="bottom"
        open={drawerCookieOpen}
        onClose={handleRejectCookies} 
        sx={{
          '& .MuiDrawer-paper': {
            height: 'auto',
            width: '100%',
            maxWidth: '500px',
            margin: '0 auto',
            borderRadius: '8px',
            boxShadow: '0px -2px 10px rgba(0, 0, 0, 0.2)',
          },
        }}
      >
        {drawerCookieContent}
      </Drawer>
    </>
  );
};

export default LandingPageView;
