"use client";

import React, { useState } from "react";
import Link from "next/link";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { MdRefresh } from "react-icons/md"; 
import { FaRegCheckCircle } from "react-icons/fa";

export default function SetNewPasswordPage() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!password || !confirmPassword) return;
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        setIsLoading(true);

        // Simulate API request delay
        setTimeout(() => {
            setIsLoading(false);
            setIsSubmitted(true);
        }, 1200);
    };

    return (
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
                <div className="w-full max-w-[420px] bg-white border border-slate-100 rounded-[24px] shadow-sm p-6 sm:p-8 flex flex-col items-center justify-center transition-all duration-300">

                    {!isSubmitted ? (
                        /* VIEW 1: SET NEW PASSWORD FORM */
                        <form onSubmit={handleSubmit} className="w-full flex flex-col items-center text-center">

                            {/* Rotation/Reset Lock Badge */}
                            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mb-6 relative">
                                <FiLock className="w-7 h-7 sm:w-9 sm:h-9 stroke-[1.8]" />
                                <MdRefresh className="absolute w-5 h-5 bottom-1 right-1 bg-white text-indigo-600 rounded-full p-0.5 shadow-sm" />
                            </div>

                            {/* Headings */}
                            <h1 className="text-2xl sm:text-[28px] font-bold tracking-tight text-slate-900 leading-tight mb-2">
                                Set new password
                            </h1>
                            <p className="text-xs sm:text-sm text-slate-400 font-medium max-w-[280px] text-center leading-relaxed mb-6 mx-auto">
                                Enter your new password to reset your account password
                            </p>

                            {/* Input Field: Password */}
                            <div className="w-full text-left space-y-1.5 mb-4">
                                <label htmlFor="password" className="text-sm font-semibold text-slate-800 tracking-wide">
                                    Password
                                </label>
                                <div className="relative w-full">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                                        <FiLock className="w-4 h-4 stroke-[2]" />
                                    </span>
                                    <input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter your password"
                                        className="w-full h-11 pl-11 pr-11 rounded-xl border border-slate-200/80 bg-white text-slate-900 placeholder:text-slate-300 text-xs focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition-all font-medium"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                    >
                                        {showPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>

                            {/* Input Field: Confirm Password */}
                            <div className="w-full text-left space-y-1.5 mb-6">
                                <label htmlFor="confirmPassword" className="text-sm font-semibold text-slate-800 tracking-wide">
                                    Confirm password
                                </label>
                                <div className="relative w-full">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                                        <FiLock className="w-4 h-4 stroke-[2]" />
                                    </span>
                                    <input
                                        id="confirmPassword"
                                        type={showConfirmPassword ? "text" : "password"}
                                        required
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="Confirm your password"
                                        className="w-full h-11 pl-11 pr-11 rounded-xl border border-slate-200/80 bg-white text-slate-900 placeholder:text-slate-300 text-xs focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition-all font-medium"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                    >
                                        {showConfirmPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>

                            {/* Submit CTA */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full h-11 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-sm hover:shadow transition-all text-sm disabled:opacity-70 flex items-center justify-center"
                            >
                                {isLoading ? (
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                ) : (
                                    "Reset password"
                                )}
                            </button>
                        </form>
                    ) : (
                        /* VIEW 2: PASSWORD UPDATED CONFIRMATION */
                        <div className="w-full flex flex-col items-center text-center py-4 animate-fadeIn">
                            {/* Checkmark Badge */}
                            <div className="text-indigo-600 mb-6">
                                <FaRegCheckCircle className="w-[76px] h-[76px] sm:w-[84px] sm:h-[84px] stroke-[1.2]" />
                            </div>

                            {/* Headings */}
                            <h1 className="text-2xl sm:text-[28px] font-bold tracking-tight text-slate-900 leading-tight mb-2">
                                Password Updated
                            </h1>
                            <p className="text-xs sm:text-sm text-slate-400 font-medium max-w-[260px] text-center leading-relaxed">
                                Your password has been changed successfully
                            </p>
                        </div>
                    )}

                </div>
            </main>
        </div>
    );
}