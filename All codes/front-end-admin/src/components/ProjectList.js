// src/components/ProjectList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProjectList() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/projects`);
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="container">
      <h2>Project List</h2>
      <ul>
        {projects.map(project => (
          <li key={project.projectId}>
            <strong>Project ID:</strong> {project.projectId}<br />
            <strong>Creator:</strong> {project.creator}<br />
            <strong>Funding Goal:</strong> {project.fundingGoal}<br />
            <strong>Amount Raised:</strong> {project.amountRaised}<br />
            <strong>Status:</strong> {project.status}<br />
            <strong>Contributors:</strong> {project.contributors.join(', ')}<br />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProjectList;
