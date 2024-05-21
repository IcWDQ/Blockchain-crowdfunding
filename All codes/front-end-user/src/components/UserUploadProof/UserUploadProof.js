import React, { useState, useEffect } from 'react';
import { provider } from '../../ethers';
import axios from 'axios';
import './UserUploadProof.css';

function UserUploadProof({ projectId }) {
  const [milestoneDescription, setMilestoneDescription] = useState('');
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [currentUser, setCurrentUser] = useState('');
  const [milestoneId, setMilestoneId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const accounts = await provider.send("eth_requestAccounts", []);
      setCurrentUser(accounts[0].toLowerCase());
    };
    fetchCurrentUser();
  }, []);

  useEffect(() => {
    const fetchPendingMilestoneId = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/milestones?projectId=${projectId}&status=pending`);
        if (response.data.length > 0) {
          const pendingMilestones = response.data;
          const minMilestoneId = Math.min(...pendingMilestones.map(m => m.milestoneId));
          setMilestoneId(minMilestoneId);
        } else {
          alert('No pending milestones found for this project.');
        }
      } catch (error) {
        console.error('Error fetching pending milestones:', error);
        setError('Error fetching pending milestones.');
      }
    };

    fetchPendingMilestoneId();
  }, [projectId]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const allowedExtensions = ['jpeg', 'jpg', 'png', 'gif'];
    const fileExtension = selectedFile.name.split('.').pop().toLowerCase();
    const maxSizeInMB = 5;
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024;

    if (!allowedExtensions.includes(fileExtension)) {
      setError('Only jpeg, jpg, png, gif files are allowed');
      setFile(null);
      setFileName('');
    } else if (selectedFile.size > maxSizeInBytes) {
      setError(`File size should not exceed ${maxSizeInMB} MB`);
      setFile(null);
      setFileName('');
    } else {
      setError('');
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      setError('Please select a file.');
      return;
    }

    if (milestoneId === null) {
      setError('No pending milestone ID found.');
      return;
    }

    try {
      setIsSubmitting(true);
      await axios.post(`${process.env.REACT_APP_API_URL}/milestones/upload-status`, { projectId, isSubmitting: true });

      const formData = new FormData();
      formData.append('projectId', projectId);
      formData.append('milestoneDescription', milestoneDescription);
      formData.append('milestoneId', milestoneId);
      formData.append('otherDocument', file);
      formData.append('currentUser', currentUser);

      const response = await axios.post(`${process.env.REACT_APP_API_URL}/userApproveMilestones`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Milestone proof uploaded successfully');
      setMilestoneDescription('');
      setFile(null);
      setFileName('');
      setError('');
    } catch (error) {
      console.error('Error uploading milestone proof:', error);
      setError(`Error uploading milestone proof: ${error.message}`);
    } finally {
      setIsSubmitting(false);
      await axios.post(`${process.env.REACT_APP_API_URL}/milestones/upload-status`, { projectId, isSubmitting: false });
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
            disabled={isSubmitting}
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
            disabled={isSubmitting}
            className="file-input"
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Upload'}
        </button>
      </form>
    </div>
  );
}

export default UserUploadProof;
