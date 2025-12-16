"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/app/context/ThemeContext";

export default function CompactTabBar() {
  const [activeTab, setActiveTab] = useState("him");
  const { toggleTheme } = useTheme();

  const tabs = [
    {
      id: "him",
      label: "Him",
      icon: "♂",
      color: "#924A00",
    },
    {
      id: "her",
      label: "Her",
      icon: "♀",
      color: "#EC4899", 
    },
  ];

  const activeColor = tabs.find(tab => tab.id === activeTab)?.color || "#3B82F6";

  useEffect(() => {
    toggleTheme(activeTab);
    if (activeTab === "her") {
      document.documentElement.style.setProperty("--theme-color", "#EC4899");
    } else {
      document.documentElement.style.setProperty("--theme-color", "#924A00");
    }
  }, [activeTab, toggleTheme]);

  return (
    <div className="w-full px-4 py-6">
      <div className="max-w-2xl mx-auto">
        {/* Compact Tab Bar */}
        <div className="relative bg-white rounded-full shadow-lg p-1.5 border border-gray-100">
          <div className="relative flex gap-1">
            {/* Animated Background */}
            <motion.div
              layoutId="activeBackground"
              className="absolute rounded-full"
              style={{
                backgroundColor: activeColor,
                boxShadow: `0 4px 12px ${activeColor}40`,
              }}
              initial={false}
              animate={{
                left: activeTab === "him" ? "4px" : "calc(50% + 2px)",
                width: "calc(50% - 6px)",
                height: "calc(100% - 8px)",
                top: "4px",
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
            />

            {/* Tabs */}
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="relative flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-full transition-all duration-300 z-10"
              >
                <span
                  className={`text-2xl transition-all duration-300 ${
                    activeTab === tab.id ? "scale-110" : "scale-100"
                  }`}
                >
                  {tab.icon}
                </span>
                <span
                  className={`font-semibold transition-all duration-300 ${
                    activeTab === tab.id ? "text-white" : "text-gray-600"
                  }`}
                >
                  {tab.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Content Below */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-8 text-center"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
            style={{ backgroundColor: `${activeColor}15` }}
          >
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: activeColor }}
            />
            <p
              className="text-sm font-medium"
              style={{ color: activeColor }}
            >
              {activeTab === "him"
                ? "Men's Collection"
                : "Women's Collection"}
            </p>
          </div>
          <p className="text-gray-600 text-sm mt-4 max-w-md mx-auto">
            {activeTab === "him"
              ? "Discover our premium collection for men - crafted for style and confidence."
              : "Explore our exquisite collection for women - designed for elegance and grace."}
          </p>
        </motion.div>
      </div>
    </div>
  );
}