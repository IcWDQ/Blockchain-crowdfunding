// src/components/ProjectDetails/ProjectDetails.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ethers } from 'ethers';
import FundProject from '../FundProject/FundProject';
import UserUploadProof from '../UserUploadProof/UserUploadProof';
import './ProjectDetails.css';

function ProjectDetails({ project, onClose }) {
  const [milestones, setMilestones] = useState([]);

  useEffect(() => {
    if (project.status === 'funded') {
      fetchMilestones(project.projectId);
    }
  }, [project]);

  const fetchMilestones = async (projectId) => {
    try {
      const response = await axios.get('/api/milestones');
      const projectMilestones = response.data.filter(milestone => milestone.projectId === projectId);
      setMilestones(projectMilestones);
    } catch (error) {
      console.error('Error fetching milestones:', error);
    }
  };

  const activeMilestone = milestones.find(milestone => milestone.milestonestatus === 'pending');
  const completedMilestones = milestones.filter(milestone => milestone.milestonestatus === 'completed');

  let amountRaised, fundingGoal;

  try {
    amountRaised = ethers.BigNumber.from(project.amountRaised.toString());
    fundingGoal = ethers.BigNumber.from(project.fundingGoal.toString());
  } catch (error) {
    console.error('Invalid BigNumber value:', error);
    amountRaised = ethers.BigNumber.from(0);
    fundingGoal = ethers.BigNumber.from(1); // 设置一个默认值，防止除以零错误
  }

  return (
    <div className="project-details-container">
      <div className="project-details">
        <button onClick={onClose} className="back-button">Back</button>
        <h2>{project.projectName}</h2>
        <p><strong>ID:</strong> {project.projectId}</p>
        <p><strong>Type:</strong> {project.projectType}</p>
        <p><strong>Description:</strong> {project.projectDescription}</p>
        <p><strong>Project Deadline:</strong> {new Date(project.projectDDL).toLocaleDateString()}</p>

        {project.status.toLowerCase() === 'active' ? (
          <div className="status-section">
            <p className="project-status">Crowdfunding Project - Raised: {ethers.utils.formatEther(amountRaised)} / {ethers.utils.formatEther(fundingGoal)} ETH</p>
            <div className="progress-bar">
              <div className="progress" style={{ width: `${amountRaised.mul(100).div(fundingGoal)}%` }}></div>
            </div>
            {!project.isCreator && <FundProject projectId={project.projectId} />}
          </div>
        ) : (
          <div className="milestone-section">
            <h3>Milestones</h3>
            <ul>
              {completedMilestones.map((milestone) => (
                <li key={milestone.milestoneId}>
                  <p><strong>Milestone ID:</strong> {milestone.milestoneId}</p>
                  <p><strong>Description:</strong> {milestone.milestoneDescription}</p>
                </li>
              ))}
              {activeMilestone && (
                <li>
                  <p><strong>Next Milestone Deadline:</strong> {new Date(activeMilestone.milestoneDDL).toLocaleDateString()}</p>
                </li>
              )}
            </ul>
            <div className="milestone-progress-container">
              {milestones.map((milestone, index) => {
                const isCompleted = milestone.milestonestatus === 'completed';
                const isNext = milestone.milestonestatus === 'pending' && (index === 0 || milestones[index - 1].milestonestatus === 'completed');
                return (
                  <div
                    key={milestone.milestoneId}
                    className={`milestone-progress ${isCompleted ? 'completed' : isNext ? 'next' : 'upcoming'}`}
                  ></div>
                );
              })}
            </div>
            {project.isCreator && <UserUploadProof projectId={project.projectId} />}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProjectDetails;
