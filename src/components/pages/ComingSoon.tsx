import Link from "next/link";
import React from "react";

interface ComingSoonProps {
  category: string; // e.g., "Mixed Drinks" or "Whisky"
}

const ComingSoonPage = ({ category }: ComingSoonProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold text-purple-800 mb-4">Coming Soon!</h1>
      <p className="text-lg text-gray-600 mb-8">
        Our {category} recommendations are in the works. Stay tuned for your
        sixth sense sip!
      </p>
      <Link href="/">
        <button className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
          Back to Home
        </button>
      </Link>
    </div>
  );
};

export default ComingSoonPage;
