// src/components/dashboard/DoctorsComponent.js
import React, { useState } from "react";
import DoctorList from "./DoctorsList";
import "./DoctorsComponent.css";
import Modal from "react-modal";

Modal.setAppElement("#root");

const DoctorsComponent = () => {
  const [doctors, setDoctors] = useState([
    {
      image: "https://randomuser.me/api/portraits/men/1.jpg",
      name: "Dr. Boston",
      hospital: "Abc Hospital",
      specialization: "Physician",
      department: "Medical",
      location: "New York",
      experience: 14,
      feedbacks: [
        "Very knowledgeable and friendly.",
        "Cared about my condition.",
        "Highly recommend!",
      ],
      phone: "555-1234",
      email: "dr.boston@hospital.com",
    },
    {
      image: "https://randomuser.me/api/portraits/women/2.jpg",
      name: "Dr. Sarah Lee",
      hospital: "Xyz Clinic",
      specialization: "Dentist",
      department: "Dental",
      location: "California",
      experience: 8,
      feedbacks: [
        "Excellent dentist.",
        "Painless and quick treatment.",
        "Warm and patient-friendly.",
      ],
      phone: "555-5678",
      email: "dr.sarah@clinic.com",
    },
    {
      image: "https://randomuser.me/api/portraits/men/3.jpg",
      name: "Dr. James Clark",
      hospital: "Health Plus",
      specialization: "Surgeon",
      department: "Medical",
      location: "London",
      experience: 20,
      feedbacks: [
        "Top-notch surgeon.",
        "Very professional and precise.",
        "Helped me recover quickly.",
      ],
      phone: "555-9876",
      email: "dr.james@healthplus.com",
    },
    {
      image: "https://randomuser.me/api/portraits/women/4.jpg",
      name: "Dr. Olivia Adams",
      hospital: "Healthy Smile",
      specialization: "Dentist",
      department: "Dental",
      location: "UK",
      experience: 10,
      feedbacks: [
        "Great with kids!",
        "Gentle and thorough.",
        "My go-to dentist.",
      ],
      phone: "555-4321",
      email: "dr.olivia@healthysmiles.com",
    },
    {
      image: "https://randomuser.me/api/portraits/men/5.jpg",
      name: "Dr. Michael Brown",
      hospital: "Sunrise Hospital",
      specialization: "Nurse",
      department: "Medical",
      location: "Australia",
      experience: 5,
      feedbacks: [
        "Compassionate and caring.",
        "Always available and attentive.",
        "Highly skilled nurse.",
      ],
      phone: "555-8765",
      email: "dr.michael@sunrisehospital.com",
    },
    {
      image: "https://randomuser.me/api/portraits/men/6.jpg",
      name: "Dr. David Wilson",
      hospital: "Royal Hospital",
      specialization: "Cardiologist",
      department: "Medical",
      location: "Canada",
      experience: 18,
      feedbacks: [
        "Best cardiologist I've met.",
        "Detailed and caring.",
        "Saved my life!",
      ],
      phone: "555-3456",
      email: "dr.david@royalhospital.com",
    },
    {
      image: "https://randomuser.me/api/portraits/women/7.jpg",
      name: "Dr. Emma Watson",
      hospital: "Care Clinic",
      specialization: "Pediatrician",
      department: "Medical",
      location: "New Zealand",
      experience: 12,
      feedbacks: [
        "Great with kids!",
        "Very patient and caring.",
        "Best pediatrician in town.",
      ],
      phone: "555-6543",
      email: "dr.emma@careclinic.com",
    },
    {
      image: "https://randomuser.me/api/portraits/men/8.jpg",
      name: "Dr. John Smith",
      hospital: "Heart Care",
      specialization: "Cardiologist",
      department: "Medical",
      location: "Germany",
      experience: 22,
      feedbacks: [
        "Excellent care.",
        "Very thorough in his approach.",
        "Highly recommend.",
      ],
      phone: "555-9123",
      email: "dr.john@heartcare.com",
    },
    {
      image: "https://randomuser.me/api/portraits/women/9.jpg",
      name: "Dr. Sophia Williams",
      hospital: "Bright Clinic",
      specialization: "Dermatologist",
      department: "Medical",
      location: "France",
      experience: 6,
      feedbacks: [
        "Helped with my skin issues.",
        "Very professional.",
        "Knowledgeable and kind.",
      ],
      phone: "555-6789",
      email: "dr.sophia@brightclinic.com",
    },
    {
      image: "https://randomuser.me/api/portraits/men/10.jpg",
      name: "Dr. Chris Johnson",
      hospital: "Central Hospital",
      specialization: "Orthopedic Surgeon",
      department: "Surgery",
      location: "Japan",
      experience: 25,
      feedbacks: [
        "Exceptional care.",
        "Very skilled surgeon.",
        "Helped me recover fully.",
      ],
      phone: "555-9876",
      email: "dr.chris@centralhospital.com",
    },
  ]);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [doctorDetails, setDoctorDetails] = useState({
    name: "",
    hospital: "",
    specialization: "",
    location: "",
  });
  const [editIndex, setEditIndex] = useState(null); // Track which doctor is being edited

  const openModal = (type, index = null) => {
    setModalType(type);
    setEditIndex(index);
    if (index !== null && type === "edit") {
      const doctorToEdit = doctors[index];
      setDoctorDetails({
        name: doctorToEdit.name,
        hospital: doctorToEdit.hospital,
        specialization: doctorToEdit.specialization,
        location: doctorToEdit.location,
      });
    } else {
      setDoctorDetails({
        name: "",
        hospital: "",
        specialization: "",
        location: "",
      });
    }
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setDoctorDetails({
      name: "",
      hospital: "",
      specialization: "",
      location: "",
    });
  };

  const handleInputChange = (e) => {
    setDoctorDetails({
      ...doctorDetails,
      [e.target.name]: e.target.value,
    });
  };

  const addDoctor = () => {
    const newDoctor = {
      image: "https://randomuser.me/api/portraits/men/1.jpg", // Placeholder image
      ...doctorDetails,
      verified: false, // New doctor starts unverified
    };
    setDoctors([...doctors, newDoctor]);
    closeModal();
  };

  const editDoctor = () => {
    const updatedDoctorList = [...doctors];
    updatedDoctorList[editIndex] = {
      ...updatedDoctorList[editIndex],
      ...doctorDetails,
    };
    setDoctors(updatedDoctorList);
    closeModal();
  };

  const removeDoctor = () => {
    const updatedList = doctors.filter(
      (doctor) =>
        doctor.name !== doctorDetails.name &&
        doctor.hospital !== doctorDetails.hospital
    );
    setDoctors(updatedList);
    closeModal();
  };

  const verifyDoctor = () => {
    const updatedList = doctors.map((doctor) =>
      doctor.name === doctorDetails.name &&
      doctor.hospital === doctorDetails.hospital
        ? { ...doctor, verified: true }
        : doctor
    );
    setDoctors(updatedList);
    closeModal();
  };

  const deleteDoctor = (doctorName) => {
    const updatedDoctors = doctors.filter(
      (doctor) => doctor.name !== doctorName
    );
    setDoctors(updatedDoctors);
  };

  return (
    <div className="doctors-component">
      <h1>Doctor Management</h1>
      <DoctorList
        doctors={doctors}
        onDeleteDoctor={deleteDoctor}
        openModal={openModal}
      />

      {/* Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Doctor Modal"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <h2>
          {modalType === "add"
            ? "Add Doctor"
            : modalType === "edit"
            ? "Edit Doctor"
            : modalType === "remove"
            ? "Remove Doctor"
            : "Verify Doctor"}
        </h2>
        <form className="modal-form">
          {(modalType === "add" ||
            modalType === "edit" ||
            modalType === "remove" ||
            modalType === "verify") && (
            <>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={doctorDetails.name}
                onChange={handleInputChange}
                required
                className="form-input"
              />
              <label>Hospital:</label>
              <input
                type="text"
                name="hospital"
                value={doctorDetails.hospital}
                onChange={handleInputChange}
                required
                className="form-input"
              />
              {(modalType === "add" || modalType === "edit") && (
                <>
                  <label>Specialization:</label>
                  <input
                    type="text"
                    name="specialization"
                    value={doctorDetails.specialization}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                  />
                  <label>Location:</label>
                  <input
                    type="text"
                    name="location"
                    value={doctorDetails.location}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                  />
                  
                </>
              )}
            </>
          )}
          <div className="modal-actions">
            <button
              type="button"
              onClick={closeModal}
              className="modal-button cancel"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={
                modalType === "add"
                  ? addDoctor
                  : modalType === "edit"
                  ? editDoctor
                  : modalType === "remove"
                  ? removeDoctor
                  : verifyDoctor
              }
              className="modal-button submit"
            >
              {modalType === "add"
                ? "Add"
                : modalType === "edit"
                ? "Save Changes"
                : modalType === "remove"
                ? "Remove"
                : "Verify"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default DoctorsComponent;
