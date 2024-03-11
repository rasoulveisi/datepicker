"use client";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useRef, useState } from "react";

type datepickerQuickActions = "today" | "last3Days" | "thisWeek" | "thisMonth" | "thisYear";

export function Datepicker() {
  const [date, setDate] = useState<{ startDate: Date | null; endDate: Date | null }>({ startDate: null, endDate: null });
  const [isOpen, setIsOpen] = useState(false);
  const datePickerRef = useRef<HTMLDivElement | null>(null);

  const onDateChange = (dates: [start: Date, end: Date]) => {
    const [start, end] = dates;
    setDate({ startDate: start, endDate: end });
  };

  const toggleDatePicker = () => setIsOpen(!isOpen);

  const handleClickOutside = (event: React.MouseEvent<HTMLDivElement | Document> | MouseEvent) => {
    if (isOpen && datePickerRef.current) {
      const clickedTarget = event.target as Node;
      if (!datePickerRef.current.contains(clickedTarget)) {
        setIsOpen(false);
      }
    }
  };

  const handleQuickAction = (action: datepickerQuickActions) => {
    const today = new Date();

    switch (action) {
      case "today":
        setDate({ startDate: today, endDate: today });
        break;
      case "last3Days":
        setDate({ startDate: new Date(today.getTime() - 3 * 24 * 60 * 60 * 1000), endDate: today });
        break;
      case "thisWeek":
        const startOfWeek = getStartOfWeek(today);
        setDate({ startDate: startOfWeek, endDate: today });
        break;
      case "thisMonth":
        setDate({ startDate: new Date(today.getFullYear(), today.getMonth(), 1), endDate: today });
        break;
      case "thisYear":
        setDate({ startDate: new Date(today.getFullYear(), 0, 1), endDate: today });
        break;
      default:
        break;
    }
  };

  function getStartOfWeek(date: Date) {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 0);
    return new Date(date.setDate(diff));
  }

  // Add event listeners on component mount and remove on unmount
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative space-y-1">
      <button className="border px-2 py-1 rounded" onClick={toggleDatePicker}>
        {date.startDate && date.endDate ? `${date.startDate?.toLocaleDateString()} - ${date.endDate?.toLocaleDateString()}` : "Select Date"}
      </button>
      {isOpen && (
        <section className="absolute z-50" ref={datePickerRef}>
          <div className="flex border gap-x-2">
            <div className="flex flex-col justify-between p-2">
              <ul className="space-y-2">
                <li className="hover:bg-slate-50 p-1">
                  <button onClick={() => handleQuickAction("today")}>Today</button>
                </li>
                <li className="hover:bg-slate-50 p-1">
                  <button onClick={() => handleQuickAction("last3Days")}>Last 3 Days</button>
                </li>
                <li className="hover:bg-slate-50 p-1">
                  <button onClick={() => handleQuickAction("thisWeek")}>This Week</button>
                </li>
                <li className="hover:bg-slate-50 p-1">
                  <button onClick={() => handleQuickAction("thisMonth")}>This Month</button>
                </li>
                <li className="hover:bg-slate-50 p-1">
                  <button onClick={() => handleQuickAction("thisYear")}>This Year</button>
                </li>
              </ul>
              <div className="flex gap-3">
                <button className="bg-blue-50 rounded-lg px-2 py-1">Apply</button>
                <button className="bg-blue-50 rounded-lg px-2 py-1">Reset</button>
              </div>
            </div>
            <DatePicker selected={date.startDate} onChange={onDateChange} startDate={date.startDate} endDate={date.endDate} selectsRange inline />
          </div>
        </section>
      )}
    </div>
  );
}

// TODO: implement query generator service which generate query params for browser and api request
// TODO: apply button will send start and end date to the parent component
// TODO: reset button will be reset the date to the default start and end date which is received form component input
