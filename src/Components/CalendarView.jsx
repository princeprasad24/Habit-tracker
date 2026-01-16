import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function CalendarView({ selectedDate, setSelectedDate }) {
  return (
    <div className="calendar-container p-2 bg-transparent text-slate-200">
      <style>{`
        /* Container Overrides */
        .react-calendar {
          background: transparent;
          border: none;
          font-family: inherit;
          width: 100%;
        }

        /* Navigation Arrows & Title */
        .react-calendar__navigation button {
          color: #f1f5f9; /* slate-100 */
          min-width: 44px;
          background: none;
          font-size: 16px;
          font-weight: 600;
        }
        .react-calendar__navigation button:enabled:hover,
        .react-calendar__navigation button:enabled:focus {
          background-color: #1e293b; /* slate-800 */
          border-radius: 8px;
        }

        /* Day Labels (Mon, Tue, etc.) */
        .react-calendar__month-view__weekdays {
          text-transform: uppercase;
          font-weight: bold;
          font-size: 0.7rem;
          color: #64748b; /* slate-500 */
        }

        /* Individual Tile (Day) */
        .react-calendar__tile {
          color: #94a3b8; /* slate-400 */
          padding: 10px 6.6667px;
          transition: all 0.2s ease;
          border-radius: 8px;
        }

        .react-calendar__tile:enabled:hover,
        .react-calendar__tile:enabled:focus {
          background-color: #334155; /* slate-700 */
          color: white;
        }

        /* Selected Day */
        .react-calendar__tile--active {
          background: #3b82f6 !important; /* blue-500 */
          color: white !important;
          font-weight: bold;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
        }

        /* Today's Highlight */
        .react-calendar__tile--now {
          background: #1e293b; 
          color: #3b82f6;
          border: 1px solid #3b82f6;
        }

        /* Hide neighboring month days for a cleaner look */
        .react-calendar__month-view__days__day--neighboringMonth {
          opacity: 0.2;
        }
      `}</style>

      <Calendar
        onChange={setSelectedDate}
        value={selectedDate}
        view="month"
        prev2Label={null} // Hiding extra navigation for simplicity
        next2Label={null}
      />
    </div>
  );
}

export default CalendarView;