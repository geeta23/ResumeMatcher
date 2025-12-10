// import { useState } from "react";
// import { useAuth } from "../auth/AuthContext";
// import { useNavigate, Link } from "react-router-dom";
// import { loginAPI } from "../api";
// import { FaGoogle, FaAmazon, FaMicrosoft, FaApple } from "react-icons/fa";

// export default function Login() {
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await loginAPI(email, password);
//       login(res.data.token);
//       navigate("/");
//     } catch (err) {
//       setError(err.response?.data?.message || "Login failed");
//     }
//   };

//   // Trusted companies icons
//   const companies = [
//     { name: "Google", icon: <FaGoogle size={32} /> },
//     { name: "Amazon", icon: <FaAmazon size={32} /> },
//     { name: "Microsoft", icon: <FaMicrosoft size={32} /> },
//     { name: "Apple", icon: <FaApple size={32} /> },
//   ];

//   return (
//     <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-100 pt-20">
//       {/* Login form */}
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-8 w-96 rounded-xl shadow-lg flex flex-col gap-4"
//       >
//         <h2 className="text-center text-2xl font-bold text-blue-600 mb-2">
//           Login
//         </h2>

//         <input
//           type="email"
//           placeholder="Email"
//           className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />

//         {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

//         <button className="mt-2 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
//           Login
//         </button>

//         <p className="text-center text-sm mt-2">
//           Don’t have an account?{" "}
//           <Link
//             to="/register"
//             className="text-blue-600 font-semibold hover:underline"
//           >
//             Register Now
//           </Link>
//         </p>
//       </form>

//       {/* Trusted by companies section */}
//       <div className="mt-6 text-center">
//         <p className="text-gray-500 text-sm mb-4 font-medium">
//           Most trusted by leading companies
//         </p>

//         <div className="flex flex-wrap justify-center gap-6">
//           {companies.map((company) => (
//             <div
//               key={company.name}
//               className="text-gray-400 hover:text-gray-900 transition"
//               title={company.name}
//             >
//               {company.icon}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }


import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { loginAPI } from "../api";
import { FaGoogle, FaAmazon, FaMicrosoft, FaApple } from "react-icons/fa";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginAPI(email, password);
      login(res.data.token);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  const companies = [
    { name: "Google", icon: <FaGoogle size={32} /> },
    { name: "Amazon", icon: <FaAmazon size={32} /> },
    { name: "Microsoft", icon: <FaMicrosoft size={32} /> },
    { name: "Apple", icon: <FaApple size={32} /> },
  ];

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-100 overflow-hidden pt-20">
      
      {/* Layered subtle blue waves */}
      <svg className="absolute bottom-0 w-full h-64" viewBox="0 0 1440 320">
        {/* Layer 1 - light blue */}
        <path
          fill="#93c5fd" // light blue
          fillOpacity="0.5"
          d="M0,192L48,181.3C96,171,192,149,288,133.3C384,117,480,107,576,128C672,149,768,203,864,218.7C960,235,1056,213,1152,176C1248,139,1344,85,1392,58.7L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        >
          <animate attributeName="d" dur="12s" repeatCount="indefinite"
            values="
              M0,192L48,181.3C96,171,192,149,288,133.3C384,117,480,107,576,128C672,149,768,203,864,218.7C960,235,1056,213,1152,176C1248,139,1344,85,1392,58.7L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;
              M0,160L48,176C96,192,192,224,288,218.7C384,213,480,171,576,144C672,117,768,107,864,133.3C960,160,1056,224,1152,234.7C1248,245,1344,203,1392,181.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;
              M0,192L48,181.3C96,171,192,149,288,133.3C384,117,480,107,576,128C672,149,768,203,864,218.7C960,235,1056,213,1152,176C1248,139,1344,85,1392,58.7L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z
            "
          />
        </path>

        {/* Layer 2 - medium blue */}
        <path
          fill="#60a5fa"
          fillOpacity="0.4"
          d="M0,224L48,218.7C96,213,192,203,288,197.3C384,192,480,192,576,197.3C672,203,768,213,864,218.7C960,224,1056,224,1152,208C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        >
          <animate attributeName="d" dur="15s" repeatCount="indefinite"
            values="
              M0,224L48,218.7C96,213,192,203,288,197.3C384,192,480,192,576,197.3C672,203,768,213,864,218.7C960,224,1056,224,1152,208C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;
              M0,208L48,213.3C96,219,192,229,288,218.7C384,208,480,192,576,186.7C672,181,768,187,864,192C960,197,1056,203,1152,197.3C1248,192,1344,176,1392,168L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;
              M0,224L48,218.7C96,213,192,203,288,197.3C384,192,480,192,576,197.3C672,203,768,213,864,218.7C960,224,1056,224,1152,208C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z
            "
          />
        </path>
      </svg>

      {/* Login form */}
      <form
        onSubmit={handleSubmit}
        className="relative bg-white p-8 w-96 rounded-xl shadow-lg flex flex-col gap-4 z-10"
      >
        <h2 className="text-center text-2xl font-bold text-blue-600 mb-2">
          Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <button className="mt-2 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
          Login
        </button>

        <p className="text-center text-sm mt-2">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 font-semibold hover:underline"
          >
            Register Now
          </Link>
        </p>
      </form>

      {/* Trusted companies section */}
      <div className="relative mt-6 text-center z-10">
        <p className="text-gray-500 text-sm mb-4 font-medium">
          Most trusted by leading companies
        </p>

        <div className="flex flex-wrap justify-center gap-6">
          {companies.map((company) => (
            <div
              key={company.name}
              className="text-gray-400 hover:text-gray-900 transition"
              title={company.name}
            >
              {company.icon}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
