import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaCalendarAlt } from 'react-icons/fa';

interface DateRangePickerProps {
  dateRange: {
    startDate: Date;
    endDate: Date;
  };
  setDateRange: (dateRange: { startDate: Date; endDate: Date }) => void;
}

export const DateRangePicker = ({
  dateRange,
  setDateRange,
}: DateRangePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    if (start && end) {
      setDateRange({ startDate: start, endDate: end });
      setIsOpen(false);
    }
  };

  const presetRanges = [
    { label: 'Last 7 days', days: 7 },
    { label: 'Last 30 days', days: 30 },
    { label: 'Last 90 days', days: 90 },
  ];

  const applyPresetRange = (days: number) => {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - days);
    setDateRange({ startDate: start, endDate: end });
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-white px-4 py-2 rounded-md border border-gray-300 shadow-sm"
      >
        <FaCalendarAlt />
        <span>
          {dateRange.startDate.toLocaleDateString()} -{' '}
          {dateRange.endDate.toLocaleDateString()}
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 bg-white rounded-md shadow-lg z-10 p-4 border border-gray-200">
          <div className="flex space-x-4 mb-4">
            {presetRanges.map((range) => (
              <button
                key={range.label}
                onClick={() => applyPresetRange(range.days)}
                className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded"
              >
                {range.label}
              </button>
            ))}
          </div>
          <DatePicker
            selected={dateRange.startDate}
            onChange={handleDateChange}
            startDate={dateRange.startDate}
            endDate={dateRange.endDate}
            selectsRange
            inline
          />
        </div>
      )}
    </div>
  );
};
