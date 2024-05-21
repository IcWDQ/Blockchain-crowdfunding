import React, { useState } from 'react';
import { provider, contract } from '../ethers';
import axios from 'axios';

function ApproveProject() {
  const [projectId, setProjectId] = useState('');

  const approveProject = async (event) => {
    event.preventDefault();

    try {
      await provider.send("eth_requestAccounts", []);

      const tx = await contract.approveProject(parseInt(projectId, 10));
      await tx.wait();

      // 如果智能合约调用成功，我们将发送请求更新数据库中的项目状态
      try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/projects/approve`, {
          projectId: parseInt(projectId, 10)
        });

        if (response.data) {
          alert('Project approved successfully');
        } else {
          alert('Failed to update project status in the database');
        }
      } catch (error) {
        console.error('Error updating project status in the database', error);
        alert('Error updating project status in the database');
      }
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
