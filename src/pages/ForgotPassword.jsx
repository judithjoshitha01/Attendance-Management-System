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
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">

      <div className="w-full max-w-md">

        {/* Back */}
        <button
          type="button"
          onClick={() => navigate("/")}
          className="mb-6 flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
        >
          <ArrowLeft size={17} />
          Back to login
        </button>

        {/* Card */}
        <div className="rounded-3xl border border-white/10 bg-slate-900 p-8 shadow-2xl sm:p-10">

          {/* Icon */}
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-500/10">
            <Mail size={26} className="text-sky-400" />
          </div>

          {!sent ? (
            <>
              {/* Heading */}
              <div className="mb-7">
                <h1 className="text-3xl font-bold text-white">
                  Forgot password?
                </h1>

                <p className="mt-3 text-sm leading-6 text-slate-400">
                  No worries. Enter your registered email address and
                  we'll help you reset your password.
                </p>
              </div>

              {/* Form */}
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
              {/* Success */}
              <div className="mb-7">
                <h1 className="text-3xl font-bold text-white">
                  Check your email
                </h1>

                <p className="mt-3 text-sm leading-6 text-slate-400">
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

          {/* Security */}
          <div className="mt-7 flex items-center justify-center gap-2 text-xs text-slate-500">
            <ShieldCheck size={14} />
            Your account security matters
          </div>

        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;