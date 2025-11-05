import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
      <div className="absolute inset-0 bg-black/30"></div>

      <div className="relative z-10 text-center text-white p-10 rounded-2xl">
        <h1 className="text-5xl font-extrabold mb-6 drop-shadow-xl">
          Role-Based Auth System
        </h1>
        <p className="text-lg mb-8 text-gray-100">
          Secure access for admins and users — powered by JWT authentication.
        </p>
        <Link
          href="/login"
          className="bg-white text-indigo-700 px-8 py-3 rounded-lg font-semibold text-lg shadow-md hover:bg-indigo-100 transition"
        >
          Go to Login
        </Link>
      </div>
    </div>
  );
}
