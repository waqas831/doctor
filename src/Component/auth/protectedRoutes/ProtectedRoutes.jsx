
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem('authToken'); 
  const userRole = localStorage.getItem('userRole'); 

  if (!token) {
    return <Navigate to="/doctorLogin" replace />; 
  }

  // Check for role authorization
  // if (role && userRole !== role) {
  //   return <Navigate to="/doctorLogin" replace />; 
  // }

  return children; 
};

export default ProtectedRoute;


// import React from 'react';
// import { Navigate } from 'react-router-dom';

// const ProtectedRoute = ({ children, role }) => {
//   const token = localStorage.getItem('authToken'); // Authentication token
//   // const userRole = localStorage.getItem('userRole'); // User's role

//   // Redirect to login if token is missing
//   if (!token) {
//     return <Navigate to="/doctorLogin" replace />;
//   }

//   // Redirect based on role
//   if (role === 'admin' ) {
//     return children; // Allow access for Admins
//   } else if (role === 'Doctor' ) {
//     return children; // Allow access for Doctors
//   }

//   // If roles don't match, redirect to appropriate dashboards
//   if (role === 'admin') {
//     return <Navigate to="/dashboard" replace />;
//   } else if (role === 'Doctor') {
//     return <Navigate to="/userDashboard" replace />;
//   }

//   // Default fallback (optional)
//   return <Navigate to="/doctorLogin" replace />;
// };

// export default ProtectedRoute;
