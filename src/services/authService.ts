import { LoginCredentials } from '../types/auth';

// Hardcoded credentials for mock login
const MOCK_CREDENTIALS = {
  email: 'admin@example.com',
  password: 'password123'
};

export const authService = {
  login: (credentials: LoginCredentials): Promise<any> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (
          credentials.email === MOCK_CREDENTIALS.email && 
          credentials.password === MOCK_CREDENTIALS.password
        ) {
          resolve({
            user: {
              id: 999,
              firstName: 'Admin',
              lastName: 'User',
              email: credentials.email
            },
            token: 'mock_jwt_token_' + Date.now()
          });
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1000); // Simulate network delay
    });
  }
};