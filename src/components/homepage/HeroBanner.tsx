"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaArrowRight,
  FaPlay,
  FaStar,
  FaCheckCircle,
  FaClock,
  FaUserCheck,
  FaShieldAlt,
  FaAward,
  FaThumbsUp,
  FaCalendarCheck,
  FaSearch,
  FaHandshake,
} from "react-icons/fa";

import heroBg from "@/assets/hero-bg.png";

interface HeroBannerProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
}

const HeroBanner = ({
  title = "Book a Pro in",
  subtitle = "Cleaning, repair, pest control, tutoring, installation – we bring experts to your doorstep. Smart, safe, and simple.",
  ctaText = "Find a Service",
  ctaLink = "/explore",
  secondaryCtaText = "How It Works",
}: HeroBannerProps) => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const stats = [
    { value: "12,000+", label: "Services Booked", icon: <FaCheckCircle /> },
    { value: "4.9/5", label: "Average Rating", icon: <FaStar /> },
    { value: "98%", label: "On-Time Arrival", icon: <FaClock /> },
  ];

  const features = [
    { icon: <FaUserCheck />, title: "Verified Pros", desc: "Background checked & reviewed" },
    { icon: <FaShieldAlt />, title: "100% Guarantee", desc: "Satisfaction or refund" },
    { icon: <FaAward />, title: "Top Rated", desc: "Best service providers" },
    { icon: <FaThumbsUp />, title: "Easy Booking", desc: "Book in under 2 minutes" },
  ];

  const services = ["Cleaning", "AC Repair", "Painting", "Pest Control", "Tutoring", "Installation"];

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src={heroBg}
          alt="Hero background"
          fill
          priority
          className="object-cover"
          quality={100}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-green-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-400/5 rounded-full blur-3xl" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
        <div className="w-full py-16 lg:py-20">
          <div className="grid lg:grid-cols-12 gap-12 items-start lg:items-center">
            {/* Left Content - 7 columns */}
            <div
              className={`lg:col-span-7 transform transition-all duration-1000 ${
                isVisible ? "translate-x-0 opacity-100" : "-translate-x-20 opacity-0"
              }`}
            >
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full mb-8">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
                </span>
                <span className="text-white/90 text-sm font-medium">
                  Trusted by 12,000+ homes
                </span>
              </div>

              {/* Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-[1.1] mb-6">
                {title}{" "}
                <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-green-500 bg-clip-text text-transparent">
                  Minutes
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg lg:text-xl text-white/80 max-w-xl leading-relaxed mb-10">
                {subtitle}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-4 mb-10">
                <Link
                  href={ctaLink}
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold rounded-full transition-all duration-300 shadow-2xl shadow-green-500/30 hover:shadow-green-500/50 hover:scale-105"
                >
                  {ctaText}
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <button
                  onClick={() => setIsVideoOpen(true)}
                  className="inline-flex cursor-pointer items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-semibold rounded-full transition-all duration-300 border border-white/20 hover:border-white/40"
                >
                  <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                    <FaPlay className="text-green-400 text-sm" />
                  </div>
                  {secondaryCtaText}
                </button>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-8">
                {stats.map((stat, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="text-green-400">{stat.icon}</div>
                    <div>
                      <div className="text-white font-bold text-lg">{stat.value}</div>
                      <div className="text-white/60 text-xs">{stat.label}</div>
                    </div>
                    {index < stats.length - 1 && <div className="w-px h-8 bg-white/10" />}
                  </div>
                ))}
              </div>
            </div>

            {/* Right Content - Solid Design */}
            <div
              className={`lg:col-span-5 transform transition-all duration-1000 delay-300 ${
                isVisible ? "translate-x-0 opacity-100" : "translate-x-20 opacity-0"
              }`}
            >
              {/* Main Card - Solid Dark Background */}
              <div className="bg-gradient-to-br from-gray-900/95 to-gray-800/95 rounded-2xl shadow-2xl border border-white/10 overflow-hidden">
                {/* Card Header */}
                <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-4">
                  <h3 className="text-white font-bold text-lg flex items-center gap-2">
                    <FaHandshake className="text-white/80" />
                    Ready to get started?
                  </h3>
                  <p className="text-white/80 text-sm">Join 12,000+ happy customers</p>
                </div>

                {/* Card Body */}
                <div className="p-6">
                  {/* Quick Search Bar */}
                  <div className="relative mb-6">
                    <input
                      type="text"
                      placeholder="What service do you need?"
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 pl-11 text-white placeholder-white/50 focus:outline-none focus:border-green-500 transition-colors"
                    />
                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                  </div>

                  {/* Popular Services Grid */}
                  <div className="grid grid-cols-3 gap-2 mb-6">
                    {services.map((service) => (
                      <Link
                        key={service}
                        href={`/services/${service.toLowerCase().replace(/\s+/g, "-")}`}
                        className="text-center bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg py-2.5 px-2 transition-all duration-300 group"
                      >
                        <p className="text-white/80 text-xs font-medium group-hover:text-white transition-colors">
                          {service}
                        </p>
                      </Link>
                    ))}
                  </div>

                  {/* Divider */}
                  <div className="relative mb-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-white/10"></div>
                    </div>
                    <div className="relative flex justify-center text-xs">
                      <span className="bg-gray-900/95 px-4 text-white/50">Why HomeCrew?</span>
                    </div>
                  </div>

                  {/* Features Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    {features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-2.5 bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-all duration-300 group"
                      >
                        <span className="text-green-400 text-sm mt-0.5">{feature.icon}</span>
                        <div>
                          <p className="text-white/90 text-xs font-medium">{feature.title}</p>
                          <p className="text-white/40 text-[10px] leading-tight">{feature.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* CTA Link */}
                  <Link
                    href="/explore"
                    className="mt-6 w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 shadow-lg shadow-green-500/20 hover:shadow-green-500/40"
                  >
                    <span>Explore All Services</span>
                    <FaArrowRight className="text-sm" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
        >
          <path
            d="M0 60L60 55C120 50 240 40 360 40C480 40 600 50 720 55C840 60 960 60 1080 55C1200 50 1320 40 1380 35L1440 30V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V60Z"
            fill="white"
            fillOpacity="0.05"
          />
        </svg>
      </div>

      {/* Video Modal */}
      {isVideoOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          style={{ animation: "fadeIn 0.3s ease-out forwards" }}
          onClick={() => setIsVideoOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl mx-4 bg-black/90 rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsVideoOpen(false)}
              aria-label="Close video"
              className="absolute top-4 right-4 text-white/70 hover:text-white z-10 bg-black/50 rounded-full p-2 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="aspect-video flex items-center justify-center">
              <div className="text-center p-8">
                <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse shadow-2xl shadow-green-500/30">
                  <FaPlay className="text-white text-3xl ml-1" />
                </div>
                <p className="text-white/60">Demo video coming soon</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
};

export default HeroBanner;