  // import React from "react";
  // import {  Container, Grid, Card, CardContent, Typography, List, ListItem, ListItemIcon, CardMedia, Box, Button } from "@mui/material";
  // import CircleIcon from '@mui/icons-material/FiberManualRecord';
  // import gazhnain from "../../images/gazhnain.jpeg"
  // import fahad from "../../images/fahad.jpeg"
  // import shakoor from "../../images/shakoor.jpeg"
  // import { Link } from "react-router-dom";
  // const doctors = [
  //   {
  //     name: "Dr. Muhammad Ghaznain",
  //     qualifications: [
  //       "Diploma in Pediatrics",
  //       "Diploma in Dermatology",
  //       "Immediate Care Derma Course ( UCD )",
  //       "Immediate Care Cardic Course ( UCD )",
  //       "Joint Injection Course",
  //     ],
  //     image: gazhnain,
  //   },
  //   {
  //     name: "Dr. Nauman Shakoor",
  //     qualifications: [
  //       "Diploma in Pediatrics",
  //       "Diploma in Dermatology",
  //       "Immediate Care Derma Course ( UCD )",
  //       "Immediate Care Cardic Course ( UCD )",
  //       "Joint Injection Course",
  //       "MICGP",
  //       "MRCPI"
  //     ],
  //     image: shakoor,
  //   },

  //   {
  //     name: "Dr Fahad Iftikhar",
  //     qualifications: [
  //       "MICGP",
  //       "MRCPI",
  //     ],
  //     image:fahad,
  //   },
  //   {
  //     name: "Dr Chugtai",
  //     qualifications: [
  //       "MBBS",
  //       "Irish 🇮🇪 registered Doctor",
  //     ],
  //     image: "https://images.unsplash.com/photo-1584467735867-4297ae2ebcee?q=80&w=1410&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //   },
  // ];

  // const Team = () => {
  //   return (
  //   <>
  //     <Box>
  //     <Link to={"/"}>
  //       <Button variant="contained" sx={{ position: "fixed" }}>Back</Button>
  //     </Link>
  //   </Box>
  //     <Container maxWidth="lg" sx={{ mt: 4 }}>
  //       <Typography variant="h3" align="center" gutterBottom sx={{ color: '#003366', fontWeight: 'bold' }}>
  //         Meet Our Team
  //       </Typography>
  //       <Grid container spacing={3} sx={{ mt: 4 }} justifyContent="center">
  //         {doctors.map((doctor, index) => (
  //           <Grid item xs={12} sm={6} md={3} key={index}>
  //             <Card
  //               sx={{
  //                 display: 'flex',
  //                 flexDirection: 'column',
  //                 position: 'relative',
  //                 overflow: 'hidden',
  //                 borderRadius: '8px',
  //                 boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  //                 height: '100%',
  //                 transition: 'transform 0.3s, box-shadow 0.3s',
  //                 '&:hover': {
  //                   transform: 'scale(1.05)',
  //                   boxShadow: '0 5px 2px #3ab6bb',
  //                   cursor: "pointer",
  //                 },
  //               }}
  //             >

  //               <CardMedia
  //                 component="img"
  //                 height={["300","300","250"]}
  //                 image={doctor.image}
  //                 alt={doctor.name}
  //                 sx={{
  //                   objectFit: 'cover',
  //                   filter: 'brightness(0.8)',
  //                 }}
  //               />
  //               <CardContent sx={{ flexGrow: 1 }}>
  //                 <Typography variant="h5" component="div" sx={{ mb: 2, color: '#003366', fontWeight: 'bold' }}>
  //                   {doctor.name}
  //                 </Typography>
  //                 <List sx={{ padding: 0 }}>
  //                   {doctor.qualifications.map((qualification, idx) => (
  //                     <ListItem key={idx} sx={{ padding: 0, my: 1 }}>
  //                       <ListItemIcon>
  //                         <CircleIcon sx={{ fontSize: 10, color: '#003366' }} />
  //                       </ListItemIcon>
  //                       <Typography variant="body2" color="text.secondary">
  //                         {qualification}
  //                       </Typography>
  //                     </ListItem>
  //                   ))}
  //                 </List>
  //               </CardContent>
  //             </Card>
  //           </Grid>
  //         ))}
  //       </Grid>
  //     </Container></>
  //   );
  // };

  // export default Team;
  import React from "react";
  import { Container, Grid, Card, CardContent, Typography, List, ListItem, ListItemIcon, CardMedia, Box, Button } from "@mui/material";
  import CircleIcon from '@mui/icons-material/FiberManualRecord';
  import { Link } from "react-router-dom";
  import gazhnain from "../../images/gazhnain.jpeg";
  import fahad from "../../images/fahad.jpeg";
  import shakoor from "../../images/shakoor.jpeg";
  
  const doctors = [
    {
      name: "Dr. Muhammad Ghaznain",
      qualifications: [
        "MICGP",
        "MRCPI",
        "Diploma in Pediatrics",
        "Diploma in Dermatology",
        "Immediate Care Derma Course (UCD)",
        "Immediate Care Cardiac Course (UCD)",
        "Joint Injection Course",
      ],
      image: gazhnain,
    },
    {
      name: "Dr. Nauman Shakoor",
      qualifications: [
        "MICGP",
        "MRCPI",
        "Diploma in Pediatrics",
        "Diploma in Dermatology",
        "Immediate Care Derma Course (UCD)",
        "Immediate Care Cardiac Course (UCD)",
        "Joint Injection Course",
       
      ],
      image: shakoor,
    },
    {
      name: "Dr. Fahad Iftikhar",
      qualifications: ["MICGP", "MRCPI"],
      image: fahad,
    },
    {
      name: "Dr. Chugtai",
      qualifications: ["MBBS", "Irish Registered Doctor"],
      image: "https://images.unsplash.com/photo-1584467735867-4297ae2ebcee?q=80&w=1410&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];
  
  const Team = () => {
    return (
      <>
        <Box sx={{ mb: 4, display: "flex", justifyContent: "start" }}>
          <Link to={"/"}>
            <Button variant="contained" sx={{ bgcolor: "#14457b", fontWeight: "bold" ,position:"fixed" }}>
              Back
            </Button>
          </Link>
        </Box>
        <Container maxWidth="lg" sx={{ mt: 4 }}>
          <Typography variant="h3" align="center" gutterBottom sx={{ color: '#003366', fontWeight: 'bold' }}>
            Meet Our Team
          </Typography>
          <Grid container spacing={4} sx={{ mt: 4 }} justifyContent="center">
            {doctors.map((doctor, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <Card
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 3,
                    overflow: 'hidden',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
                    height: '100%',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    '&:hover': {
                      transform: 'scale(1.05)',
                      boxShadow: '0 10px 30px rgba(58, 182, 187, 0.5)',
                      cursor: "pointer",
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    height="250"
                    image={doctor.image}
                    alt={doctor.name}
                    sx={{
                      objectFit: 'cover',
                      position: 'relative',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.7))',
                      },
                    }}
                  />
                  <CardContent sx={{ flexGrow: 1, bgcolor: '#f9f9f9', padding: 3 }}>
                    <Typography variant="h5" sx={{ color: '#003366', fontWeight: 'bold', mb: 2 }}>
                      {doctor.name}
                    </Typography>
                    <List>
                      {doctor.qualifications.map((qualification, idx) => (
                        <ListItem key={idx} disablePadding sx={{ alignItems: 'start', py: 0.5 }}>
                          <ListItemIcon>
                            <CircleIcon sx={{ fontSize: 10, color: '#3ab6bb' }} />
                          </ListItemIcon>
                          <Typography variant="body2" color="text.secondary">
                            {qualification}
                          </Typography>
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </>
    );
  };
  
  export default Team;
  