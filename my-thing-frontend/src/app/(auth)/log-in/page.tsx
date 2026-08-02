"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";

export default function SignInPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Replace with your actual API endpoint
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) throw new Error("Invalid email or password.");

      router.push("/"); // Redirect after successful login
    } catch (err: any) {
      setError(err.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center font-sans select-none px-4">
      <div className="w-full max-w-[350px] md:max-w-[400px] bg-white rounded-3xl border border-slate-100/90 shadow-2xl shadow-slate-200/60 p-6 md:px-10 flex flex-col justify-center transition-all">

        {/* Navigation Tabs Header */}
        <div className="flex w-full mb-3.5 border-b border-slate-100 text-center flex-shrink-0">
          <Link href="/sign-up" className="w-1/2 pb-2 text-xs font-medium text-slate-400 hover:text-[#4f46e5] transition-colors">Sign Up</Link>
          <div className="w-1/2 pb-2 text-xs font-bold text-[#4f46e5] border-b-2 border-[#4f46e5]">Log In</div>
        </div>

        {error && <div className="mb-2.5 p-2 text-[11px] bg-red-50 text-red-600 rounded-xl border border-red-100 font-semibold text-center flex-shrink-0">{error}</div>}

        <div className="text-center mb-3 flex-shrink-0">
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">Welcome back</h2>
          <p className="mt-0.5 text-[11px] text-slate-400 font-medium">Please enter your details to sign in</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-2.5">
          {/* Email Input */}
          <div>
            <label className="block text-[10px] font-semibold text-slate-600 mb-0.5">Email address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-300">
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </div>
              <input type="email" required placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full h-[36px] pl-9 pr-4 rounded-xl border border-slate-200 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-[#4f46e5] text-xs placeholder:text-slate-300 transition-all" />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-[10px] font-semibold text-slate-600 mb-0.5">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-300">
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              </div>
              <input type={showPassword ? "text" : "password"} required placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full h-[36px] pl-9 pr-9 rounded-xl border border-slate-200 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-[#4f46e5] text-xs placeholder:text-slate-300 transition-all" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-[#4f46e5] transition-colors">
                {showPassword ? <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg> : <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" /></svg>}
              </button>
            </div>

            {/* Forgot password moved below the input field */}
            <div className="flex justify-end mt-1">
              <Link href="/forgot-password" className="text-[10px] font-bold text-[#4f46e5] hover:underline">Forgot password?</Link>
            </div>
          </div>

          <Button type="submit" disabled={loading} className="w-full mt-4">
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>

        <div className="my-4 flex items-center justify-center gap-3">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-slate-200" />
          <span className="text-[10px] font-bold text-slate-400 uppercase">Or</span>
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-slate-200" />
        </div>

        <button className="w-full flex items-center justify-center gap-2 h-[36px] border border-slate-200 rounded-xl bg-white hover:bg-slate-50 text-[11px] font-bold text-slate-700 shadow-sm">
          <img src="https://authjs.dev/img/providers/google.svg" alt="Google" className="h-3.5 w-3.5" /> Continue with Google
        </button>

        <div className="text-center mt-3.5">
          <p className="text-[11px] text-slate-400 font-semibold">Don't have an account? <Link href="/sign-up" className="font-bold text-[#4f46e5] hover:underline">Sign Up</Link></p>
        </div>
      </div>
    </div>
  );
}