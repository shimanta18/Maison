"use client";
import { onAuthStateChanged } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaBox } from "react-icons/fa";
import { auth } from "../../../firebase/config";

export default function ManageItemsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/login");
      } else {
        const local = localStorage.getItem("custom_products");
        if (local) {
          setProducts(JSON.parse(local));
        }
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [router]);

  // Remove an asset from the layout matrix safely using multiple ID variants
  const handleDelete = (targetId) => {
    if (window.confirm("Are you sure you want to remove this item from the catalog?")) {
      const updated = products.filter((item) => (item.id || item._id) !== targetId);
      setProducts(updated);
      localStorage.setItem("custom_products", JSON.stringify(updated));
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-[#fcfbf9]">
        <div className="w-8 h-8 border-4 border-[#b2533e] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 text-[#291e1b]">
      
      {/* Page Header Layout Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-stone-200">
        <div className="space-y-1">
          <h1 className="text-2xl font-serif text-stone-900 tracking-tight">Manage Inventory</h1>
          <p className="text-xs text-[#706561]">Review, inspect, or delete pieces currently listed in your catalog array.</p>
        </div>
        <div>
          <Link
            href="/items/add"
            className="inline-flex bg-[#b2533e] hover:bg-[#96412f] text-white font-medium text-xs px-4 py-2.5 rounded-xl transition-colors shadow-xs"
          >
            Add Product
          </Link>
        </div>
      </div>

      {/* Empty State Layout Fallback */}
      {products.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-stone-200 mt-8 p-6 max-w-xl mx-auto">
          <span className="text-3xl flex justify-center text-stone-300"><FaBox /></span>
          <h3 className="mt-4 text-sm font-serif text-stone-900 font-bold">No assets found</h3>
          <p className="text-xs text-[#706561] mt-1">Your custom marketplace database inventory is completely empty.</p>
          <div className="mt-4">
            <Link href="/items/add" className="text-xs font-semibold text-[#b2533e] hover:underline">
              Create your first listing →
            </Link>
          </div>
        </div>
      ) : (
        
        <div className="mt-8 bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-xs">
          
          {/* Responsive Layout Option A: Desktop Table View Grid */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#faf8f5] border-b border-stone-200 text-[10px] font-bold uppercase tracking-wider text-[#706561]">
                  <th className="py-4 px-6 w-1/2">Product Details</th>
                  <th className="py-4 px-6">Category</th>
                  <th className="py-4 px-6">Valuation</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-xs">
                {products.map((item, index) => {
                  // 🛠️ FIX: Fallback sequence to capture the correct unique identification key string
                  const itemId = item.id || item._id || index;

                  return (
                    <tr key={itemId} className="hover:bg-[#fafaf9]/60 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-4 min-w-0">
                          <div className="w-12 h-12 rounded-xl bg-[#faf3ec] border border-stone-200 overflow-hidden flex items-center justify-center text-lg shrink-0 select-none">
                            {item.image && item.image.startsWith("http") ? (
                              <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                            ) : (
                              <FaBox className="text-stone-400" />
                            )}
                          </div>
                          <div className="min-w-0">
                            <h4 className="font-serif text-sm font-bold text-stone-900 truncate">{item.title}</h4>
                            <p className="text-[#706561] text-[11px] truncate max-w-xs lg:max-w-md mt-0.5">{item.shortDesc}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-[#706561] font-medium">
                        {item.category || "Accessories"}
                      </td>
                      <td className="py-4 px-6 font-semibold text-stone-900">
                        ${item.price ? Number(item.price).toFixed(2) : "0.00"}
                      </td>
                      <td className="py-4 px-6 text-right space-x-2 whitespace-nowrap">
                        {/* 🛠️ FIX: Clean dynamic path usage using the validated identifier code string */}
                        <Link
                          href={`/items/${itemId}`}
                          className="inline-flex items-center bg-white border border-stone-200 px-3 py-1.5 rounded-lg text-stone-700 hover:bg-[#faf3ec] hover:text-[#b2533e] font-medium transition-all"
                        >
                          View
                        </Link>
                        <button
                          onClick={() => handleDelete(itemId)}
                          className="inline-flex items-center bg-white border border-stone-200 px-3 py-1.5 rounded-lg text-red-600 hover:bg-red-50 hover:border-red-100 font-medium transition-all cursor-pointer"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Responsive Layout Option B: Mobile Stacked List Layout */}
          <div className="block md:hidden divide-y divide-stone-100">
            {products.map((item, index) => {
              // 🛠️ FIX: Ensure mobile map loop replicates identical identifier checks
              const itemId = item.id || item._id || index;

              return (
                <div key={itemId} className="p-4 space-y-4">
                  <div className="flex items-start space-x-3.5">
                    <div className="w-14 h-14 rounded-xl bg-[#faf3ec] border border-stone-200 overflow-hidden flex items-center justify-center text-xl shrink-0 select-none">
                      {item.image && item.image.startsWith("http") ? (
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                      ) : (
                        <FaBox className="text-stone-400" />
                      )}
                    </div>
                    <div className="min-w-0 flex-grow">
                      <span className="text-[9px] uppercase font-bold tracking-wider text-[#b2533e] bg-[#faf3ec] px-1.5 py-0.5 rounded-md">
                        {item.category || "Accessories"}
                      </span>
                      <h4 className="font-serif text-sm font-bold text-stone-900 truncate mt-1">{item.title}</h4>
                      <p className="text-[#706561] text-xs line-clamp-2 mt-0.5">{item.shortDesc}</p>
                      <p className="text-xs font-bold text-stone-900 mt-1.5">${item.price ? Number(item.price).toFixed(2) : "0.00"}</p>
                    </div>
                  </div>

                  {/* Mobile Button Row Operations */}
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <Link
                      href={`/items/${itemId}`}
                      className="w-full text-center bg-[#faf8f5] border border-stone-200 py-2 rounded-xl text-xs font-medium text-stone-700 hover:bg-stone-50 transition-colors animate-duration-150"
                    >
                      View Details
                    </Link>
                    <button
                      onClick={() => handleDelete(itemId)}
                      className="w-full text-center bg-white border border-stone-200 py-2 rounded-xl text-xs font-medium text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                    >
                      Delete Item
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      )}
    </div>
  );
}