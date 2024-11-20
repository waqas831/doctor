import React from "react";
import { Button, Box, Typography,  } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Login from "../../../assets/login.png";
import gp from "../../../assets/gp.png";
import { ToastContainer } from "react-toastify";
import upload from "../../../assets/upload.png"

function EmailSent() {


  return (
    <>
      <Box bgcolor={"#f4f4f4"} minHeight="100vh" >
       

        <Box
          display="flex"
          flexDirection={["column-reverse", "column-reverse", "row"]}
          justifyContent="center"
          alignItems="center"
        >
          <Box
            width={["100%", "100%", "50%"]}
            display="flex"
            justifyContent="center"
          >
            <img
              src={Login}
              alt="No Login Image"
              style={{ height: "auto", width: "auto" }}
            />
          </Box>

          <Box width={["100%", "100%", "50%"]} bgcolor={"white"}>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              height="100vh"
            >
              <img
                src={gp}
                alt="no logo"
                style={{ height: "50px", width: "130px", margin: "30px" }}
              />

            <img 
                src={upload}
                alt="no logo"
                style={{ height: "150px", width: "150px", margin: "30px" }}
            />

              <Typography
                sx={{
                  textAlign: "center",
                  fontSize: 26,
                  color: "black",
                  fontWeight: "bold",
                }}
              >
                Successfully
              </Typography>

              <Button sx={{ my: 2, fontSize: 14, color: "black" }}>
                Email successfully sent to your email
              </Button>

              <Box component="form" sx={{ width: "100%", maxWidth: 400 }}>
              
               <Link to={"/createPassword"}>
               <Button
                  fullWidth
                  variant="contained"
                  sx={{ marginTop: 2, bgcolor: "#3ab6bb", color: "white" }}
                  size="medium"
                >
                  Continue
                </Button>
               </Link>
              </Box>

              <Button sx={{ mt: 2 }}>
                <Link
                  to="/doctorLogin"
                  style={{
                    color: "gray",
                    fontSize: 12,
                    textAlign: "center",
                    fontWeight: "bold",
                    textDecoration: "none",
                  }}
                >
                  Back to login?
                </Link>
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>

      <ToastContainer />
    </>
  );
}

export default EmailSent;
