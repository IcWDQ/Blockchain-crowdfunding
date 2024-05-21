import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminHome from './pages/AdminHome';
import AllProjects from './pages/AllProjects-page';
import AllMilestones from './pages/AllMilestones-page';
import PendingProjects from './pages/PendingProjects-page';
import PendingMilestones from './pages/PendingMilestones-page';
import WithdrawFunds from './pages/WithdrawFunds-page';
import CancelProjects from './pages/CancelProjects-page';
import ReLogin from './pages/reLogin-page';
import Login from './pages/Login';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<ReLogin />} />
        <Route path="/admin" element={<AdminHome />}>
          <Route path="all-projects" element={<AllProjects />} />
          <Route path="all-milestones" element={<AllMilestones />} />
          <Route path="pending-projects" element={<PendingProjects />} />
          <Route path="pending-milestones" element={<PendingMilestones />} />
          <Route path="withdraw-funds" element={<WithdrawFunds />} />
          <Route path="cancel-projects" element={<CancelProjects />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
