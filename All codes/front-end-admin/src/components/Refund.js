import React, { useState } from 'react';
import { provider, contract } from '../ethers';
import axios from 'axios';

function Refund() {
  const [projectId, setProjectId] = useState('');

  const refund = async (event) => {
    event.preventDefault();

    try {
      await provider.send("eth_requestAccounts", []);

      const tx = await contract.timeoutRefund(parseInt(projectId, 10));
      await tx.wait();

      // 如果智能合约调用成功，我们将发送请求更新数据库中的项目状态
      try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/projects/refund`, {
          projectId: parseInt(projectId, 10)
        });

        if (response.data) {
          alert('Refund processed successfully and project status updated');
        } else {
          alert('Failed to update project status in the database');
        }
      } catch (error) {
        console.error('Error updating project status in the database', error);
        alert('Error updating project status in the database');
      }
    } catch (error) {
      console.error('Error processing refund', error);
      alert('Error processing refund');
    }
  };

  return (
    <div className="container">
      <h2>Refund</h2>
      <form onSubmit={refund}>
        <div>
          <label>Project ID: </label>
          <input
            value={projectId}
            onChange={e => setProjectId(e.target.value)}
          />
        </div>
        <button type="submit">Refund</button>
      </form>
    </div>
  );
}

export default Refund;
