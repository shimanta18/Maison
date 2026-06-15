"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { GiRainbowStar } from "react-icons/gi";
import { IoLeafSharp, IoPeople } from "react-icons/io5";
export default function AboutPage() {
 
  const premiumEaseOut = [0.16, 1, 0.3, 1];

  const fadeUpContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };

  const fadeUpItem = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: premiumEaseOut }
    }
  };

  const imageReveal = {
    hidden: { opacity: 0, scale: 0.98, y: 10 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 1, ease: premiumEaseOut }
    }
  };

  return (
    <div className="w-full bg-[#fcfbf9] text-stone-800 font-sans min-h-screen overflow-x-hidden">
      
      {/* 1. HERO STORY TITLE SECTION */}
      <section className="w-full bg-[#f5eae4] pt-24 pb-16 px-6 sm:px-9 text-center">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
          }}
          className="max-w-4xl mx-auto space-y-4"
        >
          <motion.p 
            variants={fadeUpItem}
            className="text-[11px] uppercase font-bold tracking-widest text-stone-400"
          >
            
          </motion.p>
          
          <motion.h1 
            variants={fadeUpItem}
            className="text-4xl sm:text-5xl font-normal text-stone-900 font-serif tracking-tight leading-tight max-w-2xl mx-auto"
          >
            Objects that earn their place.
          </motion.h1>
          
          <motion.p 
            variants={fadeUpItem}
            className="mt-6 text-sm sm:text-base text-stone-600 font-normal max-w-2xl mx-auto leading-relaxed"
          >
            Maison began with a single brass lamp on a writer's desk, and the question of
            why so much we buy is forgettable. We started small — six makers, twenty
            objects — and grew slowly on purpose.
          </motion.p>
        </motion.div>
      </section>

      {/* 2. LARGE LIFESTYLE IMAGE BANNER */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 mb-20">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={imageReveal}
          className="w-full aspect-[16/9] bg-stone-200 rounded-3xl overflow-hidden shadow-xs border border-stone-200/40 relative group"
        >
          <motion.img
            src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1200&q=80" 
            alt="Maison kitchen storytelling"
            whileHover={{ scale: 1.015 }}
            transition={{ duration: 0.8, ease: premiumEaseOut }}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = "https://placehold.co/1200x675/eaddd7/6b5a50?text=Maison+Kitchen+Story";
            }}
          />
        </motion.div>
      </section>

      {/* 3. CORE VALUES / PHILOSOPHY GRID */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeUpContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 text-left"
        >
          {/* Card 1: Slow by design */}
          <motion.div 
            variants={fadeUpItem}
            whileHover={{ y: -4, shadow: "0 10px 25px -5px rgba(0, 0, 0, 0.03)" }}
            transition={{ duration: 0.3, ease: premiumEaseOut }}
            className="bg-white border border-stone-200/60 rounded-2xl p-6 sm:p-8 shadow-3xs flex flex-col items-start transition-colors hover:border-stone-300"
          >
            <div className="w-10 h-10 rounded-full bg-[#faf6f0] flex items-center justify-center text-[#b2533e] mb-6 text-lg border border-[#f0e6da]/40">
              <IoLeafSharp />
            </div>
            <h3 className="text-lg font-bold text-stone-900 font-serif tracking-tight mb-3">
              Slow by design
            </h3>
            <p className="text-sm text-stone-500 font-normal leading-relaxed">
              We add a maker only when we've spent time in their studio and
              understand how a piece is made — and how long it lasts.
            </p>
          </motion.div>

          {/* Card 2: Quietly considered */}
          <motion.div 
            variants={fadeUpItem}
            whileHover={{ y: -4, shadow: "0 10px 25px -5px rgba(0, 0, 0, 0.03)" }}
            transition={{ duration: 0.3, ease: premiumEaseOut }}
            className="bg-white border border-stone-200/60 rounded-2xl p-6 sm:p-8 shadow-3xs flex flex-col items-start transition-colors hover:border-stone-300"
          >
            <div className="w-10 h-10 rounded-full bg-[#faf6f0] flex items-center justify-center text-[#b2533e] mb-6 text-lg border border-[#f0e6da]/40">
              <GiRainbowStar />
            </div>
            <h3 className="text-lg font-bold text-stone-900 font-serif tracking-tight mb-3">
              Quietly considered
            </h3>
            <p className="text-sm text-stone-500 font-normal leading-relaxed">
              Every object is photographed, packaged, and shipped with care.
              No plastic, no rush, no algorithm-chasing.
            </p>
          </motion.div>

          {/* Card 3: Fair to makers */}
          <motion.div 
            variants={fadeUpItem}
            whileHover={{ y: -4, shadow: "0 10px 25px -5px rgba(0, 0, 0, 0.03)" }}
            transition={{ duration: 0.3, ease: premiumEaseOut }}
            className="bg-white border border-stone-200/60 rounded-2xl p-6 sm:p-8 shadow-3xs flex flex-col items-start transition-colors hover:border-stone-300"
          >
            <div className="w-10 h-10 rounded-full bg-[#faf6f0] flex items-center justify-center text-[#b2533e] mb-6 text-lg border border-[#f0e6da]/40">
              <IoPeople />
            </div>
            <h3 className="text-lg font-bold text-stone-900 font-serif tracking-tight mb-3">
              Fair to makers
            </h3>
            <p className="text-sm text-stone-500 font-normal leading-relaxed">
              Margins are split closer to 50/50 than the industry standard. We pay
              on delivery, not on net-60 terms.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* 4. CALL TO ACTION: SELL WITH US BANNER */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUpItem}
          className="bg-[#f5eae4] border border-[#ebdcd4] rounded-3xl p-10 sm:p-12 text-center max-w-3xl mx-auto shadow-3xs"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 font-serif tracking-tight mb-3">
            Sell with us
          </h2>
          <p className="text-sm text-stone-600 font-normal leading-relaxed max-w-md mx-auto mb-8">
            Are you a maker with a story to tell? Create an account and list your first
            piece. We review every submission personally.
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