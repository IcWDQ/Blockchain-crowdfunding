import React, { useState } from 'react';
import { ethers } from 'ethers';
import { provider, contract } from '../../ethers';
import axios from 'axios';
import './FundProject.css';

function FundProject({ projectId }) {
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fundProject = async (event) => {
    event.preventDefault();

    if (parseFloat(amount) <= 0 || isNaN(amount)) {
      setError('Amount must be a positive number');
      return;
    }

    try {
      setIsSubmitting(true);
      await provider.send("eth_requestAccounts", []);

      const amountInWei = ethers.utils.parseEther(amount);

      const tx = await contract.fundProject(parseInt(projectId, 10), { value: amountInWei });
      await tx.wait();

      // 更新后端数据库
      try {
        const response = await axios.post('http://localhost:3001/api/projects/fund', {
          projectId: parseInt(projectId, 10),
          amount: parseFloat(amount) // 以数值形式发送，以 eth 为单位
        });

        if (response.data) {
          alert('Project funded successfully and database updated');
        } else {
          alert('Failed to update database');
        }
      } catch (error) {
        console.error('Error updating database', error);
        alert('Error updating database');
      }
    } catch (error) {
      console.error('Error funding project', error);
      setError('Error funding project');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (value === '' || (!isNaN(value) && parseFloat(value) >= 0)) {
      setAmount(value);
      setError('');
    } else {
      setError('Please enter a valid amount');
    }
  };

  return (
    <div className="fund-project-container">
      <h2>Fund Project</h2>
      <form onSubmit={fundProject}>
        <div className="input-group">
          <label>Amount (in Ether): </label>
          <input
            type="text"
            value={amount}
            onChange={handleAmountChange}
            className="fund-input"
            disabled={isSubmitting} // 在提交期间禁用输入框
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit" className="fund-button" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Fund Project'}
        </button>
      </form>
    </div>
  );
}

export default FundProject;
