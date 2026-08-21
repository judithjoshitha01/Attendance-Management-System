import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Mail, ShieldCheck } from "lucide-react";

function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) return;

    setSent(true);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-6 sm:px-6 sm:py-8">

      <div className="w-full max-w-md">

        {/* ============================= */}
        {/* BACK */}
        {/* ============================= */}

        <button
          type="button"
          onClick={() => navigate("/")}
          className="mb-5 flex items-center gap-2 text-sm text-slate-400 transition hover:text-white sm:mb-6"
        >
          <ArrowLeft size={17} />
          Back to login
        </button>

        {/* ============================= */}
        {/* CARD */}
        {/* ============================= */}

        <div className="rounded-2xl border border-white/10 bg-slate-900 p-5 shadow-2xl sm:rounded-3xl sm:p-8 lg:p-10">

          {/* ============================= */}
          {/* ICON */}
          {/* ============================= */}

          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-sky-500/10 sm:mb-6 sm:h-14 sm:w-14 sm:rounded-2xl">

            <Mail
              size={24}
              className="text-sky-400 sm:h-[26px] sm:w-[26px]"
            />

          </div>

          {!sent ? (
            <>
              {/* ============================= */}
              {/* HEADING */}
              {/* ============================= */}

              <div className="mb-6 sm:mb-7">

                <h1 className="text-2xl font-bold text-white sm:text-3xl">
                  Forgot password?
                </h1>

                <p className="mt-3 text-sm leading-6 text-slate-400">
                  No worries. Enter your registered email address and
                  we'll help you reset your password.
                </p>

              </div>

              {/* ============================= */}
              {/* FORM */}
              {/* ============================= */}

              <form onSubmit={handleSubmit}>

                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Email address
                </label>

                <div className="relative mb-5">

                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                  />

                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-slate-700 bg-slate-800 py-3.5 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                  />

                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 py-3.5 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition hover:-translate-y-0.5 hover:shadow-sky-500/30"
                >
                  Send reset link
                </button>

              </form>
            </>
          ) : (
            <>
              {/* ============================= */}
              {/* SUCCESS */}
              {/* ============================= */}

              <div className="mb-6 sm:mb-7">

                <h1 className="text-2xl font-bold text-white sm:text-3xl">
                  Check your email
                </h1>

                <p className="mt-3 break-words text-sm leading-6 text-slate-400">
                  If an account exists for{" "}
                  <span className="font-medium text-sky-400">
                    {email}
                  </span>
                  , we've sent instructions to reset your password.
                </p>

              </div>

              <button
                type="button"
                onClick={() => navigate("/")}
                className="w-full rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5"
              >
                Back to login
              </button>
            </>
          )}

          {/* ============================= */}
          {/* SECURITY */}
          {/* ============================= */}

          <div className="mt-6 flex items-center justify-center gap-2 text-center text-xs text-slate-500 sm:mt-7">

            <ShieldCheck size={14} />

            Your account security matters

          </div>

        </div>
      </div>

    </div>
  );
}

export default ForgotPassword;
