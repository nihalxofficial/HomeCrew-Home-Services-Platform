"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FaHome,
  FaArrowLeft,
  FaLock,
  FaShieldAlt,
  FaSignInAlt,
  FaUserPlus,
  FaExclamationTriangle,
  FaKey,
} from "react-icons/fa";

export default function ForbiddenClient() {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  const actions = [
    {
      icon: <FaSignInAlt />,
      title: "Login",
      description: "Sign in to your account",
      href: "/login",
      primary: true,
    },
    {
      icon: <FaUserPlus />,
      title: "Register",
      description: "Create a new account",
      href: "/register",
      primary: false,
    },
  ];

  return (
    <div className="min-h-[calc(100vh-6rem)] flex items-center justify-center bg-gradient-to-br from-white via-gray-50/50 to-white relative overflow-hidden px-4 pt-20 pb-10">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-red-400/5 rounded-full blur-3xl" />
        
        {/* Floating Orbs */}
        <div className="absolute top-20 right-20 w-12 h-12 bg-red-500/20 rounded-full blur-2xl animate-pulse" />
        <div className="absolute bottom-20 left-20 w-16 h-16 bg-orange-500/20 rounded-full blur-2xl animate-pulse delay-700" />
        <div className="absolute top-1/2 right-1/4 w-10 h-10 bg-red-400/20 rounded-full blur-2xl animate-pulse delay-1000" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-xl w-full bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8">
        {/* Lock Icon & 403 */}
        <div className="text-center mb-4">
          <div className="relative inline-block">
            {/* Lock Icon */}
            <div className="w-20 h-20 mx-auto mb-3 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg shadow-red-500/30">
              <FaLock className="text-white text-3xl" />
            </div>
            <div className="absolute -top-2 -right-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-red-100 text-red-600 text-[10px] font-bold rounded-full border border-red-200">
                <FaExclamationTriangle className="text-[8px]" />
                403
              </span>
            </div>
          </div>
        </div>

        {/* Error Message */}
        <div className="text-center mb-5">
          <h1 className="text-lg md:text-xl font-bold text-gray-900 mb-1.5">
            Access Forbidden
          </h1>
          <p className="text-sm text-gray-600 max-w-sm mx-auto">
            You don't have permission to access this page. Please contact support if you believe this is an error.
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

        {/* Auth Actions */}
        <div className="border-t border-gray-100 pt-4">
          <p className="text-xs text-gray-500 text-center mb-3">
            Or try one of these options:
          </p>
          <div className="grid grid-cols-2 gap-2.5">
            {actions.map((action, index) => (
              <Link
                key={index}
                href={action.href}
                className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl transition-all duration-300 text-sm font-medium ${
                  action.primary
                    ? "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-md shadow-green-500/30 hover:shadow-green-500/50 hover:scale-105"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700 hover:scale-105"
                }`}
              >
                {action.icon}
                {action.title}
              </Link>
            ))}
          </div>
        </div>

        {/* Helpful Links */}
        <div className="mt-4 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-100">
          <div className="flex items-center gap-2.5">
            <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
              <FaShieldAlt className="text-white text-xs" />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-800">
                Need help?
              </p>
              <p className="text-[10px] text-gray-600">
                Contact our support team for assistance
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}