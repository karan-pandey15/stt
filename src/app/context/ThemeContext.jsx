"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("him");

  useEffect(() => {
    const savedTheme = localStorage.getItem("selectedTheme");
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  const toggleTheme = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem("selectedTheme", newTheme);
  };

  const themeColors = {
    him: {
      primary: "#804003",
      rgb: "128, 64, 3",
      via: "#A0531F",
      to: "#C4762F",
      secondary: "#D4A574",
      light: "#FFF8F0",
      dark: "#2C2C2C",
      border: "#D4D4D5",
      text: "#5C6268",
      logo: "StylishHim",
      bannerFolder: "bannerImages",
    },
    her: {
      primary: "#AD4C5D",
      rgb: "173, 76, 93",
      via: "#C45E72",
      to: "#E07089",
      secondary: "#F0C5D0",
      light: "#FDF5F7",
      dark: "#2C2C2C",
      border: "#D4D4D5",
      text: "#5C6268",
      logo: "StylishHer",
      bannerFolder: "herImages",
    },
  };

  const currentTheme = themeColors[theme];

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, ...currentTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};
