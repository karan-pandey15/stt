"use client";
import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useTheme } from "@/app/context/ThemeContext";

export default function Footer() {
  const { primary, logo, light } = useTheme();
  const [openIndex, setOpenIndex] = useState(null);

  const menuItems = [
    {
      title: "Who are we?",
      items: [
        { label: "Authenticity", href: "/authenticity" },
        { label: "Sustainability", href: "/sustainability" }
      ]
    },
    {
      title: "Help",
      items: [
        { label: "Contact Us", href: "/contactus" },
        { label: "StylishHim Help", href: "/helpcenter" },
        { label: "Cancellation & Return", href: "/returns" },
        { label: "Shipping & Delivery", href: "/shipping" }
      ]
    },
    {
      title: "We are into",
      href: "https://stylishhim.vercel.app",
      items: []
    },
     {
      title: "For Investor",
      href: "",
      items: []
    },
    {
      title: "Top Categories",
      items: [
        { label: "Makeup", href: "/categories/makeup" },
        { label: "Skin", href: "/categories/skin" },
        { label: "Hair", href: "/categories/hair" },
        { label: "Appliances", href: "/categories/appliances" },
        { label: "Bath & Body", href: "/categories/bath-body" },
        { label: "Fragrance", href: "/categories/fragrance" }
      ]
    }
  ];

  const renderMenuItem = (item) => (
    <Link
      key={item.href}
      href={item.href}
      className="text-[#5C6268] text-[14px] font-[400] transition-colors block py-1"
      style={{ color: "#5C6268" }}
      onMouseEnter={(e) => e.currentTarget.style.color = primary}
      onMouseLeave={(e) => e.currentTarget.style.color = '#5C6268'}
    >
      {item.label}
    </Link>
  );

  return (
    <>
      <style jsx global>{`
        
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }

        @keyframes gradientShift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.2);
          }
        }
      `}</style>

      <footer className="px-6 md:px-[32px] mt-[10px] border-t border-[#D4D4D5]">
        <div className="max-w-7xl mx-auto pt-6">
          <div className="flex justify-start mb-[10px]">
            <Link href="/" className="flex items-center group">
              <div className="relative">
                <h1 className="text-[24px] md:text-[32px] font-bold tracking-wider [font-family:'Playfair_Display',_'Cormorant_Garamond',_serif] relative">
                  <span 
                    className="relative inline-block bg-clip-text text-transparent animate-[gradientShift_4s_ease-in-out_infinite]"
                    style={{
                      backgroundImage: `linear-gradient(to right, ${primary}, ${primary}cc, ${primary})`
                    }}
                  >
                    {logo}
                  </span>

                  <span 
                    className="absolute inset-0 bg-clip-text text-transparent animate-[shimmer_3s_ease-in-out_infinite] bg-[length:200%_100%]"
                    style={{
                      backgroundImage: `linear-gradient(to right, transparent, ${primary}70, transparent)`
                    }}
                  >
                    {logo}
                  </span>

                  <span 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm bg-clip-text text-transparent"
                    style={{
                      backgroundImage: `linear-gradient(to right, ${primary}, ${primary}cc, ${primary})`
                    }}
                  >
                    {logo}
                  </span>
                </h1>

                <div 
                  className="absolute -bottom-1 left-0 right-0 h-[2px] w-0 group-hover:w-full transition-all duration-700 mx-auto rounded-full"
                  style={{
                    background: `linear-gradient(to right, ${primary}, ${primary}cc, ${primary})`
                  }}
                />
              </div>
            </Link>
          </div>

          {/* Desktop View */}
          <div className="hidden md:grid grid-cols-4 gap-8 mb-[16px]">
            {menuItems.map(({ title, items = [], href }) => (
              <div key={title}>
                {href ? (
                  <Link
                    href={href}
                    className="text-[#1C252E] font-[600] text-[14px] pt-[10px] pb-[10px] block"
                  >
                    {title}
                  </Link>
                ) : (
                  <h3 className="text-[#1C252E] font-[600] text-[14px] pt-[10px] pb-[10px]">
                    {title}
                  </h3>
                )}
                {items.length > 0 && <ul>{items.map(renderMenuItem)}</ul>}
              </div>
            ))}
          </div>

          {/* Mobile Accordion View */}
          <div className="md:hidden space-y-4">
            {menuItems.map(({ title, items = [], href }, index) => {
              const hasItems = items.length > 0;
              return (
                <div key={title} className="border-b border-gray-200 pb-2">
                  {hasItems ? (
                    <>
                      <button
                        onClick={() =>
                          setOpenIndex(openIndex === index ? null : index)
                        }
                        className="flex justify-between items-center w-full text-left"
                      >
                        <span className="text-[#1C252E] font-[600] text-[15px]">
                          {title}
                        </span>
                        {openIndex === index ? (
                          <ChevronUp size={18} />
                        ) : (
                          <ChevronDown size={18} />
                        )}
                      </button>

                      {openIndex === index && (
                        <ul className="mt-2 pl-2 animate-fadeIn">
                          {items.map(renderMenuItem)}
                        </ul>
                      )}
                    </>
                  ) : href ? (
                    <Link
                      href={href}
                      className="text-[#1C252E] font-[600] text-[15px] block py-2"
                    >
                      {title}
                    </Link>
                  ) : (
                    <span className="text-[#1C252E] font-[600] text-[15px] block py-2">
                      {title}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </footer>
    </>
  );
}