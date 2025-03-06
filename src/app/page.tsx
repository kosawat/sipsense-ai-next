import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-5xl font-bold text-purple-800 mb-4">SipSense</h1>
      <p className="text-xl text-gray-600 mb-8">
        Sip Smarter with Your Sixth Sense
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/wine">
          <button className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition w-full sm:w-auto">
            Find My Wine
          </button>
        </Link>
        <Link href="/mixed-drinks">
          <button className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition w-full sm:w-auto">
            Find My Mixed Drink
          </button>
        </Link>
        <Link href="/whisky">
          <button className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition w-full sm:w-auto">
            Find My Whisky
          </button>
        </Link>
      </div>
    </div>
  );
}
