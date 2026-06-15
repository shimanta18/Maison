"use client";
import { useState } from "react";
// Single source of truth data tracking
import Link from "next/link";
import { IoIosSearch } from "react-icons/io";
import { initialProducts } from "../../data/products";
export default function ShopPage() {
  
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState(200);

  
  const categories = ["All", ...new Set(initialProducts.map((p) => p.category))];

  
  const filteredProducts = initialProducts.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase()) ||
                          product.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    const matchesPrice = product.price <= maxPrice;
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <div className="w-full bg-[#fcfbf9] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        
        {/* PAGE HEADER TEXT */}
        <div className="space-y-2 mb-12 max-w-xl text-left">
          <p className="text-[10px] uppercase font-bold tracking-widest text-stone-400">The Catalog</p>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900 font-serif">
            Shop all goods
          </h1>
          <p className="text-sm text-stone-500 font-normal leading-relaxed">
            A growing collection of objects, sorted by what's new. Filter by category or price to narrow things down.
          </p>
        </div>

        {/* CONTROLS & CONTROLLER TOOLBAR */}
        <div className="bg-white border border-stone-200/80 rounded-2xl p-4 sm:p-6 mb-10 shadow-xs space-y-4 lg:space-y-0 lg:flex lg:items-center lg:justify-between lg:gap-6">
          
          {/* Text Input Match Field */}
          <div className="relative flex-1">
            <span className="absolute inset-y-0 left-4 flex items-center text-stone-400 text-sm select-none">
              <IoIosSearch />
            </span>
            <input
              type="text"
              placeholder="Search the catalog..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm font-medium text-stone-800 placeholder-stone-400 focus:outline-none focus:border-[#b2533e] focus:bg-white transition-colors"
            />
          </div>

          {/* Quick Filter Selection Panels */}
          <div className="flex flex-wrap items-center gap-3">
            
            {/* Category Dropdown Pill */}
            <div className="flex items-center space-x-2 bg-stone-50 border border-stone-200 px-3 py-2 rounded-xl">
              <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">Type:</span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-transparent text-sm font-semibold text-stone-800 focus:outline-none cursor-pointer"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Live Slider Price Regulator Capsule */}
            <div className="flex items-center space-x-3 bg-stone-50 border border-stone-200 px-4 py-2 rounded-xl flex-1 sm:flex-initial">
              <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider whitespace-nowrap">
                Max Price: <span className="text-stone-800 font-mono">${maxPrice}</span>
              </span>
              <input
                type="range"
                min="20"
                max="250"
                step="5"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-24 sm:w-32 h-1 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-[#b2533e]"
              />
            </div>

          </div>
        </div>

        {/* RESULTS METRIC COUNTER ROW */}
        <div className="mb-6 flex items-center justify-between px-1">
          <p className="text-xs font-bold text-stone-400 tracking-wide uppercase">
            {filteredProducts.length} {filteredProducts.length === 1 ? "piece" : "pieces"} found
          </p>
          {(search || selectedCategory !== "All" || maxPrice < 200) && (
            <button
              onClick={() => {
                setSearch("");
                setSelectedCategory("All");
                setMaxPrice(200);
              }}
              className="text-xs font-bold text-[#b2533e] hover:underline cursor-pointer"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* MAIN PRODUCT CATALOG GRID */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <div key={product.id} className="flex flex-col group bg-white border border-stone-200/60 rounded-2xl p-3 shadow-xs hover:shadow-md transition-shadow duration-300">
                
                {/* Visual Content Frame Box Asset placeholder container */}
                <div className="w-full   max-w-lg object-center sm:aspect-[4/3] rounded-3xl overflow-hidden bg-stone-100 border border-stone-200/60 shadow-xs shrink-0">
                  <img
                    src={product.image}
                    alt={product.name}
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                    className="w-full h-full object-cover object-center"
                  />
                  <span className="opacity-35 font-normal">{product.fallbackEmoji}</span>
                </div>

                {/* Details Meta Block Frame */}
                <div className="mt-4 flex flex-col flex-1 justify-between px-1 pb-1">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[10px] font-bold tracking-wider">
                      <span className="text-stone-400 uppercase">{product.category}</span>
                      <span className="text-stone-500 flex items-center space-x-0.5">
                        <span className="text-amber-500">★</span>
                        <span>{product.rating}</span>
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-stone-900 tracking-tight font-serif leading-snug">
                      {product.name}
                    </h3>
                    <p className="text-xs text-stone-500 font-normal line-clamp-2 leading-relaxed pt-0.5">
                      {product.description}
                    </p>
                  </div>

                  {/* Transaction / Forward Trigger Link Row */}
                  <div className="mt-5 pt-3 border-t border-stone-100 flex items-center justify-between">
                    <span className="text-base font-black text-stone-900 font-mono">
                      ${product.price}
                    </span>
                    <Link href={`/items/${product.id}`}>
    <button className="text-xs font-bold text-[#b2533e] hover:text-[#96412f] bg-stone-50 hover:bg-stone-100 px-3 py-1.5 rounded-lg border border-stone-200/60 transition-colors cursor-pointer">
      View details →
    </button>
  </Link>
                  </div>
                </div>

              </div>
            ))}
          </div>
        ) : (
          /* SAFESHIELD EMPTY FALLBACK EMPTY SEARCH STATE VIEW */
          <div className="w-full text-center py-20 border border-dashed border-stone-200 rounded-2xl bg-white max-w-md mx-auto mt-8 px-4">
            <span className="text-3xl block mb-3 opacity-60">🍃</span>
            <h3 className="text-sm font-bold text-stone-800">No pieces match your choices</h3>
            <p className="text-xs text-stone-400 mt-1 max-w-xs mx-auto leading-relaxed">
              Try updating your keywords, choosing another category, or clearing the filter settings entirely.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}