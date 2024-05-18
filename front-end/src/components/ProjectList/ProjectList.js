// src/components/ProjectList/ProjectList.js
import React from 'react';
import ProjectCard from '../ProjectCard/ProjectCard';
import './ProjectList.css';

function ProjectList({ projects, onProjectClick }) {
  return (
    <div className="project-list">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          id={project.id}
          name={project.name}
          category={project.category}
          description={project.description}
          status={project.status}
          milestones={project.milestones}
          fundraisingProgress={project.fundraisingProgress}
          fundraisingGoal={project.fundraisingGoal}
          onClick={() => onProjectClick(project)}
        />
      ))}
    </div>
  );
}

export default ProjectList;
