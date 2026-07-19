"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  FaSearch,
  FaUserCheck,
  FaCalendarCheck,
  FaArrowRight,
  FaCheckCircle,
  FaHandshake,
  FaShieldAlt,
  FaCreditCard,
  FaClock,
  FaUsers,
  FaStar,
  FaAward,
  FaRegCheckCircle,
} from "react-icons/fa";

const HowItWorks = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
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

  // Auto-rotate tabs
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % steps.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const steps = [
    {
      icon: <FaSearch />,
      number: "01",
      title: "Find a Service",
      description:
        "Browse our extensive catalog of services. Filter by category, price, or rating to find exactly what you need for your home.",
      longDescription:
        "Use our smart search and filters to discover the perfect service for your needs. Compare prices, read reviews, and check availability in real-time.",
      color: "from-blue-500 to-blue-600",
      lightColor: "from-blue-50 to-blue-100",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
      borderColor: "border-blue-200",
      iconBg: "bg-blue-100",
      stats: ["200+ Services", "Real-time Availability", "Price Comparison"],
    },
    {
      icon: <FaUserCheck />,
      number: "02",
      title: "Choose Your Pro",
      description:
        "Select from verified professionals with real reviews and ratings. Check their profile, experience, and availability.",
      longDescription:
        "Every professional is background-checked and reviewed by real customers. View their portfolio, certifications, and past work to make an informed decision.",
      color: "from-green-500 to-emerald-600",
      lightColor: "from-green-50 to-emerald-50",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
      borderColor: "border-green-200",
      iconBg: "bg-green-100",
      stats: ["Verified Pros", "Real Reviews", "Profile & Portfolio"],
    },
    {
      icon: <FaCalendarCheck />,
      number: "03",
      title: "Book & Relax",
      description:
        "Confirm your booking, get real-time updates, and enjoy quality service. Pay securely after the job is done.",
      longDescription:
        "Instant confirmation, real-time tracking, and secure payment. Our satisfaction guarantee ensures you're happy with the service before you pay.",
      color: "from-purple-500 to-purple-600",
      lightColor: "from-purple-50 to-purple-100",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
      borderColor: "border-purple-200",
      iconBg: "bg-purple-100",
      stats: ["Instant Booking", "Real-time Updates", "Pay After Service"],
    },
  ];

  const stats = [
    { value: "12,000+", label: "Services Booked", icon: <FaCheckCircle /> },
    { value: "4.9/5", label: "Average Rating", icon: <FaStar /> },
    { value: "98%", label: "On-Time Arrival", icon: <FaClock /> },
    { value: "450+", label: "Expert Pros", icon: <FaUsers /> },
  ];

  const benefits = [
    {
      icon: <FaShieldAlt />,
      title: "Verified Professionals",
      description: "All pros are background-checked and reviewed",
    },
    {
      icon: <FaHandshake />,
      title: "Satisfaction Guaranteed",
      description: "Not happy? We'll make it right or refund",
    },
    {
      icon: <FaCreditCard />,
      title: "Secure Payments",
      description: "Pay only after the service is completed",
    },
    {
      icon: <FaAward />,
      title: "Quality Assured",
      description: "Top-rated professionals you can trust",
    },
  ];

  const currentStep = steps[activeTab];

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-gradient-to-b from-white via-gray-50/50 to-white relative overflow-hidden"
    >
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-green-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-400/3 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 px-4 py-2 rounded-full mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            <span className="text-green-700 font-semibold text-sm uppercase tracking-wider">
              Simple Process
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
            How <span className="text-green-600">HomeCrew</span> Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get your home services done in three simple steps. Professional, reliable, and hassle-free.
          </p>
        </div>

        {/* Tabs */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="grid grid-cols-3 gap-2 sm:gap-4">
            {steps.map((step, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`group relative p-4 sm:p-5 rounded-2xl transition-all duration-500 text-left cursor-pointer ${
                  activeTab === index
                    ? `bg-gradient-to-r ${step.color} text-white shadow-2xl shadow-${step.textColor.replace('text-', '')}/30 scale-105`
                    : "bg-white text-gray-600 hover:bg-gray-50 shadow-lg border border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  {/* Icon */}
                  <div
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-xl sm:text-2xl transition-all duration-300 ${
                      activeTab === index
                        ? "bg-white/20 text-white"
                        : `${step.bgColor} ${step.textColor} group-hover:scale-110`
                    }`}
                  >
                    {step.icon}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs font-bold ${
                          activeTab === index ? "text-white/70" : "text-gray-400"
                        }`}
                      >
                        Step {index + 1}
                      </span>
                      {activeTab === index && (
                        <span className="w-1.5 h-1.5 rounded-full bg-white/50 animate-pulse" />
                      )}
                    </div>
                    <p
                      className={`text-sm sm:text-base font-semibold truncate ${
                        activeTab === index ? "text-white" : "text-gray-700"
                      }`}
                    >
                      {step.title}
                    </p>
                  </div>

                  {/* Active Indicator */}
                  {activeTab === index && (
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-white rounded-full" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Left - Content */}
              <div className="p-8 md:p-10">
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className={`text-sm font-bold px-3 py-1 rounded-full ${currentStep.bgColor} ${currentStep.textColor}`}
                  >
                    Step {activeTab + 1} of 3
                  </span>
                  <span
                    className={`text-xs font-medium px-3 py-1 rounded-full bg-gray-100 text-gray-600`}
                  >
                    {currentStep.number}
                  </span>
                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  {currentStep.title}
                </h3>

                <p className="text-gray-600 leading-relaxed mb-6">
                  {currentStep.longDescription}
                </p>

                {/* Step Features */}
                <div className="space-y-3">
                  {currentStep.stats.map((stat, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded-full ${currentStep.bgColor} flex items-center justify-center flex-shrink-0`}
                      >
                        <FaRegCheckCircle
                          className={`text-xs ${currentStep.textColor}`}
                        />
                      </div>
                      <span className="text-sm text-gray-700">{stat}</span>
                    </div>
                  ))}
                </div>

                {/* Progress Dots */}
                <div className="flex items-center gap-2 mt-6 pt-6 border-t border-gray-100">
                  {steps.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveTab(idx)}
                      className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                        idx === activeTab
                          ? `w-8 bg-gradient-to-r ${steps[idx].color}`
                          : "w-4 bg-gray-300 hover:bg-gray-400"
                      }`}
                    />
                  ))}
                  <span className="text-xs text-gray-400 ml-2">
                    {activeTab + 1} / {steps.length}
                  </span>
                </div>
              </div>

              {/* Right - Visual / Preview */}
              <div
                className={`p-8 md:p-10 bg-gradient-to-br ${currentStep.lightColor} flex flex-col justify-center items-center text-center`}
              >
                <div
                  className={`w-24 h-24 rounded-2xl ${currentStep.iconBg} flex items-center justify-center text-5xl ${currentStep.textColor} mb-4 shadow-lg`}
                >
                  {currentStep.icon}
                </div>
                <h4 className="text-xl font-bold text-gray-800 mb-2">
                  Ready to {currentStep.title.toLowerCase()}?
                </h4>
                <p className="text-gray-600 text-sm mb-6 max-w-xs">
                  {currentStep.description}
                </p>
                <Link
                  href="/explore"
                  className={`inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r ${currentStep.color} text-white font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 cursor-pointer`}
                >
                  Get Started
                  <FaArrowRight className="text-sm" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl shadow-lg p-6 text-center border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${(index + 3) * 150}ms` }}
            >
              <div className="text-3xl text-green-500 mb-2 flex justify-center">
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
              <p className="text-sm text-gray-600 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Benefits & CTA Row */}
        <div
          className={`bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 lg:p-12 shadow-2xl shadow-green-500/20 transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
          style={{ transitionDelay: "700ms" }}
        >
          <div className="grid lg:grid-cols-5 gap-8 items-center">
            <div className="lg:col-span-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <span className="text-emerald-300 text-xl mt-0.5">
                    {benefit.icon}
                  </span>
                  <div>
                    <h4 className="text-sm font-semibold text-white">
                      {benefit.title}
                    </h4>
                    <p className="text-xs text-emerald-100/80">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="lg:col-span-1 flex justify-center lg:justify-end">
              <Link
                href="/explore"
                className="group inline-flex items-center gap-2 px-8 py-3.5 bg-white text-green-700 font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 cursor-pointer"
              >
                Get Started
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;