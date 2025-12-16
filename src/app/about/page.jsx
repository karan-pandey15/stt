'use client';

import { useState } from 'react';

export default function AboutUs() {
    const [email, setEmail] = useState('');
    return (
        <div className="bg-white pt-[16px] md:pt-[16px]">

            <div className="w-full">

                {/* Mobile: Portrait Image */}
                <div className="block w-full relative">
                    <img
                        src="/images/aboutUs.png"
                        alt="Beautiful flower petals in nature"
                        className="w-full h-auto object-cover"
                        style={{ aspectRatio: '16/9' }}
                    />

                    {/* Text overlay (optional) */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <h1 className="text-white text-3xl md:text-5xl font-bold drop-shadow-lg">
                            About Us : StylishHim
                        </h1>
                    </div>
                </div>



            </div>
            <section className="bg-white py-16 px-4 md:px-16 max-w-7xl mx-auto text-center">
                {/* Small header */}
                <p className="text-sm text-gray-500 uppercase tracking-wide mb-2">
                    Our Story
                </p>

                {/* Main Heading */}
                <h2 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
                    Glow Naturally. Care Consciously.
                </h2>

                {/* Paragraph */}
                <p className="text-gray-700 text-base md:text-lg max-w-3xl mx-auto mb-8">
                    At <span className="font-semibold">StylishHim</span>, we believe that beauty should feel honest, effortless, and kind — to your skin and the planet. Born out of the need for clean, effective wellness and skincare tailored for modern lifestyles, we create high-performance formulations powered by nature and backed by science.
                </p>

                <p className="text-gray-700 text-base md:text-lg max-w-3xl mx-auto mb-6">
                    We’re more than just a wellness and skincare brand — we’re a movement towards safe, natural, and conscious self-care, without compromise.
                </p>

                {/* Features / Checklist */}
                <div className="flex flex-col md:flex-row justify-center gap-6 md:gap-12 mt-6 text-left">
                    <div className="flex items-start gap-2 md:w-1/2">
                        <span className="text-green-500 text-xl">✅</span>
                        <p className="text-gray-700">Clean & Conscious: No harsh chemicals, parabens, or shortcuts.</p>
                    </div>
                    <div className="flex items-start gap-2 md:w-1/2">
                        <span className="text-green-500 text-xl">✅</span>
                        <p className="text-gray-700">Tailored for Your Skin: Gentle, effective, and climate-conscious formulations.</p>
                    </div>
                    <div className="flex items-start gap-2 md:w-1/2">
                        <span className="text-green-500 text-xl">✅</span>
                        <p className="text-gray-700">Backed by Science: Proven ingredients like Vitamin C, Niacinamide & Biotin.</p>
                    </div>
                    <div className="flex items-start gap-2 md:w-1/2">
                        <span className="text-green-500 text-xl">✅</span>
                        <p className="text-gray-700">Cruelty-Free & Honest: Because your glow shouldn’t harm anything.</p>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-[#F0F0F0]">
                <div className="max-w-4xl mx-auto text-center px-4">
                    <h2 className="text-4xl font-bold text-gray-900 mb-8">
                        Our Mission
                    </h2>
                    <p className="text-gray-700 text-lg mb-6 leading-relaxed max-w-3xl mx-auto">
                        To empower every individual to feel confident in their own skin – through thoughtful, safe, and
                        effective self-care products made with integrity and love.
                    </p>
                    <p className="text-gray-700 text-lg mb-8 leading-relaxed max-w-3xl mx-auto">
                        From acne control to glow restoration, from scalp care to hair fall solutions – every Seon Skin
                        product is created with you in mind.
                    </p>
                    <div className="space-y-2">
                        <p className="text-2xl font-semibold text-gray-900">Ready to glow naturally?</p>
                        <p className="text-xl text-gray-600 italic">Welcome to StylishHim – organically yours.</p>
                    </div>
                </div>
            </section>
            <section className="py-8 bg-white">
                <div className="max-w-4xl mx-auto text-center px-4">
                    <h1 className="text-4xl font-bold uppercase text-gray-900 mb-4">
                        JOIN OUR SUMMER JOURNEY
                    </h1>
                    <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                        From new collections and exclusive previews to summer styling tips and special offers, get
                        everything delivered straight to your inbox.
                    </p>
                    <form className="flex flex-col sm:flex-row gap-4 justify-center">
                        <input
                            type="email"
                            placeholder="Enter your E-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="flex-1 px-4 py-3 border border-gray-300 rounded-md text-gray-900"
                            style={{outlineColor: "var(--theme-color)"}}
                            onFocus={(e) => e.target.style.boxShadow = `0 0 0 3px ${"var(--theme-color)"}40`}
                            onBlur={(e) => e.target.style.boxShadow = 'none'}
                            required
                        />
                        <button
                            type="submit"
                            style={{backgroundColor: "var(--theme-color)"}}
                            className="px-6 py-3 text-white font-semibold rounded-md transition-colors"
                        >
                            Subscribe NOW
                        </button>
                    </form>
                </div>
            </section>
        </div>
    );
}
