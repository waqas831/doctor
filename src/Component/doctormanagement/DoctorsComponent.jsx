// src/components/dashboard/DoctorsComponent.js
import React from "react";
import DoctorList from "./DoctorsList";
import "./DoctorsComponent.css";
import { Box } from "@mui/material";

const DoctorsComponent = () => {
  return (
    <Box bgcolor={"#f9f9f9"} height={"100vh"} p={2}>
      {/* <Box display={"flex"} justifyContent={"space-between"} p={2}>
        <h1>Doctor Management</h1>

        <DoctorDialog />
      </Box> */}
      <DoctorList />

   
    </Box>
  );
};

export default DoctorsComponent;
