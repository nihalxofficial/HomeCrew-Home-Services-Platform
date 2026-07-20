"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import {
  FaHome,
  FaSignInAlt,
  FaUserPlus,
  FaBars,
  FaTimes,
  FaSignOutAlt,
  FaSpinner,
} from "react-icons/fa";
import { Avatar } from "@heroui/react";
import { authClient } from "@/lib/auth-client";

const Navbar = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [imageError, setImageError] = useState(false);
  const pathname = usePathname();

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const isAuthenticated = !!user;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Reset image error when user changes
  useEffect(() => {
    setImageError(false);
  }, [user?.image]);

  // Define all nav links
  const allNavLinks = [
    { name: "Home", href: "/" },
    { name: "All-Services", href: "/services" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  // Auth protected links (only show when user is logged in)
  const protectedLinks = [
    { name: "My-Services", href: "/my-services" },
    { name: "Add-Service", href: "/add-service" },
  ];

  // Combine links based on authentication status
  const navLinks = isAuthenticated
    ? [...allNavLinks, ...protectedLinks]
    : allNavLinks;

  const isActive = (href: string) => pathname === href;

  const handleLogout = async () => {
    try {
      await authClient.signOut();
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Get user initials for avatar fallback
  const getUserInitials = () => {
    if (!user?.name) return "U";
    const names = user.name.split(" ");
    if (names.length === 1) return names[0].charAt(0).toUpperCase();
    return (
      names[0].charAt(0) + names[names.length - 1].charAt(0)
    ).toUpperCase();
  };

  // Get avatar image URL with fallback
  const getAvatarUrl = () => {
    if (user?.image && !imageError) {
      return user.image;
    }
    return null;
  };

  // Handle image error
  const handleImageError = () => {
    setImageError(true);
  };

  // Custom Avatar Image Component
  const AvatarImage = () => {
    const imageUrl = getAvatarUrl();

    if (imageUrl) {
      return (
        <div className="relative w-7 h-7 rounded-full overflow-hidden ring-2 ring-green-200 flex-shrink-0">
          <img
            src={imageUrl}
            alt={user?.name || "User"}
            className="w-full h-full object-cover"
            onError={handleImageError}
            referrerPolicy="no-referrer"
          />
        </div>
      );
    }

    return (
      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white text-xs font-bold ring-2 ring-green-200 flex-shrink-0">
        {getUserInitials()}
      </div>
    );
  };

  // Custom Avatar Image for Mobile
  const AvatarImageMobile = () => {
    const imageUrl = getAvatarUrl();

    if (imageUrl) {
      return (
        <div className="relative w-8 h-8 rounded-full overflow-hidden ring-2 ring-green-200 flex-shrink-0">
          <img
            src={imageUrl}
            alt={user?.name || "User"}
            className="w-full h-full object-cover"
            onError={handleImageError}
            referrerPolicy="no-referrer"
          />
        </div>
      );
    }

    return (
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white text-xs font-bold ring-2 ring-green-200 flex-shrink-0">
        {getUserInitials()}
      </div>
    );
  };

  // Loading state for auth
  const renderAuthSection = () => {
    if (isPending) {
      return (
        <div className="hidden md:flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2">
            <FaSpinner className="animate-spin text-green-600" />
            <span className="text-sm text-gray-500">Loading...</span>
          </div>
        </div>
      );
    }

    if (isAuthenticated) {
      return (
        <div className="hidden md:flex items-center gap-3">
          <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-green-50 border border-green-100">
            <AvatarImage />
            <span className="text-sm font-medium text-gray-700 max-w-[100px] truncate">
              {user?.name || "User"}
            </span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center cursor-pointer gap-2 px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 transition-colors rounded-full hover:bg-red-50"
          >
            <FaSignOutAlt className="text-red-500" />
            Logout
          </button>
        </div>
      );
    }

    return (
      <div className="hidden md:flex items-center gap-3">
        <Link
          href="/login"
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-green-600 transition-colors rounded-full hover:bg-green-50"
        >
          <FaSignInAlt className="text-green-500" />
          Login
        </Link>
        <Link
          href="/register"
          className="flex items-center gap-2 px-5 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 transition-colors rounded-full shadow-md shadow-green-200"
        >
          <FaUserPlus />
          Register
        </Link>
      </div>
    );
  };

  // Mobile auth section with loading state
  const renderMobileAuth = () => {
    if (isPending) {
      return (
        <div className="pt-3 border-t border-gray-200 flex flex-col gap-2">
          <div className="flex items-center justify-center gap-2 px-4 py-2">
            <FaSpinner className="animate-spin text-green-600" />
            <span className="text-sm text-gray-500">Loading...</span>
          </div>
        </div>
      );
    }

    if (isAuthenticated) {
      return (
        <div className="pt-3 border-t border-gray-200 flex flex-col gap-2">
          <div className="flex items-center gap-3 px-4 py-2 bg-green-50 rounded-lg">
            <AvatarImageMobile />
            <div>
              <p className="text-sm font-medium text-gray-800">{user?.name}</p>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={() => {
              handleLogout();
              setIsMenuOpen(false);
            }}
            className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 transition-colors rounded-lg hover:bg-red-50"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      );
    }

    return (
      <div className="pt-3 border-t border-gray-200 flex flex-col gap-2">
        <Link
          href="/login"
          onClick={() => setIsMenuOpen(false)}
          className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-green-600 transition-colors rounded-lg hover:bg-green-50"
        >
          <FaSignInAlt className="text-green-500" />
          Login
        </Link>
        <Link
          href="/register"
          onClick={() => setIsMenuOpen(false)}
          className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 transition-colors rounded-lg"
        >
          <FaUserPlus />
          Register
        </Link>
      </div>
    );
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-green-100"
          : "bg-white/80 backdrop-blur-sm border-b border-green-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center text-white text-sm shadow-md shadow-green-500/30 group-hover:scale-110 transition-transform duration-300">
              <FaHome />
            </div>
            <span className="font-bold text-xl text-gray-800">
              Home<span className="text-green-600">Crew</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-green-600 ${
                  isActive(link.href)
                    ? "text-green-600 border-b-2 border-green-600 pb-1"
                    : "text-gray-600"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Auth Section with Loading State */}
          {renderAuthSection()}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <FaTimes className="text-2xl text-gray-700" />
            ) : (
              <FaBars className="text-2xl text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive(link.href)
                      ? "bg-green-50 text-green-600"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              {renderMobileAuth()}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
