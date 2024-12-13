import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import 'react-datepicker/dist/react-datepicker.css';
import './AnalyticsFilters.css';

interface AnalyticsFiltersProps {
    dateRange: {
        startDate: Date;
        endDate: Date;
    };
    selectedRegions: string[];
    availableRegions: string[];
    onApplyFilters: (dateRange: { startDate: Date; endDate: Date }, regions: string[]) => void;
}

const AnalyticsFilters: React.FC<AnalyticsFiltersProps> = ({
    dateRange,
    selectedRegions,
    availableRegions,
    onApplyFilters
}) => {
    const [localDateRange, setLocalDateRange] = useState(dateRange);
    const [localRegions, setLocalRegions] = useState(selectedRegions);

    const regionOptions = availableRegions.map(region => ({
        value: region,
        label: region
    }));

    const handleApplyFilters = () => {
        onApplyFilters(localDateRange, localRegions);
    };

    return (
        <div className="analytics-filters">
            <div className="filters-content">
                <div className="filter-section">
                    <h3>Date Range</h3>
                    <div className="date-pickers">
                        <DatePicker
                            selected={new Date(localDateRange.startDate)}
                            onChange={(date: Date | null) => setLocalDateRange({
                                ...localDateRange,
                                startDate: date || new Date()
                            })}
                            selectsStart
                            startDate={new Date(localDateRange.startDate)}
                            endDate={new Date(localDateRange.endDate)}
                            maxDate={new Date(localDateRange.endDate)}
                            className="date-picker"
                            placeholderText="Start Date"
                        />
                        <DatePicker
                            selected={new Date(localDateRange.endDate)}
                            onChange={(date: Date | null) => setLocalDateRange({
                                ...localDateRange,
                                endDate: date || new Date()
                            })}
                            selectsEnd
                            startDate={new Date(localDateRange.startDate)}
                            endDate={new Date(localDateRange.endDate)}
                            minDate={new Date(localDateRange.startDate)}
                            maxDate={new Date()}
                            className="date-picker"
                            placeholderText="End Date"
                        />
                    </div>
                </div>
                <div className="filter-section">
                    <h3>Regions</h3>
                    <Select
                        isMulti
                        options={regionOptions}
                        value={localRegions.map(region => ({ value: region, label: region }))}
                        onChange={(selected) => {
                            setLocalRegions(selected.map(option => option.value));
                        }}
                        className="region-select"
                        placeholder="Select regions..."
                    />
                </div>
            </div>
            <div className="filters-actions">
                <button 
                    className="apply-filters-button"
                    onClick={handleApplyFilters}
                >
                    Apply Filters
                </button>
            </div>
        </div>
    );
};

export default AnalyticsFilters; 