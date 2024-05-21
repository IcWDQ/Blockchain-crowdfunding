import React, { useState, useEffect } from 'react';
import { provider } from '../ethers'; // Assumes you have a configured ethers provider
import axios from 'axios';
import '../App.css';

function UserApproveMilestone() {
  const [projectId, setProjectId] = useState('');
  const [milestoneId, setMilestoneId] = useState('');
  const [milestoneDescription, setMilestoneDescription] = useState('');
  const [file, setFile] = useState(null);
  const [currentUser, setCurrentUser] = useState('');

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const accounts = await provider.send("eth_requestAccounts", []);
      setCurrentUser(accounts[0].toLowerCase()); // 将地址转换为小写
    };
    fetchCurrentUser();
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate projectId and milestoneId
    if (!projectId || isNaN(Number(projectId))) {
      alert('Project ID must be a valid number');
      return;
    }
    if (!milestoneId || isNaN(Number(milestoneId))) {
      alert('Milestone ID must be a valid number');
      return;
    }

    const formData = new FormData();
    formData.append('projectId', projectId);
    formData.append('milestoneId', milestoneId);
    formData.append('milestoneDescription', milestoneDescription);
    formData.append('otherDocument', file);
    formData.append('currentUser', currentUser);

    // 打印请求数据
    console.log('Submitting form data:', {
      projectId,
      milestoneId,
      milestoneDescription,
      file,
      currentUser
    });

    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/projects/${projectId}`);
      const project = response.data;
      console.log('Fetched project:', project); // 打印查询到的项目

      if (project.creator.toLowerCase() !== currentUser) {
        alert('Only the project creator can approve milestones.');
        return;
      }

      // 检查里程碑是否存在
      const milestoneResponse = await axios.get(`${process.env.REACT_APP_API_URL}/milestones`, {
        params: {
          projectId: projectId,
          milestoneId: milestoneId
        }
      });

      console.log('Fetched milestone:', milestoneResponse.data); // 打印查询到的里程碑
      if (!milestoneResponse.data) {
        alert('Milestone not found');
        return;
      }

      // 打印发送的formData数据
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

      await axios.post('http://localhost:3001/api/userApproveMilestones', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('Milestone approved and uploaded successfully');
    } catch (error) {
      console.error('Error approving milestone:', error);
      if (error.response && error.response.data) {
        alert(`Error: ${error.response.data.error}`);
      } else {
        alert(`Error: ${error.message}`);
      }
    }
  };

  return (
    <div className="container">
      <h2>Upload Milestone Proof</h2>
      <form onSubmit={handleSubmit}>
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
            onChange={e=> setMilestoneId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Milestone Description: </label>
          <textarea
            style={{ width: '100%', height: '200px', fontSize: '16px' }}
            value={milestoneDescription}
            onChange={(e) => setMilestoneDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Upload Document: </label>
          <input
            type="file"
            onChange={handleFileChange}
            required
          />
        </div>
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}

export default UserApproveMilestone;
