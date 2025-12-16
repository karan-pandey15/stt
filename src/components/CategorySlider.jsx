"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const CategorySlider = () => {
  const scrollContainerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const categories = [
    { name: "Skin", image: "/images/categoryImage/skin.png" },
    { name: "Best Seller", image: "/images/categoryImage/bestseller.png" },
    { name: "Gifts", image: "/images/categoryImage/gifting.jpg" },
    { name: "Hair", image: "/images/categoryImage/hair.png" },
    { name: "Men Razors", image: "/images/categoryImage/menrazors.png" },
    { name: "Trimmers", image: "/images/categoryImage/fragrances.png" },
    { name: "Shave", image: "/images/categoryImage/bathbody.png" },
    { name: "Fragrances", image: "/images/categoryImage/glow.png" },
  ];

  return (
    <div className="w-full bg-white mt-0 sm:mt-4 md:mt-3 lg:mt-0">
      {/* Desktop View - Text Navigation */}
      <div className="hidden lg:block mb-[15px]">
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-center gap-8 flex-wrap">
            {categories.map((category, index) => (
              <Link
                key={index}
                href={`/categoryproducts?categoryName=${encodeURIComponent(
                  category.name
                )}`}
                className="text-gray-700 transition-colors duration-200 text-sm font-medium whitespace-nowrap"
                onMouseEnter={(e) =>
                  (e.target.style.color = "var(--theme-color)")
                }
                onMouseLeave={(e) =>
                  (e.target.style.color = "rgb(107, 114, 128)")
                }
              >
                {category.name}
              </Link>
            ))}
            <span className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-1 rounded-full text-sm font-bold">
              SALE
            </span>
          </nav>
        </div>
      </div>

      {/* Mobile View - Image Slider */}
      <div className="lg:hidden">
        <div
          ref={scrollContainerRef}
          className="mt-2 flex overflow-x-auto gap-2 px-4 scrollbar-hide snap-x snap-mandatory"
          style={{
            scrollBehavior: "smooth",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {categories.map((category, index) => (
            <Link
              key={index}
              href={`/categoryproducts?categoryName=${encodeURIComponent(
                category.name
              )}`}
              className="flex-shrink-0 snap-start"
              style={{ width: "calc(33% - 25.4px)" }}
            >
              <div className="flex flex-col items-center gap-2">
                <div className="relative w-full aspect-square rounded-full overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-fill"
                    sizes="20vw"
                    priority
                  />
                </div>
               
              </div>
            </Link>
          ))}
        </div>
      </div>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default CategorySlider;
