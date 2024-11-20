import React from "react";
import { Box, Typography } from "@mui/material";

function LandingScroll() {
  return (
    <Box bgcolor="white" overflow="hidden" whiteSpace="nowrap" display="flex" alignItems="center" p={1}>
      <Box
        component="div"
        sx={{
          display: "inline-block",
          animation: "scrollText 30s linear infinite",
        }}
      >
        <Typography color="#14457b" fontWeight="bold">
          GPLINE Telemedicine Portal is a reliable Online Healthcare Service in Ireland. Affordable Doctor Consultations and Prescriptions. Only €35 Per Patient. Irish-Certified Doctors. Accessible every day, from Early Morning to Late Night.
        </Typography>
      </Box>
      <style>{`
        @keyframes scrollText {
          5% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </Box>
  );
}

export default LandingScroll;
