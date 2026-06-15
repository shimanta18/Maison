"use client";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { auth } from "../../../firebase/config";

export default function AddItemPage() {
  const [formData, setFormData] = useState({
     title: "", 
     shortDesc: "",
      longDesc: "", 
      price: "", 
      image: "" });
  const [toast, setToast] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

 
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        
        router.push("/login");
      } else {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const local = localStorage.getItem("custom_products");
    const currentList = local ? JSON.parse(local) : [];
    
    const newProduct = {
      ...formData,
      id: Date.now().toString(),
      price: Number(formData.price),
      category: "Accessories",
      image: formData.image.trim() || "📦"
    };

    localStorage.setItem("custom_products", JSON.stringify([...currentList, newProduct]));
    setToast(true);
    setFormData({ title: "", shortDesc: "", longDesc: "", price: "", image: "" });
    setTimeout(() => setToast(false), 4000);
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-[#fcfbf9]">
        <div className="w-8 h-8 border-4 border-[#b2533e] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-12 text-[#291e1b]">
      <div className="bg-white border border-stone-200 p-5 sm:p-8 rounded-2xl space-y-6 shadow-xs">
        
        {toast && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold p-3 sm:p-4 rounded-xl text-center">
            <span>✓ Product successfully added to your market collection catalogue!</span>
          </div>
        )}
        
        <div className="space-y-1 border-b border-stone-100 desert-brand-border pb-4">
          <h1 className="text-xl sm:text-2xl font-serif text-stone-900">Add New Product</h1>
          <p className="text-xs text-[#706561]">List a new independent crafted item on the storefront grid.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 text-xs sm:text-sm">
          <div>
            <label className="block text-[10px] font-bold text-[#706561] mb-1.5 uppercase tracking-wider">Product Title</label>
            <input 
              type="text" 
              required 
              value={formData.title} 
              onChange={e => setFormData({...formData, title: e.target.value})} 
              className="w-full bg-[#fdfaf6] border border-stone-200 rounded-xl px-4 py-2.5 focus:outline-hidden focus:border-[#b2533e] transition-all text-xs" 
              placeholder="e.g. Linen-Bound Journal" 
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-[#706561] mb-1.5 uppercase tracking-wider">Price Valuation ($)</label>
              <input 
                type="number" 
                required 
                min="1" 
                value={formData.price} 
                onChange={e => setFormData({...formData, price: e.target.value})} 
                className="w-full bg-[#fdfaf6] border border-stone-200 rounded-xl px-4 py-2.5 focus:outline-hidden focus:border-[#b2533e] transition-all text-xs" 
                placeholder="45" 
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-[#706561] mb-1.5 uppercase tracking-wider">Asset Image URL</label>
              <input 
                type="url" 
                value={formData.image} 
                onChange={e => setFormData({...formData, image: e.target.value})} 
                className="w-full bg-[#fdfaf6] border border-stone-200 rounded-xl px-4 py-2.5 focus:outline-hidden focus:border-[#b2533e] transition-all text-xs" 
                placeholder="https://images.unsplash.com/your-photo.jpg" 
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-[#706561] mb-1.5 uppercase tracking-wider">Brief Summary Abstract</label>
            <input 
              type="text" 
              required 
              value={formData.shortDesc} 
              onChange={e => setFormData({...formData, shortDesc: e.target.value})} 
              className="w-full bg-[#fdfaf6] border border-stone-200 rounded-xl px-4 py-2.5 focus:outline-hidden focus:border-[#b2533e] transition-all text-xs" 
              placeholder="Handmade notebook using reclaimed cotton sheets." 
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-[#706561] mb-1.5 uppercase tracking-wider">Extended Technical Description</label>
            <textarea 
              rows={4} 
              required 
              value={formData.longDesc} 
              onChange={e => setFormData({...formData, longDesc: e.target.value})} 
              className="w-full bg-[#fdfaf6] border border-stone-200 rounded-xl px-4 py-2.5 focus:outline-hidden focus:border-[#b2533e] transition-all resize-none text-xs" 
              placeholder="Provide a historical narrative of materials used, complete sizing parameters, care guidelines, and details on artisans involved..." 
            />
          </div>

          <button type="submit" className="w-full bg-[#b2533e] hover:bg-[#96412f] text-white font-medium py-3 rounded-xl transition shadow-sm text-xs cursor-pointer">
            Publish Item Manifest
          </button>
        </form>
      </div>
    </div>
  );
}