"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function StylishHerBanner() {
  const [herImages, setHerImages] = useState([]);

  useEffect(() => {
    const images = [
      "Gemini_Generated_Image_53ycww53ycww53yc.png",
      "Gemini_Generated_Image_fufytpfufytpfufy.png",
      "Gemini_Generated_Image_kdir4vkdir4vkdir.png",
      "Gemini_Generated_Image_n3zasln3zasln3za.png",
      "Gemini_Generated_Image_v8b783v8b783v8b7 (1).png",
      "Gemini_Generated_Image_kdir4vkdir4vkdir (1).png",
    ];
    setHerImages(images);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="w-full px-4 py-12 md:py-16 bg-gradient-to-b from-white via-pink-50/30 to-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 
            className="text-4xl md:text-5xl font-bold mb-4 tracking-tight"
            style={{ color: "var(--theme-color)" }}
          >
            Women's Collection
          </h2>
          <div className="w-24 h-1 mx-auto rounded-full" style={{ backgroundColor: "var(--theme-color)" }} />
          <p className="text-gray-600 mt-4 text-lg">Discover our exquisite range of premium products</p>
        </motion.div>
        
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {herImages.map((image, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group cursor-pointer"
              whileHover={{ y: -8 }}
            >
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
                <img
                  src={`/herImages/${image}`}
                  alt={`Her Banner ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                <div className="absolute inset-0 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div 
                    className="px-4 py-2 rounded-lg text-white text-sm font-semibold"
                    style={{ backgroundColor: "var(--theme-color)" }}
                  >
                    View Collection
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
