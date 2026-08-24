import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Upload,
  FileText,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";

function EOD() {
  const navigate = useNavigate();

  const [submitted, setSubmitted] = useState(false);

  // Dummy EOD data
  const dummyEOD = {
    title: "Daily Attendance Module",
    description:
      "Completed the attendance dashboard and worked on the user interface and attendance tracking functionality.",
    fileName: "attendance-work.pdf",
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50 text-slate-900">
      {/* GRID BACKGROUND */}
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

      {/* BACKGROUND DECORATION */}
      <div className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-sky-100/60 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-blue-50 blur-3xl" />

      {/* NAVBAR */}
      <nav className="relative z-20 border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* LOGO */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50">
              <ShieldCheck
                size={22}
                className="text-sky-600"
              />
            </div>

            <div>
              <span className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
                Attendrix✨
              </span>

              <div className="h-0.5 w-7 rounded-full bg-sky-500" />
            </div>
          </div>

          {/* BACK BUTTON */}
          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
          >
            <ArrowLeft size={17} />
            <span>Dashboard</span>
          </button>
        </div>
      </nav>

      {/* MAIN */}
      <main className="relative z-10 mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
        {/* HEADING */}
        <div className="mb-8 sm:mb-10">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            End of Day Report
          </h1>

          <p className="mt-2 text-sm text-slate-500 sm:text-base">
            Submit your work summary for today.
          </p>
        </div>

        {/* AFTER SUBMISSION */}
        {submitted ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8 lg:p-10">
            {/* SUCCESS */}
            <div className="mb-8 flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50">
                <CheckCircle2
                  size={24}
                  className="text-emerald-600"
                />
              </div>

              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  EOD Submitted Successfully
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Your end of day report has been submitted.
                </p>
              </div>
            </div>

            {/* TITLE */}
            <div className="border-b border-slate-100 pb-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Title
              </p>

              <p className="mt-2 text-base font-semibold text-slate-900">
                {dummyEOD.title}
              </p>
            </div>

            {/* DESCRIPTION */}
            <div className="border-b border-slate-100 py-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Description
              </p>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                {dummyEOD.description}
              </p>
            </div>

            {/* WORK SUBMISSION */}
            <div className="pt-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Work Submission
              </p>

              <div className="mt-3 flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white">
                  <FileText
                    size={20}
                    className="text-sky-600"
                  />
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-slate-800">
                    {dummyEOD.fileName}
                  </p>

                  <p className="mt-0.5 text-xs text-slate-400">
                    PDF Document
                  </p>
                </div>
              </div>
            </div>

            {/* BACK */}
            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="mt-8 w-full rounded-xl bg-sky-600 py-3 text-sm font-semibold text-white transition hover:bg-sky-700"
            >
              Back to Dashboard
            </button>
          </div>
        ) : (
          /* EOD FORM */
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8 lg:p-10"
          >
            {/* TITLE */}
            <div className="mb-6">
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Title
              </label>

              <input
                type="text"
                defaultValue={dummyEOD.title}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-500/10"
              />
            </div>

            {/* DESCRIPTION */}
            <div className="mb-6">
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Description
              </label>

              <textarea
                rows="6"
                defaultValue={dummyEOD.description}
                className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-500/10"
              />
            </div>

            {/* WORK SUBMISSION */}
            <div className="mb-8">
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Work Submission
              </label>

              <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-5 text-center sm:p-8">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm">
                  <Upload
                    size={22}
                    className="text-sky-600"
                  />
                </div>

                <p className="mt-3 text-sm font-medium text-slate-700">
                  Upload your work document
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  PDF, DOC or DOCX
                </p>

                {/* DUMMY FILE */}
                <div className="mx-auto mt-4 flex w-full max-w-md items-center gap-3 rounded-lg border border-slate-200 bg-white p-3 text-left">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-sky-50">
                    <FileText
                      size={20}
                      className="text-sky-600"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-slate-700">
                      {dummyEOD.fileName}
                    </p>

                    <p className="text-xs text-slate-400">
                      Dummy document
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              className="w-full rounded-xl bg-sky-600 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700 hover:shadow-md"
            >
              Submit EOD
            </button>
          </form>
        )}
      </main>
    </div>
  );
}

export default EOD;
