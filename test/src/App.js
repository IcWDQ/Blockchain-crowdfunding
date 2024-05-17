

import React from 'react';
import CreateProject from './components/CreateProject';
import ApproveProject from './components/ApproveProject';
import FundProject from './components/FundProject';
import ApproveMilestone from './components/ApproveMilestone';
import CancelProject from './components/CancelProject';
import Refund from './components/Refund';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Project Funding DApp</h1>
      <div className="container">
        <CreateProject />
        <ApproveProject />
        <FundProject />
        <ApproveMilestone />
        <CancelProject />
        <Refund />
      </div>
    </div>
  );
}

export default App;
