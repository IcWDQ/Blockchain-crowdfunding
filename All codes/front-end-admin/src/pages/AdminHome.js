import React, { useContext, useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import AuthContext from '../context/AuthContext';

function AdminHome() {
  const { isAdmin, isAuthenticated, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, loading, navigate]);

  useEffect(() => {
    if (!loading && isAuthenticated && !isAdmin) {
      navigate('/home');
    }
  }, [isAdmin, isAuthenticated, loading, navigate]);

  if (loading) {
    return <div>Loading...</div>; // 或者显示一个加载动画
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-black text-white flex items-center p-4">
        <img src={logo} alt="InnoFund Logo" className="h-10 mr-4" />
        <h1 className="text-xl font-bold">InnoFund</h1>
      </header>

      {/* Navigation */}
      <nav className="bg-orange-500 text-white flex justify-center space-x-4 py-4">
        <Link to="/admin/all-projects" className="hover:text-gray-200">All Projects</Link>
        <Link to="/admin/all-milestones" className="hover:text-gray-200">All Milestones</Link>
        <Link to="/admin/pending-projects" className="hover:text-gray-200">Pending Projects</Link>
        <Link to="/admin/pending-milestones" className="hover:text-gray-200">Pending Milestones</Link>
        <Link to="/admin/withdraw-funds" className="hover:text-gray-200">Withdraw Funds</Link>
        <Link to="/admin/cancel-projects" className="hover:text-gray-200">Cancel Projects</Link>
      </nav>

      {/* Main Content */}
      <main className="flex-grow p-4 flex flex-col items-center justify-center">
        <h2 className="text-4xl font-bold mb-8">Welcome, Master!</h2>
        <Outlet />
      </main>
    </div>
  );
}

export default AdminHome;
