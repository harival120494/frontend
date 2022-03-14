import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import './fonts/Poppins-Bold.ttf';
import './fonts/Poppins-Medium.ttf';
import './fonts/Poppins-Regular.ttf';


/**
 * 
 * Import Pages
 */
 import Login from "./Pages/Login";
 import LandingPage from "./Pages/Landing"
 

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/landing_page/*" element={<LandingPage />}/>
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);


reportWebVitals();
