// import TopBar from "./TopBar";
// import { FileText, BarChart3 } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// export default function Home() {
//   const navigate = useNavigate();

//   return (
//     <div className="min-h-screen bg-gray-50 floating-bg">

//       {/* Center Content */}
//       <div className="flex items-center justify-center h-screen pt-20">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">

//           {/* Resume Matcher Box */}
//           <div
//             onClick={() => navigate("/resumeMatch")}
//             className="cursor-pointer w-64 h-64 bg-white rounded-xl shadow-lg flex flex-col items-center justify-center border hover:shadow-2xl transition"
//           >
//             <FileText size={40} className="text-blue-700 mb-3" />
//             <h2 className="text-lg font-semibold text-gray-800 text-center">
//               Resume & JD Matcher
//             </h2>
//           </div>

//           {/* Resume Score Box */}
//           <div
//             onClick={() => navigate("/resumeScore")}
//             className="cursor-pointer w-64 h-64 bg-white rounded-xl shadow-lg flex flex-col items-center justify-center border hover:shadow-2xl transition"
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
import { useMemo } from "react";

export default function Home() {
  const navigate = useNavigate();

  // Icons we want to show
  const icons = ["📄","📑","📃","📝","💼","🗂️","📁","📊","📈","🧾","🔍","📚","💡"];

  // Generate 20 random floating icons ONCE
  const floatingIcons = useMemo(() => {
    return Array.from({ length: 20 }).map(() => {
      const icon = icons[Math.floor(Math.random() * icons.length)];
      const left = Math.random() * 90 + "%";
      const size = Math.random() * 25 + 30; // 30px - 55px
      const delay = Math.random() * 10 + "s";
      const duration = Math.random() * 10 + 12 + "s"; // 12s - 22s speed

      return { icon, left, size, delay, duration };
    });
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">

      {/* Professional clean gradient background */}
      <div className="colorful-bg"></div>

      {/* Randomized floating icons */}
      <div className="hr-bg">
        {floatingIcons.map((it, i) => (
          <span
            key={i}
            style={{
              left: it.left,
              fontSize: it.size + "px",
              animationDelay: it.delay,
              animationDuration: it.duration
            }}
          >
            {it.icon}
          </span>
        ))}
      </div>

      {/* Main UI */}
      <div className="flex items-center justify-center h-screen relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">

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
