import React, { useState } from 'react';
import { provider, contract } from '../ethers';
import axios from 'axios';

function CancelProject() {
  const [projectId, setProjectId] = useState('');

  const cancelProject = async (event) => {
    event.preventDefault();

    try {
      await provider.send("eth_requestAccounts", []);

      const tx = await contract.cancelProject(parseInt(projectId, 10));
      await tx.wait();

      // 更新后端数据库
      try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/projects/cancel`, {
          projectId: parseInt(projectId, 10)
        });

        if (response.data) {
          alert('Project cancelled successfully and database updated');
        } else {
          alert('Failed to update database');
        }
      } catch (error) {
        console.error('Update datebase successfully', error);
        alert('Update datebase successfully');
      }
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
