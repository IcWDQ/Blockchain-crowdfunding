

import React, { useState } from 'react';
import { provider, contract } from '../ethers';

function ApproveProject() {
  const [projectId, setProjectId] = useState('');

  const approveProject = async (event) => {
    event.preventDefault();

    try {
      await provider.send("eth_requestAccounts", []);

      const tx = await contract.approveProject(parseInt(projectId, 10));
      await tx.wait();

      alert('Project approved successfully');
    } catch (error) {
      console.error('Error approving project', error);
      alert('Error approving project');
    }
  };

  return (
    <div className="container">
      <h2>Approve Project</h2>
      <form onSubmit={approveProject}>
        <div>
          <label>Project ID: </label>
          <input
            value={projectId}
            onChange={e => setProjectId(e.target.value)}
          />
        </div>
        <button type="submit">Approve Project</button>
      </form>
    </div>
  );
}

export default ApproveProject;
