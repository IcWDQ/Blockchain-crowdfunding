import React, { createContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import contractABI from '../abi/contractABI.json';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        
        const contractAddress = '0x5F71A58F00d8530C4df07c04Ac0836F32baD026c';
        const contract = new ethers.Contract(contractAddress, contractABI, signer);
        
        const owner = await contract.owner();
        if (address.toLowerCase() === owner.toLowerCase()) {
          setIsAdmin(true);
        }
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Failed to verify admin status', error);
      } finally {
        setLoading(false);
      }
    };

    checkAdminStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ isAdmin, isAuthenticated, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
