import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Home from './Home';
import AppointmentList from './Appointment-list'

var testArray = ["appointment 1", "appointment 2", "appointment 3"]

const App = () => (
    <div className="container">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <AppointmentList/>
    </div>
);

export default App;
