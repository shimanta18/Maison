"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

import { motion } from "framer-motion";
import { CiStar } from "react-icons/ci";
import { FaBox } from "react-icons/fa";
import { FaTruckFront } from "react-icons/fa6";
import { IoLeafSharp } from "react-icons/io5";
import { initialProducts } from "../data/products";

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const timer = setTimeout(() => {
      setFeaturedProducts(initialProducts.slice(0, 4)); 
      setLoading(false);
    }, 1100);

    return () => clearTimeout(timer);
  }, []);

  
  const premiumEaseOut = [0.16, 1, 0.3, 1];

  const fadeUpContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  };

  const fadeUpItem = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: premiumEaseOut }
    }
  };

  const simpleFade = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8, ease: "easeInOut" } }
  };

  return (
    <div className="w-full min-h-screen bg-[#faf6f0] text-[#291e1b] font-sans antialiased overflow-x-hidden">
      
      {/*  Primary Hero Intro Section (Staggered Children Fade Up) */}
      <header className="max-w-4xl mx-auto text-center pt-20 pb-12 px-6">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
          }}
          className="space-y-6"
        >
          <motion.h1 
            variants={fadeUpItem} 
            className="text-4xl sm:text-6xl font-serif font-normal leading-tight tracking-tight"
          >
            Curated goods for considered living.
          </motion.h1>
          
          <motion.p 
            variants={fadeUpItem} 
            className="text-[#706561] text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-normal"
          >
            Hand-thrown ceramics, brushed brass, linen-bound notebooks. A small catalog of objects from independent makers, built to be lived with for years.
          </motion.p>
          
          <motion.div variants={fadeUpItem} className="pt-4 flex items-center justify-center gap-4">
            <Link href="/items">
              <motion.div 
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.3, ease: premiumEaseOut }}
                className="bg-[#b2533e] text-white font-medium text-sm px-5 py-3 rounded-xl flex items-center gap-2 shadow-xs cursor-pointer"
              >
                Shop the collection <span>→</span>
              </motion.div>
            </Link>
            <Link href="/about">
              <motion.div 
                whileHover={{ scale: 1.02, bg: "#ffffff" }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.3, ease: premiumEaseOut }}
                className="bg-white text-[#291e1b] border border-stone-200 font-medium text-sm px-5 py-3 rounded-xl cursor-pointer"
              >
                Our story
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>
      </header>

      {/*  Mini Horizontal Trust Badges Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={fadeUpContainer}
        className="w-full bg-[#fdfaf6] border-y border-stone-200/40 py-6 mb-20 shadow-2xs"
      >
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 items-center">
          {[
            { icon: <FaBox />, title: "Small-batch", desc: "Made in studios of 1–10 people" },
            { icon: <FaTruckFront />, title: "Free shipping", desc: "On orders over $120" },
            { icon: <IoLeafSharp />, title: "Slow goods", desc: "Built to last, not to replace" },
            { icon: <CiStar />, title: "Loved", desc: "4.8 average rating across pieces" }
          ].map((badge, idx) => (
            <motion.div key={idx} variants={fadeUpItem} className="flex items-center gap-3">
              <div className="w-10 h-9 shrink-0 rounded-full bg-[#faf3ec] flex items-center justify-center text-[#b2533e]">
                {badge.icon}
              </div>
              <div>
                <h4 className="text-xl sm:text-2xl font-light text-[#291e1b] tracking-tight">{badge.title}</h4>
                <p className="text-[10px] sm:text-[11px] text-[#706561] leading-tight">{badge.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/*  Dynamic Product Showroom with Premium Loading States */}
      <section className="max-w-5xl mx-auto px-6 pb-24 space-y-8">
        <div className="flex justify-between items-end">
          <div className="space-y-1 text-left">
            <span className="text-[10px] uppercase tracking-widest font-bold text-[#706561]">Featured</span>
            <h2 className="text-2xl font-serif font-normal text-[#291e1b]">This week's quiet favorites</h2>
          </div>
          <Link href="/items" className="text-xs font-bold text-[#b2533e] hover:text-[#a14330] flex items-center gap-1 group transition-colors">
            Browse all <span className="text-sm transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>

        {/*  SHIMMER SKELETON LOAD AND CONTENT HANDLING */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((skeletonId) => (
              <div key={skeletonId} className="space-y-3">
                <div className="aspect-square w-full rounded-2xl bg-white border border-stone-200/40 relative overflow-hidden shadow-2xs">
                  <motion.div 
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ repeat: Infinity, duration: 1.6, ease: "linear" }}
                    className="absolute inset-0 bg-linear-to-r from-transparent via-[#faf6f0]/50 to-transparent"
                  />
                </div>
                <div className="space-y-1.5 px-1">
                  <div className="h-3 w-2/3 bg-white border border-stone-200/30 rounded-sm" />
                  <div className="h-2.5 w-1/3 bg-white border border-stone-200/30 rounded-sm" />
                  <div className="h-3 w-1/4 bg-white border border-stone-200/30 rounded-sm pt-0.5" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={fadeUpContainer}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"
          >
            {featuredProducts.map((product) => (
              <Link key={product.id} href={`/items/${product.id}`} className="block">
                <motion.div
                  variants={fadeUpItem}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.4, ease: premiumEaseOut }}
                  className="group cursor-pointer space-y-3 text-left"
                >
                  {/* Clean Product Grid Frame Setup */}
                  <div className="aspect-square w-full rounded-2xl overflow-hidden bg-white border border-stone-200/40 relative shadow-2xs flex items-center justify-center">
                    {product.image ? (
                      <motion.img 
                        src={product.image} 
                        alt={product.name} 
                        whileHover={{ scale: 1.03 }}
                        transition={{ duration: 0.6, ease: premiumEaseOut }}
                        className="w-full h-full object-cover object-center" 
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.parentNode.innerHTML = `<span class="text-4xl select-none pointer-events-none opacity-30">${product.fallbackEmoji || '✨'}</span>`;
                        }}
                      />
                    ) : (
                      <span className="text-4xl select-none pointer-events-none opacity-30">{product.fallbackEmoji}</span>
                    )}
                  </div>
                  
                  {/* Metadata labels */}
                  <div className="flex justify-between items-start text-xs px-1">
                    <div className="space-y-0.5 max-w-[80%]">
                      <p className="font-medium text-[#291e1b] group-hover:text-[#b2533e] transition-colors line-clamp-1">
                        {product.name}
                      </p>
                      <p className="text-[10px] text-[#706561] tracking-wider uppercase">
                        {product.category}
                      </p>
                      <p className="text-xs font-bold text-[#291e1b] pt-0.5">
                        ${Number(product.price).toFixed(2)}
                      </p>
                    </div>
                    <span className="text-[#b2533e] font-semibold bg-[#faf3ec] px-2 py-0.5 rounded-md text-[11px] shrink-0">
                      New
                    </span>
                  </div>
                </motion.div>
              </Link>
            ))}
          </motion.div>
        )}
      </section>

      <hr className="max-w-5xl mx-auto border-stone-200/60" />

      {/*  Testimonials (Fade In Array) */}
      <section className="max-w-5xl mx-auto px-6 py-24 space-y-8">
        <div className="space-y-1 text-left">
          <span className="text-[10px] uppercase tracking-widest font-bold text-[#706561]">Loved By</span>
          <h2 className="text-2xl font-serif font-normal text-[#291e1b]">Customers who keep coming back.</h2>
        </div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeUpContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left"
        >
          {[
            { quote: `"The brass lamp arrived in linen wrapping with a handwritten note. It's now the centerpiece of my desk."`, author: "Mira K.", loc: "Brooklyn, NY" },
            { quote: `"Everything feels considered. The packaging, the weight of the mug, the smell of the candle. A rare thing."`, author: "Daniel A.", loc: "Lisbon, PT" },
            { quote: `"I've bought three notebooks now. Paper is genuinely fountain-pen friendly — finally."`, author: "Sora T.", loc: "Kyoto, JP" }
          ].map((t, idx) => (
            <motion.div 
              key={idx}
              variants={fadeUpItem}
              className="bg-white p-8 rounded-2xl border border-stone-200/50 shadow-2xs space-y-6 flex flex-col justify-between"
            >
              <p className="text-xs sm:text-sm text-[#291e1b] italic font-normal leading-relaxed">
                {t.quote}
              </p>
              <div>
                <p className="text-xs font-bold text-[#291e1b]">{t.author}</p>
                <p className="text-[11px] text-[#706561]">{t.loc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/*  Minimalist Newsletter Capsule Panel */}
      <section className="max-w-5xl mx-auto px-6 pb-12">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={simpleFade}
          className="w-full bg-gradient-to-r from-[#2c1d1a] to-[#3d2a26] rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row md:justify-between md:items-center gap-8 shadow-md text-left"
        >
          <div className="space-y-2 max-w-md">
            <h3 className="text-xl sm:text-2xl font-serif font-normal tracking-wide">A monthly letter, no noise.</h3>
            <p className="text-stone-300 text-xs leading-relaxed">
              One email a month with new arrivals, maker profiles, and the occasional essay. Unsubscribe anytime.
            </p>
          </div>
          <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-2 w-full max-w-sm md:ml-auto">
            <input 
              type="email" 
              placeholder="you@studio.com" 
              className="flex-1 bg-white/10 border border-white/10 hover:border-white/20 focus:border-white/40 rounded-xl px-4 py-3 text-xs text-white placeholder-stone-400 focus:outline-hidden transition-colors"
              required 
            />
            <button type="submit" className="bg-[#b2533e] hover:bg-[#a14330] text-white font-medium text-xs px-5 py-3 rounded-xl transition-colors whitespace-nowrap shadow-xs cursor-pointer">
              Subscribe
            </button>
          </form>
        </motion.div>
      </section>

      {/*  B2B Apply Panel: "Sell with us" */}
      <section className="max-w-5xl mx-auto px-6 pb-24">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUpItem}
          className="bg-[#f5eae4]/70 rounded-3xl border border-[#ebdcd4]/50 p-12 sm:p-16 text-center space-y-6 max-w-4xl mx-auto"
        >
          <h2 className="text-3xl sm:text-4xl font-serif font-normal text-[#291e1b]">
            Sell with us
          </h2>
          <p className="text-[#706561] text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
            Are you a maker with a story to tell? Create an account and list your first piece. We review every submission personally.
          </p>
          <div className="pt-2">
            <Link href="/register">
              <motion.div 
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-block bg-[#b2533e] hover:bg-[#a14330] text-white font-medium text-sm px-6 py-3 rounded-xl shadow-xs cursor-pointer"
              >
                Apply as a maker
              </motion.div>
            </Link>
          </div>
        </motion.div>
      </section>

    </div>
  );
}