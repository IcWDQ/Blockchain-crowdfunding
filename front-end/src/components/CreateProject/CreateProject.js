import React, { useState } from 'react';
import { ethers } from 'ethers';
import { provider, contract } from '../../ethers';
import axios from 'axios';
import '../../App.css';
import './CreateProject.css';

function CreateProject() {
  const [projectName, setProjectName] = useState('');
  const [projectType, setProjectType] = useState('Education'); // 设置默认值
  const [projectDescription, setProjectDescription] = useState('');
  const fundingGoal = '0.04'; // 0.04 Ether
  const milestoneGoals = ['0.02', '0.02']; // 两个里程碑，每个目标是 0.02 Ether
  const milestoneDeadlines = ['10', '20']; // 里程碑 1 截止日期为 10 天，里程碑 2 截止日期为 20 天
  const fundingTimeout = '604800'; // 7 天（以秒为单位，7*24*60*60 = 604800）

  const createProject = async (event) => {
    event.preventDefault();

    try {
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const fundingGoalInWei = ethers.utils.parseEther(fundingGoal);
      const milestoneGoalsInWei = milestoneGoals.map(goal => ethers.utils.parseEther(goal));
      const milestoneDeadlinesInSeconds = milestoneDeadlines.map(deadline => parseInt(deadline, 10) * 86400); // 转换天为秒

      const tx = await contract.connect(signer).createProject(
        fundingGoalInWei,
        milestoneGoalsInWei,
        milestoneDeadlinesInSeconds,
        parseInt(fundingTimeout, 10)
      );

      const receipt = await tx.wait();

      // 获取项目ID
      const event = receipt.events.find(event => event.event === 'ProjectCreated');
      if (!event) {
        throw new Error('ProjectCreated event not found');
      }

      const projectId = event.args.projectId;

      // 生成里程碑数据
      const milestones = milestoneDeadlines.map((_, index) => ({
        projectId: projectId.toNumber(),
        milestoneId: index,
        projectName,
      }));

      // 记录项目信息到数据库
      const projectData = {
        projectId: projectId.toNumber(),
        projectName,
        projectType,
        projectDescription,
        creator: tx.from,
        fundingGoal: ethers.utils.parseEther(fundingGoal).toString(),
        amountRaised: '0',
        status: 'Pending',
        contributors: [],
        createdAt: new Date(),
        projectDDL: new Date(Date.now() + parseInt(fundingTimeout, 10) * 1000),
        milestones, // 将里程碑数据添加到项目数据中
      };

      await axios.post('http://localhost:3001/api/projects', projectData);

      // 记录操作到数据库
      const activityData = {
        type: 'Create Project',
        projectId: projectId.toNumber(),
        user: tx.from,
        details: projectData
      };

      await axios.post('http://localhost:3001/api/activities', activityData);

      alert('Project created successfully');
    } catch (error) {
      console.error('Error creating project:', error);
      alert(`Error creating project: ${error.message}`);
    }
  };

  return (
    <div className="container">
      <h2>Create Project</h2>
      <form onSubmit={createProject}>
        <div>
          <label>Project Name: </label>
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Project Type: </label>
          <select value={projectType} onChange={(e) => setProjectType(e.target.value)} required>
            <option value="Education">Education</option>
            <option value="Finance">Finance</option>
            <option value="AI">AI</option>
            <option value="Medical">Medical</option>
            <option value="Others">Others</option>
          </select>
        </div>
        <div>
          <label>Project Description: </label>
          <textarea
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
            required
          />
        </div>
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
