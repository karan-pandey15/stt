import React from "react";


const categories = [
  { id: 1, name: "Gifting", image: "/images/gifting.jpg" }, 
  { id: 2, name: "Makeup", image: "/images/gifting.png" },
  { id: 3, name: "Skin", image: "/images/gifting.png" },
  { id: 4, name: "Hair", image: "/images/gifting.png" },
  { id: 5, name: "Appliances", image: "/images/gifting.png" },
  { id: 6, name: "Bath & Body", image: "/images/gifting.png" },
  { id: 7, name: "Natural", image: "/images/gifting.png" },
  { id: 8, name: "Mom & Baby", image: "/images/gifting.png" },
  { id: 9, name: "Health & Wellness", image: "/images/gifting.png" },
  { id: 10, name: "Men", image: "/images/gifting.png" },
  { id: 11, name: "Fragrance", image: "/images/gifting.png" },
  { id: 12, name: "Lingerie & Accessories", image: "/images/gifting.png" },
  { id: 13, name: "Sale", isSale: true },
];

const CategoryBar = () => {
  return (
    <div className="w-full border-b border-gray-200 bg-white overflow-x-auto pt-[120px] md:pt-[60px]">
      <div className="flex justify-center items-center space-x-6 py-2 px-4 min-w-max">
        {categories.map((cat) => (
          <div
            key={cat.id}
            style={cat.isSale ? {backgroundColor: "var(--theme-color)"} : {}}
            className={`cursor-pointer whitespace-nowrap transition-all duration-300 flex flex-col items-center ${
              cat.isSale
                ? "text-white px-2 py-1 rounded-[20px] shadow-lg hover:scale-105 hover:shadow-xl text-sm sm:text-xs md:text-sm lg:text-base"
                : "text-secondary hover:text-primary"
            }`}
          >
            {cat.isSale ? (
              <span className="text-[14px] font-medium">{cat.name}</span>
            ) : (
              <>
                {/* Desktop / Large screens: show text */}
                <span className="hidden md:block text-[14px] font-medium">
                  {cat.name}
                </span>
                {/* Mobile / Tablet: show image */}
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="block md:hidden w-12 h-12 object-contain"
                />
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryBar;
