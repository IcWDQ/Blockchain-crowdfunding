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
      const signer = provider.getSigner();
      const userAddress = await signer.getAddress(); // 获取当前用户地址

      const amountInWei = ethers.utils.parseEther(amount);

      const tx = await contract.fundProject(parseInt(projectId, 10), { value: amountInWei });
      await tx.wait();

      // 更新后端数据库
      try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/projects/fund`, {
          projectId: parseInt(projectId, 10),
          amount: parseFloat(amount), // 以数值形式发送，以 eth 为单位
          contributor: userAddress // 发送捐款者地址
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
            type="number" // 确保输入类型为 number
            step="0.01" // 可选，指定最小增量
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
