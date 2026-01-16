// import React from 'react';
// import { useAuth } from '../../Context/AurhContext';

// export default function Navbar() {
//   const { signOutUser } = useAuth();

//   const handleLogout = async () => {
//     try {
//       await signOutUser();
//     } catch (e) {
//       console.log(e);
//     }
//   };

//   return (
//     <nav className="w-full h-16 bg-blue-600 flex justify-between items-center px-6 shadow-md mb-6">
      
//       <h1 className="text-white font-bold text-xl">
//         Habit Tracker
//       </h1>

//       <div className="flex items-center gap-4">
//         <button
//           onClick={handleLogout}
//           className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-gray-100 transition duration-150"
//         >
//           Sign Out
//         </button>
//       </div>
//     </nav>
//   );
// }


import { useAuth } from '../../Context/AurhContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faChartLine } from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';

export default function Navbar() {
  const { signOutUser } = useAuth();


  

  const handleLogout = async () => {
    try {
      await signOutUser();
      toast.success("Successfully signed out!");
    } catch (e) {
      console.log(e);
      toast.error("Failed to sign out. Please try again.");
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-950/70 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
        
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="bg-blue-500 p-1.5 rounded-lg">
            <FontAwesomeIcon icon={faChartLine} className="text-white w-5 h-5" />
          </div>
          <h1 className="text-white font-bold text-xl tracking-tight">
            Habit<span className="text-blue-500">Tracker</span>
          </h1>
        </div>

        {/* Action Section */}
        <div className="flex items-center gap-6">
          {/* Optional: Add user info or navigation links here */}
          
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors duration-200 text-sm font-medium group"
          >
            <span>Sign Out</span>
            <FontAwesomeIcon 
              icon={faSignOutAlt} 
              className="group-hover:translate-x-1 transition-transform duration-200" 
            />
          </button>
        </div>
      </div>
    </nav>
  );
}