import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CalendarDays,
  Mail,
  Pencil,
  ShieldCheck,
  User,
  BriefcaseBusiness,
  Hash,
  LogOut,
} from "lucide-react";

function Profile() {
  const navigate = useNavigate();

  // Dummy user data
  const user = {
    name: "Judi",
    email: "judi@example.com",
    employeeId: "ATD-001",
    department: "Computer Science",
    role: "Employee",
    joinedDate: "01 August 2026",
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ============================= */}
      {/* NAVBAR */}
      {/* ============================= */}

      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-xl">

        <div className="mx-auto flex h-16 w-full items-center justify-between px-5 sm:px-8 lg:px-12 xl:px-16">

          {/* BRAND */}

          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-3"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
              <ShieldCheck size={21} />
            </div>

            <div className="text-left">
              <h1 className="text-lg font-bold tracking-tight text-slate-900">
                Attendrix✨
              </h1>

              <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
                Employee Portal
              </p>
            </div>
          </button>

          {/* PROFILE */}

          <div className="flex items-center gap-3">

            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-100 text-sm font-semibold text-sky-700">
              J
            </div>

            <div className="hidden leading-tight sm:block">
              <p className="text-sm font-semibold text-slate-800">
                {user.name}
              </p>

              <p className="text-xs text-slate-400">
                Employee
              </p>
            </div>

          </div>

        </div>

      </header>

      {/* ============================= */}
      {/* MAIN */}
      {/* ============================= */}

      <main className="mx-auto w-full px-5 py-7 sm:px-8 sm:py-9 lg:px-12 lg:py-10 xl:px-16">

        {/* BACK */}

        <button
          type="button"
          onClick={() => navigate("/dashboard")}
          className="mb-6 flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-sky-600"
        >
          <ArrowLeft size={17} />
          Back to Dashboard
        </button>

        {/* PAGE HEADER */}

        <div className="mb-7">

          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            My Profile
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            View and manage your account information.
          </p>

        </div>

        {/* ============================= */}
        {/* PROFILE CARD */}
        {/* ============================= */}

        <section className="w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          {/* TOP PROFILE AREA */}

          <div className="border-b border-slate-100 bg-gradient-to-r from-sky-50 to-white px-5 py-6 sm:px-8 sm:py-7 lg:px-10">

            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

              {/* USER */}

              <div className="flex items-center gap-4">

                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-sky-100 text-xl font-bold text-sky-700 ring-4 ring-white shadow-sm sm:h-20 sm:w-20 sm:text-2xl">
                  J
                </div>

                <div className="min-w-0">

                  <h3 className="text-lg font-bold text-slate-900 sm:text-xl">
                    {user.name}
                  </h3>

                  <div className="mt-1 flex items-center gap-2 text-sm text-slate-500">
                    <Mail size={15} className="shrink-0" />
                    <span className="truncate">
                      {user.email}
                    </span>
                  </div>

                  <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    Active
                  </div>

                </div>

              </div>

              {/* EDIT */}

              <button
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 shadow-sm transition hover:border-sky-200 hover:bg-sky-50 hover:text-sky-600 sm:w-auto"
              >
                <Pencil size={16} />
                Edit Profile
              </button>

            </div>

          </div>

          {/* ============================= */}
          {/* DETAILS */}
          {/* ============================= */}

          <div className="p-5 sm:p-8 lg:p-10">

            <div className="mb-5">

              <h3 className="text-base font-bold text-slate-900">
                Personal Information
              </h3>

              <p className="mt-1 text-sm text-slate-400">
                Your registered employee details.
              </p>

            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

              {/* EMPLOYEE ID */}

              <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4">

                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-white text-sky-600 shadow-sm">
                  <Hash size={18} />
                </div>

                <p className="text-xs font-medium text-slate-400">
                  Employee ID
                </p>

                <p className="mt-1 text-sm font-semibold text-slate-800">
                  {user.employeeId}
                </p>

              </div>

              {/* DEPARTMENT */}

              <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4">

                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-white text-sky-600 shadow-sm">
                  <BriefcaseBusiness size={18} />
                </div>

                <p className="text-xs font-medium text-slate-400">
                  Department
                </p>

                <p className="mt-1 text-sm font-semibold text-slate-800">
                  {user.department}
                </p>

              </div>

              {/* ROLE */}

              <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4">

                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-white text-sky-600 shadow-sm">
                  <User size={18} />
                </div>

                <p className="text-xs font-medium text-slate-400">
                  Role
                </p>

                <p className="mt-1 text-sm font-semibold text-slate-800">
                  {user.role}
                </p>

              </div>

              {/* JOINED DATE */}

              <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4">

                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-white text-sky-600 shadow-sm">
                  <CalendarDays size={18} />
                </div>

                <p className="text-xs font-medium text-slate-400">
                  Joined Date
                </p>

                <p className="mt-1 text-sm font-semibold text-slate-800">
                  {user.joinedDate}
                </p>

              </div>

            </div>

          </div>

          {/* ============================= */}
          {/* ACCOUNT ACTIONS */}
          {/* ============================= */}

          <div className="border-t border-slate-100 px-5 py-5 sm:px-8 lg:px-10">

            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-100"
            >
              <LogOut size={16} />
              Logout
            </button>

          </div>

        </section>

      </main>

    </div>
  );
}

export default Profile;
