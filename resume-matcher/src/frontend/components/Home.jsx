// import { FileText, BarChart3 } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import FloatingIcons from "./FloatingIcons";

// export default function Home() {
//   const navigate = useNavigate();

//   return (
//     <div className="fixed inset-0 
//         flex flex-col items-center justify-center 
//         bg-gradient-to-b from-blue-300 via-blue-100 to-white 
//         overflow-auto pt-24 px-4">

//       {/* Floating Background Icons */}
//       <FloatingIcons />

//       {/* Main UI */}
//       <div className="relative z-10 mt-8">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

//           {/* Resume Matcher */}
//           <div
//             onClick={() => navigate("/resumeMatch")}
//             className="cursor-pointer w-64 h-64 
//                        bg-white/70 backdrop-blur-md rounded-2xl shadow-xl 
//                        flex flex-col items-center justify-center border 
//                        hover:bg-white/90 hover:shadow-2xl transition"
//           >
//             <FileText size={40} className="text-blue-700 mb-3" />
//             <h2 className="text-lg font-semibold text-gray-800 text-center">
//               Resume & JD Matcher
//             </h2>
//           </div>

//           {/* Resume Score */}
//           <div
//             onClick={() => navigate("/resumeScore")}
//             className="cursor-pointer w-64 h-64 
//                        bg-white/70 backdrop-blur-md rounded-2xl shadow-xl 
//                        flex flex-col items-center justify-center border 
//                        hover:bg-white/90 hover:shadow-2xl transition"
//           >
//             <BarChart3 size={40} className="text-blue-700 mb-3" />
//             <h2 className="text-lg font-semibold text-gray-800 text-center">
//               Resume Score
//             </h2>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }


import { FileText, BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import FloatingIcons from "./FloatingIcons";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 
        flex flex-col items-center justify-start 
        bg-gradient-to-b from-blue-300 via-blue-100 to-white 
        overflow-auto pt-24 px-4">

      <FloatingIcons />

      {/* ------------------- */}
      {/* Stats Section */}
      {/* ------------------- */}
      <div className="relative z-10 mb-10">
        <div className="bg-white/40 backdrop-blur-md shadow-lg rounded-2xl px-8 py-5 border flex flex-col md:flex-row gap-6 text-center md:text-left">

          <div>
            <p className="text-xl font-bold text-blue-700">50,000+</p>
            <p className="text-gray-700 text-xs">Job seekers improved their resumes</p>
          </div>

          <div>
            <p className="text-xl font-bold text-blue-700">3× More Calls</p>
            <p className="text-gray-700 text-xs">Reported after using our match score</p>
          </div>

          <div>
            <p className="text-xl font-bold text-blue-700">98%</p>
            <p className="text-gray-700 text-xs">Accuracy in skill extraction</p>
          </div>

        </div>
      </div>

      {/* Main UI */}
      <div className="relative z-10 mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Resume Matcher */}
          <div
            onClick={() => navigate("/resumeMatch")}
            className="cursor-pointer w-64 h-64 
                       bg-white/70 backdrop-blur-md rounded-2xl shadow-xl 
                       flex flex-col items-center justify-center border 
                       hover:bg-white/90 hover:shadow-2xl transition"
          >
            <FileText size={40} className="text-blue-700 mb-3" />
            <h2 className="text-lg font-semibold text-gray-800 text-center">
              Resume & JD Matcher
            </h2>
          </div>

          {/* Resume Score */}
          <div
            onClick={() => navigate("/resumeScore")}
            className="cursor-pointer w-64 h-64 
                       bg-white/70 backdrop-blur-md rounded-2xl shadow-xl 
                       flex flex-col items-center justify-center border 
                       hover:bg-white/90 hover:shadow-2xl transition"
          >
            <BarChart3 size={40} className="text-blue-700 mb-3" />
            <h2 className="text-lg font-semibold text-gray-800 text-center">
              Resume Score
            </h2>
          </div>

        </div>
      </div>
    </div>
  );
}
