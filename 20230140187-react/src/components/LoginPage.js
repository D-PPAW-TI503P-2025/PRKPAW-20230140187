import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function LoginPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const res = await axios.post("http://localhost:3001/api/auth/login", {
                email,
                password,
            });

            localStorage.setItem("token", res.data.token);
            navigate("/dashboard");
        } catch (err) {
            setError(err.response?.data?.message || "Login gagal");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center 
        bg-gradient-to-br from-black via-gray-900 to-[#0a0a0f] p-6">

            <div className="absolute inset-0 bg-gradient-to-r 
            from-purple-700/10 via-indigo-700/10 to-pink-700/10 blur-3xl"></div>

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative bg-[#1a1a25]/70 backdrop-blur-xl border border-[#333344]
                p-10 rounded-3xl shadow-[0_0_25px_rgba(120,80,255,0.2)] w-full max-w-md"
            >
                <h1 className="text-3xl font-bold text-white text-center mb-6">
                    Login
                </h1>

                <form onSubmit={handleLogin} className="space-y-6">

                    {/* Email */}
                    <div>
                        <label className="text-gray-300">Email</label>
                        <input
                            type="email"
                            className="w-full px-4 py-3 mt-1 rounded-lg 
                            bg-[#0f0f17] border border-gray-700 text-white 
                            focus:ring-2 focus:ring-purple-500 outline-none"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="text-gray-300">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                className="w-full px-4 py-3 mt-1 rounded-lg bg-[#0f0f17] border 
                                border-gray-700 text-white focus:ring-2 focus:ring-purple-500 outline-none pr-12"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />

                            {/* Eye Icon */}
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-white"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    // Eye Off
                                    <svg width="22" height="22" stroke="currentColor" fill="none" strokeWidth="2"
                                        strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8
                                        a20.8 20.8 0 0 1 5.06-6.94M9 9a3 3 0 0 1 4 4" />
                                        <line x1="1" y1="1" x2="23" y2="23" />
                                        <path d="M10.58 5.51A10.94 10.94 0 0 1 12 4c7 0 11 8 11 8
                                        a21.18 21.18 0 0 1-2.16 3.19" />
                                    </svg>
                                ) : (
                                    // Eye
                                    <svg width="22" height="22" stroke="currentColor" fill="none" strokeWidth="2"
                                        strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M1 12s4-8 11-8 11 8 11 8
                                        -4 8-11 8-11-8-11-8z" />
                                        <circle cx="12" cy="12" r="3" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        className="w-full py-3 rounded-lg bg-gradient-to-r 
                        from-purple-600 to-indigo-600 text-white font-semibold 
                        shadow-lg hover:shadow-purple-600/40 transition"
                    >
                        Login
                    </button>
                </form>

                {error && <p className="text-red-400 text-center mt-4">{error}</p>}

                <p className="text-gray-400 text-center mt-6">
                    Belum punya akun?{" "}
                    <span
                        onClick={() => navigate("/register")}
                        className="text-purple-400 hover:text-purple-300 cursor-pointer"
                    >
                        Register di sini
                    </span>
                </p>
            </motion.div>
        </div>
    );
}
