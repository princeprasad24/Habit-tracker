import React, { useEffect } from "react";
import { ref, set } from "firebase/database";
import { database } from "../../fireBase/fireBase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashAlt,
  faFire,
  faCheck,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

import { useAuth } from "../../Context/AurhContext";
import toast from "react-hot-toast";


export default function HabitTable({ selectedDate, habits, deleteHabit }) {
  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();
  const todayStr = today.toISOString().split("T")[0];
  const {currentUser} = useAuth();

  

  const getDateStr = (d) =>
    `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(
      2,
      "0"
    )}`;

  const calculateStreak = (completedObj) => {
    if (!completedObj) return 0;
    let streak = 0;
    let checkDate = new Date();

    while (true) {
      const dateStr = checkDate.toISOString().split("T")[0];
      if (completedObj[dateStr]) {
        streak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        break;
      }
    }
    return streak;
  };

  const toggleCompletion = (id, date) => {
    if(!currentUser) return;
    const habitRef = ref(database, `users/${currentUser.uid}/habits/${id}/completed/${date}`);
    const habit = habits.find((h) => h.id === id);
    const completed = habit.completed && habit.completed[date];

    if (completed) {
      set(habitRef, null);
    } else {
      set(habitRef, true);
      // toast.success("Goal reached!", {
      // icon: '🔥',
      // duration: 1500,
      // style: {
      //   borderRadius: '10px',
      //   background: '#064e3b',
      //   color: '#fff',
      // },
    // });
    }
  };


  useEffect(()=>{
    const CompleteddHabitLength = habits.filter(habit => habit.completed && Object.keys(habit.completed).length > 0).length;
    if(CompleteddHabitLength === habits.length && habits.length > 0){
      toast.success("All habits completed",  {
        duration: 4000,
        style: {
          borderRadius: '10px',

          background: '#064e3b',
          color: '#fff',
        },
      }

      )
    }
  })



  return (
    <div className="w-full overflow-x-auto custom-scrollbar rounded-xl border border-slate-800 bg-slate-900/50">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-slate-800">
            <th className="sticky left-0 z-20 bg-slate-900/95 backdrop-blur-md p-4 text-slate-400 font-medium text-xs uppercase tracking-wider min-w-45">
              Habit & Progress
            </th>
            {Array.from({ length: daysInMonth }, (_, i) => (
              <th
                key={i}
                className="p-2 text-center text-slate-500 font-medium text-xs min-w-10"
              >
                {i + 1}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/50">
          {habits.length === 0 && (
            <tr>
              <td
                colSpan={daysInMonth + 1}
                className="p-12 text-center text-slate-500 italic"
              >
                No habits tracked yet. Use the form above to start!
              </td>
            </tr>
          )}
          {habits.map((habit) => {
            const streak = calculateStreak(habit.completed);

            return (
              <tr
                key={habit.id}
                className="group hover:bg-slate-800/30 transition-colors"
              >
                <td className="sticky left-0 z-10 bg-slate-900/95 backdrop-blur-md p-4 border-r border-slate-800/50">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-slate-200 truncate pr-2">
                        {habit.name}
                      </span>
                      <button
                        onClick={() => { deleteHabit(habit.id); }}
                        className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-red-400 transition-all p-1"
                        title="Delete habit"
                      >
                        <FontAwesomeIcon
                          icon={faTrashAlt}
                          className="text-[10px]"
                        />
                      </button>
                    </div>

                    {streak > 0 && (
                      <div className="flex items-center gap-1.5 text-orange-400 text-[10px] font-bold tracking-wide">
                        <FontAwesomeIcon
                          icon={faFire}
                          className="animate-pulse"
                        />
                        <span>{streak} DAY STREAK</span>
                      </div>
                    )}
                  </div>
                </td>

                {Array.from({ length: daysInMonth }, (_, i) => {
                  const dayNumber = i + 1;
                  const dateStr = getDateStr(i + 1);
                  const cellDate = new Date(year, month, dayNumber);
                  const todayAtMidNight = new Date();
                  todayAtMidNight.setHours(0, 0, 0, 0);
                  const isFuture = cellDate > todayAtMidNight;
                  const isToday = dateStr === todayStr;
                  const completed =
                    habit.completed && !!habit.completed[dateStr] && !isFuture;

                  return (
                    <td key={i} className="p-1 text-center">
                      <button
                        disabled={isFuture}
                        onClick={() =>
                          !isFuture && toggleCompletion(habit.id, dateStr)
                        }
                        className={`
                          w-8 h-8 rounded-lg mx-auto transition-all duration-300 flex items-center justify-center text-[10px]
                          ${
                            isFuture
                              ? "bg-slate-800/20 cursor-not-allowed opacity-20"
                              : completed
                              ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20 scale-105"
                              : "bg-slate-800 hover:bg-slate-700 text-transparent hover:text-slate-500"
                          }
                          ${
                            isToday
                              ? "ring-2 ring-blue-500 ring-offset-2 ring-offset-slate-900"
                              : ""
                          }
                        `}
                      >
                        {!isFuture && (
                          <FontAwesomeIcon
                            icon={completed ? faCheck : faTimes}
                          />
                        )}{" "}
                      </button>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
