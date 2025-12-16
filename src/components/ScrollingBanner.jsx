"use client";

import { useEffect, useState } from "react";
import Head from "next/head";


export default function ScrollingBanner() {
  const messages = [
    "Free Shipping on orders over ₹999",
    "Get 10% off on your first order",
    "24/7 Customer Support",
    "New Arrivals Every Week",
    "Exclusive Member Discounts",
  ];

  const [index, setIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  // rotate text messages
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // hide on scroll
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 80) {
        setIsVisible(false);
      } else if (window.scrollY < lastScrollY) {
        setIsVisible(true);
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // adjust navbar position based on banner visibility
  useEffect(() => {
    const navbar = document.getElementById("navbar-wrapper");
    if (navbar) {
      navbar.style.top = isVisible ? "40px" : "0px"; // banner height ≈ 40px
    }
  }, [isVisible]);

  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Marcellus&family=Work+Sans:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div
        className={`fixed top-0 left-0 w-full z-[150] text-white overflow-hidden transition-transform duration-500 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
        style={{ fontFamily: "'Marcellus', 'Work Sans', serif", backgroundColor: "var(--theme-color)" }}
      >
        {/* Desktop view */}
        <div className="hidden md:flex whitespace-nowrap animate-marquee py-3 text-sm font-medium">
          {messages.concat(messages).map((msg, i) => (
            <span key={i} className="mx-8">
              {msg}
            </span>
          ))}
        </div>

      
      </div>

      <style jsx global>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-marquee {
          display: inline-block;
          white-space: nowrap;
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </>
  );
}
