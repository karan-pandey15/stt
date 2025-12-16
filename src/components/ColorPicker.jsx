"use client";
import React, { useState, useRef, useEffect } from "react";
import { Palette } from "lucide-react";

const ColorPicker = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const [selectedColor, setSelectedColor] = useState(
    typeof window !== "undefined"
      ? localStorage.getItem("themeColor") || "#924A00"
      : "#924A00"
  );

  const [pendingColor, setPendingColor] = useState(selectedColor);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Apply selected color globally
  useEffect(() => {
    document.documentElement.style.setProperty("--theme-color", selectedColor);
  }, [selectedColor]);

  // Apply color on "Apply" button
  const handleApply = () => {
    setSelectedColor(pendingColor);
    localStorage.setItem("themeColor", pendingColor);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Palette Icon Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-black hover:text-gray-600 transition-colors"
        title="Pick Theme Color"
      >
        <Palette className="h-5 w-5" />
      </button>

      {/* Color Picker Dropdown */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 bg-white border border-gray-200 shadow-lg rounded-lg p-4 z-50 w-64">
          <div className="flex flex-col items-center gap-4">
            {/* HTML Color Picker */}
            <input
              type="color"
              value={pendingColor}
              onChange={(e) => setPendingColor(e.target.value)}
              className="w-16 h-16 cursor-pointer border-none rounded-full overflow-hidden"
            />

            {/* Preview */}
            <div className="flex flex-col items-center">
              <p className="text-sm text-gray-600 mb-1">Selected Color:</p>
              <div
                className="w-20 h-6 rounded border border-gray-300"
                style={{ backgroundColor: pendingColor }}
              />
              <p className="text-xs text-gray-500 mt-1">{pendingColor}</p>
            </div>

            {/* Apply Button */}
            <button
              onClick={handleApply}
              className="px-6 py-2 rounded-full text-white font-medium shadow-md transition-all duration-300"
              style={{
                backgroundColor: pendingColor,
              }}
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorPicker;
