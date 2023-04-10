import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, Navigate } from 'react-router-dom';

import Home from './Home';
import AppointmentList from './Appointment-list';
import AddAppointment from './Add';
import CompletedAppointments from './Completed'

const App = () => (
    <div className="container">
      <Home />
      <Routes>
        <Route path="/" element={<AppointmentList />} />
        <Route path="/create" element={<AddAppointment />} />
        <Route path="/completed" element={<CompletedAppointments />} />
      </Routes>
    </div>
);


export default App;
