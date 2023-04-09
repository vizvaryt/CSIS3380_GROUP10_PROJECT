import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, Navigate } from 'react-router-dom';

import Home from './Home';
import AppointmentList from './Appointment-list';
import AddAppoitement from './Add';


var testArray = ["appointment 1", "appointment 2", "appointment 3"]

const App = () => (
    <div className="container">
      <Home />
      <Routes>
        <Route path="/" element={<AppointmentList />} />
        <Route path="/create" element={<AddAppoitement />} />
      </Routes>
    </div>
);


export default App;
