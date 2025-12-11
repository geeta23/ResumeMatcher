import { FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function TopBar() {
  const navigate = useNavigate();
  const { logout, token } = useAuth();

  return (
    <div className="w-full flex items-center justify-between px-6 py-2.5 bg-white shadow fixed top-0 left-0 z-50">

      {/* Left Logo */}
      <div className="flex items-center gap-2">
        <div className="bg-blue-600 p-2 rounded-full">
          <FileText className="text-[#FFFFF0]" size={24} />
        </div>
        <h1 className="text-blue-700 text-xl font-bold">ResumeIQ</h1>
      </div>

      {/* Right Navigation */}
      {token && <div className="flex gap-6 font-medium text-gray-700">
        <button
          onClick={() => navigate("/")}
          className="hover:text-blue-600 transition"
        >
          Home
        </button>
        <button
          onClick={() => {
              logout();
              navigate("/login");
            }}
          className="hover:text-red-600 transition"
        >
          Logout
        </button>
      </div>
      }
    </div>
  );
}
