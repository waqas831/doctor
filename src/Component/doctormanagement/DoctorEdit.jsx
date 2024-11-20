import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Modal from 'react-modal'; // Make sure to install react-modal

// Custom styles for the modal
Modal.setAppElement('#root'); // Change this to your app's root element ID

function DoctorEdit({ match }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isOpen, setIsOpen] = useState(false); // State for modal visibility
  const doctorId = match.params.id; // Assuming you are using React Router for routing

  // Form validation schema using Yup
  const validationSchema = Yup.object().shape({
    specialization: Yup.string().required('Specialization is required'),
    experience: Yup.string().required('Experience is required'),
    address: Yup.string().required('Address is required'),
    phoneNumber: Yup.string()
      .required('Phone number is required')
      .matches(/^[0-9]+$/, 'Phone number must be numeric'),
    license: Yup.string().required('License is required'),
    certification: Yup.string().required('Certification is required'),
    licenseDocument: Yup.mixed().required('License document is required'),
    identification: Yup.mixed().required('Identification document is required'),
    certificateDocument: Yup.mixed().required('Certificate document is required'),
  });

  // Initialize Formik
  const formik = useFormik({
    initialValues: {
      specialization: '',
      experience: '',
      address: '',
      phoneNumber: '',
      license: '',
      certification: '',
      licenseDocument: null,
      identification: null,
      certificateDocument: null,
    },
    validationSchema,
    onSubmit: async (values) => {
      if (!doctorId) {
        console.error('Doctor ID is undefined. Cannot submit the form.');
        return;
      }

      const formData = new FormData();
      for (const key in values) {
        formData.append(key, values[key]);
      }

      try {
        await axios.put(`/api/v1/Doctor/${doctorId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log('Doctor information updated successfully:', values);
        setIsOpen(false); // Close the modal on success
      } catch (err) {
        console.error('Failed to update doctor data:', err);
        setError('Failed to update doctor data');
      }
    },
  });

  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        const response = await axios.get(`/api/v1/Doctor/${doctorId}`);
        formik.setValues(response.data); // Set fetched values in Formik
      } catch (err) {
        setError('Failed to fetch doctor data');
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorData();
  }, [doctorId, formik]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  // Function to open the modal
  const openModal = () => {
    setIsOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <h2>Edit Doctor Information</h2>
      <button onClick={openModal} className="edit-button">
        <i className="fa fa-edit"></i> Edit Doctor
      </button>

      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Edit Doctor Modal"
      >
        <h2>Edit Doctor Information</h2>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <label>Specialization:</label>
            <input
              type="text"
              name="specialization"
              value={formik.values.specialization}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.specialization && formik.errors.specialization ? (
              <div>{formik.errors.specialization}</div>
            ) : null}
          </div>
          <div>
            <label>Experience:</label>
            <input
              type="text"
              name="experience"
              value={formik.values.experience}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.experience && formik.errors.experience ? (
              <div>{formik.errors.experience}</div>
            ) : null}
          </div>
          <div>
            <label>Address:</label>
            <input
              type="text"
              name="address"
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.address && formik.errors.address ? (
              <div>{formik.errors.address}</div>
            ) : null}
          </div>
          <div>
            <label>Phone Number:</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
              <div>{formik.errors.phoneNumber}</div>
            ) : null}
          </div>
          <div>
            <label>License:</label>
            <input
              type="text"
              name="license"
              value={formik.values.license}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.license && formik.errors.license ? (
              <div>{formik.errors.license}</div>
            ) : null}
          </div>
          <div>
            <label>Certification:</label>
            <input
              type="text"
              name="certification"
              value={formik.values.certification}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.certification && formik.errors.certification ? (
              <div>{formik.errors.certification}</div>
            ) : null}
          </div>
          <div>
            <label>License Document:</label>
            <input
              type="file"
              name="licenseDocument"
              onChange={(event) => {
                formik.setFieldValue("licenseDocument", event.currentTarget.files[0]);
              }}
            />
            {formik.touched.licenseDocument && formik.errors.licenseDocument ? (
              <div>{formik.errors.licenseDocument}</div>
            ) : null}
          </div>
          <div>
            <label>Identification:</label>
            <input
              type="file"
              name="identification"
              onChange={(event) => {
                formik.setFieldValue("identification", event.currentTarget.files[0]);
              }}
            />
            {formik.touched.identification && formik.errors.identification ? (
              <div>{formik.errors.identification}</div>
            ) : null}
          </div>
          <div>
            <label>Certificate Document:</label>
            <input
              type="file"
              name="certificateDocument"
              onChange={(event) => {
                formik.setFieldValue("certificateDocument", event.currentTarget.files[0]);
              }}
            />
            {formik.touched.certificateDocument && formik.errors.certificateDocument ? (
              <div>{formik.errors.certificateDocument}</div>
            ) : null}
          </div>
          <button type="submit">Update Doctor Info</button>
        </form>
        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
}

export default DoctorEdit;
