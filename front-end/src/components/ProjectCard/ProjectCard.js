import React from 'react';
import './ProjectCard.css';

function ProjectCard({ id, name, category, description, projectDDL, onClick }) {
  const daysUntilDeadline = (new Date(projectDDL) - new Date()) / (1000 * 60 * 60 * 24);
  const isDeadlineSoon = daysUntilDeadline <= 6;

  const formatDescription = (text) => {
    const maxLength = 150;
    if (text.length > maxLength) {
      return text.substring(0, maxLength - 3) + '...';
    }
    return text;
  };

  const displayedDescription = formatDescription(description);

  return (
    <div className="project-card" onClick={onClick}>
      <h3 className="project-name">{name}</h3>
      <p className="project-id"><strong>ID:</strong> {id}</p>
      <p className="project-category"><strong>Category:</strong> {category}</p>
      <p>
        <strong>Project Description:</strong>
        <span className="project-description"> {displayedDescription}</span>
      </p>
      <p className={`project-ddl ${isDeadlineSoon ? 'soon' : ''}`}>
        <strong>Project Deadline:</strong> {new Date(projectDDL).toLocaleDateString()}
      </p>
      <div className="progress-bar">
        <div className="progress" style={{ width: '0%' }}></div>
      </div>
    </div>
  );
}

export default ProjectCard;
