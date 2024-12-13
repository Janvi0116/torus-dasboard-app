import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { 
  AnalyticsState,
  fetchAllAnalytics,
  setDateRange,
  setSelectedRegions
} from '../redux/analyticsSlice';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar,
  ResponsiveContainer
} from 'recharts';
import './AnalyticsDashboard.css';
import AnalyticsFilters from './AnalyticsFilters';

const AnalyticsDashboard: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dispatch = useDispatch<any>();
  const { 
    totalUsers, 
    activeUsers, 
    deletedUsers, 
    registrationTrend, 
    usersByRegion,
    loading,
    error,
    filters,
    availableRegions
  } = useSelector((state: RootState) => state.analytics) as AnalyticsState;

  useEffect(() => {
    dispatch(fetchAllAnalytics());
  }, [dispatch]);

  const activeInactiveData = useMemo(() => [
    { name: 'Active', value: activeUsers },
    { name: 'Inactive', value: totalUsers - activeUsers }
  ], [activeUsers, totalUsers]);


  const handleApplyFilters = (dateRange: { startDate: Date; endDate: Date }, regions: string[]) => {
    dispatch(setDateRange({
      startDate: dateRange.startDate.toISOString(),
      endDate: dateRange.endDate.toISOString()
    }));
    dispatch(setSelectedRegions(regions));
    dispatch(fetchAllAnalytics());
  };

  const chartDimensions = {
    height: 300,
    width: '100%'
  };

  if (loading) {
    return <div className="loading-spinner">Loading...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="analytics-dashboard">
      <h1>Analytics Dashboard</h1>
      
      <AnalyticsFilters
        dateRange={{
          startDate: new Date(filters.dateRange.startDate),
          endDate: new Date(filters.dateRange.endDate)
        }}
        selectedRegions={filters.selectedRegions}
        availableRegions={availableRegions}
        onApplyFilters={handleApplyFilters}
      />

      <div className="overview-cards">
        <div className="card">
          <h3>Total Users</h3>
          <p>{totalUsers}</p>
        </div>
        <div className="card">
          <h3>Active Users</h3>
          <p>{activeUsers}</p>
        </div>
        <div className="card">
          <h3>Deleted Users</h3>
          <p>{deletedUsers}</p>
        </div>
      </div>

      <div className="charts-container">
        <div className="chart-section">
          <h2>User Registration Trend</h2>
          <div className="chart-wrapper">
            <ResponsiveContainer width={chartDimensions.width} height={chartDimensions.height}>
              <LineChart data={registrationTrend} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="count" 
                  stroke="#8884d8"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-section">
          <h2>Active vs Inactive Users</h2>
          <div className="chart-wrapper">
            <ResponsiveContainer width={chartDimensions.width} height={chartDimensions.height}>
              <PieChart>
                <Pie
                  data={activeInactiveData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  <Cell fill="#4CAF50" />
                  <Cell fill="#FF5252" />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-section">
          <h2>Users by Region</h2>
          <div className="chart-wrapper">
            <ResponsiveContainer width={chartDimensions.width} height={chartDimensions.height}>
              <BarChart data={usersByRegion} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="region" />
                <YAxis />
                <Tooltip />
                <Bar 
                  dataKey="count" 
                  fill="#8884d8"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;