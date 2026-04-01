import { useState } from "react";
import {
    User,
    Mail,
    Lock,
    Eye,
    EyeOff,
    Check,
    CheckCircle2,
    BarChart2,
    ShieldCheck,
} from "lucide-react";
import { Link } from "react-router-dom";

const Register = () => {

    const [FullNamr, setFullName] = useState("");
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [PasswordShow, setPasswordShow] = useState(false);
    const [Password2, setPassword2] = useState("");
    const [Password2Show, setPassword2Show] = useState(false);
    const [Condition, setCondition] = useState(false);

    const iconColor = "#7a9ab8";
    const teal = "#00e5c8";

    return (
        <div
            className="min-h-screen flex items-center justify-center"
            style={{
                background: "linear-gradient(150deg, #07111f 0%, #0b1c35 45%, #091e1e 100%)",
                fontFamily: "'Segoe UI', sans-serif",
            }}
        >

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

            <div
                className="relative w-full max-w-sm mx-4 rounded-2xl px-7 py-8"
                style={{
                    background: "rgba(9, 20, 38, 0.88)",
                    border: "1px solid rgba(0, 229, 200, 0.13)",
                    backdropFilter: "blur(14px)",
                    boxShadow: "0 0 80px rgba(0,229,200,0.06), 0 24px 60px rgba(0,0,0,0.55)",
                    zIndex: 1,
                }}
            >

                <div className="flex items-center justify-center gap-2 mb-6">
                    <CheckCircle2 size={22} color={teal} />
                    <span
                        className="text-lg font-bold uppercase"
                        style={{ color: teal, letterSpacing: "0.22em" }}
                    >
                        Taskify
                    </span>
                </div>

                <div className="text-center mb-6">
                    <h1 className="text-white text-base font-semibold mb-1">Initialize Protocol</h1>
                    <p
                        className="text-xs font-bold uppercase"
                        style={{ color: teal, letterSpacing: "0.18em" }}
                    >
                        Secure Account Registration
                    </p>
                </div>


                <form>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1.5" style={{ color: "#c8dae8" }}>
                            Full Name
                        </label>
                        <div
                            className="flex items-center rounded-lg px-4 py-3 gap-3"
                            style={{
                                background: "rgba(255,255,255,0.04)",
                                border: "1px solid rgba(0,229,200,0.18)",
                            }}
                        >
                            <User size={15} color={iconColor} />
                            <input
                                type="text"
                                value={FullNamr}
                                onChange={(e) => { setFullName(e.target.value) }}
                                placeholder="Enter your full name"
                                className="bg-transparent flex-1 text-sm outline-none"
                                style={{ color: "#c8dae8" }}
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1.5" style={{ color: "#c8dae8" }}>
                            Email Address
                        </label>
                        <div
                            className="flex items-center rounded-lg px-4 py-3 gap-3"
                            style={{
                                background: "rgba(255,255,255,0.04)",
                                border: "1px solid rgba(0,229,200,0.18)",
                            }}
                        >
                            <Mail size={15} color={iconColor} />
                            <input
                                type="email"
                                value={Email}
                                onChange={(e) => { setEmail(e.target.value) }}
                                placeholder="name@protocol.io"
                                className="bg-transparent flex-1 text-sm outline-none"
                                style={{ color: "#c8dae8" }}
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1.5" style={{ color: "#c8dae8" }}>
                            Password
                        </label>
                        <div
                            className="flex items-center rounded-lg px-4 py-3 gap-3"
                            style={{
                                background: "rgba(255,255,255,0.04)",
                                border: "1px solid rgba(0,229,200,0.18)",
                            }}
                        >
                            <Lock size={15} color={iconColor} />
                            <input
                                value={Password}
                                onChange={(e) => { setPassword(e.target.value) }}
                                type={PasswordShow ? "text" : "password"}
                                placeholder="••••••••••••"
                                className="bg-transparent flex-1 text-sm outline-none"
                                style={{ color: "#c8dae8" }}
                            />
                            <button type="button" onClick={() => setPasswordShow(!PasswordShow)} className="focus:outline-none">
                                {PasswordShow ? <EyeOff size={15} color={iconColor} /> : <Eye size={15} color={iconColor} />}
                            </button>
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1.5" style={{ color: "#c8dae8" }}>
                            Confirm Password
                        </label>
                        <div
                            className="flex items-center rounded-lg px-4 py-3 gap-3"
                            style={{
                                background: "rgba(255,255,255,0.04)",
                                border: "1px solid rgba(0,229,200,0.18)",
                            }}
                        >
                            <Lock size={15} color={iconColor} />
                            <input
                                value={Password2}
                                onChange={(e) => { setPassword2(e.target.value) }}
                                type={Password2Show ? "text" : "password"}
                                placeholder="••••••••••••"
                                className="bg-transparent flex-1 text-sm outline-none"
                                style={{ color: "#c8dae8" }}
                            />
                            <button type="button" onClick={() => setPassword2Show(!Password2Show)} className="focus:outline-none">
                                {Password2Show ? <EyeOff size={15} color={iconColor} /> : <Eye size={15} color={iconColor} />}
                            </button>
                        </div>
                    </div>

                    <div className="flex items-start gap-3 mb-6 mt-2">
                        <button
                            type="button"
                            onClick={() => { Condition ? setCondition(false) : setCondition(true) }}
                            className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center transition-all duration-200"
                            style={{
                                border: `2px solid ${Condition ? teal : "rgba(0,229,200,0.35)"}`,
                                background: Condition ? "rgba(0,229,200,0.15)" : "transparent",
                            }}
                        >
                            {Condition && <Check size={10} color={teal} strokeWidth={3} />}
                        </button>
                        <p className="text-xs leading-relaxed" style={{ color: "#7a9ab8" }}>
                            I agree to the{" "}
                            <a href="#" className="font-semibold" style={{ color: teal }}>
                                Terms and Conditions
                            </a>{" "}
                            and privacy protocols.
                        </p>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3.5 rounded-full text-sm font-bold uppercase flex items-center justify-center transition-all duration-200 hover:opacity-90 active:scale-95"
                        style={{
                            background: "linear-gradient(90deg, #00e5c8, #00cfb4)",
                            boxShadow: "0 0 28px rgba(0,229,200,0.4)",
                            color: "#07111f",
                            letterSpacing: "0.15em",
                        }}
                    >
                        Create Account
                    </button>

                    <p className="text-center text-sm mt-5" style={{ color: "#7a9ab8" }}>
                        Already have an account?{" "}
                        <Link to={"/"} className="font-semibold" style={{ color: teal }}>
                            Log In
                        </Link>
                    </p>

                </form>

                <div
                    className="mt-6 pt-4"
                    style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
                >
                    <div
                        className="flex justify-center items-center gap-4 text-xs mb-2"
                        style={{ color: "#2e4e62" }}
                    >
                        <span className="flex items-center gap-1">
                            <ShieldCheck size={10} />
                            256-BIT ENCRYPTED
                        </span>
                        <a href="#" style={{ color: "#2e4e62" }}>PRIVACY</a>
                        <a href="#" style={{ color: "#2e4e62" }}>TERMS</a>
                        <span className="flex items-center gap-1">
                            <BarChart2 size={10} />
                            CLOUD SYNC READY
                        </span>
                    </div>
                    <p className="text-center text-xs" style={{ color: "#1e3a4a" }}>
                        © 2024 NEON TASK. SECURE PROTOCOL ACTIVE.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;