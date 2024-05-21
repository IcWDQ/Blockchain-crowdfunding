// src/pages/PendingMilestonesPage.js

import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PendingMilestones from '../components/PendingMilestone';
import AuthContext from '../context/AuthContext';

function PendingMilestonesPage() {
  const { isAdmin, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isAdmin) {
      navigate('/login'); // 如果不是管理员且没有加载，重定向到登录页面
    }
  }, [isAdmin, loading, navigate]);

  if (loading) {
    return <div>Loading...</div>; // 如果正在加载，显示加载状态
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <h2 className="text-2xl font-bold mb-4 text-center">Pending Milestones</h2>
      <div className="flex justify-center w-full">
        <div className="w-full max-w-5xl bg-white p-4 rounded shadow">
          <PendingMilestones isAdmin={isAdmin} />
        </div>
      </div>
    </div>
  );
}

export default PendingMilestonesPage;
