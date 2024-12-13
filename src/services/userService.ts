// src/services/userService.ts
import { MOCK_USERS } from './mockData';

export const userService = {
  getUsers: (page: number = 1, pageSize: number = 5, searchTerm?: string): Promise<any> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const filteredUsers = searchTerm 
          ? MOCK_USERS.filter(user => 
              user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
              user.email.toLowerCase().includes(searchTerm.toLowerCase())
            )
          : MOCK_USERS;

        const startIndex = (page - 1) * pageSize;
        const paginatedUsers = filteredUsers.slice(startIndex, startIndex + pageSize);

        resolve({
          users: paginatedUsers,
          total: filteredUsers.length,
          page,
          pageSize
        });
      }, 500);
    });
  },

  getUserById: (id: number): Promise<any> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = MOCK_USERS.find(u => u.id === id);
        if (user) {
          resolve(user);
        } else {
          reject(new Error('User not found'));
        }
      }, 300);
    });
  },

  deleteUser: (id: number): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = MOCK_USERS.findIndex(u => u.id === id);
        if (index !== -1) {
          MOCK_USERS.splice(index, 1);
          resolve();
        } else {
          reject(new Error('User not found'));
        }
      }, 300);
    });
  }
};