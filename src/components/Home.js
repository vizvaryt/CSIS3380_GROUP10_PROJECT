import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {    
  
  render() {
    return (
      <nav className="navbar navbar-expand-lg"> 
        <Link to="/" className="navbar-brand">CSIS3380 PROJECT</Link> 
        <div className="collpase navbar-collapse">
          <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/" className="nav-link">Appointments</Link>
          </li>
          <li className="navbar-item">
          <Link to="/create" className="nav-link">Add An Appointments</Link> 
          </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Home;