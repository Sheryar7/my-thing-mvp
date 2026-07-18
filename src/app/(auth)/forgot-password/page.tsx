"use client";

import React, { useState } from "react";
import Link from "next/link";
import { HiOutlineArrowLeft, HiOutlineMail } from "react-icons/hi";
import { FiLock, } from "react-icons/fi";
import { FaRegCheckCircle } from "react-icons/fa";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setIsLoading(true);

        // Simulate API request delay
        setTimeout(() => {
            setIsLoading(false);
            setIsSubmitted(true);
        }, 1200);
    };

    return (
        // Changed bg-[#f8fafc] to bg-transparent so the layout's background images show through!
        <div className="relative min-h-screen w-full bg-transparent overflow-hidden font-sans flex flex-col antialiased">

            {/* BACK TO LOGIN NAV BUTTON */}
            <div className="w-full max-w-7xl mx-auto px-6 pt-8 pb-4 sm:pb-0 z-10 self-start">
                <Link
                    href="/log-in"
                    className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-semibold text-sm transition-colors group"
                >
                    <HiOutlineArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
                    Back to login
                </Link>
            </div>

            {/* CORE CONTAINER: Adaptive Card System */}
            <main className="flex-1 w-full flex items-center justify-center p-4 z-10">
                {/* On mobile, we make it transparent too; on desktop, it becomes the clean white Figma card */}
                <div
                    className="w-full max-w-[400px] bg-white border border-slate-100 rounded-[24px] shadow-sm p-6 sm:p-8 flex flex-col items-center justify-center transition-all duration-300">

                    {!isSubmitted ? (
                        /* VIEW 1: INPUT FORM */

                        <form onSubmit={handleSubmit} className="w-full flex flex-col items-center text-center">
                            {/* Lock Badge */}
                            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mb-6 sm:mb-8">
                                <FiLock className="w-7 h-7 sm:w-9 sm:h-9 stroke-[1.8]" />
                            </div>

                            {/* Headings */}
                            <h1 className="text-2xl sm:text-[28px] font-bold tracking-tight text-slate-900 leading-tight mb-2">
                                Forgot password?
                            </h1>
                            <p className="text-xs sm:text-sm text-slate-400 font-medium max-w-[240px] text-center leading-relaxed mb-6 mx-auto">
                                Enter your email and we'll send you a reset link
                            </p>

                            {/* Input Field Group */}
                            <div className="w-full text-left space-y-2 mb-8">
                                <label htmlFor="email" className="text-sm font-semibold text-slate-800 tracking-wide">
                                    Email address
                                </label>
                                <div className="relative w-full">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                                        <HiOutlineMail className="w-5 h-5 stroke-[1.5]" />
                                    </span>
                                    <input
                                        id="email"
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your email"
                                        className="w-full h-12 pl-12 pr-4 rounded-xl border border-slate-200/80 bg-white text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition-all font-medium"
                                    />
                                </div>
                            </div>

                            {/* Submit CTA */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-sm hover:shadow transition-all text-sm disabled:opacity-70 flex items-center justify-center"
                            >
                                {isLoading ? (
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                ) : (
                                    "Send reset link"
                                )}
                            </button>
                        </form>
                    ) : (
                        /* VIEW 2: CONFIRMATION SUCCESS */

                        <div className="w-full flex flex-col items-center text-center py-6 animate-fadeIn">
                            {/* Checkmark Badge */}
                            <div className="text-indigo-600 mb-6 sm:mb-8">
                                <FaRegCheckCircle className="w-[72px] h-[72px] sm:w-[84px] sm:h-[84px] stroke-[1.2]" />
                            </div>

                            {/* Headings */}
                            <h1 className="text-2xl sm:text-[28px] font-bold tracking-tight text-slate-900 leading-tight mb-2">
                                Check your email
                            </h1>
                            <p className="text-xs sm:text-sm text-slate-400 font-medium max-w-[340px] text-center leading-relaxed">
                                We've sent a password reset link to <span className="text-slate-600 font-semibold break-all">{email}</span>
                            </p>
                        </div>
                    )}

                </div>
            </main>
        </div>
    );
}