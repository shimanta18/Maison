"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaBox } from "react-icons/fa";
import { initialProducts } from "../../../data/products";

export default function ProductDetailsPage() {
  const params = useParams();
  const productId = params?.id;

  const [product, setProduct] = useState(null);
  const [allProductsPool, setAllProductsPool] = useState(initialProducts);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (!productId) return;

    const local = localStorage.getItem("custom_products");
    let combinedPool = [...initialProducts];

    if (local) {
      try {
        const customProducts = JSON.parse(local);
        combinedPool = [...customProducts, ...initialProducts];
      } catch (error) {
        console.error("Error parsing custom products:", error);
      }
    }

    setAllProductsPool(combinedPool);

    const foundProduct = combinedPool.find(
      (p) => (p.id || p._id || "").toString() === productId.toString()
    );

    setProduct(foundProduct || combinedPool[0]);
    setImageError(false); 
  }, [productId]);

  const relatedPieces = allProductsPool
    .filter((p) => product && (p.id || p._id) !== (product.id || product._id))
    .slice(0, 3);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fcfbf9]">
        <div className="w-8 h-8 border-4 border-[#b2533e] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  
  const displayTitle = product.name || product.title || "Untitled Product";
  const displayDescription = product.description || product.longDesc || product.shortDesc || "Loomed from premium materials.";
  const displayCategory = product.category || "Accessories";
  const cleanImageURL = product.image ? product.image.trim() : "";

  return (
    <div className="w-full bg-[#fcfbf9] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Back navigation link */}
        <div className="mb-8">
          <Link 
            href="/items" 
            className="text-xs font-bold text-stone-400 hover:text-[#b2533e] transition-colors uppercase tracking-wider flex items-center space-x-1"
          >
            <span>← Back to all goods</span>
          </Link>
        </div>

        {/* MAIN PRODUCT PRESENTATION GRID */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Visual Image Asset Container Frame */}
          <div className="md:col-span-6 relative w-full">
            <div className="w-full aspect-[4/3] sm:aspect-[16/11] bg-stone-100 rounded-3xl overflow-hidden border border-stone-200/80 flex items-center justify-center text-5xl text-stone-300 select-none shadow-xs relative">
              {cleanImageURL && cleanImageURL !== <FaBox />
 && !imageError ? (
                <img
                  src={cleanImageURL}
                  alt={displayTitle}
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={() => setImageError(true)}
                />
              ) : (
                <span className="opacity-30">{product.fallbackEmoji || <FaBox />
}</span>
              )}
            </div>
          </div>

          {/* Right Column: Specification details metadata blocks */}
          <div className="md:col-span-6 space-y-6 text-left">
            <div className="space-y-1.5">
              <p className="text-[10px] uppercase font-bold tracking-widest text-stone-400">
                {displayCategory}
              </p>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900 font-serif">
                {displayTitle}
              </h1>
              
              <div className="flex items-center space-x-3 text-xs font-semibold text-stone-500 pt-1">
                <span className="flex items-center space-x-1">
                  <span className="text-amber-500">★</span>
                  <span className="text-stone-800 font-bold">{product.rating || "5.0"}</span>
                </span>
                <span className="text-stone-300">•</span>
                <span>Free shipping over $120</span>
              </div>
            </div>

            {/* Product Price Display */}
            <div className="text-3xl font-extrabold text-stone-900 font-mono tracking-tight">
              ${Number(product.price || 0).toFixed(2)}
            </div>

            {/* Primary Product Narrative Description */}
            <p className="text-sm sm:text-base text-stone-600 font-normal leading-relaxed max-w-xl">
              {displayDescription}
            </p>

            {/* Summary Card */}
            <div className="bg-stone-50 border border-stone-200/80 rounded-2xl p-4 grid grid-cols-3 gap-4 text-left max-w-xl shadow-2xs">
              <div>
                <p className="text-[9px] uppercase font-bold tracking-wider text-stone-400">🏷️ Category</p>
                <p className="text-xs font-bold text-stone-800 mt-1">{displayCategory}</p>
              </div>
              <div>
                <p className="text-[9px] uppercase font-bold tracking-wider text-stone-400">⭐ Rating</p>
                <p className="text-xs font-bold text-stone-800 mt-1">{product.rating || "5.0"} / 5</p>
              </div>
              <div>
                <p className="text-[9px] uppercase font-bold tracking-wider text-stone-400">📅 Added</p>
                <p className="text-xs font-bold text-stone-800 mt-1 font-mono">6/15/2026</p>
              </div>
            </div>

            {/* ACTION TRIGGERS BUTTON PANEL */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 max-w-xl">
              <button className="w-full sm:w-auto bg-[#b2533e] hover:bg-[#96412f] text-white font-semibold text-sm px-8 py-3.5 rounded-xl shadow-sm transition-colors cursor-pointer">
                Add to cart
              </button>
              <button className="w-full sm:w-auto bg-white hover:bg-stone-50 border border-stone-200 text-stone-700 font-semibold text-sm px-8 py-3.5 rounded-xl shadow-2xs transition-colors cursor-pointer">
                Save for later
              </button>
            </div>
          </div>
        </div>

        {/* RELATED PIECES */}
        <div className="mt-20 pt-12 border-t border-stone-200">
          <div className="space-y-1 mb-8 text-left">
            <p className="text-[10px] uppercase font-bold tracking-widest text-stone-400">You May Also Like</p>
            <h2 className="text-2xl font-extrabold tracking-tight text-stone-900 font-serif">
              Related pieces
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            {relatedPieces.map((item) => {
              const itemId = item.id || item._id;
              const itemTitle = item.name || item.title || "Untitled Product";
              const cleanItemImg = item.image ? item.image.trim() : "";
              
              return (
                <Link 
                  key={itemId} 
                  href={`/items/${itemId}`}
                  className="flex flex-col group cursor-pointer text-left"
                >
                  <div className="w-full aspect-[4/3] bg-stone-100 rounded-2xl overflow-hidden border border-stone-200/80 relative flex items-center justify-center text-2xl text-stone-300 select-none transition-shadow group-hover:shadow-md">
                    {cleanItemImg && cleanItemImg !== "📦" ? (
                      <img
                        src={cleanItemImg}
                        alt={itemTitle}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                        onError={(e) => {
                          e.target.style.display = "none";
                          e.target.nextSibling.style.display = "block";
                        }}
                      />
                    ) : null}
                    <span 
                      className="opacity-40"
                      style={{ display: cleanItemImg && cleanItemImg !== <FaBox />
 ? "none" : "block" }}
                    >
                      {item.fallbackEmoji || <FaBox />
}
                    </span>
                  </div>
                  <div className="mt-3 px-1">
                    <p className="text-[9px] uppercase font-bold tracking-wider text-stone-400">{item.category || "Accessories"}</p>
                    <h3 className="text-sm font-bold text-stone-900 font-serif tracking-tight mt-0.5 group-hover:text-[#b2533e] transition-colors">
                      {itemTitle}
                    </h3>
                    <p className="text-xs font-black text-stone-700 font-mono mt-1">${Number(item.price || 0).toFixed(2)}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}