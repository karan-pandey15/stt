// pages/authenticity.js
import Head from "next/head";
import { ShieldCheck, FlaskConical, Leaf, CheckCircle2 } from "lucide-react";


export default function Authenticity() {
  return (
    <div className="min-h-screen text-gray-800">
      <Head>
        <title>Authenticity - StylishHim</title>
        <meta
          name="description"
          content="Authenticity and Quality Promise by StylishHim"
        />
      </Head>

      

      {/* Intro Section */}
      <section className="max-w-5xl mx-auto py-12 px-6 text-center">
        <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
          At <b>StylishHim</b>, authenticity isn’t a choice — it’s our foundation.  
          Every product is formulated with carefully sourced, certified ingredients to ensure you receive **pure, safe, and effective skincare** — exactly as nature intended.
        </p>
      </section>

      {/* Authenticity Pillars */}
      <section className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-6 pb-16">
        {[
          {
            icon: ShieldCheck,
            title: "100% Genuine",
            desc: "All products are verified and sourced directly from trusted manufacturers and certified suppliers.",
          },
          {
            icon: FlaskConical,
            title: "Clinically Tested",
            desc: "Every formula undergoes quality checks and dermatological testing to meet global safety standards.",
          },
          {
            icon: Leaf,
            title: "Naturally Derived",
            desc: "We embrace nature’s essence — responsibly using plant-based and cruelty-free ingredients.",
          },
          {
            icon: CheckCircle2,
            title: "Transparent Labels",
            desc: "No hidden chemicals. Every ingredient is listed so you know exactly what touches your skin.",
          },
        ].map(({ icon: Icon, title, desc }, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-6 flex flex-col items-center text-center border border-gray-100"
          >
            <div className="bg-[#F0F0F0] p-3 rounded-full mb-4">
              <Icon style={{color: "var(--theme-color)"}} size={30} />
            </div>
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
          </div>
        ))}
      </section>

      {/* About Section */}
      <section className="bg-[#F0F0F0] py-16 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-[#3b3b3b]">
            Why Authenticity Matters
          </h2>
          <p className="text-gray-700 leading-relaxed text-base md:text-lg">
            In an age of imitation, we take pride in delivering products that are **honest, traceable, and safe**.  
            Our authenticity ensures that what you use on your skin is of the highest purity — free from harmful chemicals and unnecessary additives.
          </p>
        </div>
      </section>

      {/* Certification Section */}
   <section className="max-w-5xl mx-auto py-16 px-6 flex justify-center items-center">
  <div className="text-center">
    <h2 className="text-3xl font-bold mb-4 text-[#3b3b3b]">
      Certified by Trusted Standards
    </h2>
    <p className="text-gray-700 mb-4">
      Our products are crafted following globally recognized certifications for safety and authenticity:
    </p>
    <ul className="list-disc list-inside text-gray-700 space-y-2">
      <li>ISO and GMP certified facilities</li>
      <li>Dermatologically tested and approved</li>
      <li>100% cruelty-free and eco-friendly manufacturing</li>
    </ul>
  </div>
</section>

      {/* Quote/Testimonial Section */}
      <section className="bg-gradient-to-r from-[#F0F0F0] to-[#F0F0F0] py-16 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-2xl md:text-3xl italic text-[#6b4a2b] font-serif mb-6">
            “True beauty begins with truth — the purity of what you apply to your skin and the integrity of the brand behind it.”
          </p>
          <p className="font-semibold text-[#3b3b3b]">— Team StylishHim</p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 text-center">
        <h2 className="text-3xl font-bold text-[#3b3b3b] mb-4">
          Have a Question About Authenticity?
        </h2>
        <p className="text-gray-600 mb-4">
          Reach out to our quality assurance team for product verification or certification details.
        </p>
        <a
          href="mailto:stylishhim@gmail.com"
          style={{ backgroundColor: "var(--theme-color)"}}
          className="inline-block text-white px-6 py-3 rounded-full hover:bg-[#a56d46] transition-all duration-300"
        >
          Contact Us
        </a>
      </section>
    </div>
  );
}
