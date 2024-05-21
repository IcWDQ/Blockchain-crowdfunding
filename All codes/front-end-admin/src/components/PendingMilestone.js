import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { provider, contract } from '../ethers'; // 确保正确导入 provider 和 contract
import '../App.css';

function PendingMilestones({ isAdmin }) {
  const [milestones, setMilestones] = useState([]);
  const [selectedMilestone, setSelectedMilestone] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPendingMilestones = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/milestones/pending`);
        setMilestones(response.data);
      } catch (error) {
        console.error('Error fetching pending milestones', error);
      }
    };

    fetchPendingMilestones();
  }, []);

  const viewMilestone = (milestone) => {
    setSelectedMilestone(milestone);
    setError('');
  };

  const approveMilestone = async (event) => {
    event.preventDefault();

    if (!selectedMilestone) return;

    try {
      await provider.send("eth_requestAccounts", []);

      // 调用智能合约中的 approveMilestone 方法
      const tx = await contract.approveMilestone(parseInt(selectedMilestone.projectId, 10), parseInt(selectedMilestone.milestoneId, 10));
      await tx.wait();

      // 如果智能合约调用成功，我们将发送请求更新数据库中的里程碑状态
      try {
        const response = await axios.post('http://localhost:3001/api/milestones/approve', {
          projectId: parseInt(selectedMilestone.projectId, 10),
          milestoneId: parseInt(selectedMilestone.milestoneId, 10)
        });

        if (response.data) {
          alert('Milestone approved successfully');
          setSelectedMilestone(null);
          setMilestones((prev) => prev.filter(m => m.milestoneId !== selectedMilestone.milestoneId || m.projectId !== selectedMilestone.projectId));
        } else {
          alert('Failed to update milestone status in the database');
        }
      } catch (error) {
        console.error('Error updating milestone status in the database', error);
        alert('Error updating milestone status in the database');
      }
    } catch (error) {
      console.error('Error approving milestone', error);

      // 根据错误信息进行提示
      if (error.code === -32603 && error.message.includes('execution reverted: Milestone deadline has passed')) {
        alert('Error: The milestone deadline has passed.');
      } else if (error.code === -32603 && error.message.includes('execution reverted: Previous milestone not completed')) {
        alert('Error: The previous milestone has not been completed.');
      } else if (error.code === -32603 && error.message.includes('execution reverted: Milestone is not pending')) {
        alert('Error: The milestone is not in a pending state.');
      } else {
        alert(`Error approving milestone: ${error.message}`);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Pending Milestones</h2>
      <div className="flex justify-center">
        <div className="w-full max-w-5xl">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">Project ID</th>
                <th className="border px-4 py-2">Milestone ID</th>
                <th className="border px-4 py-2">Description</th>
                <th className="border px-4 py-2">Status</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {milestones.map((milestone, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{milestone.projectId}</td>
                  <td className="border px-4 py-2">{milestone.milestoneId}</td>
                  <td className="border px-4 py-2">{milestone.milestoneDescription}</td>
                  <td className="border px-4 py-2">{milestone.milestonestatus}</td>
                  <td className="border px-4 py-2">
                    <button className="bg-blue-500 text-white px-2 py-1 rounded" onClick={() => viewMilestone(milestone)}>View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {selectedMilestone && (
            <div className="milestone-details bg-white p-4 mt-4 rounded shadow">
              <h3 className="text-xl font-bold mb-2">Milestone Information</h3>
              <p><strong>Project ID:</strong> {selectedMilestone.projectId}</p>
              <p><strong>Milestone ID:</strong> {selectedMilestone.milestoneId}</p>
              <p><strong>Description:</strong> {selectedMilestone.milestoneDescription}</p>
              <p><strong>Document:</strong> <a href={selectedMilestone.otherDocuments} target="_blank" rel="noopener noreferrer">View Document</a></p>
              <p><strong>Status:</strong> {selectedMilestone.milestonestatus}</p>
              {error && <p style={{ color: 'red' }}>{error}</p>}
              {isAdmin && (
                <button className="bg-orange-500 text-white px-2 py-1 rounded mt-2" onClick={approveMilestone}>Approve Milestone</button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PendingMilestones;
