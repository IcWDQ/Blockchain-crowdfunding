// src/components/UserUploadProof/UserUploadProof.js
import React, { useState, useEffect } from 'react';
import { provider, ethers } from '../../ethers';
import axios from 'axios';
import './UserUploadProof.css';

function UserUploadProof({ projectId }) {
  const [milestoneDescription, setMilestoneDescription] = useState('');
  const [file, setFile] = useState(null);
  const [currentUser, setCurrentUser] = useState('');
  const [activeMilestone, setActiveMilestone] = useState(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const accounts = await provider.send("eth_requestAccounts", []);
      setCurrentUser(accounts[0].toLowerCase());
    };
    fetchCurrentUser();
    fetchActiveMilestone(projectId);
  }, [projectId]);

  const fetchActiveMilestone = async (projectId) => {
    try {
      const response = await axios.get(`/api/projects/${projectId}`);
      const milestones = response.data.milestones;
      const pendingMilestone = milestones.find(milestone => milestone.milestonestatus === 'pending');
      setActiveMilestone(pendingMilestone);
    } catch (error) {
      console.error('Error fetching active milestone:', error);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!activeMilestone) {
      alert('No pending milestone found');
      return;
    }

    const formData = new FormData();
    formData.append('projectId', projectId);
    formData.append('milestoneId', activeMilestone.milestoneId);
    formData.append('milestoneDescription', milestoneDescription);
    formData.append('otherDocument', file);
    formData.append('currentUser', currentUser);

    try {
      await axios.post('http://localhost:3001/api/userApproveMilestones', formData);
      alert('Milestone proof uploaded successfully');
    } catch (error) {
      console.error('Error uploading milestone proof:', error);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="upload-proof-container">
      <h2>Upload Milestone Proof</h2>
      {activeMilestone && <p>Uploading proof for Milestone ID: {activeMilestone.milestoneId}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Milestone Description: </label>
          <textarea
            value={milestoneDescription}
            onChange={(e) => setMilestoneDescription(e.target.value)}
            required
          />
        </div>
        <div className="file-input-container">
          <label className="file-input-label" htmlFor="file-input">Choose File</label>
          <input
            id="file-input"
            type="file"
            onChange={handleFileChange}
            required
            className="file-input"
          />
        </div>
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}

export default UserUploadProof;
