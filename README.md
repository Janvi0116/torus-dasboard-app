# Dynamic Analytics Dashboard

A responsive analytics dashboard built with React, TypeScript, and Redux, featuring user management and data visualization.

## Tech Stack

- Node.js (v20.x)
- React 18
- TypeScript
- Redux Toolkit
- React Router v6
- Recharts for data visualization
- React-Select for enhanced dropdowns
- React-Datepicker for date selection
- React-Icons for UI icons

## Prerequisites

- Node.js 20.x or higher
- npm or yarn package manager

## Installation

1. Clone the repository: git clone <repository-url>

2. Install dependencies via npm install

3. Start the development server via npm run dev

The application will be available at `http://localhost:5173`


## Key Implementation Details

1. **State Management**
   - Redux Toolkit for centralized state
   - Async thunks for API calls
   - Type-safe actions and reducers

2. **Authentication**
   - Token-based auth simulation
   - Redux store for auth state
   - Protected route implementation

3. **Data Visualization**
   - Recharts for responsive charts
   - Custom styling and configurations
   - Interactive tooltips and legends

4. **Filtering System**
   - Combined date and region filters
   - Debounced filter application
   - Maintained filter state in Redux

## Assumptions Made

1. **Authentication**
   - Mock authentication using hardcoded credentials
   - Token stored in Redux store (clears on page reload)
   - Basic validation implementation

2. **Data Management**
   - Mock data for demonstration
   - Simulated API calls with timeouts
   - Predefined regions and user statuses

3. **Performance**
   - Client-side filtering
   - Static data updates
   - No real-time data sync



## Known Limitations

1. Authentication token is stored in Redux store and clears on page reload
2. Some TypeScript 'any' types exist (part of learning process)
3. Limited error handling
4. Mock data resets on page refresh

## Future Improvements

1. Implement persistent authentication
2. Add comprehensive error handling
3. Integrate real backend API
4. Add unit and integration tests
5. Improve TypeScript type coverage
6. Add data export functionality
7. Implement real-time data updates