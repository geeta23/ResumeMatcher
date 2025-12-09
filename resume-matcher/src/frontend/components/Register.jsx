import { useState } from "react";
import { registerAPI } from "../api";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await registerAPI(name, email, password);
      setMsg("Registration successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setMsg(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleRegister}
        className="bg-white p-6 rounded-xl w-80 shadow-xl flex flex-col gap-4"
      >
        <h2 className="text-xl font-bold text-blue-600 text-center">
          Register
        </h2>

        {/* Name */}
        <label className="font-semibold">
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          className="border p-3 rounded"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        {/* Email */}
        <label className="font-semibold">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          className="border p-3 rounded"
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* Password */}
        <label className="font-semibold">
          Password <span className="text-red-500">*</span>
        </label>
        <input
          className="border p-3 rounded"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {msg && <p className="text-sm text-center text-blue-600">{msg}</p>}

        <button className="bg-blue-600 text-white py-3 rounded mt-2">
          Create Account
        </button>

        <p className="mt-2 text-sm text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 underline">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
}
