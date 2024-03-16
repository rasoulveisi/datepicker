"use client";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useRef, useState } from "react";

enum datepickerOptionsEnum {
  today,
  last3Days,
  thisWeek,
  thisMonth,
  thisYear,
}
const threeDaySecond = 3 * 24 * 60 * 60 * 1000;
const datepickerOptions = [
  { title: "Today", id: datepickerOptionsEnum.today },
  { title: "Last 3 Days", id: datepickerOptionsEnum.last3Days },
  { title: "This Week", id: datepickerOptionsEnum.thisWeek },
  { title: "This Month", id: datepickerOptionsEnum.thisMonth },
  { title: "This Year", id: datepickerOptionsEnum.thisYear },
];

export const Datepicker = () => {
  const [selectedDate, setSelectedDate] = useState<{ startDate: Date | null; endDate: Date | null }>({ startDate: null, endDate: null });
  const [isOpen, setIsOpen] = useState(false);
  const datePickerRef = useRef<HTMLDivElement | null>(null);

  const onDateChange = (dates: [start: Date, end: Date]) => {
    const [start, end] = dates;
    setSelectedDate({ startDate: start, endDate: end });
  };

  const handleQuickAction = (action: datepickerOptionsEnum) => {
    const today = new Date();

    switch (action) {
      case datepickerOptionsEnum.today:
        setSelectedDate({ startDate: today, endDate: today });
        break;
      case datepickerOptionsEnum.last3Days:
        setSelectedDate({ startDate: new Date(today.getTime() - threeDaySecond), endDate: today });
        break;
      case datepickerOptionsEnum.thisWeek:
        const startOfWeek = getStartOfWeek(today);
        setSelectedDate({ startDate: startOfWeek, endDate: today });
        break;
      case datepickerOptionsEnum.thisMonth:
        setSelectedDate({ startDate: new Date(today.getFullYear(), today.getMonth(), 1), endDate: today });
        break;
      case datepickerOptionsEnum.thisYear:
        setSelectedDate({ startDate: new Date(today.getFullYear(), 0, 1), endDate: today });
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

  const toggleDatePicker = () => setIsOpen(!isOpen);

  const handleClickOutside = (event: React.MouseEvent<HTMLDivElement | Document> | MouseEvent) => {
    if (isOpen && datePickerRef.current) {
      const clickedTarget = event.target as Node;
      if (!datePickerRef.current.contains(clickedTarget)) {
        setIsOpen(false);
      }
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <section className="absolute z-50">
      <button className="border px-2 py-1 rounded" onClick={toggleDatePicker}>
        {selectedDate.startDate && selectedDate.endDate ? `${selectedDate.startDate?.toLocaleDateString()} - ${selectedDate.endDate?.toLocaleDateString()}` : "Select Date"}
      </button>
      {isOpen && (
        <div className="flex border gap-x-2" ref={datePickerRef}>
          <div className="flex flex-col justify-between p-2">
            <ul className="space-y-2">
              {datepickerOptions.map((option) => (
                <li className="hover:bg-slate-50 p-1" key={option.id}>
                  <button onClick={() => handleQuickAction(option.id)}>{option.title}</button>
                </li>
              ))}
            </ul>
            <div className="flex gap-3">
              <button className="bg-blue-50 rounded-lg px-2 py-1">Apply</button>
              <button className="bg-blue-50 rounded-lg px-2 py-1">Reset</button>
            </div>
          </div>
          <DatePicker selected={selectedDate.startDate} onChange={onDateChange} startDate={selectedDate.startDate} endDate={selectedDate.endDate} selectsRange inline />
        </div>
      )}
    </section>
  );
};

// TODO: implement query generator service which generate query params for browser and api request
// TODO: apply button will send start and end date to the parent component
// TODO: reset button will be reset the date to the default start and end date which is received form component input
