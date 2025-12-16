import Head from "next/head";


export default function TermsAndConditions() {
  return (
    <div className="min-h-screen pb-12 px-6">
      <Head>
        <title>Terms & Conditions - StylishHim</title>
        <meta name="description" content="Terms & Conditions of StylishHim" />
      </Head>

      <div className="max-w-5xl mx-auto bg-white p-10 rounded-2xl  ">
        <h1 style={{color: "var(--theme-color)"}} className="text-4xl font-bold mb-8 text-center">
          Terms & Conditions
        </h1>

        <p className="text-gray-700 mb-4">
          Welcome to <b>StylishHim</b>. By accessing or using our website, you agree to comply with and be bound by these Terms & Conditions. Please read them carefully before making a purchase.
        </p>

        <h2 style={{color: "var(--theme-color)"}} className="text-2xl font-semibold mb-3 mt-6">Use of Website</h2>
        <p className="text-gray-700 mb-3">
          The content on StylishHim is for personal, non-commercial use. You may not copy, reproduce, distribute, or sell any materials without explicit permission.
        </p>

        <h2 style={{color: "var(--theme-color)"}} className="text-2xl font-semibold mb-3 mt-6">Order Policy</h2>
        <p className="text-gray-700 mb-3">
          All orders are subject to our cancellation, return, and refund policies. We reserve the right to refuse or cancel any order for reasons including product availability, errors in pricing, or suspected fraud.
        </p>

        <h2 style={{color: "var(--theme-color)"}} className="text-2xl font-semibold mb-3 mt-6">Intellectual Property</h2>
        <p className="text-gray-700 mb-3">
          All content, logos, product images, and materials are property of StylishHim and protected by applicable intellectual property laws.
        </p>

        <h2 style={{color: "var(--theme-color)"}} className="text-2xl font-semibold mb-3 mt-6">Changes to Terms</h2>
        <p className="text-gray-700 mb-3">
          We may update these terms at any time. Changes will be effective immediately upon posting on the website. Continued use of the website constitutes acceptance of the revised terms.
        </p>

        <h2 style={{color: "var(--theme-color)"}} className="text-2xl font-semibold mb-3 mt-6">Governing Law</h2>
        <p className="text-gray-700 mb-3">
          These terms are governed by the laws of India. Any disputes will be resolved in the courts of our jurisdiction.
        </p>
      </div>
    </div>
  );
}
