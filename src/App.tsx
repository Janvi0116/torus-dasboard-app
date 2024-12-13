import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAppSelector } from './redux/hooks';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import { Provider } from 'react-redux';
import { store } from './redux/store';

const ProtectedRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={
          <Provider store={store}>
            <LoginPage />
          </Provider>
        } />
        <Route
          path="/dashboard/*"
          element={
            <Provider store={store}>
            <ProtectedRoute>
                <Dashboard />
            </ProtectedRoute>
            </Provider>
          }
        />
        <Route path="/" element={<Navigate to="/dashboard" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;