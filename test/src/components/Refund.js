

import React, { useState } from 'react';
import { provider, contract } from '../ethers';

function Refund() {
  const [projectId, setProjectId] = useState('');

  const refund = async (event) => {
    event.preventDefault();

    try {
      await provider.send("eth_requestAccounts", []);

      const tx = await contract.timeoutRefund(parseInt(projectId, 10));
      await tx.wait();

      alert('Refund processed successfully');
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
