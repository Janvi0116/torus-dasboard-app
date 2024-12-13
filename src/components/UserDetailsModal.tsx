import React from 'react';
import './UserDetailsModal.css';
import { User } from '../types/user';

interface UserDetailsModalProps {
  user: User | null;
  onClose: () => void;
}

const UserDetailsModal: React.FC<UserDetailsModalProps> = ({ user, onClose }) => {
  if (!user) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>User Details</h2>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
          <div className="detail-row">
            <span className="label">Name:</span>
            <span>{`${user.firstName} ${user.lastName}`}</span>
          </div>
          <div className="detail-row">
            <span className="label">Email:</span>
            <span>{user.email}</span>
          </div>
          <div className="detail-row">
            <span className="label">Status:</span>
            <span className={`status-badge ${user.status}`}>{user.status}</span>
          </div>
          <div className="detail-row">
            <span className="label">Region:</span>
            <span>{user.region}</span>
          </div>
          <div className="detail-row">
            <span className="label">Registration Date:</span>
            <span>{new Date(user.registrationDate).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsModal; 