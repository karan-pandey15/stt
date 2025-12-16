import Head from "next/head";


export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen pb-12 px-6">
      <Head>
        <title>Privacy Policy - StylishHim</title>
        <meta name="description" content="Privacy Policy of StylishHim" />
      </Head>

      <div className="max-w-5xl mx-auto bg-white p-10 rounded-2xl  ">
        <h1 style={{color: "var(--theme-color)"}} className="text-4xl font-bold mb-8 text-center">
          Privacy Policy
        </h1>

        <p className="text-gray-700 mb-4">
          At StylishHim, protecting your privacy is our priority. This policy explains how we collect, use, and safeguard your information.
        </p>

        <h2 style={{color: "var(--theme-color)"}} className="text-2xl font-semibold mb-3 mt-6">Information We Collect</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li>Personal details (name, email, phone, address) for order processing</li>
          <li>Payment details handled securely by trusted providers</li>
          <li>Browsing activity for website improvement and personalized offers</li>
        </ul>

        <h2 style={{color: "var(--theme-color)"}} className="text-2xl font-semibold mb-3 mt-6">Use of Information</h2>
        <p className="text-gray-700 mb-3">
          Your information is used to process orders, provide customer support, improve our services, and send relevant communications with your consent.
        </p>

        <h2 style={{color: "var(--theme-color)"}} className="text-2xl font-semibold mb-3 mt-6">Data Sharing</h2>
        <p className="text-gray-700 mb-3">
          We do not sell or rent your personal data. Information may be shared with trusted partners for shipping, payment processing, and legal requirements.
        </p>

        <h2 style={{color: "var(--theme-color)"}} className="text-2xl font-semibold mb-3 mt-6">Cookies & Tracking</h2>
        <p className="text-gray-700 mb-3">
          We use cookies and similar technologies to enhance user experience, analyze trends, and provide personalized content.
        </p>

        <h2 style={{color: "var(--theme-color)"}} className="text-2xl font-semibold mb-3 mt-6">Your Rights</h2>
        <p className="text-gray-700 mb-3">
          You can request access to, correction, or deletion of your personal information. Contact our support team for any privacy-related queries.
        </p>
      </div>
    </div>
  );
}
