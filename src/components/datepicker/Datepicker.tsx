"use client"
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { useState } from "react";

type datepickerQuickActions = "today" | "last3Days" | "thisWeek" | "thisMonth" | "thisYear";

export function Datepicker() {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState<Date | null>(null);
    const onChange = (dates: [start: Date, end: Date]) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };

    const handleQuickAction = (action: datepickerQuickActions) => {
        const today = new Date();

        switch (action) {
            case "today":
                setStartDate(today);
                setEndDate(today);
                break;
            case "last3Days":
                setStartDate(new Date(today.getTime() - (3 * 24 * 60 * 60 * 1000)));
                setEndDate(today);
                break;
            case "thisWeek":
                const startOfWeek = getStartOfWeek(today);
                setStartDate(startOfWeek);
                setEndDate(today);
                break;
            case "thisMonth":
                setStartDate(new Date(today.getFullYear(), today.getMonth(), 1));
                setEndDate(today);
                break;
            case "thisYear":
                setStartDate(new Date(today.getFullYear(), 0, 1));
                setEndDate(today);
                break;
            default:
                break;
        }
    };

    function getStartOfWeek(date: Date) {
        const day = date.getDay();
        const diff = date.getDate() - day + (day === 0 ? -6 : 0); // adjust for Sunday
        return new Date(date.setDate(diff));
    }


    return (
        <div className="flex border gap-x-2">
            <div className="flex flex-col justify-between p-2">
                <ul className="space-y-2">
                    <li className="hover:bg-slate-50 p-1"><button onClick={() => handleQuickAction('today')}>Today</button></li>
                    <li className="hover:bg-slate-50 p-1"><button onClick={() => handleQuickAction('last3Days')}>Last 3 Days</button></li>
                    <li className="hover:bg-slate-50 p-1"><button onClick={() => handleQuickAction('thisWeek')}>This Week</button></li>
                    <li className="hover:bg-slate-50 p-1"><button onClick={() => handleQuickAction('thisMonth')}>This Month</button></li>
                    <li className="hover:bg-slate-50 p-1"><button onClick={() => handleQuickAction('thisYear')}>This Year</button></li>
                </ul>
                <div className="flex gap-3">
                    <button className="bg-blue-50 rounded-lg px-2 py-1">Apply</button>
                    <button className="bg-blue-50 rounded-lg px-2 py-1">Reset</button>
                </div>
            </div>
            <DatePicker
                selected={startDate}
                onChange={onChange}
                startDate={startDate}
                endDate={endDate}
                selectsRange
                inline
            />
        </div>
    )
}

// TODO: implement 5 quick action for today, last three days, this week, this month, this year
// TODO: implement datepicker button and show toggler - use click outside listener
// TODO: implement query generator service which generate query params for browser and api request
// TODO: apply button will send start and end date to the parent component
// TODO: reset button will be reset the date to the default start and end date which is received form component input
