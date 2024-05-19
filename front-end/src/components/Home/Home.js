import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ethers } from 'ethers';
import Navbar from '../Navbar/Navbar';
import ProjectList from '../ProjectList/ProjectList';
import ProjectDetails from '../ProjectDetails/ProjectDetails';
import CreateProject from '../CreateProject/CreateProject';
import './Home.css';

function Home() {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [userAddress, setUserAddress] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [activePage, setActivePage] = useState('allProjects');

  useEffect(() => {
    fetchProjects();
    getUserAddress();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('/api/projects');
      setProjects(response.data);
      setFilteredProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const getUserAddress = async () => {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      setUserAddress(address);
    } catch (error) {
      console.error('Error getting user address:', error);
    }
  };

  const filterMyProjects = () => {
    return projects.filter(project => project.creator.toLowerCase() === userAddress.toLowerCase());
  };

  const filterFundedProjects = () => {
    return projects.filter(project => project.contributors.some(contributor => contributor.toLowerCase() === userAddress.toLowerCase()));
  };

  const toggleCreateProject = () => {
    setActivePage('createProject');
    setSelectedProject(null);
  };

  const showAllProjects = () => {
    setActivePage('allProjects');
    setSelectedProject(null);
    setFilteredProjects(projects);
  };

  const showMyProjects = () => {
    const myProjects = filterMyProjects();
    setActivePage('myProjects');
    setSelectedProject(null);
    setFilteredProjects(myProjects);
  };

  const showFundedProjects = () => {
    const fundedProjects = filterFundedProjects();
    setActivePage('fundedProjects');
    setSelectedProject(null);
    setFilteredProjects(fundedProjects);
  };

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setActivePage('projectDetails');
  };

  const handleBackToProjects = () => {
    setSelectedProject(null);
    setActivePage(activePage === 'createProject' ? 'createProject' : 'allProjects');
  };

  const handleSearch = (term) => {
    let projectsToFilter = projects;
    if (activePage === 'myProjects') {
      projectsToFilter = filterMyProjects();
    } else if (activePage === 'fundedProjects') {
      projectsToFilter = filterFundedProjects();
    }
    
    if (!term) {
      setFilteredProjects(projectsToFilter);
    } else {
      const lowercasedTerm = term.toLowerCase();
      const filtered = projectsToFilter.filter(project =>
        project.projectName.toLowerCase().includes(lowercasedTerm) ||
        project.projectId.toString() === term // 精确匹配ID
      );
      setFilteredProjects(filtered);
    }
  };

  return (
    <div className="home-container">
      <Navbar 
        onCreateProject={toggleCreateProject} 
        onShowAllProjects={showAllProjects} 
        onShowMyProjects={showMyProjects}
        onShowFundedProjects={showFundedProjects}
        onSearch={handleSearch}
        activePage={activePage}
      />
      <div className={`content ${activePage === 'createProject' ? 'centered' : ''}`}>
        {selectedProject ? (
          <ProjectDetails project={selectedProject} onClose={handleBackToProjects} />
        ) : activePage === 'createProject' ? (
          <CreateProject />
        ) : (
          <ProjectList projects={filteredProjects} onProjectClick={handleProjectClick} />
        )}
      </div>
    </div>
  );
}

export default Home;
