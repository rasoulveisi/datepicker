"use client";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useRef, useState } from "react";
import { useOnClickOutside, useQueryString } from "@/hooks";

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

export const Datepicker = ({ defaultDate }: { defaultDate: { start: Date; end: Date } }) => {
  const [selectedDate, setSelectedDate] = useState<{ startDate: Date | null; endDate: Date | null }>({ startDate: null, endDate: null });
  const [queryParams, updateQueryString] = useQueryString();
  const [isOpen, setIsOpen] = useState(false);
  const datePickerContainerRef = useRef<HTMLDivElement | null>(null);

  const handleDateChange = (dates: [start: Date, end: Date]) => {
    const [start, end] = dates;
    setSelectedDate({ startDate: start, endDate: end });
  };

  const handleApplyButton = () => {
    const { startDate, endDate } = selectedDate;
    startDate && endDate && updateQueryString({ from: startDate.toISOString(), to: endDate.toISOString() });
    console.log("component:" + queryParams);
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

  useOnClickOutside(datePickerContainerRef, () => {
    const container = datePickerContainerRef.current;
    if (isOpen && container) {
      setIsOpen(false);
    }
  });

  const hanldeResetButton = () => {
    setSelectedDate({ startDate: defaultDate.start, endDate: defaultDate.end });
  };

  return (
    <section className="absolute z-50 bg-white">
      <button className="border px-2 py-1 rounded" onClick={toggleDatePicker}>
        {selectedDate.startDate && selectedDate.endDate ? `${selectedDate.startDate?.toLocaleDateString()} - ${selectedDate.endDate?.toLocaleDateString()}` : "Select Date"}
      </button>
      {isOpen && (
        <div className="flex border gap-x-2 min-h-72" ref={datePickerContainerRef}>
          <aside className="flex flex-col justify-between p-2">
            <ul className="space-y-2">
              {datepickerOptions.map((option) => (
                <li className="hover:bg-slate-50 p-1" key={option.id}>
                  <button onClick={() => handleQuickAction(option.id)}>{option.title}</button>
                </li>
              ))}
            </ul>
            <div className="flex gap-3">
              <button className="bg-blue-50 rounded-lg px-2 py-1" onClick={handleApplyButton}>
                Apply
              </button>
              <button className="bg-blue-50 rounded-lg px-2 py-1" onClick={hanldeResetButton}>
                Reset
              </button>
            </div>
          </aside>
          <DatePicker selected={selectedDate.startDate} onChange={handleDateChange} startDate={selectedDate.startDate} endDate={selectedDate.endDate} selectsRange inline />
        </div>
      )}
    </section>
  );
};

// TODO: add top bar with this sections: ON (single select), Before (Multiselect but start is filled), After (Multiselect but end is filled), Between (Multiselect)
