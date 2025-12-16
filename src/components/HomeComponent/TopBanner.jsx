"use client"
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function TopBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const slides = [
    // {
    //   id: 1,
    //   image: "https://images-static.nykaa.com/uploads/0b12049e-a26a-4588-8bad-369d32f057b6.gif",
    //   title: "Up To 30% Off",
    //   subtitle: "On Professional Hair Care Brands",
    //   isGif: true
    // },
    // {
    //   id: 2,
    //   image: "https://images-static.nykaa.com/creatives/5f647897-ac69-4cc4-83b4-3567c8975a51/default.jpg?tr=cm-pad_resize,w-600",
    //   title: "Up To 20% Off",
    //   subtitle: "On Kay Bestsellers"
    // },
    {
      id: 3,
      image: "https://images-static.nykaa.com/creatives/999a2d06-5480-4ca2-a8ac-03d235f8c7c7/default.jpg?tr=cm-pad_resize,w-600",
      title: "CLEARANCESALE",
      subtitle: "Extra 10% On 999+"
    },
    {
      id: 4,
      image: "https://images-static.nykaa.com/creatives/efb244da-3dc3-495f-aea1-4597f8ed21a8/default.jpg?tr=cm-pad_resize,w-600",
      title: "Bestsellers",
      subtitle: "Starting ₹600"
    },
    {
      id: 5,
      image: "https://images-static.nykaa.com/creatives/1e5ab17e-643d-49d7-9de7-caa6e0018e66/default.jpg?tr=cm-pad_resize,w-600",
      title: "Bestsellers",
      subtitle: "Starting at 349!"
    },
    {
      id: 6,
      image: "https://images-static.nykaa.com/creatives/c0a366ce-e787-4855-afc9-15e1dc8bb0f4/default.jpg?tr=cm-pad_resize,w-450",
      title: "Up To 40% Off",
      subtitle: "On Bestsellers"
    },
    {
      id: 7,
      image: "https://images-static.nykaa.com/creatives/5c9fba41-d21a-41be-865c-aa0d3944057d/default.jpg?tr=cm-pad_resize,w-450",
      title: "Free Gift On",
      subtitle: "The New Skin Tint"
    },
    {
      id: 8,
      image: "https://images-static.nykaa.com/creatives/4cb62e45-60be-4b25-b717-0a1b50561d64/default.jpeg?tr=cm-pad_resize,w-450",
      title: "On ₹3500+",
      subtitle: "Gifts worth ₹2000"
    },
    {
      id: 9,
      image: "https://images-static.nykaa.com/creatives/c0c1bfa7-41df-4fce-bf01-153b3825b1f9/default.jpg?tr=cm-pad_resize,w-450",
      title: "20% off on 10k+",
      subtitle: "& free gifts"
    },
    {
      id: 10,
      image: "https://images-static.nykaa.com/creatives/a1abca19-2643-4460-aac6-091451a81464/default.jpg?tr=cm-pad_resize,w-450",
      title: "Free Shampoo",
      subtitle: "On Orders Above ₹699"
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlaying]);

  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  return (
    <div className="min-h-screen bg-white">
      {/* Full Width Carousel - No Container Padding */}
      <div 
        className="relative overflow-hidden w-full"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Slides Wrapper */}
        <div 
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {slides.map((slide) => (
            <div
              key={slide.id}
              className="min-w-full relative"
            >
              {/* Image Container - Full Width with object-cover */}
              <div className="relative w-full h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh] bg-gradient-to-br from-gray-100 to-gray-200">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white backdrop-blur-sm rounded-full p-2 sm:p-3 transition-all duration-300 hover:scale-110 z-10 shadow-lg"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6 text-gray-800" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white backdrop-blur-sm rounded-full p-2 sm:p-3 transition-all duration-300 hover:scale-110 z-10 shadow-lg"
          aria-label="Next slide"
        >
          <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6 text-gray-800" />
        </button>

        {/* Dots Navigation */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentIndex
                  ? 'bg-white w-8 h-2'
                  : 'bg-white/50 w-2 h-2 hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Products Grid Below Carousel - With Container Padding */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-6">
          Featured Offers
        </h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {slides.slice(0, 10).map((product) => (
            <div
              key={product.id}
              className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
            >
              {/* Image */}
              <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
              </div>

              {/* Content */}
              <div className="p-3">
                <h3 className="text-sm font-bold text-gray-900 mb-1 line-clamp-1">
                  {product.title}
                </h3>
                <p className="text-xs text-gray-600 line-clamp-2">
                  {product.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}