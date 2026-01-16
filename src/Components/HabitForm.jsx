import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

function HabitForm({ addHabit }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    addHabit(input.trim());
    setInput("");
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="flex flex-col sm:flex-row gap-3"
    >
      <div className="relative flex-1 group">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="What's your next goal?"
          className="w-full bg-slate-950/50 border border-slate-800 text-slate-100 rounded-xl px-5 py-3 outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 placeholder:text-slate-600"
        />
        {/* Subtle accent line that glows on focus */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.2 bg-blue-500 group-focus-within:w-1/2 transition-all duration-500 opacity-50" />
      </div>

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-blue-900/20 hover:shadow-blue-500/30 transition-all duration-300 flex items-center justify-center gap-2 active:scale-95"
      >
        <FontAwesomeIcon icon={faPlus} className="text-sm" />
        <span>Add Habit</span>
      </button>
    </form>
  );
}

export default HabitForm;