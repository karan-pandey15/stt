'use client';
import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';


const CarouselBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Separate banners for mobile and desktop
  const mobileBanners = [
    {
      id: 1,
      src: '/bannerImages/banner1.png',
      alt: 'Nykaa Diwali Dhamaka Sale',
      link: '#',
    },
    {
      id: 2,
      src: '/bannerImages/bannertwo.png',
      alt: 'Get Glowing',
      link: '#',
    },
  ];

  const desktopBanners = [
    {
      id: 1,
      src: '/bannerImages/stylishhimbanner18.png',
      alt: 'Stylish Banner 1',
      link: '#',
    },

    
  ];

  const banners = isMobile ? mobileBanners : desktopBanners;

  useEffect(() => {
    const updateViewport = () => {
      if (typeof window !== 'undefined') {
        const width = window.innerWidth;
        setIsMobile(width < 768);
      }
    };

    updateViewport();
    window.addEventListener('resize', updateViewport);
    return () => window.removeEventListener('resize', updateViewport);
  }, []);

  // Reset index when switching between mobile/desktop
  useEffect(() => {
    setCurrentIndex(0);
  }, [isMobile]);

  const totalSlides = banners.length;

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index) => setCurrentIndex(index);

  const handleTouchStart = (e) => (touchStartX.current = e.touches[0].clientX);
  const handleTouchMove = (e) => (touchEndX.current = e.touches[0].clientX);
  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) goToNext();
    if (touchStartX.current - touchEndX.current < -50) goToPrev();
  };

  const StarIcon = ({ style }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" style={style}>
      <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
    </svg>
  );

  const AnimatedStars = () => {
    const starColors = ['#FBE0CD', '#F1F1EF', '#F4D138'];
    const stars = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      color: starColors[Math.floor(Math.random() * starColors.length)],
      size: Math.random() * 20 + 15,
      delay: Math.random() * 3,
      duration: Math.random() * 2 + 1.5,
      blinkDuration: Math.random() * 2 + 1,
    }));

    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute"
            style={{
              left: star.left,
              top: star.top,
              width: `${star.size}px`,
              height: `${star.size}px`,
              color: star.color,
              animation: `starFloat ${star.duration}s ease-in-out ${star.delay}s infinite,
                          starBlink ${star.blinkDuration}s ease-in-out ${star.delay}s infinite,
                          colorChange 4s ease-in-out ${star.delay}s infinite`,
            }}
          >
            <StarIcon />
          </div>
        ))}
        <style jsx>{`
          @keyframes starFloat {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-30px) rotate(180deg); }
          }
          @keyframes starBlink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.2; }
          }
          @keyframes colorChange {
            0% { color: #FBE0CD; }
            33% { color: #F1F1EF; }
            66% { color: #F4D138; }
            100% { color: #FBE0CD; }
          }
        `}</style>
      </div>
    );
  };

  return (
    <div className="relative w-full overflow-hidden bg-white md:bg-[#FFEEE2]">
      {!isMobile && <AnimatedStars />}

      {/* Wrapper - Remove side gaps on laptop */}
      <div className={`relative w-full mx-auto ${isMobile ? '' : 'py-0'}`}>
        {!isMobile && (
          <h2 style={{color: "var(--theme-color)"}} className="text-center text-4xl font-bold mb-6 tracking-[0.8px]">
            GET GLOWING
          </h2>
        )}

        {/* Carousel Container */}
        <div
          className="relative overflow-hidden"
          onTouchStart={isMobile ? handleTouchStart : null}
          onTouchMove={isMobile ? handleTouchMove : null}
          onTouchEnd={isMobile ? handleTouchEnd : null}
        >
          {/* Slides */}
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {banners.map((banner) => (
              <div key={banner.id} className="flex-shrink-0 w-full relative">
                <a href={banner.link} className="block w-full relative">
                  <img
                    src={banner.src}
                    alt={banner.alt}
                    className={`w-full h-auto ${isMobile ? '' : 'object-fill'}`}
                    style={
                      isMobile
                        ? {}
                        : {
                          width: '100%',
                          height: '100vh', // Increased height for laptops/desktops
                          objectPosition: 'center center',
                          objectFit: 'cover',
                        }
                    }
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </a>
              </div>
            ))}
          </div>

          {/* Arrows (Desktop Only) */}
          {!isMobile && totalSlides > 1 && (
            <>
              <button
                onClick={goToPrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white hover:shadow-xl transition-all duration-200 z-10 group"
              >
                <ChevronLeft className="w-6 h-6 text-gray-800 group-hover:-translate-x-1 transition-transform duration-200" />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white hover:shadow-xl transition-all duration-200 z-10 group"
              >
                <ChevronRight className="w-6 h-6 text-gray-800 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
            </>
          )}

          {/* Indicators */}
          {totalSlides > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex justify-center space-x-2 z-20">
              {Array.from({ length: totalSlides }, (_, i) => (
                <button
                  key={i}
                  onClick={() => goToSlide(i)}
                  style={i === currentIndex ? {backgroundColor: "var(--theme-color)"} : {}}
                  className={`transition-all duration-200 rounded-full ${i === currentIndex
                      ? 'w-8 h-3'
                      : 'w-3 h-3 bg-gray-300 hover:bg-gray-400'
                    }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CarouselBanner;
