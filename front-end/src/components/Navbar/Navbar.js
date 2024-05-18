// src/components/Navbar/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import SearchBox from '../SearchBox/SearchBox';
import './Navbar.css';

function Navbar({ onShowFundProject, onCreateProject, onShowAllProjects, activePage }) {
  return (
    <div className="navbar-container">
      <nav className="navbar">
        <div className="navbar-left">
          <img src="/logo.png" alt="Logo" className="navbar-logo" />
          <span className="navbar-title">InnoFund</span>
        </div>
        <SearchBox />
      </nav>
      <div className="navbar-buttons">
        <button 
          onClick={onShowAllProjects} 
          className="navbar-button" 
          disabled={activePage === 'allProjects'}
          style={activePage === 'allProjects' ? { backgroundColor: 'darkblue' } : {}}
        >
          All Project
        </button>
        <button 
          onClick={onCreateProject} 
          className="navbar-button" 
          disabled={activePage === 'createProject'}
          style={activePage === 'createProject' ? { backgroundColor: 'darkblue' } : {}}
        >
          Create Project
        </button>
        <button onClick={onShowFundProject} className="navbar-button">Fund Project</button>
      </div>
    </div>
  );
}

export default Navbar;
