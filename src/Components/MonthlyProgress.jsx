import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function Progress({ habits, selectedDate }) {
  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth() + 1;
  const dayInMonth = new Date(year, month, 0).getDate();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // const getDateStr = (day) =>
  //   `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

  const MonthlychartData = {
    labels: Array.from({ length: dayInMonth }, (_, i) => i + 1),
    datasets: [
      {
        label: "Habits Completed",
        data: Array.from({ length: dayInMonth }, (_, i) => {
          const dayNumber = i + 1;
          const checkDate = new Date(year, month - 1, dayNumber);
          if (checkDate > today) return null;
          const dateStr = `${year}-${String(month).padStart(2, "0")}-${String(dayNumber).padStart(2, "0")}`;
          let completedCount = 0;
          habits.forEach((habit) => {
            if (habit.completed && habit.completed[dateStr]) {
              completedCount++;
            }
          });
          return completedCount;
        }),
        fill: true,

        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 400);
          gradient.addColorStop(0, "rgba(59, 130, 246, 0.3)");
          gradient.addColorStop(1, "rgba(59, 130, 246, 0)");
          return gradient;
        },
        borderColor: "#3b82f6",
        borderWidth: 3,
        pointBackgroundColor: "#3b82f6",
        pointBorderColor: "#fff",
        pointHoverRadius: 6,
        tension: 0.4,
      },
    ],
  };

  const MonthlychartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "#1e293b",
        titleColor: "#94a3b8",
        bodyColor: "#f8fafc",
        padding: 12,
        cornerRadius: 8,
        displayColors: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(255, 255, 255, 0.05)",
          drawBorder: false,
        },
        ticks: {
          stepSize: 1,
          color: "#64748b",
          font: { size: 11 },
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#64748b",
          font: { size: 11 },
        },
      },
    },
  };

  


  return (
    <div className="w-full h-full min-h-75 flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-slate-100">
            Monthly Performance
          </h2>
          <p className="text-sm text-slate-400">
            Activity overview for{" "}
            {selectedDate.toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
        <div className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full">
          <span className="text-xs font-medium text-blue-400">Live Data</span>
        </div>
      </div>

      <div className="flex-1 min-h-62.5">
        <Line data={MonthlychartData} options={MonthlychartOptions} />
      </div>
    </div>
  );
}
