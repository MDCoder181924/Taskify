import { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Cpu, 
  ArrowRight, 
  Fingerprint, 
  ShieldCheck,
  ArrowLeft,
  Shield,
  Layers,
  Terminal,
  Activity,
  Radio
} from 'lucide-react';
import {Link , useNavigate} from "react-router-dom";
import api from '../../api/axios'
import { useUser } from '../../context/UserContext';
import toast from 'react-hot-toast';

export default function AuthLogin({ onNavigate }) {
  const backdropRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState(0);

  // Mouse move parallax for camera shifts
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const naviget = useNavigate();
  const {setUser} = useUser();
  const loginUser = async() =>{
    try{
      const res = await api.post("/auth/user/login" , {
        userEmail :email ,
        userPassword:password, 
      })
      setUser(res.data.existingUser);
      toast.success("Login successful")
      naviget("/dashboard")
    }catch(error){
      console.log(error);
      toast.error("your data not found");
    }
  }

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 12,
        y: (e.clientY / window.innerHeight - 0.5) * 12,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Three.js Cryptographic Galaxy Stardust backdrop (non-intrusive, very elegant)
  useEffect(() => {
    if (!backdropRef.current) return;

    const width = backdropRef.current.clientWidth;
    const height = backdropRef.current.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 1000);
    camera.position.z = 32;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    backdropRef.current.appendChild(renderer.domElement);

    // Drifting galaxy stardust
    const particleCount = 450;
    const particlesGeom = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const speeds = [];

    // Color definitions for stardust
    const colorPalette = [
      new THREE.Color(0xef2f29), // Primary Red
      new THREE.Color(0xff6b4a), // Secondary Orange
      new THREE.Color(0xffa940), // Tertiary Gold
    ];

    for (let i = 0; i < particleCount; i++) {
      // Position particles in a wide cloud
      positions[i * 3] = (Math.random() - 0.5) * 80;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 80;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 35;

      // Assign random palette color
      const mixedColor = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;

      speeds.push({
        y: 0.015 + Math.random() * 0.035,
        x: (Math.random() - 0.5) * 0.012,
        rotSpeed: 0.002 + Math.random() * 0.005
      });
    }

    particlesGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeom.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Stardust material
    const particlesMat = new THREE.PointsMaterial({
      size: 0.26,
      vertexColors: true,
      transparent: true,
      opacity: 0.48,
      blending: THREE.AdditiveBlending,
    });
    const particleCloud = new THREE.Points(particlesGeom, particlesMat);
    scene.add(particleCloud);

    // Mouse responsiveness
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onMouseMove = (event) => {
      mouseX = (event.clientX / width - 0.5) * 1.5;
      mouseY = (event.clientY / height - 0.5) * 1.5;
    };
    window.addEventListener('mousemove', onMouseMove);

    // Resize observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width: w, height: h } = entry.contentRect;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      }
    });
    resizeObserver.observe(backdropRef.current);

    // Animation Loop
    let animationId;
    const clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Update stardust positions (linear drift from top-right to bottom-left)
      const posArr = particleCloud.geometry.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        // Slow downward and leftward drift
        posArr[i * 3 + 1] -= speeds[i].y;
        posArr[i * 3] -= speeds[i].x * 0.5;

        // Recycle particles when they go out of bounds
        if (posArr[i * 3 + 1] < -40) {
          posArr[i * 3 + 1] = 40;
          posArr[i * 3] = (Math.random() - 0.5) * 80;
        }
        if (posArr[i * 3] < -40) {
          posArr[i * 3] = 40;
        }
      }
      particleCloud.geometry.attributes.position.needsUpdate = true;

      // Parallax camera easing
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      camera.position.x = targetX * 8;
      camera.position.y = -targetY * 8;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', onMouseMove);
      resizeObserver.disconnect();
      if (backdropRef.current && renderer.domElement) {
        backdropRef.current.removeChild(renderer.domElement);
      }
      particlesGeom.dispose();
      particlesMat.dispose();
      renderer.dispose();
    };
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    loginUser();
  };

  return (
    <main className="relative min-h-screen w-full bg-[#050505] text-[#dae2fd] overflow-hidden flex items-center justify-center p-4 sm:p-6 md:p-12 select-none">
      
      {/* Full screen stardust backdrop */}
      <div ref={backdropRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />

      {/* Futuristic return button */}
      <Link to ="/"
        onClick={() => onNavigate && onNavigate('landing')}
        className="absolute top-6 left-6 px-4.5 py-2.5 rounded-xl glass-card flex items-center gap-2 font-sans font-bold text-xs text-on-surface-variant hover:text-white border-white/5 hover:border-white/20 transition-all select-none cursor-pointer z-40 group shadow-lg"
      >
        <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
        Return to Base
      </Link>

      {/* Floating Cybernetic Tags around the centered card */}
      <div className="absolute top-[18%] left-[12%] hidden xl:flex items-center gap-2 px-3.5 py-2 rounded-xl glass-card text-primary font-mono text-[9px] uppercase tracking-widest animate-pulse border-primary/25 bg-primary/5 select-none pointer-events-none shadow-xl shadow-black/20">
        <Shield className="w-3.5 h-3.5 text-primary animate-pulse" />
        Shield Enabled (v4.2)
      </div>

      <div className="absolute bottom-[22%] right-[14%] hidden xl:flex items-center gap-2 px-3.5 py-2 rounded-xl glass-card text-tertiary font-mono text-[9px] uppercase tracking-widest animate-pulse border-tertiary/25 bg-tertiary/5 select-none pointer-events-none shadow-xl shadow-black/20" style={{ animationDelay: '1s' }}>
        <Layers className="w-3.5 h-3.5 text-tertiary animate-spin" style={{ animationDuration: '6s' }} />
        Quantum Link Active
      </div>

      <div className="absolute top-[25%] right-[16%] hidden xl:flex items-center gap-2 px-3.5 py-2 rounded-xl glass-card text-secondary font-mono text-[9px] uppercase tracking-widest animate-pulse border-secondary/25 bg-secondary/5 select-none pointer-events-none shadow-xl shadow-black/20" style={{ animationDelay: '2s' }}>
        <Terminal className="w-3.5 h-3.5 text-secondary" />
        Console Node Secure
      </div>

      {/* Centered Premium Cybernetic Card (Frosted semi-translucent glass with high readability) */}
      <div className="w-full max-w-[500px] relative z-10 animate-fade-in my-10">
        
        <div 
          className="p-10 sm:p-12 rounded-[2.8rem] border border-white/10 relative overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.75)] hover:shadow-[0_0_60px_rgba(239,47,41,0.18)] hover:border-primary/30 transition-all duration-700 flex flex-col gap-8"
          style={{
            background: 'rgba(5, 5, 5, 0.72)',
            backdropFilter: 'blur(30px)',
            WebkitBackdropFilter: 'blur(30px)',
            boxShadow: '0 30px 70px rgba(0,0,0,0.65), inset 0 1px 1px rgba(255,255,255,0.08)'
          }}
        >
          
          {/* Status chips inside card top-right */}
          <div className="absolute top-8 right-10 flex gap-2 items-center">
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 font-mono text-[8px] uppercase font-bold tracking-wider">
              <Activity className="w-2.5 h-2.5 animate-pulse" />
              Secure
            </span>
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-tertiary/10 border border-tertiary/20 text-tertiary font-mono text-[8px] uppercase font-bold tracking-wider">
              <Radio className="w-2.5 h-2.5 animate-pulse" />
              Online
            </span>
          </div>

          {/* Neon animated scanning line inside the card (triggers once on mount) */}
          <div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-tertiary to-transparent opacity-85 pointer-events-none animate-scan-down" 
               style={{
                 animation: 'scan-down-key 2s cubic-bezier(0.25, 1, 0.5, 1) forwards'
               }}
          />

          {/* Top accent line */}
          <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          {/* Brand Header */}
          <div className="flex flex-col items-start gap-4 text-left">
            <div className="relative group cursor-pointer" onClick={() => onNavigate('landing')}>
              <div className="absolute -inset-1.5 rounded-xl bg-gradient-to-r from-primary to-secondary opacity-75 blur-md group-hover:opacity-100 transition duration-1000"></div>
              <div className="relative w-11 h-11 rounded-xl bg-surface flex items-center justify-center border border-white/15 shadow-inner shadow-black/30">
                <Cpu className="w-5.5 h-5.5 text-tertiary animate-pulse" />
              </div>
            </div>
            
            <div className="flex flex-col gap-1.5 mt-1">
              <span className="font-display font-extrabold text-3.5xl tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-tertiary drop-shadow-[0_0_15px_rgba(192,193,255,0.25)]">
                Taskify AI
              </span>
              <span className="font-mono text-[9px] text-on-surface-variant/40 uppercase tracking-widest leading-none">
                Autonomous Task Intelligence
              </span>
            </div>
          </div>

          {/* Separator Line */}
          <div className="h-[1px] bg-white/5 w-full" />

          {/* Form Header */}
          <div className="text-left flex flex-col gap-1.5">
            <h1 className="font-display font-extrabold text-2.5xl text-white tracking-tight leading-none">
              Welcome Back
            </h1>
            <p className="text-on-surface-variant text-xs font-sans">
              Enter credentials node to synchronize with system.
            </p>
          </div>

          {/* Form Fields */}
          <form onSubmit={handleFormSubmit} className="flex flex-col gap-6">
            
            {/* Email Input */}
            <div className="flex flex-col gap-2 text-left">
              <label className="font-mono text-[9.5px] text-on-surface-variant uppercase tracking-widest px-1">
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-on-surface-variant/30 group-focus-within:text-tertiary transition-colors">
                  <Mail className="w-4.5 h-4.5" />
                </div>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full bg-[#000000]/60 border border-white/10 rounded-2xl pl-11 pr-5 py-4.5 text-sm text-on-surface focus:border-primary focus:ring-0 focus:shadow-[0_0_20px_rgba(239,47,41,0.22)] outline-none transition-all placeholder-on-surface-variant/20 font-sans shadow-inner shadow-black/25"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="flex flex-col gap-2 text-left">
              <div className="flex justify-between items-center px-1">
                <label className="font-mono text-[9.5px] text-on-surface-variant uppercase tracking-widest">
                  Password
                </label>
                <button 
                  type="button"
                  // onClick={() => triggerBiometricScan()}
                  className="font-sans text-[11px] text-primary hover:text-secondary transition-colors cursor-pointer"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-on-surface-variant/30 group-focus-within:text-tertiary transition-colors">
                  <Lock className="w-4.5 h-4.5" />
                </div>
                <input 
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#000000]/60 border border-white/10 rounded-2xl pl-11 pr-12 py-4.5 text-sm text-on-surface focus:border-primary focus:ring-0 focus:shadow-[0_0_20px_rgba(239,47,41,0.22)] outline-none transition-all placeholder-on-surface-variant/20 font-sans shadow-inner shadow-black/25"
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-4 flex items-center text-on-surface-variant/30 hover:text-white transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                </button>
              </div>
            </div>

            {/* Remember me & Face ID */}
            <div className="flex items-center justify-between text-xs px-1">
              <label className="flex items-center gap-2 cursor-pointer text-on-surface-variant hover:text-white transition-colors">
                <input 
                  type="checkbox" 
                  className="accent-primary rounded bg-surface border-white/10 w-4.5 h-4.5 cursor-pointer" 
                />
                Remember me
              </label>
              
              <button 
                type="button"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-tertiary/10 border border-tertiary/20 text-tertiary font-mono text-[9px] uppercase tracking-wider hover:bg-tertiary/20 transition-all cursor-pointer shadow-lg animate-pulse"
              >
                <Fingerprint className="w-3.5 h-3.5" />
                Face ID
              </button>
            </div>

            {/* Submit Button */}
            <button 
              type="submit"
              className="w-full relative group overflow-hidden py-4 rounded-2xl font-sans font-bold text-sm text-white shadow-[0_0_25px_rgba(174,5,198,0.4)] transition-transform duration-300 hover:scale-102 active:scale-98 cursor-pointer mt-2"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary-container via-secondary-container to-primary animate-pulse"></span>
              <span className="absolute bottom-0 left-0 w-full h-0 bg-white/20 transition-all duration-300 group-hover:h-full"></span>
              <span className="relative z-10 flex items-center justify-center gap-2.5 tracking-wide font-extrabold uppercase text-xs">
                Login to Console
                <ArrowRight className="w-4.5 h-4.5" />
              </span>
            </button>

          </form>

          {/* Divider */}
          <div className="relative my-1">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/5"></div>
            </div>
            <div className="relative flex justify-center text-[9px] font-mono uppercase tracking-widest">
              <span className="px-4 bg-[#050505] rounded-md text-on-surface-variant/40">Or continue with</span>
            </div>
          </div>

          {/* Social Logins */}
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={()=>{
                window.location.href = "https://taskify-b6n9.onrender.com/auth/user/google";
              }}
              className="flex items-center justify-center gap-2.5 py-3 rounded-2xl border border-white/10 bg-white/3 hover:bg-white/5 transition-all text-xs font-sans font-bold text-white hover:scale-102 active:scale-98 cursor-pointer shadow-sm"
            >
              <svg className="w-4.5 h-4.5 text-secondary" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.24 10.285V13.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.859-3.579-7.859-7.993 0-4.414 3.53-7.993 7.86-7.993 2.46 0 4.108 1.018 5.047 1.914l2.427-2.33C17.955 1.83 15.34 1 12.24 1 5.926 1 1 5.926 1 12.2s4.926 11.2 11.24 11.2c6.59 0 11-4.63 11-11.2 0-.756-.08-1.333-.18-1.915H12.24z"/>
              </svg>
              Google
            </button>
            <button 
              onClick={()=>{
                window.location.href = "https://taskify-b6n9.onrender.com/auth/user/github";
              }}
              className="flex items-center justify-center gap-2.5 py-3 rounded-2xl border border-white/10 bg-white/3 hover:bg-white/5 transition-all text-xs font-sans font-bold text-white hover:scale-102 active:scale-98 cursor-pointer shadow-sm"
            >
              <svg className="w-4.5 h-4.5 text-primary" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
              GitHub
            </button>
          </div>

          {/* Footer switcher link */}
          <div className="text-center mt-1">
            <p className="text-xs text-on-surface-variant/80 font-sans">
              Don't have an account?{' '}
              <Link 
              to="/register" 
                type="button" 
                onClick={() => onNavigate && onNavigate('register')}
                className="text-primary font-bold hover:text-secondary transition-colors cursor-pointer"
              >
                Create one for free
              </Link>
            </p>
          </div>

        </div>
      </div>


      {/* Embedded inline keyframe animations */}
      <style>{`
        @keyframes scan-beam-key {
          0% { top: 0%; opacity: 0.2; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0.2; }
        }
        @keyframes scan-down-key {
          0% { top: 0%; opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </main>
  );
}
