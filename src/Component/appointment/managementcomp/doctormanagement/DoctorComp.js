import React from "react";
import { Box, Button, Grid, IconButton, Typography } from "@mui/material";
import { CalendarMonth } from "@mui/icons-material";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import WatchLaterOutlinedIcon from "@mui/icons-material/WatchLaterOutlined";
import AccessibilityNewOutlinedIcon from "@mui/icons-material/AccessibilityNewOutlined";
import "./DoctorComp.css"; 

const DoctorComp = () => {
  const doctorInfo = {
    name: "Dr. Alex Robert",
    specialization: "Cardiologist",
    experience: "10 years",
    contact: "123-456-7890",
    email: "alexrobert@hospital.com",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
  };

  const todayAppointments = [
    "Patient 1", "Patient 2", "Patient 3", "Patient 4", "Patient 5",
    "Patient 6", "Patient 7", "Patient 8", "Patient 9", "Patient 10",
  ];

  return (
    <Box >
      <Grid container spacing={2}>
        {[
          { color: "#99e6cf", count: 50, label: "Appointment", icon: <CalendarMonth /> },
          { color: "#7a6ec7", count: 32, label: "Consultation", icon: <ArticleOutlinedIcon /> },
          { color: "#3c91e1", count: 15, label: "Pending", icon: <WatchLaterOutlinedIcon /> },
          { color: "#85a8b7", count: 20, label: "New Patients", icon: <AccessibilityNewOutlinedIcon /> },
        ].map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Box
              display="flex"
              alignItems="center"
              bgcolor={item.color}
              p={1}
              py={4}
              borderRadius={4}
            >
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                sx={{
                  bgcolor: "white",
                  borderRadius: "50%",
                  width: 50,
                  height: 50,
                }}
              >
                <IconButton sx={{ color: item.color, fontSize: 32 }}>
                  {item.icon}
                </IconButton>
              </Box>
              <Box ml={2} flex={1}>
                <Typography fontSize={24} color="white">
                  {item.count}
                </Typography>
                <Typography fontSize={20} color="white" noWrap>
                  {item.label}
                </Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>

      <Box mt={4} display="flex" flexWrap="wrap" gap={4}>
        <Box flex={1} minWidth={300}>
          <Typography variant="h5" mb={2}>
            Today's Appointments
          </Typography>
          <Box
            sx={{
              maxHeight: 200,
              overflowY: "auto",
              border: "1px solid #ddd",
              borderRadius: 4,
              p: 2,
              bgcolor: "#f9f9f9",
            }}
          >
            {todayAppointments.map((patient, index) => (
              <Box
                key={index}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                p={1}
                borderRadius={1}
                bgcolor="white"
                my={1}
              >
                <Typography>{patient}</Typography>
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: "#dec786",
                    color: "#ac8400",
                    borderRadius: 4,
                    textTransform: "none",
                    fontSize: 12,
                  }}
                >
                  Ongoing
                </Button>
              </Box>
            ))}
          </Box>
        </Box>

        <Box flex={1} minWidth={300}>
          <Typography variant="h5" mb={2}>
            Doctor Information
          </Typography>
          <Box display="flex" alignItems="center" gap={2}>
            <img
              src={doctorInfo.image}
              alt={doctorInfo.name}
              style={{
                width: 100,
                height: 100,
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
            <Box>
              <Typography>
                <strong>Name:</strong> {doctorInfo.name}
              </Typography>
              <Typography>
                <strong>Specialization:</strong> {doctorInfo.specialization}
              </Typography>
              <Typography>
                <strong>Experience:</strong> {doctorInfo.experience}
              </Typography>
              <Typography>
                <strong>Contact:</strong> {doctorInfo.contact}
              </Typography>
              <Typography>
                <strong>Email:</strong> {doctorInfo.email}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default DoctorComp;
