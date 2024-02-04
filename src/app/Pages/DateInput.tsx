// DateInput.tsx
import React from "react";

interface DateInputProps {
    value: string;
    onDateChange: (date: string) => void;
}

const DateInput: React.FC<DateInputProps> = ({ value, onDateChange }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Update the parent component's state
        onDateChange(e.target.value);
    };

    return (
        <input
            type="date"
            id="card-date"
            className="w-[60%] border border-gray-400 rounded-md"
            value={value}
            onChange={handleChange}
        />
    );
};

export default DateInput;



