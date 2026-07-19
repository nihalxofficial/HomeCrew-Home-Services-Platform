"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  FaBroom,
  FaWrench,
  FaHammer,
  FaBug,
  FaUserGraduate,
  FaScrewdriver,
  FaBolt,
  FaTv,
  FaSeedling,
  FaShieldAlt,
  FaArrowRight,
  FaStar,
  FaUsers,
} from "react-icons/fa";

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  count: number;
  color: string;
  iconColor: string;
  bgColor: string;
  href: string;
  popular?: boolean;
}

const CategoriesSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const categories: Category[] = [
    {
      id: "cleaning",
      name: "Cleaning",
      icon: <FaBroom />,
      description: "Professional home cleaning services",
      count: 45,
      color: "from-blue-500 to-cyan-400",
      iconColor: "text-blue-500",
      bgColor: "bg-blue-50",
      href: "/categories/cleaning",
      popular: true,
    },
    {
      id: "repair",
      name: "Repair & Maintenance",
      icon: <FaWrench />,
      description: "Expert repair and maintenance",
      count: 38,
      color: "from-orange-500 to-amber-400",
      iconColor: "text-orange-500",
      bgColor: "bg-orange-50",
      href: "/categories/repair",
      popular: true,
    },
    {
      id: "home-improvement",
      name: "Home Improvement",
      icon: <FaHammer />,
      description: "Painting, remodeling & more",
      count: 32,
      color: "from-purple-500 to-pink-400",
      iconColor: "text-purple-500",
      bgColor: "bg-purple-50",
      href: "/categories/home-improvement",
    },
    {
      id: "pest-control",
      name: "Pest Control",
      icon: <FaBug />,
      description: "Safe & effective pest elimination",
      count: 28,
      color: "from-red-500 to-rose-400",
      iconColor: "text-red-500",
      bgColor: "bg-red-50",
      href: "/categories/pest-control",
    },
    {
      id: "tutoring",
      name: "Tutoring",
      icon: <FaUserGraduate />,
      description: "Personalized tutoring services",
      count: 25,
      color: "from-pink-500 to-rose-400",
      iconColor: "text-pink-500",
      bgColor: "bg-pink-50",
      href: "/categories/tutoring",
    },
    {
      id: "installation",
      name: "Installation",
      icon: <FaScrewdriver />,
      description: "Assembly & installation services",
      count: 30,
      color: "from-indigo-500 to-violet-400",
      iconColor: "text-indigo-500",
      bgColor: "bg-indigo-50",
      href: "/categories/installation",
    },
    {
      id: "electrical",
      name: "Electrical",
      icon: <FaBolt />,
      description: "Licensed electrical services",
      count: 22,
      color: "from-yellow-500 to-amber-400",
      iconColor: "text-yellow-500",
      bgColor: "bg-yellow-50",
      href: "/categories/electrical",
    },
    {
      id: "tv-mounting",
      name: "TV Mounting",
      icon: <FaTv />,
      description: "Professional TV installation",
      count: 18,
      color: "from-teal-500 to-emerald-400",
      iconColor: "text-teal-500",
      bgColor: "bg-teal-50",
      href: "/categories/tv-mounting",
    },
    {
      id: "gardening",
      name: "Gardening",
      icon: <FaSeedling />,
      description: "Garden & lawn care services",
      count: 20,
      color: "from-emerald-500 to-green-400",
      iconColor: "text-emerald-500",
      bgColor: "bg-emerald-50",
      href: "/categories/gardening",
    },
  ];

  const stats = [
    { value: "12,000+", label: "Services Booked", icon: <FaUsers /> },
    { value: "9", label: "Categories", icon: <FaStar /> },
    { value: "98%", label: "Satisfaction Rate", icon: <FaShieldAlt /> },
    { value: "4.9★", label: "Average Rating", icon: <FaStar /> },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-gradient-to-b from-gray-50/50 via-white to-gray-50/50 relative overflow-hidden"
    >
      {/* Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-green-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-400/3 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 px-4 py-2 rounded-full mb-4">
            <FaStar className="text-yellow-400" />
            <span className="text-green-700 font-semibold text-sm uppercase tracking-wider">
              Categories
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
            Browse by <span className="text-green-600">Category</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find the perfect service for your needs from our wide range of categories
          </p>
        </div>

        {/* Stats Row */}
        {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl shadow-lg p-4 text-center border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="text-2xl text-green-500 mb-1 flex justify-center">
                {stat.icon}
              </div>
              <div className="text-xl font-bold text-gray-900">{stat.value}</div>
              <p className="text-xs text-gray-600 mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div> */}

        {/* Categories Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              href={category.href}
              onMouseEnter={() => setActiveCategory(category.id)}
              onMouseLeave={() => setActiveCategory(null)}
              className={`group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden hover:-translate-y-2 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              } ${activeCategory === category.id ? "ring-2 ring-green-500/30" : ""}`}
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              {/* Gradient Border */}
              <div
                className={`absolute top-0 left-0 right-0 bg-gradient-to-r ${category.color} transition-all duration-500 ${
                  activeCategory === category.id ? "h-1.5" : "h-1"
                }`}
              />

              {/* Popular Badge */}
              {category.popular && (
                <div className="absolute top-4 right-4 z-10">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-[10px] font-bold rounded-full uppercase tracking-wider shadow-lg shadow-orange-500/30">
                    <FaStar className="text-[8px]" />
                    Popular
                  </span>
                </div>
              )}

              <div className="p-6">
                {/* Icon - Fixed: Using solid color instead of gradient text */}
                <div
                  className={`w-14 h-14 rounded-2xl ${category.bgColor} flex items-center justify-center text-3xl ${category.iconColor} group-hover:scale-110 transition-transform duration-300 mb-4`}
                >
                  {category.icon}
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-green-600 transition-colors mb-1">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-500 mb-3">{category.description}</p>

                {/* Bottom Row */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-semibold text-gray-900">
                      {category.count}
                    </span>
                    <span className="text-gray-400">services</span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-green-600 group-hover:translate-x-1 transition-transform">
                    Browse
                    <FaArrowRight className="text-xs" />
                  </span>
                </div>
              </div>

              {/* Hover Overlay Effect */}
              <div
                className={`absolute inset-0 pointer-events-none bg-gradient-to-r ${category.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
              />
            </Link>
          ))}
        </div>

        {/* View All CTA */}
        <div
          className={`text-center mt-12 transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
          style={{ transitionDelay: "600ms" }}
        >
          <Link
            href="/categories"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-white text-green-600 font-semibold rounded-full border-2 border-green-600 hover:bg-green-600 hover:text-white transition-all duration-300 hover:shadow-xl hover:shadow-green-500/20 hover:scale-105 cursor-pointer"
          >
            View All Categories
            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;