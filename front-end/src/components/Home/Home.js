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
    setActivePage('myProjects');
    setSelectedProject(null);
    setFilteredProjects(filterMyProjects());
  };

  const showFundedProjects = () => {
    setActivePage('fundedProjects');
    setSelectedProject(null);
    setFilteredProjects(filterFundedProjects());
  };

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setActivePage('projectDetails');
  };

  const handleBackToProjects = () => {
    setSelectedProject(null);
    setActivePage('allProjects');
  };

  const handleSearch = (term) => {
    if (!term) {
      setFilteredProjects(projects);
    } else {
      const lowercasedTerm = term.toLowerCase();
      const filtered = projects.filter(project =>
        project.projectName.toLowerCase().includes(lowercasedTerm) ||
        project.projectId.toString() === term // 精确匹配ID
      );
      setFilteredProjects(filtered);
    }
  };
  

  let displayedProjects = filteredProjects;
  if (activePage === 'myProjects') {
    displayedProjects = filterMyProjects();
  } else if (activePage === 'fundedProjects') {
    displayedProjects = filterFundedProjects();
  }

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
          <ProjectList projects={displayedProjects} onProjectClick={handleProjectClick} />
        )}
      </div>
    </div>
  );
}

export default Home;
