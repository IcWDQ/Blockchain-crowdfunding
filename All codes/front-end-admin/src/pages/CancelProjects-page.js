// src/pages/CancelProjects.js

import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import CancelProject from '../components/CancelProject';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

Modal.setAppElement('#root');

function CancelProjects() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const { isAdmin, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isAdmin) {
      navigate('/login'); // 如果不是管理员且没有加载，重定向到登录页面
    }
  }, [isAdmin, loading, navigate]);

  useEffect(() => {
    const fetchActiveFundedProjects = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/projects`);
        const activeFundedProjects = response.data.filter(project => 
          project.status === 'Active' || project.status === 'Funded'
        );
        const processedProjects = activeFundedProjects.map(project => ({
          ...project,
          projectDescription: project.projectDescription || 'No description provided.'
        }));
        setProjects(processedProjects);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    if (isAdmin) { // 只有在是管理员时才获取数据
      fetchActiveFundedProjects();
    }
  }, [isAdmin]);

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + '...';
  };

  const openModal = (project) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  if (loading) {
    return <div>Loading...</div>; // 如果正在加载，显示加载状态
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Cancel Projects</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-5xl">
        {projects.map((project) => (
          <div key={project.projectId} className="bg-white p-4 rounded shadow">
            <h3 className="text-xl font-semibold">{project.projectName}</h3>
            <p><strong>ID:</strong> {project.projectId}</p>
            <p><strong>Category:</strong> {project.projectType}</p>
            <div className="project-description-container">
              <p><strong>Project Description:</strong></p>
              <p className="description-text truncate-text">
                {truncateText(project.projectDescription, 100)}
              </p>
              <button 
                onClick={() => openModal(project)} 
                className="text-white bg-orange-500 hover:bg-orange-600 px-2 py-1 mt-2 text-sm rounded"
              >
                Show more
              </button>
            </div>
            <p><strong>Project Deadline:</strong> {new Date(project.projectDDL).toLocaleDateString()}</p>
          </div>
        ))}
      </div>

      <Modal
        isOpen={!!selectedProject}
        onRequestClose={closeModal}
        contentLabel="Project Description"
        className="modal"
        overlayClassName="overlay"
      >
        {selectedProject && (
          <div className="p-4 max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-2">{selectedProject.projectName}</h2>
            <p className="whitespace-pre-line">{selectedProject.projectDescription}</p>
            <button 
              onClick={closeModal} 
              className="text-white bg-orange-500 hover:bg-orange-600 px-4 py-2 mt-4 rounded"
            >
              Close
            </button>
          </div>
        )}
      </Modal>

      <div className="flex justify-center mt-8">
        <CancelProject />
      </div>
    </div>
  );
}

export default CancelProjects;
