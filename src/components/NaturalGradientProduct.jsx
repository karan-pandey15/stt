'use client';
import React from 'react';


const NaturalGradientProduct = () => {
  return (
    <div className=" ">
      {/* Desktop Layout */}
      <div className="hidden md:block">
        <div className="max-w-7xl mx-auto px-8 pb-20 pt-10">
          <div className="grid grid-cols-2 gap-16 items-center">
            {/* Left Side - Single Image */}
            <div className="relative">
              <div className="bg-[#F5EDE4] rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105">
                <img 
                  src="/images/naturalimage.png" 
                  alt="Natural Ingredients"
                  className="w-full h-[600px] object-cover"
                />
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute -top-8 -left-8 w-32 h-32 bg-[#F4D138] rounded-full opacity-30 blur-3xl"></div>
              <div className="absolute -bottom-8 -right-8 w-40 h-40 rounded-full opacity-20 blur-3xl" style={{backgroundColor: "var(--theme-color)"}}></div>
            </div>

            {/* Right Side - Content */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h1 
                  className="text-7xl font-bold leading-tight tracking-wide"
                  style={{ 
                    color: "var(--theme-color)",
                    fontFamily: "'Marcellus', 'Work Sans', serif"
                  }}
                >
                  Glow Naturaly
                </h1>
                
                <div className="w-24 h-1.5 rounded-full" style={{backgroundImage: `linear-gradient(to right, ${"var(--theme-color)"}, transparent)`}}></div>
              </div>
              
              <p 
                className="text-xl leading-relaxed"
                style={{ 
                  color: '#000000',
                  fontFamily: "'Marcellus', 'Work Sans', serif"
                }}
              >
                Experience the pure essence of nature with our thoughtfully crafted products that bring you the authentic glow.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="block md:hidden">
        <div className="px-6 py-12 space-y-8">
          {/* Heading */}
          <div className="text-center space-y-3">
            <h1 
              className="text-5xl font-bold leading-tight tracking-wide"
              style={{ 
                color: "var(--theme-color)",
                fontFamily: "'Marcellus', 'Work Sans', serif"
              }}
            >
              Glow Skin
            </h1>
            <div className="w-20 h-1.5 mx-auto rounded-full" style={{backgroundImage: `linear-gradient(to right, ${"var(--theme-color)"}, transparent)`}}></div>
          </div>
          
          {/* Text Content */}
          <p 
            className="text-base leading-relaxed text-center px-2"
            style={{ 
              color: '#000000',
              fontFamily: "'Marcellus', 'Work Sans', serif"
            }}
          >
            Experience the pure essence of nature with our thoughtfully crafted products that bring you the authentic glow.
          </p>
          
          {/* Single Image */}
          <div className="relative px-4">
            <div className="bg-[#F5EDE4] rounded-2xl overflow-hidden shadow-xl">
              <img 
                src="/images/naturalimage.png" 
                alt="Natural Ingredients"
                className="w-full h-[400px] object-cover"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Load Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Marcellus&family=Work+Sans:wght@300;400;500;600;700&display=swap');
      `}</style>
    </div>
  );
};

export default NaturalGradientProduct;