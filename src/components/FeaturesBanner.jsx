"use client";
import React from 'react';

import {
  Truck,
  RefreshCw,
  BadgeCheck,
  Tag,
  Instagram,
  Facebook,
  Youtube,
  Twitter,
  Music,
} from 'lucide-react';

export default function FeaturesBanner() {
  const features = [
    { icon: Truck, title: 'FREE SHIPPING', description: 'On Orders Above ₹299' },
    { icon: RefreshCw, title: 'EASY RETURNS', description: '15-Day Return Policy' },
    { icon: BadgeCheck, title: '100% AUTHENTIC', description: 'Products Sourced Directly' },
    { icon: Tag, title: '10+ BRANDS', description: '1.2k+ Products' },
  ];

  // Brand-colored social icons
  const socialLinks = [
    {
      icon: Instagram,
      href: '#',
      label: 'Instagram',
      bg: 'bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600',
      iconColor: 'text-white',
    },
    {
      icon: Facebook,
      href: '#',
      label: 'Facebook',
      bg: 'bg-[#1877F2]',
      iconColor: 'text-white',
    },
    {
      icon: Youtube,
      href: '#',
      label: 'YouTube',
      bg: 'bg-[#FF0000]',
      iconColor: 'text-white',
    } 
  ];

  return (
    <section className="w-full bg-white py-4 px-4">
      <div className="max-w-7xl mx-auto flex flex-col gap-6">

        {/* Features Row - Scrollable on mobile, static on desktop */}
        <div className="overflow-x-auto md:overflow-visible scrollbar-hide">
          <div className="flex md:flex-wrap md:justify-between gap-6 min-w-max md:min-w-0">
            {features.map((f, i) => (
              <div
                key={i}
                className="flex flex-col md:flex-row items-center md:items-start gap-3 min-w-[180px] md:min-w-[140px] flex-shrink-0 md:flex-shrink"
              >
                <div className="rounded-full p-3 flex-shrink-0" style={{backgroundColor: "var(--theme-color)"}}>
                  <f.icon className="w-6 h-6 md:w-6 md:h-6 text-white stroke-[2.5]" />
                </div>
                <div className="text-center md:text-left">
                  <h3 className="text-black font-bold text-sm">{f.title}</h3>
                  <p className="text-gray-600 text-xs">{f.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Social Links Row */}
        <div className="flex flex-col items-center md:flex-row md:justify-center gap-4">
          <p className="text-black font-medium text-sm whitespace-nowrap text-center md:text-left">
            Show us some love ❤️ on social media
          </p>
          <div className="flex gap-3">
            {socialLinks.map((s, i) => (
              <a
                key={i}
                href={s.href}
                aria-label={s.label}
                className={`${s.bg} rounded-full p-2.5 hover:scale-110 transition-transform duration-200 flex items-center justify-center`}
              >
                <s.icon className={`w-5 h-5 ${s.iconColor} `} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
