import Head from "next/head";


export default function ShippingPolicy() {
  return (
    <div className="min-h-screen pb-12 px-6">
      <Head>
        <title>Shipping Policy - StylishHim</title>
        <meta name="description" content="Shipping Policy of StylishHim" />
      </Head>

      <div className="max-w-5xl mx-auto bg-white p-10 rounded-2xl ">
        <h1 style={{color: "var(--theme-color)"}} className="text-4xl font-bold mb-8 text-center">
          Shipping Policy
        </h1>

        <p className="text-gray-700 mb-4">
          StylishHim ensures timely and secure delivery of your orders. Below is a detailed overview of our shipping policies.
        </p>

        <h2 style={{color: "var(--theme-color)"}} className="text-2xl font-semibold mb-3 mt-6">Processing Time</h2>
        <p className="text-gray-700 mb-3">
          All orders are processed within 1–2 business days. Orders placed on weekends or holidays will be processed the next business day.
        </p>

        <h2 style={{color: "var(--theme-color)"}} className="text-2xl font-semibold mb-3 mt-6">Delivery Time</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li>Domestic (within India): 3–5 business days</li>
          <li>International: 7–14 business days (may vary by country)</li>
          <li>Delivery delays may occur due to customs, weather, or carrier issues</li>
        </ul>

        <h2 style={{color: "var(--theme-color)"}} className="text-2xl font-semibold mb-3 mt-6">Shipping Charges</h2>
        <p className="text-gray-700 mb-3">
          Shipping charges are calculated at checkout and may vary based on order size and location. We occasionally offer free shipping promotions.
        </p>

        <h2 style={{color: "var(--theme-color)"}} className="text-2xl font-semibold mb-3 mt-6">Order Tracking</h2>
        <p className="text-gray-700 mb-3">
          After your order is shipped, you will receive a tracking number via email or SMS. You can track your package through the carrier&apos;s website.
        </p>

        <h2 style={{color: "var(--theme-color)"}} className="text-2xl font-semibold mb-3 mt-6">Lost or Damaged Shipments</h2>
        <p className="text-gray-700 mb-3">
          If your package is lost or arrives damaged, please contact our support team within 48 hours of delivery. We will assist with replacements or refunds as per our policy.
        </p>
      </div>
    </div>
  );
}
