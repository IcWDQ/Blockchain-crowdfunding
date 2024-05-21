import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import ApproveProject from '../components/ApproveProject';
import AuthContext from '../context/AuthContext';

Modal.setAppElement('#root');

function PendingProjects() {
  const { isAdmin } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const fetchPendingProjects = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/projects`);
        const pendingProjects = response.data.filter(project => project.status === 'Pending');
        const processedProjects = pendingProjects.map(project => ({
          ...project,
          projectDescription: project.projectDescription || 'No description provided.'
        }));
        setProjects(processedProjects);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchPendingProjects();
  }, []);

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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Pending Projects</h2>
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

      {isAdmin && <ApproveProject />}
    </div>
  );
}

export default PendingProjects;
