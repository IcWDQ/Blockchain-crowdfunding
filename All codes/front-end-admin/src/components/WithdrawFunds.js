import React, { useState } from 'react';
import { provider, contract } from '../ethers';
import axios from 'axios';

function WithdrawFunds() {
  const [projectId, setProjectId] = useState('');
  const [milestoneId, setMilestoneId] = useState('');

  const checkMilestoneStatus = async (projectIdInt, milestoneIdInt) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/projects/${projectIdInt}/milestones/${milestoneIdInt}`);
      return response.data.milestoneStatus;
    } catch (error) {
      console.error('Error checking milestone status:', error);
      return null;
    }
  };

  const withdrawFunds = async (event) => {
    event.preventDefault();

    try {
      await provider.send("eth_requestAccounts", []);

      const projectIdInt = parseInt(projectId, 10);
      const milestoneIdInt = parseInt(milestoneId, 10);

      // 检查里程碑状态
      const status = await checkMilestoneStatus(projectIdInt, milestoneIdInt);
      if (status !== 'Approved') {
        alert('Milestone is not approved');
        return;
      }

      const tx = await contract.withdrawFunds(projectIdInt, milestoneIdInt);
      await tx.wait();

      // 更新数据库中的项目状态和资金
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/projects/withdrawFunds`, {
        projectId: projectIdInt,
        milestoneId: milestoneIdInt
      });

      alert('Funds withdrawn successfully');

      // 记录操作到数据库
      const activityData = {
        type: 'Withdraw Funds',
        projectId: projectIdInt,
        user: tx.from,
        details: { milestoneId: milestoneIdInt }
      };

      await axios.post(`${process.env.REACT_APP_API_URL}/activities`, activityData);

      alert('Funds withdrawn and database updated successfully');
    } catch (error) {
      console.error('Error withdrawing funds:', error);

      // Check if the error message indicates a specific issue
      if (error.code === -32603 && error.message.includes('execution reverted: Project funding not complete or project still active')) {
        alert('Error: Project funding not complete or project still active.');
      } else if (error.code === -32603 && error.message.includes('execution reverted: Milestone is not approved')) {
        alert('Error: The milestone is not approved.');
      } else {
        alert(`Error withdrawing funds: ${error.message}`);
      }
    }
  };

  return (
    <div className="container">
      <h2>Withdraw Funds</h2>
      <form onSubmit={withdrawFunds}>
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
        <button type="submit">Withdraw Funds</button>
      </form>
    </div>
  );
}

export default WithdrawFunds;
