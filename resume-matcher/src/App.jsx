import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./frontend/auth/AuthContext";
import ProtectedRoute from "./frontend/auth/ProtectedRoute";

import TopBar from "./frontend/components/TopBar";
import Login from "./frontend/components/Login";
import Register from "./frontend/components/Register";
import Home from "./frontend/components/Home";
import ResumeMatcher from "./frontend/components/ResumeMatcher";
import ResumeScore from "./frontend/components/ResumeScore";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <TopBar />
        <div className="pt-16">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Pages with waves background */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                    <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/resumeMatch"
              element={
                <ProtectedRoute>
                    <ResumeMatcher />
                </ProtectedRoute>
              }
            />
            <Route
              path="/resumeScore"
              element={
                <ProtectedRoute>
                    <ResumeScore />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}


