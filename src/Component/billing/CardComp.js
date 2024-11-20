
import React from "react";
import { Box, Typography, Button, Grid, Paper } from "@mui/material";
import { FaPaperPlane, FaPlus, FaBars } from "react-icons/fa";
import cardImage from "../../assets/debit.png";

const CardComp = () => {
  return (
    <Box
      display="flex"
      flexDirection={{ xs: "column", md: "row" }} 
      justifyContent="space-between"
      alignItems="flex-start"
      gap={3}
      p={3}
      bgcolor="#f9f9f9"
      borderRadius={2}
      width="100%"
      mx="auto"
      mt={3}
    >
      <Paper
        elevation={3}
        sx={{ flex: 2, p: 2, borderRadius: 2 }}
      >
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={8}>
            <Box
              component="img"
              src={cardImage}
              alt="Debit Card"
              sx={{
                width: "100%",
                height: 280,
                borderRadius: 2,
                objectFit: "cover",
              }}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              bgcolor="#f2f2f2"
              width={{ xs: "100%", md: 140 }}
              height={140}
              borderRadius={2}
              sx={{
                cursor: "pointer",
                transition: "background-color 0.3s, transform 0.3s",
                "&:hover": {
                  backgroundColor: "#e0e0e0",
                  transform: "translateY(-5px)",
                },
              }}
            >
              <Typography color="#666" fontSize="0.9rem">
                + Add Debit Card
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      <Paper
        elevation={3}
        sx={{
          flex: 1,
          p: 3,
          textAlign: "center",
          borderRadius: 2,
        }}
      >
        <Typography variant="h5" color="#14467B" mb={1}>
          Dr Boston Total Balance
        </Typography>
        <Typography variant="h3" color="#14467B" mb={1}>
          $509.50
        </Typography>
        <Typography variant="body2" color="#888" mb={2}>
          From December 2023 - May 2024
        </Typography>

        <Box display="flex" gap={2} mt={2}>
          <Button
            fullWidth
            variant="contained"
            startIcon={<FaPaperPlane />}
            sx={{ bgcolor: "#14467B", "&:hover": { bgcolor: "#0e345b" } }}
          >
            Send
          </Button>
          <Button
            fullWidth
            variant="contained"
            startIcon={<FaPlus />}
            sx={{ bgcolor: "#14467B", "&:hover": { bgcolor: "#0e345b" } }}
          >
            Add
          </Button>
          <Button
            fullWidth
            variant="contained"
            startIcon={<FaBars />}
            sx={{ bgcolor: "#14467B", "&:hover": { bgcolor: "#0e345b" } }}
          >
            Menu
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default CardComp;
