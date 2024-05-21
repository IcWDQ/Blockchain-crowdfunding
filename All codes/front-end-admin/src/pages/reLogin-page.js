import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import contractABI from '../abi/contractABI.json';
import loginBackground from '../assets/login.png';
import logo from '../assets/logo.png';

function Login() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!window.ethereum) {
      setErrorMessage('MetaMask is not installed');
    }
  }, []);

  const handleLogin = async () => {
    try {
      if (!window.ethereum) {
        setErrorMessage('MetaMask is not installed');
        return;
      }

      // 强制 MetaMask 请求授权
      await window.ethereum.request({ method: 'wallet_requestPermissions', params: [{ eth_accounts: {} }] });

      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const address = await signer.getAddress();

      const contractAddress = '0x5F71A58F00d8530C4df07c04Ac0836F32baD026c'; // 替换为你的合约地址
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      const owner = await contract.owner();
      if (address.toLowerCase() === owner.toLowerCase()) {
        navigate('/admin'); // 如果是管理员，导航到 AdminHome 页面
      } else {
        navigate('/home'); // 否则导航到 Home 页面
      }
    } catch (error) {
      setErrorMessage('Login failed: ' + error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${loginBackground})` }}>
      <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
        <img src={logo} alt="InnoFund Logo" className="mb-4 w-32 mx-auto" />
        <h1 className="text-2xl font-bold mb-4 text-center">Please re-login, cause there is something wrong with your account</h1>
        <button
          onClick={handleLogin}
          className="w-full bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600"
        >
          Login with MetaMask
        </button>
        {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
      </div>
    </div>
  );
}

export default Login;
