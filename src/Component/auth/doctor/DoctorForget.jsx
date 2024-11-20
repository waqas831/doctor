
import React, { useState } from "react";
import { Button, Box, Typography, CircularProgress, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Login from "../../../assets/login.png";
import gp from "../../../assets/gp.png";
import BACKEND_LOCAL from "../../../Api"; 
import { toast, ToastContainer } from "react-toastify";

function DoctorForget() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const back = process.env.REACT_APP_BACKEND_LOCAL;
  const handleClick = async () => {
    setLoading(true);

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      alert("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    const baseUrl = window.location.origin;
    console.log("Email:", email);
    console.log("Base URL:", `${baseUrl}/createPassword`);

    try {
      const res = await fetch(`${back}/api/v0.1/Auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, baseUrl:`${baseUrl}/createPassword` }), 
      });

      let data;
      try {
        data = await res.json();
      } catch (e) {
        const text = await res.text(); 
        console.error("Response text:", text);
        throw new Error("Response is not valid JSON");
      }

      if (res.ok) {
        console.log("Forget success:", data);
        navigate("/emailSent"); 
      } else {
        console.error("Forget error:", data.message || "Error occurred");
        alert(data.message || "An error occurred. Please try again.");
      }
    } catch (error) {
      toast.success("check your email.");
      navigate("/emailSent"); 
    } finally {
      setLoading(false); 
    }
  };

  return (
    <Box bgcolor={"#f4f4f4"}>
      <Box
        width={"100%"}
        display={"flex"}
        flexDirection={["column-reverse", "column-reverse", "row"]}
        justifyContent="center"
        alignItems="center"
      >
        <Box
          width={["100%", "100%", "50%"]}
          display={"flex"}
          justifyContent={"center"}
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
              alt="No Logo"
              style={{ height: "50px", width: "130px", margin: "30px" }}
            />

            <Button sx={{ textAlign: "center", fontSize: 16, color: "black", fontWeight: "bold" }}>
              Forget Password
            </Button>
            <Button sx={{ my: 2, textAlign: "center", fontSize: 12, color: "black" }}>
              Enter your email for the verification process <br />
              We will send an invitation to your email.
            </Button>
            <Box component="form" sx={{ width: "100%", maxWidth: 400 }}>
              <Typography fontWeight={"bold"}>Email Id</Typography>
              <TextField
                fullWidth
                placeholder="e.g: info@onetechai@gmail.com"
                type="email"
                margin="normal"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{
                  bgcolor: "#eeeeee",
                  "& .MuiInputBase-input": { color: "black" },
                  "& .MuiInputBase-input::placeholder": {
                    color: "black",
                    fontSize: "0.8rem",
                  },
                }}
              />

              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 2, bgcolor: "#3ab6bb", color: "white" }}
                onClick={handleClick}
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
              >
                {loading ? "Continuing..." : "Continue"}
              </Button>
              <Box display={"flex"} justifyContent={"center"}>
                <Button sx={{ mt: 2, mx: "auto" }}>
                  <Link
                    to="/doctorLogin"
                    style={{
                      color: "gray",
                      fontSize: 12,
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                  >
                    Back to login?
                  </Link>
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <ToastContainer/>
    </Box>
  );
}

export default DoctorForget;
