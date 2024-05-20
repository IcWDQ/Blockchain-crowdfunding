// src/components/ProjectList/ProjectList.js
import React from 'react';
import ProjectCard from '../ProjectCard/ProjectCard';
import './ProjectList.css';

function ProjectList({ projects, onProjectClick }) {
  if (!projects.length) {
    return <div className="no-projects">No project yet!</div>;
  }

  const sortedProjects = [...projects].sort((a, b) => b.projectId - a.projectId);

  return (
    <div className="project-list">
      {sortedProjects.map((project) => (
        <ProjectCard
          key={project.projectId}
          id={project.projectId}
          name={project.projectName}
          category={project.projectType}
          description={project.projectDescription}
          projectDDL={project.projectDDL}
          status={project.status}
          fundingGoal={project.fundingGoal} // Ensure this is being passed
          amountRaised={project.amountRaised} // Ensure this is being passed
          onClick={() => onProjectClick(project)}
        />
      ))}
    </div>
  );
}

export default ProjectList;
