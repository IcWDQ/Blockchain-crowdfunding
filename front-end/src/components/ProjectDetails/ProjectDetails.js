import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import FundProject from '../FundProject/FundProject';
import UserUploadProof from '../UserUploadProof/UserUploadProof';
import './ProjectDetails.css';

function ProjectDetails({ project, onClose }) {
  const [milestones, setMilestones] = useState([]);
  const [currentUser, setCurrentUser] = useState('');

  const fetchCurrentUser = async () => {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setCurrentUser(accounts[0].toLowerCase());
    } catch (error) {
      console.error('Error fetching current user:', error);
    }
  };

  const fetchMilestones = useCallback(async (projectId) => {
    try {
      const response = await axios.get(`/api/milestones`, {
        params: { projectId }
      });
      const projectMilestones = response.data.filter(milestone => milestone.projectId === projectId);
      setMilestones(projectMilestones);
    } catch (error) {
      console.error('Error fetching milestones:', error);
    }
  }, []);

  useEffect(() => {
    fetchCurrentUser();
    fetchMilestones(project.projectId);
  }, [fetchMilestones, project]);

  const amountRaisedInEther = parseFloat(project.amountRaised);
  const fundingGoalInEther = project.fundingGoal / 10 ** 18;

  return (
    <div className="project-details-container">
      <div className="project-details">
        <button onClick={onClose} className="back-button">Back</button>
        <h2>{project.projectName}</h2>
        <p><strong>ID:</strong> {project.projectId}</p>
        <p><strong>Type:</strong> {project.projectType}</p>
        <p><strong>Description:</strong> {project.projectDescription}</p>
        <p><strong>Project Deadline:</strong> {new Date(project.projectDDL).toLocaleDateString()}</p>

        {project.status.toLowerCase() === 'pending' ? (
          <div className="status-section">
            <p className="project-status">Crowdfunding Project - Raised: {amountRaisedInEther} / {fundingGoalInEther} ETH</p>
          </div>
        ) : (
          <div className="milestone-section">
            <h3>Milestones</h3>
            <ul>
              {milestones.filter(milestone => milestone.milestonestatus === 'approved').map((milestone, index) => (
                <li key={`${project.projectId}-${milestone.milestoneId}-${index}`}>
                  <p><strong>Milestone ID:</strong> {milestone.milestoneId + 1}</p>
                  <p><strong>Description:</strong> {milestone.milestoneDescription}</p>
                  <p><strong>Document:</strong> <a href={milestone.documentURL} target="_blank" rel="noopener noreferrer">View Document</a></p>
                </li>
              ))}
            </ul>
            <div className="milestone-progress-container">
              {milestones.map((milestone, index) => {
                const milestoneStatus = milestone.milestonestatus;
                const isApproved = milestoneStatus === 'approved';
                const isPending = milestoneStatus === 'pending';
                return (
                  <div
                    key={`${project.projectId}-${milestone.milestoneId}-${index}`}
                    className={`milestone-progress ${isApproved ? 'approved' : isPending ? 'pending' : 'upcoming'}`}
                  ></div>
                );
              })}
            </div>
          </div>
        )}

        {project.status.toLowerCase() === 'active' && project.creator.toLowerCase() !== currentUser && (
          <FundProject projectId={project.projectId} />
        )}

        {project.status.toLowerCase() === 'funded' && project.creator.toLowerCase() === currentUser && (
          <UserUploadProof projectId={project.projectId} />
        )}
      </div>
    </div>
  );
}

export default ProjectDetails;
