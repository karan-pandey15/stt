"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

export default function StylishHimBanner() {
  const [himImages, setHimImages] = useState([]);

  useEffect(() => {
    const images = [
      "stylishhimbanner10.png",
      "stylishhimbanner11.png",
      "stylishhimbanner12.png",
      "stylishhimbanner13.png",
      "stylishhimbanner14.png",
      "stylishhimbanner15.png",
      "stylishhimbanner17.png",
      "stylishhimbanner18.png",
    ];
    setHimImages(images);
  }, []);

  return (
    <div className="w-full px-4 py-8 md:py-12">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" style={{ color: "var(--theme-color)" }}>
          Men's Collection
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {himImages.map((image, index) => (
            <div
              key={index}
              className="relative w-full aspect-square rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group"
            >
              <img
                src={`/bannerImages/${image}`}
                alt={`Him Banner ${index + 1}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
