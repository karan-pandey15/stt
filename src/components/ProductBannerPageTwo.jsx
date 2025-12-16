

export default function ProductBannerPageTwo() {
  return (
    <div className="bg-white">
      {/* Heading Section */}
      <div className="px-4 sm:px-8 md:px-16 lg:px-24 py-8 md:py-12">
        <h1 
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-center leading-relaxed"
          style={{ color: "var(--theme-color)" }}
        >
        Glow FaceWash 
        
        </h1>
      </div>

      {/* Image Section - Full width, no gaps */}
      <div className="w-full">
        {/* Desktop: Landscape Image */}
        <div className="hidden md:block w-full">
          <img
            src="/images/facewashlandscape.png"
            alt="Beautiful flower petals in nature"
            className="w-full h-auto object-cover"
            style={{ aspectRatio: '16/9' }}
          />
        </div>

        {/* Mobile: Portrait Image */}
        <div className="block md:hidden w-full">
          <img
           src="/images/facewashpotraitimg.png"
             alt="Beautiful flower petals in nature"
            className="w-full h-auto object-cover"
            style={{ aspectRatio: '3/4' }}
          />
        </div>
      </div>

      {/* Optional: Additional content section */}
      <div className="px-4 sm:px-8 md:px-16 lg:px-24 py-8 md:py-12">
        <p 
          className="text-base sm:text-lg md:text-xl text-center font-light"
          style={{ color: "var(--theme-color)" }}
        >
          Experience the tranquil beauty where nature meets artistry.
        </p>
      </div>
    </div>
  );
}