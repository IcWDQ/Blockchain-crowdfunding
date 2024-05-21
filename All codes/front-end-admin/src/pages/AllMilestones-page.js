import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext'; // 假设AuthContext在这个路径

function AllMilestonesPage() {
  const [milestones, setMilestones] = useState([]);
  const [selectedMilestone, setSelectedMilestone] = useState(null);
  const { isAdmin, loading } = useContext(AuthContext); // 从上下文获取管理员状态
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isAdmin) {
      navigate('/login'); // 如果不是管理员且没有加载，重定向到登录页面
    }
  }, [isAdmin, loading, navigate]);

  useEffect(() => {
    const fetchMilestones = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/milestones`);
        setMilestones(response.data);
      } catch (error) {
        console.error('Error fetching milestones:', error);
      }
    };

    if (isAdmin) { // 只有在是管理员时才获取数据
      fetchMilestones();
    }
  }, [isAdmin]);

  const toggleModal = (milestone) => {
    setSelectedMilestone(milestone);
  };

  const closeModal = () => {
    setSelectedMilestone(null);
  };

  if (loading) {
    return <div>Loading...</div>; // 如果正在加载，显示加载状态
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h2 className="text-2xl font-bold mb-4">All Milestones</h2>
      <div className="w-full max-w-6xl">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-2 px-4 text-left">Project ID</th>
              <th className="py-2 px-4 text-left">Project Name</th>
              <th className="py-2 px-4 text-left">Milestone ID</th>
              <th className="py-2 px-4 text-left">Description</th>
            </tr>
          </thead>
          <tbody>
            {milestones.map((milestone) => (
              <tr key={milestone._id} className="border-b">
                <td className="py-2 px-4">{milestone.projectId}</td>
                <td className="py-2 px-4">{milestone.projectName}</td>
                <td className="py-2 px-4">{milestone.milestoneId}</td>
                <td className="py-2 px-4">
                  <button
                    onClick={() => toggleModal(milestone)}
                    className="text-white bg-orange-500 hover:bg-orange-600 py-1 px-3 rounded"
                  >
                    Show
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedMilestone && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full max-h-[80vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">Milestone Information</h3>
            <p><strong>Project ID:</strong> {selectedMilestone.projectId}</p>
            <p><strong>Project Name:</strong> {selectedMilestone.projectName}</p>
            <p><strong>Milestone ID:</strong> {selectedMilestone.milestoneId}</p>
            <p><strong>Milestone Statue:</strong>{selectedMilestone.milestonestatus}</p>
            <p><strong>Description:</strong> {selectedMilestone.milestoneDescription}</p>
            {selectedMilestone.otherDocuments && (
              <p><strong>Document:</strong> <a href={selectedMilestone.otherDocuments} target="_blank" rel="noopener noreferrer">View Document</a></p>
            )}
            <button
              onClick={closeModal}
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AllMilestonesPage;
