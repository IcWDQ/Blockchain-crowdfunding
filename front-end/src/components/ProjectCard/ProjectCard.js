// src/components/ProjectCard/ProjectCard.js
import React from 'react';
import './ProjectCard.css';

function ProjectCard({ id, name, category, description, status, milestones, fundraisingProgress, fundraisingGoal, onClick }) {
  const milestoneProgress = milestones.filter(m => m.completed).length;
  const currentMilestone = milestones.find(m => m.current);
  const milestoneInfo = `${milestoneProgress + (currentMilestone ? 1 : 0)}/${milestones.length}`;
  const fundraisingInfo = `${fundraisingProgress.toLocaleString()}/${fundraisingGoal.toLocaleString()}`;

  return (
    <div className="project-card" onClick={onClick}>
      <h3 className="project-name">{name}</h3>
      <p className="project-id">ID: {id}</p>
      <p className="project-category">Category: <span>{category}</span></p>
      <p className="project-description">{description}</p>
      <p className="milestone-title">
        {status === 'milestone' ? `Milestone Progress (${milestoneInfo})` : `Fundraising Progress (${fundraisingInfo})`}
      </p>
      <div className="progress-bar">
        {status === 'milestone' ? (
          milestones.map((milestone, index) => (
            <div
              key={index}
              className={`progress-segment ${milestone.completed ? 'completed' : milestone.current ? 'current' : ''}`}
              style={{ width: `${100 / milestones.length}%` }}
            ></div>
          ))
        ) : (
          <div className="progress" style={{ width: `${(fundraisingProgress / fundraisingGoal) * 100}%`, backgroundColor: '#ff69b4' }}></div>
        )}
      </div>
    </div>
  );
}

export default ProjectCard;
