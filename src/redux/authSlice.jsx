import { createSlice } from '@reduxjs/toolkit';

// Define initial state
const initialState = {
  user: {
    name: '',
    email: '',
    role: '',
    doctorId:''
  },
  token: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.doctorId = action.payload.doctorId
    },
    logout: (state) => {
      state.user = { name: '', email: '', role: '' , doctorId:''};
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;

export default authSlice.reducer;
