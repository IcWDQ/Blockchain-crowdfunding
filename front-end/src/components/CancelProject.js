

import React, { useState } from 'react';
import { provider, contract } from '../ethers';

function CancelProject() {
  const [projectId, setProjectId] = useState('');

  const cancelProject = async (event) => {
    event.preventDefault();

    try {
      await provider.send("eth_requestAccounts", []);

      const tx = await contract.cancelProject(parseInt(projectId, 10));
      await tx.wait();

      alert('Project cancelled successfully');
    } catch (error) {
      console.error('Error cancelling project', error);
      alert('Error cancelling project');
    }
  };

  return (
    <div className="container">
      <h2>Cancel Project</h2>
      <form onSubmit={cancelProject}>
        <div>
          <label>Project ID: </label>
          <input
            value={projectId}
            onChange={e => setProjectId(e.target.value)}
          />
        </div>
        <button type="submit">Cancel Project</button>
      </form>
    </div>
  );
}

export default CancelProject;
