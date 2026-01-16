import React, {useEffect , useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { loginUser } from "../../fireBase/auth";
import toast from "react-hot-toast";

export default function Login() {
  const [tip, setTip] = useState(false);
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const tipRef = useRef(null);



  useEffect(()=>{

    
    const handleTip = (event)=>{
      if(tip && tipRef.current && !tipRef.current.contains(event.target)){
        setTip(false);
      }
    }

    document.addEventListener('click' , handleTip);

    return ()=>{
      document.removeEventListener('click' , handleTip);
    }

  } , [tip]);

  const  handleSubmit = async (e) => {
    console.log(e);
    e.preventDefault();
    setLoading(true);
    try{
      await loginUser(userId , password);
      setLoading(false);
      toast.success("successfully logged in!");
    }catch(e){
      console.log(e)
      toast.error("Failed to login.");
    };
  };
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-linear-to-b from-gray-900 via-gray-800 to-gray-900">
      {/* Left side */}
      <div className="hidden md:flex h-screen w-1/2 rounded-2xl flex-col gap-4 items-center justify-center text-center text-gray-50 bg-blue-300/10 backdrop-blur-lg">
        <h1 className="text-7xl font-bold text-white/90">Habit Tracker</h1>
        <p className="text-xl text-white/50 max-w-xs">
          Every day, it gets a little easier. But you gotta do it every day,
          that's the hard part.
        </p>
      </div>

      {/* Right side (form) */}
      <div className="flex-1 h-screen flex flex-col gap-6 items-center justify-center px-6 md:px-12 text-gray-50">
        <h1 className="text-3xl md:text-4xl font-semibold mb-6 text-white">
          Login to Habit Tracker
        </h1>

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-[#282142]/70 p-8 rounded-2xl backdrop-blur-md flex flex-col gap-5 shadow-lg"
        >
          {/* Unique ID field */}
          <div className="relative flex items-center gap-2">
            <input
              type="text"
              placeholder="Unique ID (only numbers)"
              inputMode="numeric"
              value={userId}
              minLength={5}
              onChange={(e) => {
                const val = e.target.value;
                if (/^\d*$/.test(val)) setUserId(val);
              }}
              className="p-4 rounded-xl bg-transparent scrollbar-hide border border-gray-700 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition flex-1"
            />
            <div className="relative group" ref={tipRef}>
              <FontAwesomeIcon
                icon={faQuestionCircle}
                className="text-gray-400 w-5 h-5 cursor-pointer hover:text-gray-200"
                onClick={() => setTip(!tip)}
              />

              {tip && (
                <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-gray-800 text-white text-sm rounded whitespace-nowrap">
                  Your unique ID must contain at least 5 numbers
                </div>
              )}
            </div>
          </div>

          {/* Password field */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            minLength={8}
            onChange={(e) => setPassword(e.target.value)}
            className="p-4 rounded-xl bg-transparent border border-gray-700 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition"
          />

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className={`bg-blue-500 text-white py-3 rounded-xl hover:bg-blue-600 transition duration-300 font-semibold shadow-md ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="flex flex-col items-center gap-2 mt-4 text-sm text-white/50">
          <p>
            Don't have an account?{" "}
            <a href="/signin" className="text-blue-400 hover:underline">
              Register here
            </a>
          </p>
          {/* <p>
            Forgot your password?{" "}
            <a href="/reset-password" className="text-blue-400 hover:underline">
              Reset it here
            </a>
          </p> */}
        </div>
      </div>
    </div>
  );
}
