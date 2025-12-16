'use client';

import React, { useEffect, useState } from 'react'; 
import { toast, Toaster } from 'react-hot-toast';
import api from '../lib/api';

export default function BeautyProductsGrid() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch banners
  const fetchBanners = async () => {
    try {
      const { data } = await api.get('/banners');
      setBanners(data);
    } catch (err) {
      console.error(err);
      toast.error('Failed to load banners');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-60">
        <p className="text-gray-500 text-sm">Loading banners...</p>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {banners.map((item) => (
            <div
              key={item._id}
              onClick={() =>
                (window.location.href = `/categoryproducts?categoryName=${item.category}`)
              }
              className="group relative bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 cursor-pointer"
            >
              {/* Image Container */}
              <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                <img
                  src={item.image?.url}
                  alt={item.category}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />

                {/* Gradient Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Category Label */}
              {/* <div className="absolute bottom-3 left-3 bg-white/80 backdrop-blur-sm px-2 sm:px-3 py-1 rounded-full">
                <span className="text-xs font-semibold text-gray-700">
                  {item.category}
                </span>
              </div> */}

              {/* OFFER Badge */}
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 sm:px-3 py-1 rounded-full">
                <span className="text-xs font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                  OFFER
                </span>
              </div>
            </div>
          ))}

          {banners.length === 0 && (
            <p className="col-span-full text-center text-gray-500 py-10">
              No banners found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
