"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaArrowRight,
  FaStar,
  FaUsers,
  FaCheckCircle,
  FaShieldAlt,
  FaClock,
  FaRocket,
  FaHandshake,
  FaLightbulb,
  FaHeart,
  FaHome,
  FaQuoteLeft,
  FaQuoteRight,
  FaLeaf,
  FaBuilding,
  FaAward,
  FaThumbsUp,
  FaUserTie,
} from "react-icons/fa";

const AboutClient = () => {
  const [isVisible, setIsVisible] = useState(false);
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

  const stats = [
    { value: "12,000+", label: "Services Booked", icon: <FaCheckCircle /> },
    { value: "4.9/5", label: "Average Rating", icon: <FaStar /> },
    { value: "450+", label: "Expert Pros", icon: <FaUsers /> },
    { value: "98%", label: "Satisfaction Rate", icon: <FaClock /> },
  ];

  const values = [
    {
      icon: <FaShieldAlt />,
      title: "Trust & Transparency",
      description: "No hidden fees, honest pricing, and clear communication every step of the way.",
    },
    {
      icon: <FaHandshake />,
      title: "Quality First",
      description: "Every professional is thoroughly vetted and reviewed by real customers.",
    },
    {
      icon: <FaRocket />,
      title: "AI-Powered",
      description: "Smart matching technology connects you with the perfect pro for your needs.",
    },
    {
      icon: <FaHeart />,
      title: "Customer First",
      description: "Your satisfaction is our top priority. We're here to make life easier.",
    },
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      image: "sarah-johnson",
      bio: "10+ years in home services",
    },
    {
      name: "Michael Chen",
      role: "CTO",
      image: "michael-chen",
      bio: "AI & platform architecture",
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Operations",
      image: "emily-rodriguez",
      bio: "Operations & quality assurance",
    },
    {
      name: "David Kim",
      role: "Customer Experience",
      image: "david-kim",
      bio: "Customer success & support",
    },
  ];

  const getAvatarUrl = (name: string) => {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=10b981&color=fff&size=120&bold=true`;
  };

  return (
    <section
      ref={sectionRef}
      className="min-h-[calc(100vh-6rem)] pt-32 pb-16 bg-gradient-to-b from-white via-gray-50/50 to-white relative overflow-hidden"
    >
      {/* Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-400/3 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Hero Section - Unique Layout */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 px-4 py-2 rounded-full mb-6">
              <FaHome className="text-green-600" />
              <span className="text-green-700 font-semibold text-sm uppercase tracking-wider">About Us</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
              Making Home Services{' '}
              <span className="bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
                Simple & Reliable
              </span>
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              We connect you with trusted professionals for all your home service needs. 
              From cleaning to repairs, we've got you covered.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold rounded-full transition-all duration-300 shadow-lg shadow-green-500/30 hover:shadow-green-500/50 hover:scale-105"
              >
                Explore Services
                <FaArrowRight />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-200 hover:border-green-300 text-gray-700 font-semibold rounded-full transition-all duration-300 hover:bg-green-50"
              >
                Contact Us
              </Link>
            </div>
          </div>

          {/* Right Side - Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl shadow-lg p-6 text-center border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="text-3xl text-green-500 mb-2 flex justify-center">
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <p className="text-xs text-gray-600 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Mission & Vision - Unique Design */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <div className="relative bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl p-8 text-white overflow-hidden group hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-2xl" />
            <div className="relative z-10">
              <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <FaRocket className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-3">Our Mission</h3>
              <p className="text-emerald-100/90 leading-relaxed">
                To make home services accessible, reliable, and stress-free for everyone. 
                We're building a platform where quality meets convenience.
              </p>
            </div>
          </div>
          <div className="relative bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 text-white overflow-hidden group hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-2xl" />
            <div className="relative z-10">
              <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <FaLightbulb className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-3">Our Vision</h3>
              <p className="text-blue-100/90 leading-relaxed">
                To become the most trusted home services platform, empowering homeowners 
                and professionals alike through technology and transparency.
              </p>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Our Core Values</h2>
            <p className="text-gray-500">The principles that guide everything we do</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className={`group bg-white rounded-2xl shadow-lg border border-gray-100 p-6 text-center hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${(index + 4) * 100}ms` }}
              >
                <div className="w-14 h-14 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl flex items-center justify-center mx-auto mb-4 text-green-600 text-2xl group-hover:scale-110 transition-transform duration-300">
                  {value.icon}
                </div>
                <h4 className="text-sm font-semibold text-gray-900 mb-2">{value.title}</h4>
                <p className="text-xs text-gray-500 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Meet the Team - Fixed Images */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Meet the Team</h2>
            <p className="text-gray-500">The passionate people behind HomeCrew</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <div
                key={index}
                className={`group bg-white rounded-2xl shadow-lg border border-gray-100 p-6 text-center hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${(index + 8) * 100}ms` }}
              >
                <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 border-2 border-green-200 group-hover:border-green-400 transition-colors duration-300">
                  <img
                    src={getAvatarUrl(member.name)}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=10b981&color=fff&size=120&bold=true`;
                    }}
                  />
                </div>
                <h4 className="text-sm font-semibold text-gray-900 group-hover:text-green-600 transition-colors">
                  {member.name}
                </h4>
                <p className="text-xs text-green-600 font-medium">{member.role}</p>
                <p className="text-xs text-gray-500 mt-2">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonial Quote */}
        <div className="mb-20">
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-10 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
            <div className="relative z-10 max-w-3xl mx-auto">
              <FaQuoteLeft className="text-white/20 text-4xl mx-auto mb-4" />
              <p className="text-xl md:text-2xl font-light leading-relaxed">
                "HomeCrew has completely transformed how I manage home services. 
                From cleaning to repairs, everything is just a click away."
              </p>
              <div className="flex items-center justify-center gap-4 mt-6">
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white font-bold">
                  JD
                </div>
                <div className="text-left">
                  <p className="font-semibold">John Doe</p>
                  <p className="text-sm text-emerald-100/80">Happy Customer</p>
                </div>
              </div>
              <FaQuoteRight className="text-white/20 text-3xl mx-auto mt-4" />
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-10 lg:p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-green-500/5 rounded-full blur-2xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-500/5 rounded-full blur-2xl" />
          <div className="relative z-10">
            <FaLeaf className="text-green-500/20 text-5xl mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              Ready to Get Started?
            </h2>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              Join thousands of happy customers using HomeCrew for their home services
            </p>
            <Link
              href="/services"
              className="group inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold rounded-full transition-all duration-300 shadow-lg shadow-green-500/30 hover:shadow-green-500/50 hover:scale-105"
            >
              Explore Services
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutClient;