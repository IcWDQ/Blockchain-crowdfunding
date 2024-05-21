import React, { useState } from 'react';
import { provider, contract } from '../ethers';
import axios from 'axios';

function ApproveMilestone() {
  const [projectId, setProjectId] = useState('');
  const [milestoneId, setMilestoneId] = useState('');
  const [milestone, setMilestone] = useState(null);
  const [error, setError] = useState('');

  const fetchMilestone = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/milestones?projectId=${projectId}&milestoneId=${milestoneId}`);
      if (response.data && response.data.length > 0) {
        setMilestone(response.data[0]);
        setError('');
      } else {
        setMilestone(null);
        setError('Milestone not found.');
      }
    } catch (error) {
      console.error('Error fetching milestone:', error);
      setError('Error fetching milestone.');
      setMilestone(null);
    }
  };

  const approveMilestone = async (event) => {
    event.preventDefault();

    try {
      await provider.send("eth_requestAccounts", []);

      const projectIdInt = parseInt(projectId, 10);
      const milestoneIdInt = parseInt(milestoneId, 10);

      const tx = await contract.approveMilestone(projectIdInt, milestoneIdInt);
      await tx.wait();

      // 记录操作到数据库
      const activityData = {
        type: 'Approve Milestone',
        projectId: projectIdInt,
        user: tx.from,
        details: { milestoneId: milestoneIdInt }
      };

      await axios.post(`${process.env.REACT_APP_API_URL}/activities`, activityData);

      alert('Milestone approved successfully');
    } catch (error) {
      console.error('Error approving milestone:', error);

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
    <div className="container">
      <h2>Approve Milestone</h2>
      <form onSubmit={approveMilestone}>
        <div>
          <label>Project ID: </label>
          <input
            type="number"
            value={projectId}
            onChange={e => setProjectId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Milestone ID: </label>
          <input
            type="number"
            value={milestoneId}
            onChange={e => setMilestoneId(e.target.value)}
            required
          />
        </div>
        <button type="button" onClick={fetchMilestone}>Fetch Milestone</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {milestone && (
          <div>
            <h3>Milestone Information</h3>
            <p><strong>Description:</strong> {milestone.milestoneDescription}</p>
            <p><strong>Document:</strong> <a href={milestone.otherDocuments} target="_blank" rel="noopener noreferrer">View Document</a></p>
            <button type="submit">Approve Milestone</button>
          </div>
        )}
      </form>
    </div>
  );
}

export default ApproveMilestone;
