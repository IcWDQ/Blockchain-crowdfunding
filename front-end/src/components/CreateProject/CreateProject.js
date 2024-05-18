// src/components/CreateProject/CreateProject.js
import React from 'react';
import { ethers } from 'ethers';
import { provider, contract } from '../../ethers';
import { useNavigate } from 'react-router-dom';
import './CreateProject.css';

function CreateProject() {
  const fundingGoal = '0.04'; // 0.04 Ether
  const milestoneGoals = ['0.02', '0.02']; // 两个里程碑，每个目标是 0.02 Ether
  const milestoneDeadlines = ['10', '20']; // 里程碑 1 截止日期为 10 天，里程碑 2 截止日期为 20 天
  const fundingTimeout = '604800'; // 7 天

  const navigate = useNavigate(); // 初始化 useNavigate 钩子

  const createProject = async (event) => {
    event.preventDefault();

    try {
      await provider.send("eth_requestAccounts", []);
      const fundingGoalInWei = ethers.utils.parseEther(fundingGoal);
      const milestoneGoalsInWei = milestoneGoals.map(goal => ethers.utils.parseEther(goal));
      const milestoneDeadlinesInSeconds = milestoneDeadlines.map(deadline => parseInt(deadline, 10) * 86400); // 转换天为秒

      const tx = await contract.createProject(
        fundingGoalInWei,
        milestoneGoalsInWei,
        milestoneDeadlinesInSeconds,
        parseInt(fundingTimeout, 10)
      );

      await tx.wait();

      alert('Project created successfully');
    } catch (error) {
      console.error('Error creating project', error);
      alert('Error creating project');
    }
  };

  return (
    <div className="create-project-container">
      <h2>Create Project</h2>
      <form onSubmit={createProject}>
        <div>
          <label>Funding Goal (in Ether): </label>
          <input
            value={fundingGoal}
            readOnly
          />
        </div>
        <div>
          <label>Milestone Goals (in Ether): </label>
          <input
            value={milestoneGoals.join(', ')}
            readOnly
          />
        </div>
        <div>
          <label>Milestone Deadlines (in days): </label>
          <input
            value={milestoneDeadlines.join(', ')}
            readOnly
          />
        </div>
        <div>
          <label>Funding Timeout (in seconds): </label>
          <input
            value={fundingTimeout}
            readOnly
          />
        </div>
        <button type="submit">Create Project</button>
      </form>
    </div>
  );
}

export default CreateProject;
