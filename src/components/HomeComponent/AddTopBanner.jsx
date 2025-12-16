"use client";
import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const AddTopBanner = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const touchStartX = useRef(0);
    const touchEndX = useRef(0);

    const banners = [
        {
            id: 1,
            src: "https://images-static.nykaa.com/uploads/ba8cf5e4-9c2d-4df8-a1dc-ebff9a6d9d1e.jpg",
            alt: "Nykaa Diwali Dhamaka Sale",
            link: "#",
            title: "Nykaa Diwali Dhamaka Sale",
            subtitle: "Up to 50% Off",
            buttonText: "Know More",
        },
        {
            id: 2,
            src: "https://images-static.nykaa.com/uploads/ba8cf5e4-9c2d-4df8-a1dc-ebff9a6d9d1e.jpg",
            alt: "Get Glowing",
            link: "#",
            title: "Only At Nykaa",
            subtitle: "Up to 10% Off",
            buttonText: "Know More",
        },
        {
            id: 3,
            src: "https://images-static.nykaa.com/uploads/ba8cf5e4-9c2d-4df8-a1dc-ebff9a6d9d1e.jpg",
            alt: "Foxtale Offer",
            link: "#",
            title: "Up To 30% Off",
            subtitle: "Free Gift on ₹599+",
            buttonText: "Know More",
        },
        {
            id: 4,
            src: "https://images-static.nykaa.com/uploads/ba8cf5e4-9c2d-4df8-a1dc-ebff9a6d9d1e.jpg",
            alt: "Festive Gift Store",
            link: "#",
            title: "Festive Gift Store",
            subtitle: "Perfect Gifts for Everyone",
            buttonText: "Know More",
        },
    ];

    const totalSlides = banners.length;

    const goToNext = () => setCurrentIndex((prev) => (prev + 1) % totalSlides);
    const goToPrev = () => setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
    const goToSlide = (i) => setCurrentIndex(i);

    const handleTouchStart = (e) => (touchStartX.current = e.touches[0].clientX);
    const handleTouchMove = (e) => (touchEndX.current = e.touches[0].clientX);
    const handleTouchEnd = () => {
        if (touchStartX.current - touchEndX.current > 50) goToNext();
        if (touchStartX.current - touchEndX.current < -50) goToPrev();
    };

    return (
        <>
            <div className="relative w-full flex justify-center">
                <div className="w-full max-w-[1500px] px-4 md:px-8 pb-[20px]">
                    <div
                        className="relative overflow-hidden rounded-2xl"
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                    >
                        <div
                            className="flex transition-transform duration-500 ease-in-out h-full"
                            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                        >
                            {banners.map((banner) => (
                                <div
                                    key={banner.id}
                                    className="flex-shrink-0 w-full h-full relative"
                                >
                                    <a href={banner.link} className="block w-full h-full relative">
                                        <img
                                            src={banner.src}
                                            alt={banner.alt}
                                            className=" rounded-2xl w-full h-full"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-2xl" />
                                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                            <button className="bg-[#AD9682] text-white px-6 py-2 rounded-full font-semibold hover:bg-[#f4b899] transition-colors inline-flex items-center gap-2">
                                                {banner.buttonText} <span>→</span>
                                            </button>
                                        </div>
                                    </a>
                                </div>
                            ))}
                        </div>

                        {/* Navigation */}
                        {/* Navigation */}
                        <button
                            onClick={goToPrev}
                            className="hidden md:flex absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg items-center justify-center hover:bg-white hover:shadow-xl transition-all duration-200 z-10"
                        >
                            <ChevronLeft className="w-6 h-6 text-gray-800" />
                        </button>
                        <button
                            onClick={goToNext}
                            className="hidden md:flex absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg items-center justify-center hover:bg-white hover:shadow-xl transition-all duration-200 z-10"
                        >
                            <ChevronRight className="w-6 h-6 text-gray-800" />
                        </button>

                    </div>

                </div>


            </div>
            <div className="w-full max-w-[1500px] px-4 md:px-8 pb-[20px]">
                <img
                    src="https://images-static.nykaa.com/uploads/aff25954-b7eb-4d75-a96b-9256bb5c346d.gif"
                    alt="desktop-banner"
                    className="rounded-2xl w-full h-full hidden sm:block"
                />

                {/* Mobile Banner */}
                <img
                    src="https://images-static.nykaa.com/uploads/703ea812-203d-44ab-9cf2-e38a472f8019.gif"
                    alt="mobile-banner"
                    className="rounded-2xl w-full h-full block sm:hidden"
                />

            </div></>
    );
};

export default AddTopBanner;
