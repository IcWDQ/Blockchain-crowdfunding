// src/components/ProjectDetails/ProjectDetails.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProjectDetails.css';

function ProjectDetails({ project, onClose }) {
  const [milestones, setMilestones] = useState([]);

  useEffect(() => {
    fetchMilestones(project.projectId);
  }, [project]);

  const fetchMilestones = async (projectId) => {
    try {
      const response = await axios.get('/api/milestones');
      // 过滤出与当前项目相关的里程碑
      const projectMilestones = response.data.filter(milestone => milestone.projectId === projectId);
      setMilestones(projectMilestones);
    } catch (error) {
      console.error('Error fetching milestones:', error);
    }
  };

  return (
    <div className="project-details-container">
      <div className="project-details">
        <button onClick={onClose} className="back-button">Back</button>
        <h2>{project.projectName}</h2>
        <p><strong>ID:</strong> {project.projectId}</p>
        <p><strong>Type:</strong> {project.projectType}</p>
        <p><strong>Description:</strong> {project.projectDescription}</p>
        <p><strong>Creator:</strong> {project.creator}</p>
        <p><strong>Funding Goal:</strong> {project.fundingGoal}</p>
        <p><strong>Amount Raised:</strong> {project.amountRaised}</p>
        <p><strong>Status:</strong> {project.status}</p>
        <p><strong>Contributors:</strong> {project.contributors.join(', ')}</p>
        <p><strong>Created At:</strong> {new Date(project.createdAt).toLocaleString()}</p>
        <p><strong>Project Deadline:</strong> {new Date(project.projectDDL).toLocaleDateString()}</p>

        <h3>Milestones</h3>
        {milestones.length > 0 ? (
          <ul>
            {milestones.map((milestone) => (
              <li key={milestone.milestoneId}>
                <p><strong>Milestone ID:</strong> {milestone.milestoneId}</p>
                <p><strong>Description:</strong> {milestone.milestoneDescription}</p>
                <p><strong>Status:</strong> {milestone.milestonestatus}</p>
                <p><strong>Deadline:</strong> {new Date(milestone.milestoneDDL).toLocaleDateString()}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No milestones available</p>
        )}
      </div>
    </div>
  );
}

export default ProjectDetails;
