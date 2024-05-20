import React, { useState } from 'react';
import { ethers } from 'ethers';
import { provider, contract } from '../ethers';
import axios from 'axios';

function FundProject() {
  const [projectId, setProjectId] = useState('');
  const [amount, setAmount] = useState('');

  const fundProject = async (event) => {
    event.preventDefault();

    try {
      await provider.send("eth_requestAccounts", []);

      const amountInWei = ethers.utils.parseEther(amount);

      const tx = await contract.fundProject(parseInt(projectId, 10), { value: amountInWei });
      await tx.wait();

      // 更新后端数据库
      try {
        const response = await axios.post('http://localhost:5000/api/projects/fund', {
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
      alert('Error funding project');
    }
  };

  return (
    <div className="container">
      <h2>Fund Project</h2>
      <form onSubmit={fundProject}>
        <div>
          <label>Project ID: </label>
          <input
            value={projectId}
            onChange={e => setProjectId(e.target.value)}
          />
        </div>
        <div>
          <label>Amount (in Ether): </label>
          <input
            value={amount}
            onChange={e => setAmount(e.target.value)}
          />
        </div>
        <button type="submit">Fund Project</button>
      </form>
    </div>
  );
}

export default FundProject;
