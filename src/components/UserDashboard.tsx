// src/pages/UserDashboard.tsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { fetchUsers, deleteUser, UserState } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import UserDetailsModal from './UserDetailsModal';
import './UserDashboard.css';
import { User } from '../types/user';

const UserDashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  const { users, total, page, pageSize, loading, error }  = useSelector(
    (state: RootState) => state.users
  ) as UserState;

  useEffect(() => {
    dispatch(fetchUsers({ page: 1, searchTerm }));
  }, [dispatch, searchTerm]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handlePageChange = (newPage: number) => {
    dispatch(fetchUsers({ page: newPage, searchTerm }));
  };

  const handleDeleteUser = async (userId: number) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await dispatch(deleteUser(userId)).unwrap();
        
        // If this was the last user on the current page and not the first page
        if (users.length === 1 && page > 1) {
          // Fetch the previous page
          dispatch(fetchUsers({ 
            page: page - 1, 
            pageSize, 
            searchTerm 
          }));
        } else {
          // Refresh the current page
          dispatch(fetchUsers({ 
            page, 
            pageSize, 
            searchTerm 
          }));
        }
      } catch (error) {
        console.error('Failed to delete user:', error);
      }
    }
  };

  const handleViewDetails = async (userId: number) => {
    const user = users.find(u => u.id === userId);
    if (user) {
      setSelectedUser(user);
    }
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
  };

  const navigateToAnalytics = () => {
    navigate('/dashboard/analytics');
  };

  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="user-dashboard">
      <div className="dashboard-header">
        <h1>User Management</h1>
        <button 
          onClick={navigateToAnalytics}
          className="analytics-button"
        >
          Go to Analytics Dashboard
        </button>
      </div>
      
      <div className="search-container">
        <input
          type="text"
          placeholder="Search users by name or email"
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
      </div>

      {loading && <div className="loading">Loading...</div>}
      {error && <div className="error">{error}</div>}

      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Region</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user:User) => (
            <tr key={user.id}>
              <td>{`${user.firstName} ${user.lastName}`}</td>
              <td>{user.email}</td>
              <td>{user.region}</td>
              <td>{user.status}</td>
              <td>
                <button 
                  onClick={() => handleViewDetails(user.id)}
                  className="action-button view-button"
                >
                  View
                </button>
                <button 
                  onClick={() => handleDeleteUser(user.id)}
                  className="action-button delete-button"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        {page > 1 && (
          <button 
            onClick={() => handlePageChange(page - 1)}
            className="page-button"
          >
            Previous
          </button>
        )}
        <span>Page {page} of {totalPages}</span>
        {page < totalPages && (
          <button 
            onClick={() => handlePageChange(page + 1)}
            className="page-button"
          >
            Next
          </button>
        )}
      </div>

      {selectedUser && (
        <UserDetailsModal 
          user={selectedUser} 
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default UserDashboard;