import React from 'react';


export default function FooterBanner() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { name: 'Terms & Conditions', href: '/terms-and-conditions' },
    { name: 'Shipping Policy', href: '/shipping-policy' },
    { name: 'Cancellation Policy', href: '/cancellation-policy' },
    { name: 'Privacy Policy', href: '/privacy-policy' }
  ];

  return (
    <footer className="w-full py-4 px-4" style={{backgroundColor: "var(--theme-color)"}}>
      <div className="max-w-7xl mx-auto">
        {/* Desktop Layout */}
        <div className="hidden md:block">
          {/* Links Section */}
          <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-3 mb-6">
            {footerLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="text-white text-[14px] font-[500] hover:underline transition-all hover:scale-105"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <div className="text-center mb-2">
            <p className="text-white text-[15px] font-[500]">
              © {currentYear} STYLISHHIM PVT LIMITED All Rights Reserved.
            </p>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden space-y-6">
          {/* Links Section */}
          <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-3">
            {footerLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="text-white text-sm font-[500] hover:underline transition-all"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <div className="text-center">
            <p className="text-white text-xs font-[500] leading-relaxed">
              © {currentYear} STYLISHHIM PVT LIMITED<br />All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}