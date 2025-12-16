// pages/cancellation-return.js
import Head from "next/head";
import { XCircle, RefreshCw, CreditCard, Truck, Headphones } from "lucide-react";


export default function CancellationReturn() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f9fafb] to-white py-12 px-4 sm:px-6 lg:px-8">
      <Head>
        <title>Cancellation & Return - StylishHim</title>
        <meta
          name="description"
          content="Cancellation, Return, and Shipping Policy for StylishHim"
        />
      </Head>

      <div className="max-w-5xl mx-auto text-gray-800">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-[#222] mb-3">
            Cancellation & Return
          </h1>
          <p className="text-gray-600 text-base md:text-lg">
            We care about your satisfaction. Here’s everything you need to know
            about our order, refund, and shipping policies.
          </p>
        </div>

        {/* Policy Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Cancellation Policy */}
          <section className="bg-white rounded-2xl  p-6 border border-gray-100 hover:shadow-lg transition-all duration-200">
            <div className="flex items-center gap-3 mb-3">
              <XCircle style={{color: "var(--theme-color)"}} size={28} />
              <h2 className="text-2xl font-semibold">Cancellation Policy</h2>
            </div>
            <p className="text-gray-600 mb-3">
              You can cancel your order if it hasn’t been shipped yet. To cancel:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>
                Cancellation is available within <b>2 hours</b> of placing your order.
              </li>
              <li>
                Email us at{" "}
                <a
                  href="mailto:stylishhim@gmail.com"
                  style={{color: "var(--theme-color)"}}
                  className="underline"
                >
                  stylishhim@gmail.com
                </a>{" "}
                with your order number.
              </li>
            </ul>
            <p className="text-gray-600 mt-3">
              A full refund will be processed within 5–7 working days once the cancellation is confirmed.
            </p>
          </section>

          {/* Return Policy */}
          <section className="bg-white rounded-2xl  p-6 border border-gray-100 hover:shadow-lg transition-all duration-200">
            <div className="flex items-center gap-3 mb-3">
              <RefreshCw style={{color: "var(--theme-color)"}} size={28} />
              <h2 className="text-2xl font-semibold">Return Policy</h2>
            </div>
            <p className="text-gray-600 mb-3">
              Due to hygiene reasons, returns are not accepted once delivered,
              except for damaged or defective products.
            </p>
            <p className="text-gray-600">
              Our team ensures your satisfaction and will address issues promptly
              as per our refund policy.
            </p>
          </section>

          {/* Refund Policy */}
          <section className="bg-white rounded-2xl  p-6 border border-gray-100 hover:shadow-lg transition-all duration-200">
            <div className="flex items-center gap-3 mb-3">
              <CreditCard style={{color: "var(--theme-color)"}} size={28} />
              <h2 className="text-2xl font-semibold">Refund Policy</h2>
            </div>
            <p className="text-gray-600 mb-2">Refunds apply only if:</p>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Product is damaged or defective.</li>
              <li>Incorrect item was received.</li>
            </ul>
            <p className="text-gray-600 mt-3">
              Contact us at{" "}
              <a
                href="mailto:stylishhim@gmail.com"
                style={{color: "var(--theme-color)"}}
                className="underline"
              >
                stylishhim@gmail.com
              </a>{" "}
              within 3 days of receiving your order with your order number and
              photo proof.
            </p>
            <p className="text-gray-600 mt-2">
              Refunds are processed in 5–7 working days. Shipping charges are
              non-refundable.
            </p>
          </section>

          {/* Shipping Info */}
          <section className="bg-white rounded-2xl  p-6 border border-gray-100 hover:shadow-lg transition-all duration-200">
            <div className="flex items-center gap-3 mb-3">
              <Truck style={{color: "var(--theme-color)"}} size={28} />
              <h2 className="text-2xl font-semibold">Shipping Information</h2>
            </div>
            <p className="text-gray-600 mb-2">
              Orders are shipped within 1–2 business days. Estimated delivery:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Within India: 3–5 business days</li>
              <li>International: 7–14 business days</li>
            </ul>
            <p className="text-gray-600 mt-3">
              For shipping queries, contact support with your tracking number.
            </p>
          </section>
        </div>

        {/* Support Section */}
        <section className="mt-10 bg-[#F0F0F0]  rounded-2xl p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Headphones style={{color: "var(--theme-color)"}} size={36} />
            <div>
              <h2 className="text-2xl font-semibold mb-2">Customer Support</h2>
              <p className="text-gray-600 mb-2">
                Need help with cancellations, returns, or refunds?
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
                <li>💬 Live Chat: Available during business hours</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
