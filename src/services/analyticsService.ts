import { MOCK_USERS } from './mockData';
import { DateRange } from '../types/analytics';

type MetricsState = {
  totalUsers : number,
  activeUsers : number,
  deletedUsers : number,
}

export const analyticsService = {
  getOverviewMetrics: (dateRange?: DateRange, selectedRegions?: string[]): Promise<MetricsState> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let filteredUsers = [...MOCK_USERS];

        // Only apply date filter if dates are provided
        if (dateRange?.startDate && dateRange?.endDate) {
          const startDate = new Date(dateRange.startDate);
          const endDate = new Date(dateRange.endDate);
          
          filteredUsers = filteredUsers.filter(user => {
            const userDate = new Date(user.registrationDate);
            return userDate >= startDate && userDate <= endDate;
          });
        }

        // Only apply region filter if regions are selected
        if (selectedRegions && selectedRegions.length > 0) {
          filteredUsers = filteredUsers.filter(user => 
            selectedRegions.includes(user.region)
          );
        }

        resolve({
          totalUsers: filteredUsers.length,
          activeUsers: filteredUsers.filter(user => user.status === 'active').length,
          deletedUsers: 0
        });
      }, 300);
    });
  },

  getRegistrationTrend: (dateRange?: DateRange, selectedRegions?: string[]): Promise<any> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let filteredUsers = [...MOCK_USERS];

        // Only apply filters if provided
        if (dateRange?.startDate && dateRange?.endDate) {
          const startDate = new Date(dateRange.startDate);
          const endDate = new Date(dateRange.endDate);
          
          filteredUsers = filteredUsers.filter(user => {
            const userDate = new Date(user.registrationDate);
            return userDate >= startDate && userDate <= endDate;
          });
        }

        if (selectedRegions && selectedRegions.length > 0) {
          filteredUsers = filteredUsers.filter(user => 
            selectedRegions.includes(user.region)
          );
        }

        // Generate monthly data
        const monthlyData = new Map();
        // These are kept hardcoded right now
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
        
        months.forEach(month => {
          monthlyData.set(month, 0);
        });

        filteredUsers.forEach(user => {
          const month = new Date(user.registrationDate)
            .toLocaleString('en-US', { month: 'short' });
          if (monthlyData.has(month)) {
            monthlyData.set(month, monthlyData.get(month) + 1);
          }
        });

        const trendData = Array.from(monthlyData.entries()).map(([month, count]) => ({
          month,
          count
        }));

        resolve(trendData);
      }, 300);
    });
  },

  getUsersByRegion: (dateRange?: DateRange, selectedRegions?: string[]): Promise<any> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let filteredUsers = [...MOCK_USERS];

        // Apply date filter if provided
        if (dateRange?.startDate && dateRange?.endDate) {
          const startDate = new Date(dateRange.startDate);
          const endDate = new Date(dateRange.endDate);
          
          filteredUsers = filteredUsers.filter(user => {
            const userDate = new Date(user.registrationDate);
            return userDate >= startDate && userDate <= endDate;
          });
        }

        // Count users by region
        const regionCounts = new Map();
        filteredUsers.forEach(user => {
          const count = regionCounts.get(user.region) || 0;
          regionCounts.set(user.region, count + 1);
        });

        // Convert to array format
        const regionData = Array.from(regionCounts.entries()).map(([region, count]) => ({
          region,
          count
        }));

        // If regions are selected, only return those regions
        const finalData = selectedRegions && selectedRegions.length > 0
          ? regionData.filter(item => selectedRegions.includes(item.region))
          : regionData;

        resolve(finalData);
      }, 300);
    });
  }
};