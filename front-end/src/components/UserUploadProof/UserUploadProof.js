// src/components/UserUploadProof/UserUploadProof.js
import React, { useState, useEffect } from 'react';
import { provider } from '../../ethers'; // 确保路径正确
import axios from 'axios';

function UserUploadProof({ projectId }) {
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

    try {
      const response = await axios.get(`http://localhost:3001/api/projects/${projectId}`);
      const project = response.data;

      if (project.creator.toLowerCase() !== currentUser) {
        alert('Only the project creator can approve milestones.');
        return;
      }

      const milestoneResponse = await axios.get(`http://localhost:3001/api/milestones`, {
        params: {
          projectId: projectId,
          milestoneId: milestoneId
        }
      });

      if (!milestoneResponse.data) {
        alert('Milestone not found');
        return;
      }

      await axios.post('http://localhost:3001/api/userApproveMilestones', formData);
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
          <label>Milestone ID: </label>
          <input
            type="number"
            value={milestoneId}
            onChange={e => setMilestoneId(e.target.value)}
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

export default UserUploadProof;
