import { useState } from "react";
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

  const [showProfile, setShowProfile] = useState(false);

  // ==============================
  // USER DATA
  // ==============================

  const userName = localStorage.getItem("userName") || "Judi";

  // ==============================
  // ATTENDANCE DATA
  // ==============================

  const timeIn = localStorage.getItem("timeIn");
  const timeOut = localStorage.getItem("timeOut");

  // Dummy leave data
  const leaveTaken = 3;

  // ==============================
  // FORMAT TIME
  // ==============================

  const formatTime = (time) => {
    if (!time) {
      return "--:--";
    }

    return new Date(time).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // ==============================
  // CURRENT DATE
  // ==============================

  const getCurrentDate = () => {
    return new Date().toLocaleDateString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // ==============================
  // LOGOUT
  // ==============================

  const handleLogout = () => {
    const logoutTime = new Date().toISOString();

    localStorage.setItem("timeOut", logoutTime);

    navigate("/");
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50 text-slate-900">

      {/* ================================================= */}
      {/* SUBTLE GRID BACKGROUND */}
      {/* ================================================= */}

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #e2e8f0 1px, transparent 1px),
            linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* ================================================= */}
      {/* BACKGROUND DECORATION */}
      {/* ================================================= */}

      <div className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-sky-100/60 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-blue-50 blur-3xl" />

      {/* ================================================= */}
      {/* NAVBAR */}
      {/* ================================================= */}

      <nav className="relative z-20 border-b border-slate-200 bg-white">

        <div className="mx-auto flex h-16 w-full items-center justify-between px-5 sm:px-8 lg:px-12 xl:px-16">

          {/* LOGO */}
          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50">

              <ShieldCheck
                size={22}
                className="text-sky-600"
              />

            </div>

            <div>

              <span className="text-xl font-bold tracking-tight text-slate-900">
                Attendrix✨
              </span>

              <div className="h-0.5 w-7 rounded-full bg-sky-500" />

            </div>

          </div>

          {/* PROFILE */}
          <div className="relative">

            <button
              type="button"
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
            >

              <UserCircle size={20} />

              <span className="hidden sm:inline">Profile</span>

              <ChevronDown
                size={16}
                className={`transition-transform ${
                  showProfile ? "rotate-180" : ""
                }`}
              />

            </button>

            {/* PROFILE DROPDOWN */}
            {showProfile && (
              <div className="absolute right-0 top-12 z-30 w-44 rounded-xl border border-slate-200 bg-white p-2 shadow-lg">

                <button
                  type="button"
                  onClick={() => navigate("/profile")}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-600 transition hover:bg-slate-100"
                >

                  <UserCircle size={17} />

                  Profile

                </button>

                <div className="my-1 border-t border-slate-100" />

                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-red-500 transition hover:bg-red-50"
                >

                  <LogOut size={17} />

                  Logout

                </button>

              </div>
            )}

          </div>

        </div>

      </nav>

      {/* ================================================= */}
      {/* MAIN CONTENT */}
      {/* ================================================= */}

      <main className="relative z-10 mx-auto w-full px-5 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-12 xl:px-16">

        {/* ================================================= */}
        {/* USER HEADER */}
        {/* ================================================= */}

        <div className="mb-10 text-center sm:mb-12">

          <div className="flex items-center justify-center gap-2">

            <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              {userName}
            </h1>

            {/* ACTIVE */}
            <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-600">

              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

              Active

            </span>

          </div>

          {/* DATE */}
          <div className="mt-3 flex items-center justify-center gap-2 text-sm text-slate-500">

            <CalendarDays size={15} />

            {getCurrentDate()}

          </div>

        </div>

        {/* ================================================= */}
        {/* TIME SECTION */}
        {/* ================================================= */}

        <div className="mx-auto flex w-full max-w-4xl items-center justify-center">

          {/* TIME IN */}
          <div className="flex flex-1 flex-col items-center text-center">

            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50">

              <Clock3
                size={20}
                className="text-sky-600"
              />

            </div>

            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              Time In
            </p>

            <p className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              {formatTime(timeIn)}
            </p>

          </div>

          {/* DIVIDER */}
          <div className="mx-4 h-16 w-px bg-slate-200 sm:mx-8" />

          {/* TIME OUT */}
          <div className="flex flex-1 flex-col items-center text-center">

            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">

              <Clock3
                size={20}
                className="text-slate-500"
              />

            </div>

            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              Time Out
            </p>

            <p className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              {formatTime(timeOut)}
            </p>

          </div>

        </div>

        {/* ================================================= */}
        {/* VIEW EOD BUTTON */}
        {/* ================================================= */}

        <div className="mt-9 flex justify-center">

          <button
            type="button"
            onClick={() => navigate("/eod")}
            className="rounded-lg bg-sky-600 px-7 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700 hover:shadow-md"
          >
            View EOD
          </button>

        </div>

        {/* ================================================= */}
        {/* ATTENDANCE STATUS */}
        {/* ================================================= */}

        <div className="mx-auto mt-12 w-full max-w-5xl rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

          <div className="flex items-center justify-between gap-4">

            {/* LEFT */}
            <div className="flex items-center gap-4">

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50">

                <CheckCircle2
                  size={21}
                  className="text-emerald-600"
                />

              </div>

              <div>

                <p className="text-sm font-semibold text-slate-800">
                  Attendance Status
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  Your attendance has been recorded for today.
                </p>

              </div>

            </div>

            {/* STATUS */}
            <div className="flex shrink-0 items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-sm font-semibold text-emerald-600">

              <span className="h-2 w-2 rounded-full bg-emerald-500" />

              Present

            </div>

          </div>

        </div>

        {/* ================================================= */}
        {/* LEAVE TAKEN */}
        {/* ================================================= */}

        <div className="mx-auto mt-5 w-full max-w-5xl rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

          <div className="flex items-center justify-between gap-4">

            {/* LEFT */}
            <div className="flex items-center gap-4">

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sky-50">

                <CalendarDays
                  size={21}
                  className="text-sky-600"
                />

              </div>

              <div>

                <p className="text-sm font-semibold text-slate-800">
                  Leave Taken
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  Total leave taken so far
                </p>

              </div>

            </div>

            {/* NUMBER */}
            <div className="text-right">

              <p className="text-2xl font-semibold text-slate-900">
                {leaveTaken}
              </p>

              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Days
              </p>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}

export default Dashboard;
