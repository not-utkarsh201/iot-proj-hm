import Link from "next/link"; // Add this line at the top

import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-8">
      <h1 className="text-4xl md:text-6xl font-extrabold text-white-800 mb-6">
        Welcome
      </h1>
      <Link
        href="/sensor"
        className="text-white bg-blue-600 hover:bg-blue-700 transition-colors px-6 py-3 rounded-xl text-lg font-semibold shadow-md"
      >
        View Live Sensor Data
      </Link>
    </main>
  );
}
