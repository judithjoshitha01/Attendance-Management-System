import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, ShieldCheck, CheckCircle2 } from "lucide-react";

function Login() {
  const navigate = useNavigate();

  // ------------------------------------
  // STATE MANAGEMENT
  // ------------------------------------
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ------------------------------------
  // HANDLE LOGIN SUBMISSION
  // ------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email || !password) {
      setError("Please fill in all fields.");
      setLoading(false);
      return;
    }

    try {
      // Connects to your running backend server on port 5000
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Saves security token and name to LocalStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("name", data.name || "User");
        
        // Successfully redirects user to dashboard route
        navigate("/dashboard");
      } else {
        setError(data.message || "Invalid email or password.");
      }
    } catch (err) {
      console.error("Login Error:", err);
      setError("Cannot connect to server. Ensure backend is running!");
    } finally {
      setLoading(false);
    }
  };

  // ------------------------------------
  // FRONTEND UI DESIGN (MATCHES THE BRAND)
  // ------------------------------------
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans antialiased">
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2 border border-gray-100">
        
        {/* Left Branding Side Panel */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 md:p-12 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="space-y-6 relative z-10">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center font-bold text-lg backdrop-blur-sm">
                A
              </div>
              <span className="text-xl font-bold tracking-tight">Attendrix</span>
            </div>
            
            <div className="space-y-3 pt-8">
              <h2 className="text-3xl font-extrabold leading-tight tracking-tight">
                Smart attendance. Simple workflow.
              </h2>
              <p className="text-blue-100 text-sm max-w-sm">
                Track attendance effortlessly, manage work reports with ease, and get accurate insights.
              </p>
            </div>
          </div>

          <div className="space-y-3 text-xs text-blue-200/80 pt-12 md:pt-0 relative z-10">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-300" />
              <span>Track attendance effortlessly</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-300" />
              <span>Manage work with ease</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-300" />
              <span>Get accurate attendance insights</span>
            </div>
          </div>

          <div className="absolute right-0 bottom-0 opacity-10 translate-x-10 translate-y-10 pointer-events-none">
            <ShieldCheck className="w-64 h-64" />
          </div>
        </div>

        {/* Right Form Interaction Panel */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <div className="space-y-2 mb-8">
            <h3 className="text-2xl font-bold tracking-tight text-gray-900">Welcome back!</h3>
            <p className="text-sm text-gray-500">Sign in to continue to your workspace</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-3.5 text-sm font-medium mb-6 animate-shake">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                Email address
              </label>
              <div className="relative">
                <Mail className="w-5 h-5 text-gray-400 absolute left-4 top-3.5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-gray-50/50 hover:bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white rounded-xl pl-12 pr-4 py-3.5 text-sm outline-none transition duration-200"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Password
                </label>
                <a href="#forgot" className="text-xs font-medium text-blue-600 hover:underline">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Lock className="w-5 h-5 text-gray-400 absolute left-4 top-3.5" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full bg-gray-50/50 hover:bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white rounded-xl pl-12 pr-4 py-3.5 text-sm outline-none transition duration-200"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl py-3.5 mt-4 transition duration-200 shadow-md active:scale-[0.99] disabled:bg-blue-400 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}

export default Login;