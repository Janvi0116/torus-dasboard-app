export const MOCK_USERS = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      status: 'active',
      region: 'North',
      registrationDate: '2024-01-15T10:30:00Z'
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      status: 'inactive',
      region: 'South',
      registrationDate: '2024-02-20T14:45:00Z'
    },
    {
      id: 3,
      firstName: 'Mike',
      lastName: 'Johnson',
      email: 'mike.johnson@example.com',
      status: 'active',
      region: 'East',
      registrationDate: '2024-03-10T09:15:00Z'
    },
    {
      id: 4,
      firstName: 'Emily',
      lastName: 'Brown',
      email: 'emily.brown@example.com',
      status: 'active',
      region: 'West',
      registrationDate: '2024-04-05T16:20:00Z'
    },
    {
      id: 5,
      firstName: 'David',
      lastName: 'Wilson',
      email: 'david.wilson@example.com',
      status: 'inactive',
      region: 'Central',
      registrationDate: '2024-05-12T11:35:00Z'
    },
    {
      id: 6,
      firstName: 'Sarah',
      lastName: 'Lee',
      email: 'sarah.lee@example.com',
      status: 'active',
      region: 'North',
      registrationDate: '2024-06-25T13:40:00Z'
    }
  ];
  
  export const MOCK_ANALYTICS_DATA = {
    registrationTrend: [
      { month: 'Jan', count: 10 },
      { month: 'Feb', count: 15 },
      { month: 'Mar', count: 12 },
      { month: 'Apr', count: 20 },
      { month: 'May', count: 18 },
      { month: 'Jun', count: 25 }
    ],
    usersByRegion: [
      { region: 'North', count: 2 },
      { region: 'South', count: 1 },
      { region: 'East', count: 1 },
      { region: 'West', count: 1 },
      { region: 'Central', count: 1 }
    ]
  };