"use client";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaFacebook } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { SiGmail } from "react-icons/si";
import { auth } from "../firebase/config";
import "./global.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false); 
  const [user, setUser] = useState(null);
  const router = useRouter();

  // Listen to active Firebase authentication states
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setDropdownOpen(false);
      setIsOpen(false);
      router.push("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <nav className="bg-[#fcfbf9] border-b border-stone-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          
          {/* Logo Brand Frame */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-[#b2533e] flex items-center justify-center text-white text-xs font-bold">
              M
            </div>
            <Link href="/" className="text-base font-bold tracking-tight text-stone-900 hover:text-[#b2533e] transition-colors">
              Maison
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-10 text-xs font-semibold tracking-wider uppercase text-stone-600">
            <Link href="/" className="hover:text-stone-900 transition-colors">Home</Link>
            <Link href="/items" className="hover:text-stone-900 transition-colors">Shop</Link>
            <Link href="/about" className="hover:text-stone-900 transition-colors">About</Link>
          </div>

          {/* Desktop Auth Section: Swaps dynamically based on user state */}
          <div className="hidden md:flex items-center text-xs font-semibold relative">
            {user ? (
              
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center space-x-2 bg-[#faf3ec] border border-stone-200 text-stone-800 px-4 py-2.5 rounded-xl cursor-pointer hover:bg-[#f5e9dd] transition-colors"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="max-w-[140px] truncate">
                    {user.displayName || user.email.split("@")[0]}
                  </span>
                  <span className="text-stone-400 text-[10px]">▼</span>
                </button>

                {/* Dropdown Menu Box */}
                {dropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-stone-200 rounded-xl shadow-xl py-2 z-50">
                    {/* User Data Metadata */}
                    <div className="px-4 py-2 border-b border-stone-100">
                      <p className="text-[9px] uppercase tracking-wider font-bold text-stone-400">Account Profile</p>
                      <p className="text-xs font-bold text-stone-900 truncate">{user.displayName || "Maison Member"}</p>
                      <p className="text-[11px] text-stone-500 truncate">{user.email}</p>
                    </div>

                    {/* Links Requested */}
                    <div className="p-1 space-y-0.5">
                      <Link
                        href="/items/add"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center px-3 py-2 rounded-lg text-stone-700 hover:bg-[#faf3ec] hover:text-[#b2533e] transition-colors"
                      >
                         Add Product
                      </Link>
                      <Link
                        href="/items/manage"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center px-3 py-2 rounded-lg text-stone-700 hover:bg-[#faf3ec] hover:text-[#b2533e] transition-colors"
                      >
                         Manage Products
                      </Link>
                    </div>

                    <div className="border-t border-stone-100 p-1 mt-1">
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                      >
                        Log Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              
              <div className="flex items-center space-x-6">
                <Link href="/login" className="text-stone-600 hover:text-stone-900 transition-colors">
                  Log in
                </Link>
                <Link 
                  href="/register" 
                  className="bg-[#b2533e] hover:bg-[#96412f] text-white px-5 py-2.5 rounded-lg transition-colors shadow-sm"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-stone-600 hover:text-stone-900 p-2 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Dropdown Panel Container */}
      {isOpen && (
        <div className="md:hidden bg-[#fcfbf9] border-t border-stone-200 px-4 py-4 space-y-3 shadow-md">
          <Link href="/" onClick={() => setIsOpen(false)} className="block text-sm font-medium text-stone-700 hover:text-stone-900">Home</Link>
          <Link href="/items" onClick={() => setIsOpen(false)} className="block text-sm font-medium text-stone-700 hover:text-stone-900">Shop</Link>
          <Link href="/about" onClick={() => setIsOpen(false)} className="block text-sm font-medium text-stone-700 hover:text-stone-900">About</Link>
          
          <div className="pt-4 border-t border-stone-200 flex flex-col space-y-2">
            {user ? (
              /* Logged in Mobile links */
              <>
                <div className="px-2 py-1 text-xs text-stone-500 font-bold">
                  Logged in: {user.email}
                </div>
                <Link href="/items/add" onClick={() => setIsOpen(false)} className="block text-sm font-medium text-stone-700 py-2">
                   Add Product
                </Link>
                <Link href="/items/manage" onClick={() => setIsOpen(false)} className="block text-sm font-medium text-stone-700 py-2">
                   Manage Products
                </Link>
                <button 
                  onClick={handleLogout} 
                  className="w-full text-center bg-stone-200 text-stone-800 py-2 rounded-md font-medium text-sm mt-2"
                >
                  Log Out
                </button>
              </>
            ) : (
              /* Logged out Mobile links */
              <>
                <Link href="/login" onClick={() => setIsOpen(false)} className="text-sm font-medium text-stone-700 py-2">Log in</Link>
                <Link href="/register" onClick={() => setIsOpen(false)} className="text-center bg-[#b2533e] text-white py-2 rounded-md font-medium text-sm">Register</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

function Footer() {
  return (
    <footer className="bg-[#f5f3ef] border-t border-stone-200/80 pt-16 pb-12 mt-auto text-stone-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-stone-200">
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 rounded-full bg-[#b2533e] flex items-center justify-center text-white text-[10px] font-bold">
                M
              </div>
              <span className="text-sm font-bold text-stone-900 tracking-tight">Maison</span>
            </div>
            <p className="text-xs sm:text-sm text-stone-500 max-w-xs leading-relaxed">
              A curated marketplace for slow goods, made by independent makers and built to last.
            </p>
          </div>

          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">Shop</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-stone-500">
              <li><Link href="/items" className="hover:text-stone-900 transition-colors">All goods</Link></li>
              <li><Link href="/items?new=true" className="hover:text-stone-900 transition-colors">New arrivals</Link></li>
              <li><Link href="/makers" className="hover:text-stone-900 transition-colors">Makers</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">Company</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-stone-500">
              <li><Link href="/about" className="hover:text-stone-900 transition-colors">About</Link></li>
              <li><Link href="/journal" className="hover:text-stone-900 transition-colors">Journal</Link></li>
              <li><Link href="/contact" className="hover:text-stone-900 transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">Follow</h4>
            <div className="flex space-x-3">
              <a href="#" className="w-8 h-8 rounded-full bg-white border border-stone-200 flex items-center justify-center text-stone-600 hover:text-[#b2533e] transition-colors shadow-xs">
                <span className="text-[10px] font-bold"><FaFacebook /></span>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white border border-stone-200 flex items-center justify-center text-stone-600 hover:text-[#b2533e] transition-colors shadow-xs">
                <span className="text-[10px] font-bold"><SiGmail /></span>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white border border-stone-200 flex items-center justify-center text-stone-600 hover:text-[#b2533e] transition-colors shadow-xs">
                <span className="text-[10px] font-bold"><FaSquareInstagram /></span>
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 space-y-2 sm:space-y-0">
          <p>&copy; 2026 Maison Goods. Made with care.</p>
          <p className="tracking-wide">Crafted on Lovable.</p>
        </div>

      </div>
    </footer>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body suppressHydrationWarning className="min-h-screen flex flex-col bg-[#fcfbf9] antialiased">
        <Navbar />
        <main className="flex-grow w-full">{children}</main>
        <Footer />
      </body>
    </html>
  );
}