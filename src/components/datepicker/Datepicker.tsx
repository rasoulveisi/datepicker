"use client"
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';

import { useState } from "react";


export function Datepicker() {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState<Date | null>(null);
    const onChange = (dates: [start: Date, end: Date]) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };

    return (
        <DatePicker
            selected={startDate}
            onChange={onChange}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            inline
        />)
}
