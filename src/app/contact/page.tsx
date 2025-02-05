"use client";
import { useEffect, useState } from "react";

export default function ContactPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-700 text-center">
          Contact Us
        </h2>
        <form className="mt-6">
          <div className="mb-4">
            <label className="block text-gray-600 text-sm mb-2">Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm mb-2">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm mb-2">Message</label>
            <textarea className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
