import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CalendarDays,
  Download,
  Eye,
  FileText,
  LogOut,
  Search,
  ShieldCheck,
  UserCheck,
  UserX,
  Users,
  X,
} from "lucide-react";

function AdminDashboard() {
  const navigate = useNavigate();

  const employees = [
    {
      id: 1,
      name: "Arun Kumar",
      email: "arun@example.com",
      in: "09:02 AM",
      out: "05:12 PM",
      status: "Present",
    },
    {
      id: 2,
      name: "Priya Sharma",
      email: "priya@example.com",
      in: "09:15 AM",
      out: "05:05 PM",
      status: "Present",
    },
    {
      id: 3,
      name: "Kavin Raj",
      email: "kavin@example.com",
      in: "—",
      out: "—",
      status: "Absent",
    },
    {
      id: 4,
      name: "Divya S",
      email: "divya@example.com",
      in: "08:58 AM",
      out: "05:20 PM",
      status: "Present",
    },
    {
      id: 5,
      name: "Rahul M",
      email: "rahul@example.com",
      in: "—",
      out: "—",
      status: "On Leave",
    },
  ];

  const eods = [
    {
      id: 1,
      name: "Arun Kumar",
      title: "Project Development",
      description: "Completed dashboard development and fixed UI issues.",
      time: "05:20 PM",
      file: "project-update.pdf",
    },
    {
      id: 2,
      name: "Priya Sharma",
      title: "UI Design",
      description: "Completed attendance dashboard UI design.",
      time: "05:35 PM",
      file: "ui-design.pdf",
    },
  ];

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedEod, setSelectedEod] = useState(null);

  const present = employees.filter(
    (e) => e.status === "Present"
  ).length;

  const absent = employees.filter(
    (e) => e.status === "Absent"
  ).length;

  const leave = employees.filter(
    (e) => e.status === "On Leave"
  ).length;

  const filteredEmployees = employees.filter((e) => {
    const matchName = e.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchStatus =
      filter === "All" || e.status === filter;

    return matchName && matchStatus;
  });

  const exportCSV = (data, fileName) => {
    const csv = [
      Object.keys(data[0]).join(","),
      ...data.map((row) =>
        Object.values(row)
          .map((value) => `"${value}"`)
          .join(",")
      ),
    ].join("\n");

    const blob = new Blob([csv], {
      type: "text/csv",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = fileName;
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ============================= */}
      {/* NAVBAR */}
      {/* ============================= */}

      <nav className="border-b border-slate-200 bg-white">

        <div className="mx-auto flex h-16 w-full items-center justify-between px-5 sm:px-8 lg:px-12 xl:px-16">

          <div className="flex items-center gap-3">

            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
              <ShieldCheck size={20} />
            </div>

            <div>
              <h1 className="font-bold text-slate-900">
                Attendrix✨
              </h1>

              <p className="text-[10px] text-slate-400">
                ADMIN PORTAL
              </p>
            </div>

          </div>

          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-600 transition hover:bg-red-50 hover:text-red-600"
          >
            <LogOut size={16} />
            <span className="hidden sm:inline">
              Logout
            </span>
          </button>

        </div>

      </nav>

      {/* ============================= */}
      {/* MAIN */}
      {/* ============================= */}

      <main className="mx-auto w-full px-5 py-7 sm:px-8 sm:py-9 lg:px-12 lg:py-10 xl:px-16">

        {/* ============================= */}
        {/* HEADER */}
        {/* ============================= */}

        <div className="mb-7 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

          <div>

            <div className="flex items-center gap-2 text-sm text-sky-600">
              <CalendarDays size={16} />
              Friday · 21 Aug 2026
            </div>

            <h2 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
              Admin Dashboard
            </h2>

            <p className="text-sm text-slate-500">
              Monitor attendance and employee work.
            </p>

          </div>

          <button
            onClick={() =>
              exportCSV(
                employees,
                "attendrix-attendance.csv"
              )
            }
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 sm:w-auto"
          >
            <Download size={16} />
            Export
          </button>

        </div>

        {/* ============================= */}
        {/* STATS */}
        {/* ============================= */}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <Stat
            title="Total Employees"
            value={employees.length}
            icon={<Users size={20} />}
          />

          <Stat
            title="Present"
            value={present}
            icon={<UserCheck size={20} />}
          />

          <Stat
            title="Absent"
            value={absent}
            icon={<UserX size={20} />}
          />

          <Stat
            title="On Leave"
            value={leave}
            icon={<CalendarDays size={20} />}
          />

        </div>

        {/* ============================= */}
        {/* ATTENDANCE */}
        {/* ============================= */}

        <section className="mt-8 w-full overflow-hidden rounded-2xl border border-slate-200 bg-white">

          <div className="flex flex-col gap-4 border-b border-slate-100 p-5 lg:flex-row lg:items-center lg:justify-between">

            <div>
              <h3 className="font-bold text-slate-900">
                Today's Attendance
              </h3>

              <p className="text-sm text-slate-500">
                Employee attendance records.
              </p>
            </div>

            <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">

              <div className="relative w-full sm:w-56">

                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm outline-none transition focus:border-sky-500"
                />

              </div>

              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none sm:w-auto"
              >
                <option>All</option>
                <option>Present</option>
                <option>Absent</option>
                <option>On Leave</option>
              </select>

            </div>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full min-w-[720px]">

              <thead className="bg-slate-50">

                <tr>
                  <th className="p-4 text-left text-xs text-slate-400">
                    Employee
                  </th>

                  <th className="p-4 text-left text-xs text-slate-400">
                    Time In
                  </th>

                  <th className="p-4 text-left text-xs text-slate-400">
                    Time Out
                  </th>

                  <th className="p-4 text-left text-xs text-slate-400">
                    Status
                  </th>

                  <th className="p-4 text-center text-xs text-slate-400">
                    Export
                  </th>
                </tr>

              </thead>

              <tbody>

                {filteredEmployees.map((e) => (

                  <tr
                    key={e.id}
                    className="border-t border-slate-100 transition hover:bg-slate-50"
                  >

                    <td className="p-4">

                      <div className="flex items-center gap-3">

                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sky-50 text-sm font-bold text-sky-600">
                          {e.name[0]}
                        </div>

                        <div>
                          <p className="text-sm font-semibold">
                            {e.name}
                          </p>

                          <p className="text-xs text-slate-400">
                            {e.email}
                          </p>
                        </div>

                      </div>

                    </td>

                    <td className="p-4 text-sm text-slate-600">
                      {e.in}
                    </td>

                    <td className="p-4 text-sm text-slate-600">
                      {e.out}
                    </td>

                    <td className="p-4">

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          e.status === "Present"
                            ? "bg-emerald-50 text-emerald-600"
                            : e.status === "Absent"
                            ? "bg-red-50 text-red-500"
                            : "bg-amber-50 text-amber-600"
                        }`}
                      >
                        {e.status}
                      </span>

                    </td>

                    <td className="p-4 text-center">

                      <button
                        onClick={() =>
                          exportCSV([e], `${e.name}.csv`)
                        }
                        className="text-sky-600 transition hover:text-sky-800"
                      >
                        <Download size={16} />
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </section>

        {/* ============================= */}
        {/* EOD */}
        {/* ============================= */}

        <section className="mt-8 w-full overflow-hidden rounded-2xl border border-slate-200 bg-white">

          <div className="border-b border-slate-100 p-5">

            <h3 className="font-bold text-slate-900">
              EOD Submissions
            </h3>

            <p className="text-sm text-slate-500">
              Review employee work submissions.
            </p>

          </div>

          <div className="divide-y divide-slate-100">

            {eods.map((eod) => (

              <div
                key={eod.id}
                className="flex flex-col gap-4 p-5 transition hover:bg-slate-50 sm:flex-row sm:items-center sm:justify-between"
              >

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
                    <FileText size={19} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-slate-800">
                      {eod.name}
                    </p>

                    <p className="text-sm text-slate-500">
                      {eod.title}
                    </p>
                  </div>

                </div>

                <button
                  onClick={() => setSelectedEod(eod)}
                  className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-sky-50 px-3 py-2 text-xs font-semibold text-sky-600 transition hover:bg-sky-100 sm:w-auto"
                >
                  <Eye size={14} />
                  View
                </button>

              </div>

            ))}

          </div>

        </section>

      </main>

      {/* ============================= */}
      {/* EOD MODAL */}
      {/* ============================= */}

      {selectedEod && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 sm:p-5">

          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-2xl">

            <div className="flex items-center justify-between border-b p-5">

              <div className="min-w-0 pr-4">

                <p className="text-xs text-sky-600">
                  EOD SUBMISSION
                </p>

                <h3 className="truncate text-lg font-bold text-slate-900 sm:text-xl">
                  {selectedEod.title}
                </h3>

              </div>

              <button
                onClick={() => setSelectedEod(null)}
                className="shrink-0 text-slate-400 transition hover:text-slate-700"
              >
                <X />
              </button>

            </div>

            <div className="space-y-5 p-5 sm:p-6">

              <div>
                <p className="text-xs text-slate-400">
                  Employee
                </p>

                <p className="font-semibold text-slate-800">
                  {selectedEod.name}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-400">
                  Description
                </p>

                <p className="mt-1 text-sm leading-6 text-slate-600">
                  {selectedEod.description}
                </p>
              </div>

              <div className="flex flex-col gap-2 rounded-xl bg-slate-50 p-4 text-sm sm:flex-row sm:items-center sm:justify-between">

                <span className="text-slate-500">
                  Submitted
                </span>

                <span className="font-semibold">
                  {selectedEod.time}
                </span>

              </div>

              <div className="flex items-center gap-2 rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
                <FileText size={16} />
                <span className="break-all">
                  {selectedEod.file}
                </span>
              </div>

            </div>

            <div className="border-t p-4 text-center">

              <button
                onClick={() => setSelectedEod(null)}
                className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Close
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

/* ============================= */
/* STAT CARD */
/* ============================= */

function Stat({ title, value, icon }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

      <div className="flex items-center justify-between">

        <div>
          <p className="text-sm text-slate-500">
            {title}
          </p>

          <p className="mt-2 text-3xl font-bold text-slate-900">
            {value}
          </p>
        </div>

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
          {icon}
        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;
