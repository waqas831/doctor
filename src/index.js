import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "../src/Fonts/font.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import {loadStripe} from '@stripe/stripe-js';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from "./redux/store";
import { Elements } from "@stripe/react-stripe-js";
// const stripePromise = loadStripe(process.env.REACT_APP_BACKEND_LOCAL);
// const stripePromise = loadStripe("pk_test_51Q7MK02MRkbvX3RaeEo4IgwFKLZi47S00KBZZRRLmXU3oJevm97D4dYwvPeyh8iJPZ4oj3j6vrePaqwu0ptpNZpR00Ke2RGXIN");
const stripePromise = loadStripe("pk_live_51Q7MK02MRkbvX3RagVIMhzx3cVmtY7iNCTOcseOWU4MiZDiG8nc4W59neR9Ue4xKo0Y5u8ehyofkpEpRyamTkdeN00GHbfAqho");
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Elements stripe={stripePromise}>
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
      </PersistGate>
  </Provider>
  </Elements>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
