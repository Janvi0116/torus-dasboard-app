export interface DateRange {
    startDate: string;
    endDate: string;
}

export interface AnalyticsFilters {
    dateRange: DateRange;
    selectedRegions: string[];
}

export interface AnalyticsState {
    totalUsers: number;
    activeUsers: number;
    deletedUsers: number;
    registrationTrend: Array<{month: string, count: number}>;
    usersByRegion: Array<{region: string, count: number}>;
    loading: boolean;
    error: string | null;
    filters: AnalyticsFilters;
    availableRegions: string[];
}