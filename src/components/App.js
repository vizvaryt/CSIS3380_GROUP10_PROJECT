import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import {Routes, Route } from 'react-router-dom';

import Login from './Login';
import Register from './Register';
import Home from './Home';
import AppointmentList from './Appointment-list';
import AddAppointment from './Add';
import CompletedAppointments from './Completed';
import UpdateAppointment from './Update';

const App = () => (
    <div className="container">
      <div id="header">
      <Home/>
      </div>
      
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<AppointmentList />} />
        <Route path="/create" element={<AddAppointment />} />
        <Route path="/completed" element={<CompletedAppointments />} />
        <Route path="/update" element={<UpdateAppointment />} />  
      </Routes>
     
    </div>
);




export default App;
