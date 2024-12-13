import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import UserDashboard from './UserDashboard';
import AnalyticsDashboard from './AnalyticsDashboard';

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard-container">
      <Routes>
        <Route path="users" element={<UserDashboard />} />
        <Route path="analytics" element={<AnalyticsDashboard />} />
        <Route path="/" element={<Navigate to="analytics" />} />
      </Routes>
    </div>
  );
};

export default Dashboard; 