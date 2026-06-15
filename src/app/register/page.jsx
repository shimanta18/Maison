"use client";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { auth, googleProvider } from "../../firebase/config";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

 
  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push("/items"); 
    } catch (err) {
      setError(err.message.replace("Firebase: ", ""));
    }
  };

 
  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      router.push("/items");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf6f0] flex items-center justify-center p-6 text-[#291e1b]">
      <div className="bg-white p-8 rounded-2xl border border-stone-200 w-full max-w-md space-y-6 shadow-xs">
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-serif">Create an Account</h2>
          <p className="text-xs text-[#706561]">Join Maison Market today</p>
        </div>

        {error && <p className="text-xs text-red-500 bg-red-50 p-2 rounded-lg">{error}</p>}

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-[#706561] mb-1">Email Address</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#fdfaf6] border border-stone-200 rounded-xl px-4 py-2.5 text-xs focus:outline-hidden focus:border-[#b2533e]" 
            />
          </div>

          {/*  PASSWORD FIELD WITH EMBEDDED SHOW/HIDE TOGGLE */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-[#706561] mb-1">Password</label>
            <div className="relative w-full">
              <input 
                type={showPassword ? "text" : "password"} 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                className="w-full bg-[#fdfaf6] border border-stone-200 rounded-xl pl-4 pr-14 py-2.5 text-xs focus:outline-hidden focus:border-[#b2533e]" 
              />
              <button
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-4 flex items-center text-[10px] font-bold tracking-widest text-stone-400 hover:text-[#b2533e] uppercase select-none cursor-pointer transition-colors"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button type="submit" className="w-full bg-[#b2533e] text-white py-2.5 rounded-xl font-medium text-xs hover:bg-[#a14330] transition-colors cursor-pointer">
            Register Account
          </button>
        </form>

        <div className="relative flex py-2 items-center">
          <div className="flex-grow border-t border-stone-200"></div>
          <span className="flex-shrink mx-4 text-[10px] text-stone-400 uppercase tracking-wider">Or</span>
          <div className="flex-grow border-t border-stone-200"></div>
        </div>

        <button onClick={handleGoogleSignIn} className="w-full bg-white border border-stone-200 py-2.5 rounded-xl font-medium text-xs hover:bg-stone-50 transition-colors flex items-center justify-center gap-2 cursor-pointer">
          Continue with Google
        </button>

        <p className="text-center text-xs text-[#706561]">
          Already have an account? <Link href="/" className="text-[#b2533e] hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
}