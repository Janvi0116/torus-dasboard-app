// src/pages/LoginPage.tsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../redux/authSlice';
import './LoginPage.css';
import { Info } from '@phosphor-icons/react';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{email?: string, password?: string}>({});
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors: {email?: string, password?: string} = {};

    // Email validation
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }

    // Password validation
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        await dispatch(login({ email, password })).unwrap();
        navigate('/dashboard/users');
      } catch {
        setErrors({ 
          password: 'Invalid credentials. Use admin@example.com / password123' 
        });
      }
    }
  };

  return (
      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Dashboard Login</h2>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className={errors.email ? 'input-error' : ''}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className={errors.password ? 'input-error' : ''}
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
          <div className="demo-note">
            <p>Use these credentials for demo:</p>
            <p>Email: admin@example.com</p>
            <p>Password: password123</p>
            <small>Note: Auth token is maintained in Redux store and will be cleared on page reload</small>
            <div className="info-tooltip">
                <Info size={16} weight="light" />
                <span className="tooltip-text">
                    This is a demo project built while learning TypeScript. 
                    The UI is intentionally kept minimal but responsive.
                </span>
            </div>
          </div>
        </form>
      </div>
      
  );
};

export default LoginPage;