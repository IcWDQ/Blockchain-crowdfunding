// src/components/ProjectCard/ProjectCard.js
import React from 'react';
import './ProjectCard.css';

function ProjectCard({ id, name, category, description, projectDDL, onClick }) {
  return (
    <div className="project-card" onClick={onClick}>
      <h3 className="project-name">{name}</h3>
      <p className="project-id">ID: {id}</p>
      <p className="project-category">Category: {category}</p>
      <p className="project-description">{description}</p>
      <p className="project-ddl">Project Deadline: {new Date(projectDDL).toLocaleDateString()}</p>
      <div className="progress-bar">
        <div className="progress" style={{ width: '0%' }}></div>
      </div>
    </div>
  );
}

export default ProjectCard;
