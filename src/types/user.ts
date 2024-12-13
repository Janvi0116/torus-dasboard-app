export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    status: 'active' | 'inactive';
    region: string;
    registrationDate: string;
}