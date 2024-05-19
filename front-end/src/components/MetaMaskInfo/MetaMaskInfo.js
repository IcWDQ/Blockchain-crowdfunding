import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import './MetaMaskInfo.css';

const MetaMaskInfo = () => {
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState('');

  useEffect(() => {
    const getAddressAndBalance = async () => {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const userAddress = await signer.getAddress();
        setAddress(userAddress);
        
        const userBalance = await signer.getBalance();
        setBalance((parseFloat(ethers.utils.formatEther(userBalance))).toFixed(4));
      } catch (error) {
        console.error('Error getting user address or balance:', error);
      }
    };

    getAddressAndBalance();
  }, []);

  const formatAddress = (addr) => {
    return `${addr.slice(0, 5)}...${addr.slice(-5)}`;
  };

  return (
    <div className="metamask-info">
      <div className="info-item">
        <span className="label">Address:</span>
        <span className="value">{formatAddress(address)}</span>
      </div>
      <div className="info-item">
        <span className="label">ETH:</span>
        <span className="value">{balance}</span>
      </div>
    </div>
  );
};

export default MetaMaskInfo;
