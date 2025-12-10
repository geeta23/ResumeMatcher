import TopBar from "./TopBar";
import { FileText, BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Center Content */}
      <div className="flex items-center justify-center h-screen pt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">

          {/* Resume Matcher Box */}
          <div
            onClick={() => navigate("/resumeMatch")}
            className="cursor-pointer w-64 h-64 bg-white rounded-xl shadow-lg flex flex-col items-center justify-center border hover:shadow-2xl transition"
          >
            <FileText size={40} className="text-blue-700 mb-3" />
            <h2 className="text-lg font-semibold text-gray-800 text-center">
              Resume & JD Matcher
            </h2>
          </div>

          {/* Resume Score Box */}
          <div
            onClick={() => navigate("/resumeScore")}
            className="cursor-pointer w-64 h-64 bg-white rounded-xl shadow-lg flex flex-col items-center justify-center border hover:shadow-2xl transition"
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
