// import React from 'react';
// import "./LandingchooseUs.css";
// import correct from "../../images/landcorrect.svg";
// import imgchoose from "../../images/landchoose.svg";


// const LandingchooseUs = () => {
//     return (
//         <div className='LandingchooseUs'>
//             <div className="container-choose">
//                 <div className="choose-row">
//                     <div className="chosse-detail-otr">
//                         <div className="chosse-detail-inr">
//                             <div className='LandingWrapper2'>
//                                 <p className="wrapperheading2">GP- Line</p>
//                                 <div className="wrapper-bt-otr2">
//                                     <p className="wrapper-bt2">
//                                     Why Choose Us

//                                     </p>
//                                 </div>
//                                 <div className="wrapper-detail-otr2">
//                                     <p className="wrapper-detail2">We offer a wide range of medical services, from preventive care and routine check-ups to specialized treatments and surgeries.
//                                     </p>
//                                 </div>
//                             </div>
//                             <ul className="ul-choose">
//                                 <li className="li-choose">
//                                     <p className="para-choose"><img src={correct} className='tick1' alt="" />On demand service (24 hourse)</p>
//                                 </li>
                          
//                                 <li className="li-choose">
//                                     <p className="para-choose"><img src={correct} className='tick1' alt="" />IMC Registered GP's</p>
//                                 </li>
//                                 <li className="li-choose">
//                                     <p className="para-choose"><img src={correct} className='tick1' alt="" />All condition type treatments</p>
//                                 </li>
//                                 <li className="li-choose">
//                                     <p className="para-choose"><img src={correct} className='tick1' alt="" />Same day fit to fly certificates, sick notes, referral letters and prescriptions</p>
//                                 </li>
//                                 <li className="li-choose">
//                                     <p className="para-choose"><img src={correct} className='tick1' alt="" />Hassle free, private and confidential</p>
//                                 </li>
//                                 <li className="li-choose">
//                                     <p className="para-choose"><img src={correct} className='tick1' alt="" />Be seen within an hour</p>
//                                 </li>
//                                 <li className="li-choose">
//                                     <p className="para-choose"><img src={correct} className='tick1' alt="" />More convenient, efficient and flexible service</p>
//                                 </li>
//                                 <li className="li-choose">
//                                     <p className="para-choose"><img src={correct} className='tick1' alt="" />Excellent clients satisfaction (Trust pilot & Google reviews).</p>
//                                 </li>
//                             </ul>
//                         </div>
//                     </div>
//                     <div className="choose-img-otr">
//                         <img src={imgchoose} className="choose-img-inr" alt="" />
//                     </div>
//                 </div>
//             </div>
//         </div>
//         // <Box width={["90%","70%","50%"]} display={"flex"} justifyContent={"center"} mx={"auto"} my={4}>
//         // <img src={choose2} style={{width:"100%"}} />
//         // </Box>
//     )
// }

// export default LandingchooseUs



import React from 'react';
import { Box, Typography, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { styled, keyframes } from '@mui/system';
import correctIcon from "../../images/landcorrect.svg";
import imgchoose from "../../images/landchoose.svg";


const glow = keyframes`
  0% { box-shadow: 0 0 8px rgba(255, 255, 255, 0.2); }
  50% { box-shadow: 0 0 15px rgba(255, 255, 255, 0.5); }
  100% { box-shadow: 0 0 8px rgba(255, 255, 255, 0.2); }
`;

const BackgroundContainer = styled(Box)({
  position: 'relative',
  overflow: 'hidden',
  backgroundImage: `linear-gradient(rgba(30, 136, 229, 0.7), rgba(57, 73, 171, 0.7)), url(${imgchoose})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundAttachment: 'fixed',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  padding: '4rem 2rem',
  textAlign: 'center',
});

const ContentContainer = styled(Box)({
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  borderRadius: '20px',
  padding: '3rem',
  maxWidth: '800px',
  width: '100%',
  textAlign: 'left',
  boxShadow: '0px 15px 35px rgba(0, 0, 0, 0.2)',
  animation: `${glow} 5s ease-in-out infinite`,
});

const Header = styled(Typography)({
  fontWeight: 'bold',
  fontSize: '3rem',
  color: '#14457b',  
  textAlign: 'center',
  marginBottom: '1rem',
});

const SubHeader = styled(Typography)({
  fontWeight: '600',
  fontSize: '2rem',
  color: '#3ab6bb',  
  textAlign: 'center',
  marginBottom: '2rem',
});

const StyledListItem = styled(ListItem)({
  display: 'flex',
  alignItems: 'flex-start',
  padding: '0.8rem 0',
  '& .MuiListItemText-primary': {
    fontSize: '1.2rem',
    color: '#424242',
  },
  borderLeft: '3px solid #14457b',
  paddingLeft: '0.5rem',
  transition: 'transform 0.3s ease-in-out, border-color 0.3s',
  '&:hover': {
    transform: 'scale(1.07)',
    borderLeftColor: '#3ab6bb',  
  },
});

const StyledListIcon = styled(ListItemIcon)({
  minWidth: '40px',
  '& img': {
    width: '30px',
    height: '30px',
  },
});

const LandingChooseUs = () => {
  const reasons = [
    "On-demand service (24 hours)",
    "IMC Registered GP's",
    "All condition type treatments",
    "Same day fit-to-fly certificates, sick notes, referral letters, and prescriptions",
    "Hassle-free, private, and confidential",
    "Be seen within an hour",
    "More convenient, efficient, and flexible service",
    "Excellent client satisfaction (Trustpilot & Google reviews)",
    "We provide Social welfare certificates as well"
  ];

  return (
    <Box mb={8}>
      <BackgroundContainer>
        <ContentContainer>
          <Header variant="h4" component="h1">
            GP-Line
          </Header>
          <Divider variant="middle" sx={{ backgroundColor: '#E4EAF1', marginBottom: '1.5rem', height: '3px' }} />
          <SubHeader variant="h5" component="h2">
            Why Choose Us
          </SubHeader>
          <Typography variant="body1" sx={{ color: '#424242', textAlign: 'center', marginBottom: '2rem', fontSize: '1.2rem' }}>
            We offer a wide range of medical services, from preventive care and routine check-ups to specialized treatments and surgeries.
          </Typography>
          <List>
            {reasons.map((reason, index) => (
              <StyledListItem key={index} disableGutters>
                <StyledListIcon>
                  <img src={correctIcon} alt="correct icon" />
                </StyledListIcon>
                <ListItemText primary={reason} />
              </StyledListItem>
            ))}
          </List>
        </ContentContainer>
      </BackgroundContainer>
    </Box>
  );
};

export default LandingChooseUs;

