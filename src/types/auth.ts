import { User } from './user';

export interface AuthState {
    isAuthenticated: boolean;
    token: string | null;
    user: User | null;
    loading: boolean;
    error: string | null;
}

export interface LoginCredentials {
    email: string;
    password: string;
}