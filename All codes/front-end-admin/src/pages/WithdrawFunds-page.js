import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { ethers } from 'ethers';
import WithdrawFunds from '../components/WithdrawFunds';
import AuthContext from '../context/AuthContext';

function WithdrawFundsPage() {
  const { isAdmin, isAuthenticated, loading } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/projects`);
        // 过滤状态为 Funded 的项目
        const fundedProjects = response.data.filter(project => project.status === 'Funded');
        setProjects(fundedProjects);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <div>Please log in to view this page.</div>;
  }

  if (!isAdmin) {
    return <div>You do not have permission to view this page.</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h2 className="text-2xl font-bold mb-4">Withdraw Funds</h2>
      <div className="w-full max-w-4xl">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-2 px-4 text-left">Project ID</th>
              <th className="py-2 px-4 text-left">Amount Raised (ETH)</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.projectId} className="border-b">
                <td className="py-2 px-4">{project.projectId}</td>
                <td className="py-2 px-4">{project.amountRaised}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-8 w-full max-w-2xl">
        <WithdrawFunds />
      </div>
    </div>
  );
}

export default WithdrawFundsPage;
