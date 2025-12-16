import { Leaf, Recycle, Sun } from "lucide-react";


export default function Sustainability() {
  return (
    <div className="min-h-screen text-gray-800 flex flex-col items-center justify-center px-6 py-16 bg-[#F9F8F7]">
      {/* Header Section */}
      <div className="text-center max-w-3xl">
        <h1 style={{color: "var(--theme-color)"}} className="text-4xl md:text-5xl font-serif mb-6 animate-fadeIn">
          Our Commitment to SustainabilityOur Commitment to Sustainability
        </h1>
        <p className="text-gray-600 text-lg leading-relaxed">
          At <span style={{color: "var(--theme-color)"}} className="font-semibold">StylishHim</span>, we believe that beauty should not come at the cost of our planet.
          Every product we create and every process we follow is carefully designed to minimize environmental impact and promote responsible choices.
        </p>
      </div>

      {/* Three Pillars Section */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-10 w-full max-w-6xl">
        {/* Eco-friendly Sourcing */}
        <div className="bg-white shadow-md rounded-2xl p-8 text-center hover:shadow-xl transition duration-300">
          <div className="flex justify-center mb-5">
            <Leaf size={64} strokeWidth={1.5} style={{color: "var(--theme-color)"}} />
          </div>
          <h2 style={{color: "var(--theme-color)"}} className="text-2xl font-semibold mb-3">Eco-friendly Sourcing</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            We partner with ethical suppliers who share our respect for nature. 
            Our ingredients are sourced responsibly, ensuring both purity and sustainability.
          </p>
        </div>

        {/* Recyclable Packaging */}
        <div className="bg-white shadow-md rounded-2xl p-8 text-center hover:shadow-xl transition duration-300">
          <div className="flex justify-center mb-5">
            <Recycle size={64} strokeWidth={1.5} style={{color: "var(--theme-color)"}} />
          </div>
          <h2 style={{color: "var(--theme-color)"}} className="text-2xl font-semibold mb-3">Recyclable Packaging</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            All our packaging materials are 100% recyclable or biodegradable — 
            because we believe in leaving a cleaner planet for future generations.
          </p>
        </div>

        {/* Energy Efficiency */}
        <div className="bg-white shadow-md rounded-2xl p-8 text-center hover:shadow-xl transition duration-300">
          <div className="flex justify-center mb-5">
            <Sun size={64} strokeWidth={1.5} style={{color: "var(--theme-color)"}} />
          </div>
          <h2 style={{color: "var(--theme-color)"}} className="text-2xl font-semibold mb-3">Energy Efficiency</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Our production processes are optimized to reduce waste and conserve energy, 
            making sustainability an everyday practice at StylishHim.
          </p>
        </div>
      </div>

      {/* Footer Message */}
      <div className="mt-20 max-w-3xl text-center">
        <h3 style={{color: "var(--theme-color)"}} className="text-2xl font-semibold mb-4">Sustainability is Our Lifestyle</h3>
        <p className="text-gray-600 leading-relaxed text-md">
          We are on a journey to redefine beauty — one that celebrates nature, respects the planet, and inspires conscious living.  
          Together, we can make a difference, one mindful choice at a time.
        </p>
      </div>
    </div>
  );
}
