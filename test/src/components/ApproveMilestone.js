

import React, { useState } from 'react';
import { provider, contract } from '../ethers';

function ApproveMilestone() {
  const [projectId, setProjectId] = useState('');
  const [milestoneId, setMilestoneId] = useState('');

  const approveMilestone = async (event) => {
    event.preventDefault();

    try {
      await provider.send("eth_requestAccounts", []);

      const tx = await contract.approveMilestone(parseInt(projectId, 10), parseInt(milestoneId, 10));
      await tx.wait();

      alert('Milestone approved successfully');
    } catch (error) {
      console.error('Error approving milestone:', error);
      alert(`Error approving milestone: ${error.message}`);
    }
  };

  return (
    <div className="container">
      <h2>Approve Milestone</h2>
      <form onSubmit={approveMilestone}>
        <div>
          <label>Project ID: </label>
          <input
            value={projectId}
            onChange={e => setProjectId(e.target.value)}
          />
        </div>
        <div>
          <label>Milestone ID: </label>
          <input
            value={milestoneId}
            onChange={e => setMilestoneId(e.target.value)}
          />
        </div>
        <button type="submit">Approve Milestone</button>
      </form>
    </div>
  );
}

export default ApproveMilestone;
