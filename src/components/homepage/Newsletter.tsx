"use client";

import { useState, useEffect, useRef } from "react";
import {
  FaArrowRight,
  FaEnvelope,
  FaBell,
  FaCheckCircle,
  FaRocket,
  FaGift,
  FaShieldAlt,
  FaUsers,
  FaLightbulb,
} from "react-icons/fa";

const Newsletter = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubscribed(true);
      setIsLoading(false);
      setEmail("");
    }, 1500);
  };

  const benefits = [
    {
      icon: <FaGift />,
      title: "Exclusive Offers",
      description: "Get special discounts and deals",
    },
    {
      icon: <FaRocket />,
      title: "Early Access",
      description: "Be first to try new services",
    },
    {
      icon: <FaLightbulb />,
      title: "Expert Tips",
      description: "Weekly home maintenance advice",
    },
  ];

  const trustBadges = [
    { icon: <FaShieldAlt />, label: "No Spam" },
    { icon: <FaCheckCircle />, label: "Secure" },
    { icon: <FaUsers />, label: "12k+ Subscribers" },
  ];

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden">
      {/* Background Gradient - Green */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-600 via-emerald-600 to-teal-700" />

      {/* Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 rounded-full blur-3xl" />

        {/* Floating Circles */}
        <div className="absolute top-20 right-20 w-20 h-20 bg-white/10 rounded-full blur-2xl animate-pulse" />
        <div className="absolute bottom-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-white/10 rounded-full blur-2xl animate-pulse delay-700" />
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          className={`grid lg:grid-cols-2 gap-12 items-center transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          {/* Left Content */}
          <div>
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full mb-6">
              <FaBell className="text-white/90 text-sm animate-pulse" />
              <span className="text-white/90 text-sm font-medium">
                Join 12,000+ Subscribers
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-4">
              Stay Updated with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-200 via-emerald-200 to-teal-200">
                HomeCrew
              </span>
            </h2>

            <p className="text-lg text-white/80 mb-8 max-w-lg">
              Get exclusive offers, expert tips, and early access to new services
              delivered to your inbox.
            </p>

            {/* Benefits */}
            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10"
                >
                  <span className="text-emerald-300 text-xl flex-shrink-0">
                    {benefit.icon}
                  </span>
                  <div>
                    <h4 className="text-sm font-semibold text-white">
                      {benefit.title}
                    </h4>
                    <p className="text-xs text-white/60">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-4">
              {trustBadges.map((badge, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-white/70 text-sm"
                >
                  <span className="text-white/90">{badge.icon}</span>
                  <span>{badge.label}</span>
                  {index < trustBadges.length - 1 && (
                    <span className="w-px h-4 bg-white/20" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Newsletter Form */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-2xl">
            {!isSubscribed ? (
              <>
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-500/30">
                    <FaEnvelope className="text-white text-2xl" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Subscribe Now</h3>
                  <p className="text-white/60 text-sm mt-1">
                    Get weekly updates and exclusive offers
                  </p>
                </div>

                <form onSubmit={handleSubscribe} className="space-y-4">
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      required
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3.5 pl-12 text-white placeholder-white/50 focus:outline-none focus:border-emerald-400/50 transition-colors"
                    />
                    <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3.5 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 hover:from-green-600 hover:via-emerald-600 hover:to-teal-600 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-green-500/30 hover:shadow-green-500/50 hover:scale-[1.02] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Subscribing...
                      </>
                    ) : (
                      <>
                        Subscribe Now
                        <FaArrowRight />
                      </>
                    )}
                  </button>
                </form>

                <p className="text-center text-white/40 text-xs mt-4">
                  By subscribing, you agree to our Privacy Policy
                </p>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                  <FaCheckCircle className="text-white text-4xl" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  You're Subscribed! 🎉
                </h3>
                <p className="text-white/60 mb-4">
                  Welcome to the HomeCrew community!
                </p>
                <button
                  onClick={() => setIsSubscribed(false)}
                  className="text-white/50 hover:text-white text-sm transition-colors cursor-pointer"
                >
                  Subscribe another email?
                </button>
              </div>
            )}

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-2 mt-6 pt-6 border-t border-white/10">
              <div className="text-center">
                <div className="text-white font-bold">12k+</div>
                <div className="text-white/40 text-[10px]">Subscribers</div>
              </div>
              <div className="text-center">
                <div className="text-white font-bold">4.9★</div>
                <div className="text-white/40 text-[10px]">Rating</div>
              </div>
              <div className="text-center">
                <div className="text-white font-bold">98%</div>
                <div className="text-white/40 text-[10px]">Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;