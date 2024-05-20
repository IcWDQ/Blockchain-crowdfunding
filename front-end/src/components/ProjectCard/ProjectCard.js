import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ethers } from 'ethers';
import './ProjectCard.css';

function ProjectCard({ id, name, category, description, projectDDL, status, fundingGoal, amountRaised, onClick }) {
  const [milestones, setMilestones] = useState([]);

  useEffect(() => {
    if (status === 'funded') {
      fetchMilestones(id);
    }
  }, [id, status]);

  const fetchMilestones = async (projectId) => {
    try {
      const response = await axios.get('/api/milestones', {
        params: { projectId }
      });
      setMilestones(response.data);
    } catch (error) {
      console.error('Error fetching milestones:', error);
    }
  };

  const daysUntilDeadline = (new Date(projectDDL) - new Date()) / (1000 * 60 * 60 * 24);
  const isDeadlineSoon = daysUntilDeadline <= 6;

  const formatDescription = (text) => {
    const maxLength = 100; // Adjusted max length for description
    if (text.length > maxLength) {
      return text.substring(0, maxLength - 3) + '...';
    }
    return text;
  };

  const formatTitle = (text) => {
    const maxLength = 30; // Adjusted max length for title
    if (text.length > maxLength) {
      return text.substring(0, maxLength - 3) + '...';
    }
    return text;
  };

  const displayedDescription = formatDescription(description);
  const displayedTitle = formatTitle(name);

  const fundingGoalString = fundingGoal ? fundingGoal.toString() : '0';
  const amountRaisedString = amountRaised ? amountRaised.toString() : '0';

  const fundingProgress = fundingGoal ? (amountRaised / fundingGoal) * 100 : 0;
  const formattedFundingGoal = ethers.utils.formatEther(fundingGoalString);
  const formattedAmountRaised = ethers.utils.formatEther(amountRaisedString);

  console.log('ProjectCard Debug:');
  console.log('ID:', id);
  console.log('Status:', status);
  console.log('Funding Goal:', formattedFundingGoal);
  console.log('Amount Raised:', formattedAmountRaised);
  console.log('Funding Progress:', fundingProgress);

  return (
    <div className="project-card" onClick={onClick}>
      <div className="card-header">
        <h3 className="project-name">{displayedTitle}</h3>
        <p className="project-id"><strong>ID:</strong> {id}</p>
        <p className="project-category"><strong>Category:</strong> {category}</p>
      </div>
      <div className="card-body">
        <p className="project-description">
          <strong>Description:</strong> {displayedDescription}
        </p>
        <p className="project-ddl">
          <strong>Deadline: </strong>
          <span className={`deadline-date ${isDeadlineSoon ? 'soon' : ''}`}>
            {new Date(projectDDL).toLocaleDateString()}
          </span>
        </p>
      </div>
      <div className="card-footer">
        {status === 'active' ? (
          <div className="status-section">
            <p className="project-status">Crowdfunding Project - Raised: {formattedAmountRaised} / {formattedFundingGoal} ETH</p>
            <div className="progress-bar">
              <div className="progress" style={{ width: `${fundingProgress}%` }}></div>
            </div>
          </div>
        ) : null}

        {status === 'funded' && milestones.length > 0 ? (
          <div className="milestone-section">
            <p className="project-status">Milestone Progress - {milestones.filter(m => m.milestonestatus === 'completed').length} of {milestones.length} completed</p>
            <div className="milestone-progress-container">
              {milestones.map((milestone, index) => {
                const milestoneStatus = milestone.milestonestatus;
                const isCompleted = milestoneStatus === 'completed';
                const isNext = milestoneStatus === 'pending' && (index === 0 || milestones[index - 1].milestonestatus === 'completed');
                return (
                  <div
                    key={milestone.milestoneId}
                    className={`milestone-progress ${isCompleted ? 'completed' : isNext ? 'next' : 'upcoming'}`}
                  ></div>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default ProjectCard;
