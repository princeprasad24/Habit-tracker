import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function IndividualProgress({ habit, selectedDate }) {

  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth() + 1;
  const daysInMonth = new Date(year, month, 0).getDate();

  const today = new Date().toISOString().split("T")[0];

  const labels = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // Build chart data
  const dataPoints = labels.map((day) => {
    const dateStr = `${year}-${String(month).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;

    if (dateStr > today) return null; // future day

    return habit.completed?.[dateStr] ? 1 : 0;
  });

  // Success rate (ignore future days)
  const validDays = dataPoints.filter((v) => v !== null);
  const successCount = validDays.filter((v) => v === 1).length;
  const successRate = validDays.length
    ? ((successCount / validDays.length) * 100).toFixed(1)
    : 0;

  const chartData = {
    labels,
    datasets: [
      {
        data: dataPoints,
        backgroundColor: (context) => {
          const value = context.raw;
          if (value === null) return "transparent";
          return value === 1 ? "#10b981" : "#1e293b";
        },
        borderRadius: 4,
        borderSkipped: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) =>
            ctx.raw === 1 ? "Completed" : ctx.raw === 0 ? "Missed" : "Future",
        },
      },
    },
    scales: {
      y: {
        display: false,
        max: 1.2,
      },
      x: {
        grid: { display: false },
        ticks: { color: "#64748b" },
      },
    },
  };

//   console.log(habit);

  return (
    <>
     { !habit ? null : 
      <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-white">{habit.name}</h2>
            <p className="text-sm text-slate-400">Monthly consistency</p>
          </div>

          <div className="text-right">
            <p className="text-xs uppercase text-slate-400 font-bold">
              Success Rate
            </p>
            <p className="text-2xl font-black text-emerald-400">
              {successRate}%
            </p>
          </div>
        </div>

        <div className="h-40">
          <Bar data={chartData} options={options} />
        </div>
      </div>}
    </>
  );
}
