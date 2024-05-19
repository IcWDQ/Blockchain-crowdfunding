import React from 'react';
import ProjectCard from '../ProjectCard/ProjectCard';
import './ProjectList.css';

function ProjectList({ projects, onProjectClick }) {
  if (!projects.length) {
    return <div className="no-projects">No project yet!</div>;
  }

  // Sort projects in descending order of projectId
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
          onClick={() => onProjectClick(project)}
        />
      ))}
    </div>
  );
}

export default ProjectList;
