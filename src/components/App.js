import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Home from './Home';

const App = () => (
    <div className="container">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
);

export default App;
