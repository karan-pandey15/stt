import Head from "next/head";


export default function CancellationPolicy() {
  return (
    <div className="min-h-screen pb-12 px-6">
      <Head>
        <title>Cancellation Policy - StylishHim</title>
        <meta name="description" content="Cancellation Policy of StylishHim" />
      </Head>

      <div className="max-w-5xl mx-auto bg-white p-10 rounded-2xl  ">
        <h1 style={{color: "var(--theme-color)"}} className="text-4xl font-bold mb-8 text-center">
          Cancellation Policy
        </h1>

        <p className="text-gray-700 mb-4">
          Orders can be cancelled under certain conditions. Please review our guidelines below.
        </p>

        <h2 style={{color: "var(--theme-color)"}} className="text-2xl font-semibold mb-3 mt-6">Eligibility for Cancellation</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li>Cancellation is only possible before the order is shipped.</li>
          <li>Orders must be cancelled within 2 hours of placement.</li>
        </ul>

        <h2 style={{color: "var(--theme-color)"}} className="text-2xl font-semibold mb-3 mt-6">How to Cancel</h2>
        <p className="text-gray-700 mb-3">
          Send an email to <a href="mailto:stylishhim@gmail.com" style={{color: "var(--theme-color)"}} className="underline">stylishhim@gmail.com</a> with your order number and request for cancellation.
        </p>

        <h2 style={{color: "var(--theme-color)"}} className="text-2xl font-semibold mb-3 mt-6">Refund Process</h2>
        <p className="text-gray-700 mb-3">
          Once cancellation is confirmed, refunds are processed to the original payment method within 5–7 working days. Please note, shipping charges are non-refundable if the order has been shipped.
        </p>

        <h2 style={{color: "var(--theme-color)"}} className="text-2xl font-semibold mb-3 mt-6">Exceptions</h2>
        <p className="text-gray-700 mb-3">
          Orders that are already dispatched cannot be cancelled. For such cases, please refer to our Return & Refund Policy.
        </p>
      </div>
    </div>
  );
}
