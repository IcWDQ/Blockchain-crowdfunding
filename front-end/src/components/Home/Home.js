// src/components/Home/Home.js
import React, { useState } from 'react';
import Navbar from '../Navbar/Navbar';
import FundProject from '../FundProject/FundProject';
import ProjectList from '../ProjectList/ProjectList';
import ProjectDetails from '../ProjectDetails/ProjectDetails';
import CreateProject from '../CreateProject/CreateProject';
import './Home.css';

function Home() {
  const [showFundProject, setShowFundProject] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [activePage, setActivePage] = useState('allProjects');

  const toggleFundProject = () => {
    setShowFundProject(!showFundProject);
  };

  const toggleCreateProject = () => {
    setActivePage('createProject');
    setShowFundProject(false);
    setSelectedProject(null);
  };

  const showAllProjects = () => {
    setActivePage('allProjects');
    setShowFundProject(false);
    setSelectedProject(null);
  };

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setActivePage(null);
  };

  const handleBackToProjects = () => {
    setSelectedProject(null);
    setActivePage('allProjects');
  };

  const exampleProjects = [
    {
      id: 1,
      name: 'Project 1',
      category: 'Category A',
      description: 'This is a brief description of Project 1.',
      status: 'milestone',
      milestones: [
        { name: 'Milestone 1', progress: 100, completed: true },
        { name: 'Milestone 2', progress: 50, current: true },
        { name: 'Milestone 3', progress: 0 }
      ],
      fundraisingProgress: 0,
      fundraisingGoal: 100000
    },
    {
      id: 2,
      name: 'Project 2',
      category: 'Category B',
      description: 'This is a brief description of Project 2.',
      status: 'fundraising',
      milestones: [],
      fundraisingProgress: 40000,
      fundraisingGoal: 100000
    },
    {
      id: 1,
      name: 'Project 1',
      category: 'Category A',
      description: 'This is a brief description of Project 1.',
      status: 'milestone',
      milestones: [
        { name: 'Milestone 1', progress: 100, completed: true },
        { name: 'Milestone 2', progress: 50, current: true },
        { name: 'Milestone 3', progress: 0 }
      ],
      fundraisingProgress: 0,
      fundraisingGoal: 100000
    },
    {
      id: 1,
      name: 'Project 1',
      category: 'Category A',
      description: 'This is a brief description of Project 1.',
      status: 'milestone',
      milestones: [
        { name: 'Milestone 1', progress: 100, completed: true },
        { name: 'Milestone 2', progress: 50, current: true },
        { name: 'Milestone 3', progress: 0 }
      ],
      fundraisingProgress: 0,
      fundraisingGoal: 100000
    },
    {
      id: 1,
      name: 'Project 1',
      category: 'Category A',
      description: 'This is a brief description of Project 1.',
      status: 'milestone',
      milestones: [
        { name: 'Milestone 1', progress: 100, completed: true },
        { name: 'Milestone 2', progress: 50, current: true },
        { name: 'Milestone 3', progress: 0 }
      ],
      fundraisingProgress: 0,
      fundraisingGoal: 100000
    },
    {
      id: 1,
      name: 'Project 1',
      category: 'Category A',
      description: 'This is a brief description of Project 1.',
      status: 'milestone',
      milestones: [
        { name: 'Milestone 1', progress: 100, completed: true },
        { name: 'Milestone 2', progress: 50, current: true },
        { name: 'Milestone 3', progress: 0 }
      ],
      fundraisingProgress: 0,
      fundraisingGoal: 100000
    },
    {
      id: 1,
      name: 'Project 1',
      category: 'Category A',
      description: 'This is a brief description of Project 1.',
      status: 'milestone',
      milestones: [
        { name: 'Milestone 1', progress: 100, completed: true },
        { name: 'Milestone 2', progress: 50, current: true },
        { name: 'Milestone 3', progress: 0 }
      ],
      fundraisingProgress: 0,
      fundraisingGoal: 100000
    },
    {
      id: 2,
      name: 'Project 2',
      category: 'Category B',
      description: 'This is a brief description of Project 2.',
      status: 'fundraising',
      milestones: [],
      fundraisingProgress: 40000,
      fundraisingGoal: 100000
    },
    {
      id: 2,
      name: 'Project 2',
      category: 'Category B',
      description: 'This is a brief description of Project 2.',
      status: 'fundraising',
      milestones: [],
      fundraisingProgress: 40000,
      fundraisingGoal: 100000
    },
    {
      id: 2,
      name: 'Project 2',
      category: 'Category B',
      description: 'This is a brief description of Project 2.',
      status: 'fundraising',
      milestones: [],
      fundraisingProgress: 40000,
      fundraisingGoal: 100000
    },
    {
      id: 2,
      name: 'Project 2',
      category: 'Category B',
      description: 'This is a brief description of Project 2.',
      status: 'fundraising',
      milestones: [],
      fundraisingProgress: 40000,
      fundraisingGoal: 100000
    },
    {
      id: 2,
      name: 'Project 2',
      category: 'Category B',
      description: 'This is a brief description of Project 2.',
      status: 'fundraising',
      milestones: [],
      fundraisingProgress: 40000,
      fundraisingGoal: 100000
    }
    // Add more projects as needed
  ];

  return (
    <div className="home-container">
      <Navbar 
        onShowFundProject={toggleFundProject} 
        onCreateProject={toggleCreateProject} 
        onShowAllProjects={showAllProjects}
        activePage={activePage}
      />
      <div className="content">
        {showFundProject && (
          <>
            <FundProject onClose={toggleFundProject} />
            <div className="overlay" onClick={toggleFundProject}></div>
          </>
        )}
        {selectedProject ? (
          <ProjectDetails project={selectedProject} onClose={handleBackToProjects} />
        ) : activePage === 'createProject' ? (
          <CreateProject />
        ) : (
          <ProjectList projects={exampleProjects} onProjectClick={handleProjectClick} />
        )}
      </div>
    </div>
  );
}

export default Home;
