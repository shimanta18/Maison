"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../firebase/config";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Trigger Real Firebase Google Sign-In
  const handleGoogleSignIn = async () => {
    setError("");
    try {
      await signInWithPopup(auth, googleProvider);
      router.push("/");
    } catch (err) {
      console.error("Google Sign In Error:", err);
      setError(err.message || "Failed to authenticate with Google.");
    }
  };

  //  Trigger Standard Firebase Email/Password Sign-In
  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/");
    } catch (err) {
      console.error("Email Sign In Error:", err);
      if (err.code === "auth/invalid-credential" || err.code === "auth/user-not-found") {
        setError("Invalid email credential pattern or profile not discovered.");
      } else {
        setError("Authentication handshake failed. Try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-69px)] grid grid-cols-1 md:grid-cols-2">
      
      {/* Left Branding Panel */}
      <div className="bg-[#f5eae4]/70 p-8 sm:p-16 lg:p-24 flex flex-col justify-center items-start space-y-6 border-r border-[#ebdcd4]/40">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-[#b2533e] flex items-center justify-center text-white font-bold text-xs">
            M
          </div>
          <span className="font-serif font-bold text-base text-[#291e1b]">Maison</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif font-normal text-[#291e1b] leading-tight">
          A small marketplace, made for makers and the people who love their work.
        </h2>
        <p className="text-xs sm:text-sm text-[#706561] font-normal leading-relaxed max-w-sm">
          Sign in to list pieces, manage your shop, and keep a private wishlist.
        </p>
      </div>

      {/* Right Credentials Form Panel */}
      <div className="bg-white p-8 sm:p-16 lg:p-24 flex flex-col justify-center">
        <div className="max-w-sm w-full mx-auto space-y-6">
          <div className="space-y-1">
            <h1 className="text-2xl font-serif font-normal text-[#291e1b]">
              Welcome back
            </h1>
            <p className="text-xs text-[#706561]">
              Sign in to continue to your shop.
            </p>
          </div>

          {/* Dynamic Error Banner Notification */}
          {error && (
            <div className="bg-red-50 border border-red-100 text-red-600 font-medium p-3 rounded-xl text-xs">
              {error}
            </div>
          )}

          {/* Connected Google Sign-In Trigger Action */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-3 bg-white hover:bg-stone-50 text-stone-700 font-medium text-sm py-3 px-4 border border-stone-200 rounded-xl transition-colors shadow-xs cursor-pointer"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Sign in with Google
          </button>

          {/* Visual Divider */}
          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-stone-100"></div>
            <span className="flex-shrink mx-4 text-[10px] text-stone-400 font-bold uppercase tracking-widest">
              Or email
            </span>
            <div className="flex-grow border-t border-stone-100"></div>
          </div>

          {/* Regular Email Form connected directly to Firebase config */}
          <form className="space-y-4" onSubmit={handleEmailSignIn}>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-[#706561] uppercase tracking-wider">
                Email
              </label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@studio.com" 
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-[#291e1b] outline-hidden focus:border-[#b2533e] transition-colors text-xs" 
              />
            </div>

            {/* 🛠️ PASSWORD INPUT FIELD COMPONENT WITH REFACTOR TOGGLE CONTAINER */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-[#706561] uppercase tracking-wider">
                Password
              </label>
              <div className="relative w-full">
                <input 
                  type={showPassword ? "text" : "password"} // Switches dynamic attribute 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters" 
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-4 pr-14 py-3 text-[#291e1b] outline-hidden focus:border-[#b2533e] transition-colors text-xs" 
                />
                <button
                  type="button" // Important: Avoids accidental native form submissions
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-4 flex items-center text-[10px] font-bold tracking-widest text-stone-400 hover:text-[#b2533e] uppercase select-none cursor-pointer transition-colors"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-[#b2533e] hover:bg-[#a14330] disabled:bg-stone-300 text-white font-medium text-sm py-3.5 rounded-xl transition-colors mt-2 cursor-pointer flex items-center justify-center gap-2"
            >
              {loading ? "Authenticating..." : "Sign in"}
            </button>
          </form>

          {/* Bottom Redirect Row */}
          <div className="text-center text-xs text-[#706561] font-medium pt-2">
            New to Maison?{" "}
            <Link href="/register" className="text-[#b2533e] font-bold hover:underline">
              Create an account
            </Link>
          </div>
          
          <div className="text-center text-xs font-semibold pt-4 border-t border-stone-100">
            <Link href="/" className="text-stone-400 hover:text-stone-600 transition-colors">
              ← Back to home
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}