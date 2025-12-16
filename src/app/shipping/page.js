// pages/shipping-delivery.js
import Head from "next/head";
import { Truck, Clock, MapPin, Package, Headphones } from "lucide-react";


export default function ShippingDelivery() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f9fafb] to-white py-12 px-4 sm:px-6 lg:px-8">
      <Head>
        <title>Shipping & Delivery - StylishHim</title>
        <meta
          name="description"
          content="Shipping & Delivery details for StylishHim products."
        />
      </Head>

      <div className="max-w-5xl mx-auto text-gray-800">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-[#222] mb-3">
            Shipping & Delivery
          </h1>
          <p className="text-gray-600 text-base md:text-lg">
            Learn how we process, pack, and deliver your StylishHim products with care and speed.
          </p>
        </div>

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Order Processing */}
          <section className="bg-white rounded-2xl  p-6 border border-gray-100 hover:shadow-lg transition-all duration-200">
            <div className="flex items-center gap-3 mb-3">
              <Package style={{color: "var(--theme-color)"}} size={28} />
              <h2 className="text-2xl font-semibold">Order Processing</h2>
            </div>
            <p className="text-gray-600 mb-3">
              We begin processing your order immediately after it&apos;s placed. Orders are typically dispatched within <b>1–2 business days</b>.
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>All orders are carefully packed to maintain product safety.</li>
              <li>In case of high demand, dispatch time may extend slightly.</li>
            </ul>
          </section>

          {/* Domestic Shipping */}
          <section className="bg-white rounded-2xl  p-6 border border-gray-100 hover:shadow-lg transition-all duration-200">
            <div className="flex items-center gap-3 mb-3">
              <Truck style={{color: "var(--theme-color)"}} size={28} />
              <h2 className="text-2xl font-semibold">Domestic Shipping</h2>
            </div>
            <p className="text-gray-600 mb-3">
              We offer delivery across India through trusted courier partners.
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Standard Delivery: <b>3–5 business days</b></li>
              <li>Express Delivery (selected locations): <b>1–2 business days</b></li>
              <li>Free shipping for orders above ₹999</li>
            </ul>
          </section>

          {/* International Shipping */}
          <section className="bg-white rounded-2xl  p-6 border border-gray-100 hover:shadow-lg transition-all duration-200">
            <div className="flex items-center gap-3 mb-3">
              <MapPin style={{color: "var(--theme-color)"}} size={28} />
              <h2 className="text-2xl font-semibold">International Shipping</h2>
            </div>
            <p className="text-gray-600 mb-3">
              We ship internationally to select countries. Estimated delivery time:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Asia & Middle East: 7–10 business days</li>
              <li>Europe & North America: 10–14 business days</li>
              <li>Rest of World: 14–20 business days</li>
            </ul>
            <p className="text-gray-600 mt-3">
              Customs duties and taxes, if applicable, are the responsibility of the buyer.
            </p>
          </section>

          {/* Tracking & Updates */}
          <section className="bg-white rounded-2xl  p-6 border border-gray-100 hover:shadow-lg transition-all duration-200">
            <div className="flex items-center gap-3 mb-3">
              <Clock style={{color: "var(--theme-color)"}} size={28} />
              <h2 className="text-2xl font-semibold">Tracking & Updates</h2>
            </div>
            <p className="text-gray-600 mb-3">
              Once your order is shipped, you&apos;ll receive an email and SMS containing your tracking number and courier details.
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Track your shipment anytime using the provided tracking link.</li>
              <li>Our team monitors deliveries to ensure timely arrivals.</li>
            </ul>
          </section>
        </div>

        {/* Delivery Policy Section */}
        <section className="mt-10 bg-[#F0F0F0] rounded-2xl p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Truck style={{color: "var(--theme-color)"}} size={36} />
            <div>
              <h2 className="text-2xl font-semibold mb-2">Delivery Policy</h2>
              <p className="text-gray-600 mb-2">
                In case your order is delayed beyond the estimated timeframe, please contact our support team. We&apos;ll ensure your issue is resolved promptly.
              </p>
              <ul className="text-gray-700 space-y-1">
                <li>🚫 Delays may occur due to weather or courier partner issues.</li>
                <li>📦 Orders marked as &quot;Delivered&quot; by courier are considered fulfilled.</li>
                <li>📍 Ensure your address and contact details are accurate at checkout.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Support Section */}
        <section className="mt-10 bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Headphones style={{color: "var(--theme-color)"}} size={36} />
            <div>
              <h2 className="text-2xl font-semibold mb-2">Customer Support</h2>
              <p className="text-gray-600 mb-2">
                For shipping or delivery concerns, contact us at:
              </p>
              <ul className="text-gray-700 space-y-1">
                <li>
                  📧 Email:{" "}
                  <a
                    href="mailto:stylishhim@gmail.com"
                    style={{color: "var(--theme-color)"}}
                    className="underline"
                  >
                    stylishhim@gmail.com
                  </a>
                </li>
                <li>📞 Phone: +91-123-456-7890 (Mon–Fri, 9 AM–6 PM IST)</li>
                <li>💬 Live Chat: Available on our website</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
