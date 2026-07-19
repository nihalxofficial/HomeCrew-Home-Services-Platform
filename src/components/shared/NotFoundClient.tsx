"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaHome, FaArrowLeft, FaSearch, FaLightbulb } from "react-icons/fa";

export default function NotFoundClient() {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const input = e.currentTarget;
      if (input.value.trim()) {
        window.location.href = `/search?q=${encodeURIComponent(input.value.trim())}`;
      }
    }
  };

  return (
    <div className="min-h-[calc(100vh-6rem)] flex items-center justify-center bg-gradient-to-br from-white via-gray-50/50 to-white relative overflow-hidden px-4 pt-20 pb-10">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-green-400/5 rounded-full blur-3xl" />
        
        {/* Floating Orbs */}
        <div className="absolute top-20 right-20 w-12 h-12 bg-green-500/20 rounded-full blur-2xl animate-pulse" />
        <div className="absolute bottom-20 left-20 w-16 h-16 bg-emerald-500/20 rounded-full blur-2xl animate-pulse delay-700" />
        <div className="absolute top-1/2 right-1/4 w-10 h-10 bg-green-400/20 rounded-full blur-2xl animate-pulse delay-1000" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-xl w-full bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8">
        {/* 404 Number */}
        <div className="text-center mb-4">
          <div className="relative inline-block">
            <span className="text-6xl md:text-7xl font-extrabold bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 bg-clip-text text-transparent">
              404
            </span>
            <div className="absolute -top-2 -right-6">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-red-100 text-red-600 text-[10px] font-bold rounded-full border border-red-200">
                <FaSearch className="text-[8px]" />
                Not Found
              </span>
            </div>
          </div>
        </div>

        {/* Error Message */}
        <div className="text-center mb-5">
          <h1 className="text-lg md:text-xl font-bold text-gray-900 mb-1.5">
            Oops! Page Not Found
          </h1>
          <p className="text-sm text-gray-600 max-w-sm mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-2.5 mb-5">
          <Link
            href="/"
            className="group flex items-center justify-center gap-2 px-3 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-medium text-sm rounded-xl transition-all duration-300 shadow-md shadow-green-500/30 hover:shadow-green-500/50 hover:scale-105"
          >
            <FaHome className="text-sm group-hover:scale-110 transition-transform" />
            Homepage
          </Link>
          <button
            onClick={handleGoBack}
            className="group flex items-center justify-center gap-2 px-3 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium text-sm rounded-xl transition-all duration-300 hover:scale-105 cursor-pointer"
          >
            <FaArrowLeft className="text-sm group-hover:-translate-x-1 transition-transform" />
            Go Back
          </button>
        </div>

        {/* Helpful Links */}
        <div className="border-t border-gray-100 pt-4">
          <p className="text-xs text-gray-500 text-center mb-3">
            Here are some helpful links:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-1.5">
            <Link
              href="/services"
              className="text-center px-2 py-1.5 bg-gray-50 hover:bg-green-50 text-gray-600 hover:text-green-600 text-xs font-medium rounded-lg transition-all duration-200 border border-gray-100 hover:border-green-200"
            >
              Services
            </Link>
            <Link
              href="/categories"
              className="text-center px-2 py-1.5 bg-gray-50 hover:bg-green-50 text-gray-600 hover:text-green-600 text-xs font-medium rounded-lg transition-all duration-200 border border-gray-100 hover:border-green-200"
            >
              Categories
            </Link>
            <Link
              href="/contact"
              className="text-center px-2 py-1.5 bg-gray-50 hover:bg-green-50 text-gray-600 hover:text-green-600 text-xs font-medium rounded-lg transition-all duration-200 border border-gray-100 hover:border-green-200"
            >
              Contact Us
            </Link>
            <Link
              href="/blog"
              className="text-center px-2 py-1.5 bg-gray-50 hover:bg-green-50 text-gray-600 hover:text-green-600 text-xs font-medium rounded-lg transition-all duration-200 border border-gray-100 hover:border-green-200"
            >
              Blog
            </Link>
          </div>
        </div>

        {/* Fun Fact / CTA */}
        <div className="mt-4 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
          <div className="flex items-center gap-2.5">
            <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
              <FaLightbulb className="text-white text-xs" />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-800">
                While you're here...
              </p>
              <p className="text-[10px] text-gray-600">
                HomeCrew has 450+ expert professionals ready to help you!
              </p>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mt-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for services..."
              className="w-full px-3 py-2.5 pl-9 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all"
              onKeyDown={handleSearch}
            />
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
          </div>
          <p className="text-[9px] text-gray-400 mt-1 text-center">
            Press Enter to search
          </p>
        </div>
      </div>
    </div>
  );
}