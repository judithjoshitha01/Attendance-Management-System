import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, FileText, Upload, CheckCircle2, ShieldCheck } from "lucide-react";

function EOD() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  
  // 1. Added real state for file instead of dummy
  const [selectedFile, setSelectedFile] = useState(null);

  // Dummy EOD data for default inputs
  const dummyEOD = {
    title: "Daily Attendance Module",
    description: "Completed the attendance dashboard and worked on the user interface and attendance tracking functionality.",
    filename: "attendance-work.pdf",
  };

  // 2. Handler to catch selected file
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  // 3. Updated handleSubmit for real submission flow
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 1. Check if file is selected
    if (!selectedFile) {
      alert("Please select a work document first!");
      return;
    }

    // 2. Prepare FormData to send file and text details
    const formData = new FormData();
    formData.append("workDocument", selectedFile);
    formData.append("title", dummyEOD.title);
    formData.append("description", dummyEOD.description);
    
    try {
      // 3. Make real API request to your backend route
      const response = await fetch("http://localhost:5000/api/eod/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok && result.success) {
        // Success screen will be triggered
        setSubmitted(true);
      } else {
        alert("Server responded with an error: " + (result.error || "Upload failed"));
      }
    } catch (error) {
      console.error("Network connectivity issue:", error);
      alert("Cannot connect to the backend server. Make sure your server is running on port 5000!");
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50 text-slate-900">
      {/* GRID BACKGROUND */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(to right, #64748b 1px, transparent 1px), linear-gradient(to bottom, #64748b 1px, transparent 1px)`,
          backgroundSize: "46px 46px",
        }}
      />

      {/* BACKGROUND DECORATION */}
      <div className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-sky-100/60 blur-3xl" />
      <div className="pointer-events-none absolute -left-40 -bottom-40 h-96 w-96 rounded-full bg-blue-50 blur-3xl" />

      {/* MAIN CONTAINER */}
      <main className="relative z-10 mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
        {/* NAV / BACK BUTTON */}
        <nav className="mb-8 flex items-center justify-between px-4 sm:px-0">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
          >
            <ArrowLeft size={17} />
            <span>Back to Dashboard</span>
          </button>
        </nav>

        {/* AFTER SUBMISSION SCREEN */}
        {submitted ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8 lg:p-10">
            {/* SUCCESS UI */}
            <div className="mb-8 flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <CheckCircle2 size={24} />
              </div>
              <div>
                <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
                  EOD Submitted Successfully
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Your end of day report has been submitted.
                </p>
              </div>
            </div>

            {/* SUBMITTED DATA DISPLAY */}
            <div className="space-y-6 border-t border-slate-100 pt-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Title
                </p>
                <p className="mt-2 text-base font-semibold text-slate-900">
                  {dummyEOD.title}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Description
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {dummyEOD.description}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Work Submission
                </p>
                <div className="mt-3 flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-sky-50 text-sky-600">
                    <FileText size={20} />
                  </div>
                  <div className="min-w-0 flex-1">
                    {/* Shows real file name if uploaded, else shows default dummy name */}
                    <p className="truncate text-sm font-medium text-slate-800">
                      {selectedFile ? selectedFile.name : dummyEOD.filename}
                    </p>
                    <p className="mt-0.5 text-xs text-slate-400">
                      PDF Document
                    </p>
                  </div>
                  
                  {/* Real Link to click and open file if uploaded */}
                  {selectedFile && (
                    <a
                      href={URL.createObjectURL(selectedFile)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-sky-600 underline hover:text-sky-800"
                    >
                      View File
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* BACK TO DASHBOARD BUTTON */}
            <div className="mt-8 border-t border-slate-100 pt-6 text-right">
              <button
                type="button"
                onClick={() => navigate("/dashboard")}
                className="rounded-xl bg-sky-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        ) : (
          /* EOD FORM SCREEN */
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8 lg:p-10">
            {/* HEADING */}
            <div className="mb-8 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
                <ShieldCheck size={22} />
              </div>
              <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                End of Day Report
              </h1>
            </div>
            <p className="text-sm text-slate-500">
              Submit your work summary for today.
            </p>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              {/* TITLE INPUT */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">
                  Title
                </label>
                <input
                  type="text"
                  defaultValue={dummyEOD.title}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-500/20"
                />
              </div>

              {/* DESCRIPTION INPUT */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">
                  Description
                </label>
                <textarea
                  rows={4}
                  defaultValue={dummyEOD.description}
                  className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-500/20"
                />
              </div>

              {/* FILE UPLOAD SECTION */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">
                  Work Submission
                </label>
                
                {/* Visual Box Container */}
                <div className="relative rounded-xl border border-dashed border-slate-300 bg-slate-50/50 p-6 text-center transition hover:bg-slate-50">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-white shadow-sm text-slate-400">
                    <Upload size={22} />
                  </div>
                  
                  <p className="mt-3 text-sm font-medium text-slate-700">
                    Upload your work document
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    PDF, DOC or DOCX
                  </p>

                  {/* 4. REAL INVISIBLE INPUT AREA OVER THE BOX */}
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="absolute inset-0 cursor-pointer opacity-0"
                  />
                </div>

                {/* 5. DYNAMICALLY RENDER SELECTED FILE WITH PREVIEW LINK */}
                {selectedFile ? (
                  <div className="mt-3 flex items-center gap-3 rounded-xl border border-slate-200 bg-sky-50/40 p-3">
                    <div className="text-sky-600">
                      <FileText size={18} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-semibold text-slate-700">
                        {selectedFile.name}
                      </p>
                    </div>
                    {/* View Link triggers dynamic object URL */}
                    <a
                      href={URL.createObjectURL(selectedFile)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-sky-600 underline hover:text-sky-800"
                  >
                    Preview File
                  </a>
                </div>
              ) : (
                /* Shows original design default text if no file picked yet */
                <div className="min-w-0 flex-1 mt-2 px-1">
                  <p className="truncate text-xs font-medium text-slate-400 italic">
                    No file selected (Displays: {dummyEOD.filename})
                  </p>
                </div>
              )}
            </div>

            {/* SUBMIT BUTTON */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full rounded-xl bg-sky-600 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
              >
                Submit EOD
              </button>
            </div>
          </form>
        </div>
      )}
    </main>
  </div>
);
}

export default EOD;