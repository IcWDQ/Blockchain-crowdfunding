// src/components/ProjectDetails/ProjectDetails.js
import React, { useState } from 'react';
import './ProjectDetails.css';

function ProjectDetails({ project, onClose }) {
  const [amount, setAmount] = useState('');

  const handleInvestment = () => {
    // Handle investment logic here
    alert(`Invested ${amount} in project ${project.name}`);
  };

  if (!project) return null;

  return (
    <div className="project-details">
      <button className="back-button" onClick={onClose}>Back to Projects</button>
      <h2>{project.name}</h2>
      <p>ID: {project.id}</p>
      <p>{project.description}</p>
      {project.status === 'milestone' ? (
        <>
          <h3>Milestones</h3>
          {project.milestones.map((milestone, index) => (
            <div key={index} className="milestone">
              <p>{milestone.name}</p>
              <div className="progress-bar">
                <div className={`progress ${milestone.completed ? 'completed' : milestone.current ? 'current' : ''}`} style={{ width: `${milestone.progress}%` }}></div>
              </div>
            </div>
          ))}
        </>
      ) : (
        <>
          <h3>Fundraising Progress</h3>
          <div className="progress-bar">
            <div className="progress" style={{ width: `${(project.fundraisingProgress / project.fundraisingGoal) * 100}%`, backgroundColor: '#ff69b4' }}></div>
          </div>
          <p>{`${project.fundraisingProgress.toLocaleString()} / ${project.fundraisingGoal.toLocaleString()}`}</p>
          <div className="investment-section">
            <h3>Invest in this project</h3>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
            />
            <button onClick={handleInvestment}>Invest</button>
          </div>
        </>
      )}
    </div>
  );
}

export default ProjectDetails;
