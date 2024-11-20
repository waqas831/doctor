


import React, { useState } from "react";
import Select from "react-select";
import axios from "axios";
import "./LandingFormHero.css";
import downArrow from "../../images/down-arrowForm.svg";
// import BACKEND_URL from "../../Api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Input,
  Typography,
} from "@mui/material";
import BACKEND_LOCAL from "../../Api";
import CheckoutForm from "../doctormanagement/CheckOutForm";

const LandingFormHero = () => {
  const [consultationType, setConsultationType] = useState(null);
  const [dob, setDob] = useState("");
  const [time, setTime] = useState("");
  const [reason, setReason] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState(null);
  const [address, setAddress] = useState("");
  const [nameOnCard, setNameOnCard] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [isCheckConsentForm, setIsCheckConsentForm] = useState(false);
  const [open, setOpen] = React.useState(false);
  const back = process.env.REACT_APP_BACKEND_LOCAL;
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const consultationOptions = [
    { value: "general-appointment", label: "General Appointment" },
    { value: "consultation", label: "Consultation" },
    { value: "follow-up", label: "Follow-up" },
  ];

  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (
      !consultationType ||
      !dob ||
      !time ||
      !reason ||
      !fullName ||
      !phone ||
      !email ||
      !gender ||
      !address ||
      !nameOnCard ||
      !cardNumber ||
      !expiryDate
    ) {
      toast.warning("Please fill all fields!");
      setLoading(false);
      return;
    }

    const data = {
      consultation: {
        consultationType: consultationType.value,
        dateOfBirth: dob,
        time,
        reasonForBooking: reason,
      },
      patient: {
        fullName,
        phoneNumber: phone,
        email,
        gender: gender.value,
        address,
      },
      payment: {
        nameOnCard,
        cardNumber,
        expiryDate,
      },
    };

    try {
      const response = await axios.post(
        `${back}/api/v0.1/Appointment/book`,
        data,
        {
          params: { savePatientInfo: true },
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 200) {
        toast.success("Appointment Booked Successfully!", { autoClose: 2000 });
        resetForm();
      } else {
        toast.error("Booking Failed!", { autoClose: 2000 });
      }
    } catch (error) {
      toast.error("An unexpected error occurred!", { autoClose: 2000 });
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    }
    setLoading(false);
  };

  const resetForm = () => {
    setConsultationType(null);
    setDob("");
    setTime("");
    setReason("");
    setFullName("");
    setPhone("");
    setEmail("");
    setGender(null);
    setAddress("");
    setNameOnCard("");
    setCardNumber("");
    setExpiryDate("");
    setIsCheckboxChecked(false);
    setIsCheckConsentForm(false);
  };

  return (
    <div className="LandingFormHero-otr">
      <div className="LandingFormHero-inr">
        <div className="row-Form">
          <div className="form-otr">
            <form className="form-inr" onSubmit={handleSubmit}>
              <div className="Information">
                <p className="heading">
                  Consultation Information{" "}
                  <span className="heading-span">*</span>
                </p>
                <div className="information-up">
                  <div className="input">
                    <label className="lebal">
                      Consultation Type <span className="lebal-span">*</span>
                    </label>
                    <Select
                      className="input-inr2"
                      value={consultationType}
                      onChange={setConsultationType}
                      options={consultationOptions}
                      placeholder="Select Appointment Type"
                      components={{
                        DropdownIndicator: () => (
                          <img
                            src={downArrow}
                            className="input-img"
                            alt="dropdown arrow"
                          />
                        ),
                      }}
                    />
                  </div>

                  <div className="input">
                    <label className="lebal">
                      Date of Birth <span className="lebal-span">*</span>
                    </label>
                    <input
                      type="date"
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      className="input-inr5"
                    />
                  </div>

                  <div className="input">
                    <label className="lebal">
                      Select Time <span className="lebal-span">*</span>
                    </label>
                    <input
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="input-inr5"
                    />
                  </div>
                </div>

                <div className="input1">
                  <label className="lebal">
                    Reason for Booking <span className="lebal-span">*</span>
                  </label>
                  <input
                    type="text"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="input-inr1"
                    placeholder="Enter reason for booking"
                  />
                </div>
              </div>

              <div className="Information">
                <p className="heading">Personal Information</p>
                <div className="information-up">
                  <div className="input">
                    <label className="lebal">
                      Full Name <span className="lebal-span">*</span>
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="input-inr"
                      placeholder="Enter name here"
                    />
                  </div>

                  <div className="input">
                    <label className="lebal">
                      Phone Number <span className="lebal-span">*</span>
                    </label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="input-inr"
                      placeholder="Enter phone number"
                    />
                  </div>

                  <div className="input">
                    <label className="lebal">
                      Email Address <span className="lebal-span">*</span>
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="input-inr"
                      placeholder="Enter email address"
                    />
                  </div>

                  <div className="input">
                    <label className="lebal">
                      Gender <span className="lebal-span">*</span>
                    </label>
                    <Select
                      className="input-inr2"
                      value={gender}
                      onChange={setGender}
                      options={genderOptions}
                      placeholder="Select Gender"
                    />
                  </div>

                  <div className="input">
                    <label className="lebal">
                      Address <span className="lebal-span">*</span>
                    </label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="input-inr1"
                      placeholder="Enter address here"
                    />
                  </div>
                </div>
              </div>

              <div className="Information">
                <p className="heading">Payment Details</p>
                <div className="information-up">
                  {/* <div className="input">
                    <label className="lebal">
                      Name on Card <span className="lebal-span">*</span>
                    </label>
                    <input
                      type="text"
                      value={nameOnCard}
                      onChange={(e) => setNameOnCard(e.target.value)}
                      className="input-inr"
                      placeholder="Enter Card Name here"
                    />
                  </div>

                  <div className="input">
                    <label className="lebal">
                      Card Number <span className="lebal-span">*</span>
                    </label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="input-inr"
                      placeholder="Enter Card Number"
                    />
                  </div>

                  <div className="input">
                    <label className="lebal">
                      Expiry Date <span className="lebal-span">*</span>
                    </label>
                    <input
                      type="date"
                      value={expiryDate}
                      onChange={(e) => setExpiryDate(e.target.value)}
                      className="input-inr"
                    />
                  </div> */}
                  <CheckoutForm/>
                </div>
              </div>

              <Box display={"flex"} my={2}>
                <Input
                  type="checkbox"
                  id="termsCheckbox"
                  checked={isCheckboxChecked}
                  onChange={(e) => setIsCheckboxChecked(e.target.checked)}
                  style={{ margin: 2, width: 15, height: 15 }}
                />
                <Typography fontSize={14}>
                  Agree with terms and conditions
                </Typography>
              </Box>
              <Box display={"flex"} my={2}>
                <Input
                  type="checkbox"
                  id="termsCheckbox"
                  checked={isCheckConsentForm}
                  onChange={(e) => setIsCheckConsentForm(e.target.checked)}
                  style={{ margin: 2, width: 15, height: 15 }}
                />
                <Typography fontSize={14} onClick={handleClickOpen}>
                  Consent Form ...
                  <span
                    onClick={handleClickOpen}
                    style={{ fontSize: 12, color: "purple" }}
                  >
                    Click here for more info
                  </span>
                </Typography>
              </Box>

              <button
                type="submit"
                className="form-btn-inr"
                disabled={!(isCheckboxChecked && isCheckConsentForm) || loading}
              >
                {loading ? "Booking..." : "Book Appointment"}
              </button>

              <ToastContainer />

              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  <p style={{ margin: "10px" }}>Terms</p>
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    By agreeing to the consent form, you acknowledge that you
                    have been informed about the nature of the consultation and
                    any potential risks involved. You confirm that you
                    understand the purpose of the consultation and consent to
                    the processing of your personal information as required for
                    appointment scheduling and follow-up. If you have any
                    questions regarding your treatment or data usage, please do
                    not hesitate to ask our staff.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Close</Button>
                </DialogActions>
              </Dialog>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingFormHero;

