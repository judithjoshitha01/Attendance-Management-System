import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronDown,
  LogOut,
  UserCircle,
  ShieldCheck,
  Clock3,
  CheckCircle2,
  CalendarDays,
} from "lucide-react";

function Dashboard() {
  const navigate = useNavigate();

  // ------------------------------------
  // STATE MANAGEMENT
  // ------------------------------------
  const [showProfile, setShowProfile] = useState(false);
  const [username, setUsername] = useState("User");
  const [timeIn, setTimeIn] = useState("--:--");
  const [timeout, setTimeOut] = useState("--:--");
  const [leaveTaken, setLeaveTaken] = useState(0);
  const [message, setMessage] = useState("");

  // ------------------------------------
  // FETCH DASHBOARD DATA FROM BACKEND
  // ------------------------------------
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token");
        const storedName = localStorage.getItem("name") || "User";
        setUsername(storedName);

        if (!token) {
          navigate("/");
          return;
        }

        // 1. Fetch Today's Attendance Details
        const attRes = await fetch("http://localhost:5000/api/attendance/my", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        const attData = await attRes.json();
        if (attRes.ok && attData.length > 0) {
          const todayData = attData[attData.length - 1];
          setTimeIn(todayData.timeIn || "--:--");
          setTimeOut(todayData.timeOut || "--:--");
        }

        // 2. Fetch Applied Leaves Summary Count
        const leaveRes = await fetch("http://localhost:5000/api/leave/my", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        const leaveData = await leaveRes.json();
        if (leaveRes.ok) {
          setLeaveTaken(leaveData.length);
        }
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      }
    };

    fetchDashboardData();
  }, [navigate]);

  // ------------------------------------
  // BUTTON CLICK HANDLERS
  // ------------------------------------
  
  // 1. Handle Time In Punch
  const handleTimeIn = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/attendance/timein", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.ok) {
        setTimeIn(data.timeIn);
        setMessage("Time In recorded successfully!");
      } else {
        setMessage(data.message);
      }
    } catch (err) {
      console.error(err);
      setMessage("Server error occurred!");
    }
  };

  // 2. Handle Time Out Punch
  const handleTimeOut = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/attendance/timeout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.ok) {
        setTimeOut(data.timeOut);
        setMessage("Time Out recorded successfully!");
      } else {
        setMessage(data.message);
      }
    } catch (err) {
      console.error(err);
      setMessage("Server error occurred!");
    }
  };

  // 3. Handle Logout Trigger
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  // ------------------------------------
  // FRONTEND UI DESIGN (REACT COMPONENT)
  // ------------------------------------
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans antialiased text-gray-800">
      {/* Header Bar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
            A
          </div>
          <span className="text-xl font-bold tracking-tight text-gray-900">
            Attendrix <span className="text-blue-600 text-xs font-semibold px-1.5 py-0.5 rounded bg-blue-50 border border-blue-100 ml-1">v2.0</span>
          </span>
        </div>

        <div className="relative">
          <button
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center gap-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl px-4 py-2 transition duration-200"
          >
            <UserCircle className="w-5 h-5 text-gray-500" />
            <span className="font-medium text-sm text-gray-700">{username}</span>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </button>

          {showProfile && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50 font-medium flex items-center gap-2 transition duration-150"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main Container Section */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-6 md:p-8 space-y-8">
        {/* Banner Greeting Card */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 md:p-8 text-white shadow-lg relative overflow-hidden">
          <div className="relative z-10 space-y-2">
            <span className="text-blue-100 text-xs font-semibold tracking-wider uppercase bg-white/10 px-2.5 py-1 rounded-full backdrop-blur-sm">
              Dashboard Overview
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              Welcome Back, {username}!
            </h1>
            <p className="text-blue-100 text-sm md:text-base max-w-md">
              Manage your daily attendance log, leave records, and submit end-of-day work summaries smoothly.
            </p>
          </div>
          <div className="absolute right-0 bottom-0 opacity-10 translate-x-10 translate-y-10 pointer-events-none">
            <ShieldCheck className="w-64 h-64" />
          </div>
        </div>

        {/* Dynamic Status Alert Message */}
        {message && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800 font-medium flex items-center gap-2 shadow-sm animate-pulse">
            <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0" />
            <span>{message}</span>
          </div>
        )}

        {/* Dashboard Cards Grid System */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Punch Time In Box */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between group hover:shadow-md hover:border-blue-200 transition duration-300">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-green-50 border border-green-100 flex items-center justify-center text-green-600 shadow-sm">
                <Clock3 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Time In Status</h3>
                <p className="text-3xl font-black text-gray-900 mt-1 tracking-tight">{timeIn}</p>
              </div>
            </div>
            <button
              onClick={handleTimeIn}
              disabled={timeIn !== "--:--"}
              className={`w-full mt-6 py-3 rounded-xl font-semibold text-sm transition duration-200 shadow-sm ${
                timeIn !== "--:--"
                  ? "bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700 text-white active:scale-[0.98]"
              }`}
            >
              {timeIn !== "--:--" ? "Checked In" : "Punch Time In"}
            </button>
          </div>

          {/* Punch Time Out Box */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between group hover:shadow-md hover:border-blue-200 transition duration-300">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-600 shadow-sm">
                <Clock3 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Time Out Status</h3>
                <p className="text-3xl font-black text-gray-900 mt-1 tracking-tight">{timeout}</p>
              </div>
            </div>
            <button
              onClick={handleTimeOut}
              disabled={timeIn === "--:--" || timeout !== "--:--"}
              className={`w-full mt-6 py-3 rounded-xl font-semibold text-sm transition duration-200 shadow-sm ${
                timeIn === "--:--" || timeout !== "--:--"
                  ? "bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed"
                  : "bg-orange-600 hover:bg-orange-700 text-white active:scale-[0.98]"
              }`}
            >
              {timeout !== "--:--" ? "Checked Out" : "Punch Time Out"}
            </button>
          </div>

          {/* Leaves Tracking Box */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between group hover:shadow-md hover:border-blue-200 transition duration-300">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 shadow-sm">
                <CalendarDays className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Leaves Summary</h3>
                <p className="text-3xl font-black text-gray-900 mt-1 tracking-tight">{leaveTaken} Days</p>
              </div>
            </div>
            <div className="mt-6 flex gap-2">
              <button
                onClick={() => navigate("/leave")}
                className="flex-1 py-3 bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-700 rounded-xl font-semibold text-sm transition duration-150 active:scale-[0.98]"
              >
                Apply Leave
              </button>
              <button
                onClick={() => navigate("/eod")}
                className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-sm shadow-sm transition duration-150 active:scale-[0.98]"
              >
                View EOD
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;