import React, { useEffect, useRef , useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { registerUser } from "../../fireBase/auth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Signin() {
  const [tip, setTip] = useState(false);
  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const tipRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() =>{
    const handleTip = (e) =>{
        if(tip && tipRef.current && !tipRef.current.contains(e.target)){
            setTip(false);
        }
    }

    document.addEventListener('click' , handleTip);

    return ()=>{
        document.removeEventListener('click' , handleTip);
    }
  } , [tip]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setLoading(true);    
     
    try{
      await registerUser(userId , password , name);
      setLoading(false);
      toast.success("Welcome back!");
      navigate("/login");
    }catch(e){
      toast.error("Failed to register. Please try again.");
      console.log(e);
    }finally{ 
      setLoading(false);
    }

  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-linear-to-b from-gray-900 via-gray-800 to-gray-900">
      <div className="hidden md:flex h-screen w-1/2 rounded-2xl flex-col gap-4 items-center justify-center text-center text-gray-50 bg-blue-300/10 backdrop-blur-lg">
        <h1 className="text-7xl font-bold text-white/90">Habit Tracker</h1>
        <p className="text-xl text-white/50 max-w-xs">
          Build habits. Track progress. Stay consistent.
        </p>
      </div>

      <div className="flex-1 h-screen flex flex-col gap-6 items-center justify-center px-6 md:px-12 text-gray-50">
        <h1 className="text-3xl md:text-4xl font-semibold mb-6 text-white">
          Create your account
        </h1>

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-[#282142]/70 p-8 rounded-2xl backdrop-blur-md flex flex-col gap-5 shadow-lg"
        >
                      <div className="relative flex items-center gap-2">

            <input
              type="text"
              minLength={5}
              placeholder="Unique ID (only numbers)"
              inputMode="numeric"
              value={userId}
              onChange={(e) => {
                const val = e.target.value;
                if (/^\d*$/.test(val)) setUserId(val);
              }}
              className="p-4 rounded-xl bg-transparent border border-gray-700 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition flex-1"
            />

            <div className="relative" ref={tipRef}>
              <FontAwesomeIcon
                icon={faQuestionCircle}
                className="text-gray-400 w-5 h-5 cursor-pointer hover:text-gray-200"
                onClick={() => setTip(!tip)}
              />

              {tip && (
                <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-gray-800 text-white text-sm rounded whitespace-nowrap">
                  Choose a unique ID with at least 5 digits
                </div>
              )}
            </div>
          </div>

          <input
              type="text"
              placeholder="Enter Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-4 rounded-xl bg-transparent border border-gray-700 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition flex-1"
            />


          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-4 rounded-xl bg-transparent border border-gray-700 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition"
          />

          {/* Confirm Password */}
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="p-4 rounded-xl bg-transparent border border-gray-700 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition"
          />

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`bg-blue-500 text-white py-3 rounded-xl hover:bg-blue-600 transition duration-300 font-semibold shadow-md ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <div className="flex flex-col items-center gap-2 mt-4 text-sm text-white/50">
          <p>
            Already have an account?{" "}
            <a href="/login" className="text-blue-400 hover:underline">
              Login here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
