import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, CheckCircle2} from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div
            className="min-h-screen flex items-center justify-center"
            style={{
                background: "linear-gradient(135deg, #0a1628 0%, #0d1f3c 40%, #0a2a2a 100%)",
                fontFamily: "'Segoe UI', sans-serif",
            }}
        >
            {/* Background wave texture */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
                <div
                    className="absolute"
                    style={{
                        width: "500px",
                        height: "500px",
                        borderRadius: "50%",
                        background: "radial-gradient(circle, rgba(0,229,200,0.06) 0%, transparent 70%)",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%,-50%)",
                    }}
                />
            </div>

            {/* Card */}
            <div
                className="relative w-full max-w-sm mx-4 rounded-2xl px-8 py-10"
                style={{
                    background: "rgba(10, 22, 40, 0.85)",
                    border: "1px solid rgba(0, 229, 200, 0.15)",
                    backdropFilter: "blur(12px)",
                    boxShadow: "0 0 60px rgba(0, 229, 200, 0.07), 0 20px 60px rgba(0,0,0,0.5)",
                    zIndex: 1,
                }}
            >
                {/* Logo */}
                <div className="flex items-center justify-center gap-2 mb-8">
                    <CheckCircle2 size={22} color="#00e5c8" />
                    <span
                        className="text-xl font-bold uppercase"
                        style={{ color: "#00e5c8", letterSpacing: "0.2em" }}
                    >
                        Taskify
                    </span>
                </div>

                <div className="text-center mb-8">
                    <h1 className="text-white text-lg font-semibold mb-1">Welcome back</h1>
                    <p className="text-sm" style={{ color: "#7a9ab8" }}>
                        Access your secure dashboard protocol.
                    </p>
                </div>

                <form>
                <div className="mb-5">
                    <label
                        className="block text-xs font-bold tracking-widest mb-2 uppercase"
                        style={{ color: "#00e5c8" }}
                    >
                        Email Address
                    </label>
                    <div
                        className="flex items-center rounded-lg px-4 py-3 gap-3"
                        style={{
                            background: "rgba(255,255,255,0.04)",
                            border: "1px solid rgba(0, 229, 200, 0.2)",
                        }}
                    >
                        <Mail size={16} color="#7a9ab8" />
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="name@company.com"
                            className="bg-transparent flex-1 text-sm outline-none"
                            style={{ color: "#c8dae8" }}
                        />
                    </div>
                </div>

                {/* Password Field */}
                <div className="mb-7">
                    <div className="flex justify-between items-center mb-2">
                        <label className="text-xs font-bold tracking-widest uppercase" style={{ color: "#00e5c8" }}>
                            Password
                        </label>
                        <a href="#" className="text-xs font-semibold" style={{ color: "#00e5c8" }}>
                            Forgot Password?
                        </a>
                    </div>
                    <div
                        className="flex items-center rounded-lg px-4 py-3 gap-3"
                        style={{
                            background: "rgba(255,255,255,0.04)",
                            border: "1px solid rgba(0, 229, 200, 0.2)",
                        }}
                    >
                        <Lock size={16} color="#7a9ab8" />
                        <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="bg-transparent flex-1 text-sm outline-none"
                            style={{ color: "#c8dae8" }}
                        />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="focus:outline-none">
                            {showPassword ? <EyeOff size={16} color="#7a9ab8" /> : <Eye size={16} color="#7a9ab8" />}
                        </button>
                    </div>
                </div>

                {/* Sign In Button */}
                <button
                type="submit"
                    className="w-full py-3 rounded-full text-sm font-semibold text-gray-900 flex items-center justify-center gap-2 transition-all duration-200 hover:opacity-90 active:scale-95"
                    style={{
                        background: "linear-gradient(90deg, #00e5c8, #00cfb4)",
                        boxShadow: "0 0 24px rgba(0, 229, 200, 0.35)",
                    }}
                >
                    Sign In <span>→</span>
                </button>


                </form>

                {/* Divider */}
                <div className="flex items-center gap-3 my-6">
                    <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.08)" }} />
                    <span className="text-xs tracking-widest uppercase" style={{ color: "#4a6a82" }}>
                        or continue with
                    </span>
                    <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.08)" }} />
                </div>

                {/* Social Buttons */}
                <div className="flex gap-3 mb-8">
                    <button
                        className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition-all duration-200 hover:opacity-80 active:scale-95"
                        style={{
                            background: "rgba(255,255,255,0.06)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            color: "#c8dae8",
                        }}
                    >
                        <FcGoogle size={16} />
                        Google
                    </button>

                    <button
                        className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition-all duration-200 hover:opacity-80 active:scale-95"
                        style={{
                            background: "rgba(255,255,255,0.06)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            color: "#c8dae8",
                        }}
                    >
                        <FaGithub size={16} />
                        GitHub
                    </button>
                </div>

                {/* Sign Up */}
                <p className="text-center text-sm" style={{ color: "#7a9ab8" }}>
                    Don't have an account?{" "}
                    <Link to={"/register"} href="#" className="font-semibold" style={{ color: "#00e5c8" }}>
                        Sign Up
                    </Link>
                </p>

                {/* Footer */}
                <div className="mt-8 text-center space-y-1">
                    <div className="flex justify-center gap-4 text-xs" style={{ color: "#3a5a72" }}>
                        <a href="#">Privacy</a>
                        <a href="#">Terms</a>
                        <a href="#">Support</a>
                    </div>
                    <p className="text-xs" style={{ color: "#2a4a5a" }}>
                        © 2024 Neon Task. Secure Protocol Active.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;