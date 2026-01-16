import toast, { Toaster } from "react-hot-toast";
import Navbar from "../Components/NaavBar";
import React, { useEffect, useState } from "react";
import HabitForm from "../Components/HabitForm";
import HabitTable from "../Components/HabitTable";
import { database } from "../../fireBase/fireBase";
import { useAuth } from "../../Context/AurhContext";
import Progress from "../Components/MonthlyProgress";
import CalenderView from "../Components/CalendarView";
import IndividualProgress from "../Components/IndividualProgress";
import { onValue, push, ref, off, remove } from "firebase/database";

export default function Home() {
  const { currentUser } = useAuth();
  // const [name , setName] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [habits, setHabits] = useState([]);

  const addHabit = (habitName) => {
    if (!currentUser) return;
    try {
      const newHabit = {
        name: habitName,
        completed: {},
      };
      const habitRef = ref(database, "users/" + currentUser.uid + "/habits");
      push(habitRef, newHabit);
    } catch (error) {
      toast.error("Error adding habit. Please try again.");
      console.error("Error adding habit: ", error);
    }
  };

  // useEffect(() =>{
  //   if(!currentUser) return;

  //   const profileRef = ref(database , `users/${currentUser.uid}/profile`);
  //   onValue(profileRef, (snapShot) =>{
  //     const data = snapShot.val();
  //     if(data) setName(data.name);
  //   })

  //   return () => off(profileRef);
  // } , [currentUser]);

  // console.log(name);
  // console.log(currentUser[name]);

  // console.log(habits);
  const deleteHabit = (id) => {
    // if (window.confirm("Are you sure you want to delete this habit?")) {
    //   const habitRef = ref(database, `users/${currentUser.uid}/habits/${id}`);
    //   remove(habitRef);
    // }
    toast(
      (t) => (
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium">Delete this habit?</p>
          <div className="flex gap-2">
            <button
              className="bg-red-500 px-2 py-1 rounded text-xs"
              onClick={() => {
                const habitRef = ref(
                  database,
                  `users/${currentUser.uid}/habits/${id}`
                );
                remove(habitRef);
                toast.dismiss(t.id);
                toast.success("Habit deleted");
              }}
            >
              Delete
            </button>
            <button
              className="bg-slate-700 px-2 py-1 rounded text-xs"
              onClick={() => toast.dismiss(t.id)}
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      { duration: 4000 }
    );
  };

  useEffect(() => {
    const habitRef = ref(database, `users/${currentUser.uid}/habits`);
    const unsubscribe = onValue(habitRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const loadedHabits = Object.entries(data).map(([id, habit]) => ({
          id,
          name: habit.name,
          completed: habit.completed || {},
        }));
        setHabits(loadedHabits);
      } else {
        setHabits([]);
      }
    });

    return () => off(habitRef);
  }, [currentUser]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#1e293b",
            color: "#fff",
            border: "1px solid #334155",
            minWidth: "250px",
            textAlign: "center",
          },
        }}
      />
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* <h1>Wellcome back {name}</h1> */}
        <header className="mb-10">
          <h1 className="text-3xl font-bold bg-linear-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
            Your Dashboard
          </h1>
          <p className="text-slate-400">
            Track your consistency and reach your goals.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-8">
            <section className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl backdrop-blur-sm shadow-xl">
              <h2 className="text-xl font-semibold mb-4">New Habit</h2>
              <HabitForm addHabit={addHabit} />
            </section>

            <section className="bg-slate-900/50 border border-slate-800 rounded-2xl backdrop-blur-sm shadow-xl overflow-hidden">
              <div className="p-6 border-b border-slate-800">
                <h2 className="text-xl font-semibold">Weekly Progress</h2>
              </div>
              <HabitTable
                selectedDate={selectedDate}
                habits={habits}
                deleteHabit={deleteHabit}
              />
            </section>
          </div>

          {/* Sidebar Area */}
          <div className="lg:col-span-4 space-y-6">
            <section className="bg-slate-900/50 border border-slate-800 p-4 rounded-2xl backdrop-blur-sm shadow-xl">
              <CalenderView
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
              />
            </section>

            <div className="p-5 bg-blue-500/10 border border-blue-500/20 rounded-2xl">
              
              <ul className="text-sm text-slate-400 space-y-3">
                <li className="flex gap-2">
                  <span className="text-blue-500">•</span>
                  Select a date on the calendar to change the month view.
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-500">•</span>
                  Tap cells to toggle completion; green is done, red is missed.
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-500">•</span>
                  You cannot mark habits for future dates.
                </li>
              </ul>
            </div>
          </div>
        </div>

        <section className="mt-12 bg-slate-900/50 border border-slate-800 p-6 rounded-2xl backdrop-blur-sm shadow-xl">
          <Progress habits={habits} selectedDate={selectedDate} />
        </section>

        {/* <section className="mt-12 bg-slate-900/50 border border-slate-800 p-6 rounded-2xl backdrop-blur-sm shadow-xl">
          <IndividualProgress habit={habits} selectedDate={selectedDate} />
        </section> */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Habit-wise Progress</h2>

          {!habits.length ? (
            <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl shadow-xl flex items-center justify-center h-48">
              <p className="text-slate-400">No habits to display</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {habits.map((habit) => (
                <IndividualProgress
                  key={habit.id}
                  habit={habit}
                  selectedDate={selectedDate}
                />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
