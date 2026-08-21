import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
} from "lucide-react";

function Login() {
  const navigate = useNavigate();

  const [role, setRole] = useState("user");
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // ==========================================
  // SIGN IN
  // ==========================================

  const handleLogin = (e) => {
    e.preventDefault();

    setEmailError("");
    setPasswordError("");

    let valid = true;

    if (email.trim() === "") {
      setEmailError("Email address is required.");
      valid = false;
    }

    if (password.trim() === "") {
      setPasswordError("Password is required.");
      valid = false;
    }

    if (!valid) {
      return;
    }

    // Dummy login
    if (role === "user") {
      navigate("/dashboard");
    } else {
      navigate("/admin");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6">

      <div className="flex min-h-[calc(100vh-3rem)] items-center justify-center">

        {/* MAIN CONTAINER */}
        <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl lg:grid-cols-[0.8fr_1.2fr]">

          {/* ================================================= */}
          {/* LEFT SIDE */}
          {/* ================================================= */}

          <div className="relative hidden min-h-[600px] items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-sky-800 to-sky-500 lg:flex">

            {/* Background decoration */}

            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-sky-400/15 blur-3xl" />

            <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-blue-400/10 blur-3xl" />

            {/* Content */}

            <div className="relative z-10 px-8 text-center">

              {/* Logo */}

              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md">

                <ShieldCheck
                  size={32}
                  className="text-sky-300"
                />

              </div>

              {/* Brand */}

              <h1 className="text-3xl font-bold text-white">
                Attendrix✨
              </h1>

              <p className="mt-3 text-sm text-white/70">
                Smart attendance. Simple workflow.
              </p>

              {/* Features */}

              <div className="mx-auto mt-8 space-y-4 text-left">

                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 shrink-0 rounded-full bg-sky-300" />

                  <span className="text-sm text-white/80">
                    Track attendance effortlessly
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 shrink-0 rounded-full bg-sky-300" />

                  <span className="text-sm text-white/80">
                    Manage work with ease
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 shrink-0 rounded-full bg-sky-300" />

                  <span className="text-sm text-white/80">
                    Get accurate attendance insights
                  </span>
                </div>

              </div>

            </div>
          </div>

          {/* ================================================= */}
          {/* RIGHT SIDE */}
          {/* ================================================= */}

          <div className="flex items-center justify-center bg-white px-8 py-10 sm:px-12">

            <div className="w-full max-w-md">

              {/* HEADING */}

              <div className="mb-7">

                <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                  Welcome back!
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  Sign in to continue to your workspace.
                </p>

              </div>

              {/* ================================================= */}
              {/* FORM */}
              {/* ================================================= */}

              <form onSubmit={handleLogin} noValidate>

                {/* ROLE */}

                <div className="mb-6">

                  <p className="mb-3 text-sm font-medium text-slate-700">
                    Login as
                  </p>

                  <div className="grid grid-cols-2 gap-3">

                    {/* USER */}

                    <button
                      type="button"
                      onClick={() => setRole("user")}
                      className={`rounded-xl border px-4 py-3 text-sm font-medium transition ${
                        role === "user"
                          ? "border-sky-500 bg-sky-50 text-sky-600"
                          : "border-slate-200 bg-slate-50 text-slate-500 hover:border-slate-300"
                      }`}
                    >
                      User
                    </button>

                    {/* ADMIN */}

                    <button
                      type="button"
                      onClick={() => setRole("admin")}
                      className={`rounded-xl border px-4 py-3 text-sm font-medium transition ${
                        role === "admin"
                          ? "border-sky-500 bg-sky-50 text-sky-600"
                          : "border-slate-200 bg-slate-50 text-slate-500 hover:border-slate-300"
                      }`}
                    >
                      Admin
                    </button>

                  </div>

                </div>

                {/* ================================================= */}
                {/* EMAIL */}
                {/* ================================================= */}

                <div className="mb-5">

                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Email address
                  </label>

                  <div className="relative">

                    <Mail
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setEmailError("");
                      }}
                      placeholder="you@example.com"
                      className={`w-full rounded-xl border bg-slate-50 py-3.5 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-sky-500/10 ${
                        emailError
                          ? "border-red-300 focus:border-red-400"
                          : "border-slate-200 focus:border-sky-500"
                      }`}
                    />

                  </div>

                  {emailError && (
                    <p className="mt-1.5 text-xs text-red-500">
                      {emailError}
                    </p>
                  )}

                </div>

                {/* ================================================= */}
                {/* PASSWORD */}
                {/* ================================================= */}

                <div className="mb-5">

                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Password
                  </label>

                  <div className="relative">

                    <LockKeyhole
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setPasswordError("");
                      }}
                      placeholder="Enter your password"
                      className={`w-full rounded-xl border bg-slate-50 py-3.5 pl-11 pr-12 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-sky-500/10 ${
                        passwordError
                          ? "border-red-300 focus:border-red-400"
                          : "border-slate-200 focus:border-sky-500"
                      }`}
                    />

                    {/* SHOW PASSWORD */}

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword((prev) => !prev)
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700"
                    >
                      {showPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>

                  </div>

                  {passwordError && (
                    <p className="mt-1.5 text-xs text-red-500">
                      {passwordError}
                    </p>
                  )}

                </div>

                {/* ================================================= */}
                {/* REMEMBER + FORGOT */}
                {/* ================================================= */}

                <div className="mb-6 flex items-center justify-between">

                  <label className="flex items-center gap-2 text-sm text-slate-500">

                    <input
                      type="checkbox"
                      className="h-4 w-4 accent-sky-500"
                    />

                    Remember me

                  </label>

                  <button
                    type="button"
                    onClick={() => navigate("/forgot-password")}
                    className="text-sm font-medium text-sky-600 transition hover:text-sky-700"
                  >
                    Forgot password?
                  </button>

                </div>

                {/* ================================================= */}
                {/* SIGN IN */}
                {/* ================================================= */}

                <button
                  type="submit"
                  className="w-full rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 py-3.5 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition hover:-translate-y-0.5 hover:shadow-sky-500/30"
                >
                  Sign in
                </button>

              </form>

              {/* ================================================= */}
              {/* DIVIDER */}
              {/* ================================================= */}

              <div className="my-6 flex items-center gap-3">

                <div className="h-px flex-1 bg-slate-200" />

                <span className="text-xs font-medium text-slate-400">
                  OR
                </span>

                <div className="h-px flex-1 bg-slate-200" />

              </div>

              {/* ================================================= */}
              {/* GOOGLE - UI ONLY */}
              {/* ================================================= */}

              <button
                type="button"
                className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white py-3.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:shadow-sm"
              >

                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-sm font-bold text-blue-600">
                  G
                </span>

                Continue with Google

              </button>

              {/* ================================================= */}
              {/* SECURITY */}
              {/* ================================================= */}

              <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-400">

                <ShieldCheck size={14} />

                Secure workspace access

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;