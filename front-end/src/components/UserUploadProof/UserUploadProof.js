import React, { useState, useEffect } from 'react';
import { provider } from '../../ethers'; // Assumes you have a configured ethers provider
import axios from 'axios';
import './UserUploadProof.css';

function UserUploadProof({ projectId }) {
  const [milestoneDescription, setMilestoneDescription] = useState('');
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [currentUser, setCurrentUser] = useState('');

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const accounts = await provider.send("eth_requestAccounts", []);
      setCurrentUser(accounts[0].toLowerCase());
    };
    fetchCurrentUser();
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('projectId', projectId);
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
          <label className="file-input-label" htmlFor="file-input">
            Choose File
            {fileName && <span className="file-name">{fileName}</span>}
          </label>
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
