"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  FaArrowRight,
  FaHeadset,
  FaEnvelope,
  FaClock,
  FaStar,
  FaCheckCircle,
} from "react-icons/fa";
import {
  ArrowsRotateLeft,
  Box,
  ChevronDown,
  CreditCard,
  PlanetEarth,
  Receipt,
  ShoppingBag,
  Shield,
  Persons,
  Clock,
} from "@gravity-ui/icons";
import { Accordion } from "@heroui/react";

interface FAQItem {
  title: string;
  content: string;
  icon: React.ReactNode;
}

const FAQSection = () => {
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

  const faqItems: FAQItem[] = [
    {
      title: "How do I book a service on HomeCrew?",
      content:
        "Booking a service is simple! Browse our services, select the one you need, choose your preferred professional based on ratings and reviews, pick a time slot, and confirm your booking. You'll receive a confirmation email and real-time updates.",
      icon: <ShoppingBag />,
    },
    {
      title: "What services does HomeCrew offer?",
      content:
        "We offer a wide range of home services including cleaning, AC repair, pest control, interior painting, tutoring, furniture assembly, electrical services, plumbing, TV mounting, and garden maintenance. We're constantly adding new services to meet your needs.",
      icon: <Receipt />,
    },
    {
      title: "Are the professionals verified and insured?",
      content:
        "Yes! All professionals on HomeCrew are thoroughly background-checked, verified, and insured. We review their credentials, experience, and customer feedback to ensure you get the best service possible.",
      icon: <Shield />,
    },
    {
      title: "How does payment work?",
      content:
        "We use a secure payment system. You only pay after the service is completed and you're satisfied with the results. We accept all major credit cards, debit cards, and digital payment methods.",
      icon: <CreditCard />,
    },
    {
      title: "What if I'm not satisfied with the service?",
      content:
        "Customer satisfaction is our top priority. If you're not happy with the service, contact us within 24 hours and we'll either redo the service at no charge or provide a full refund. Our satisfaction guarantee ensures you always get the best experience.",
      icon: <ArrowsRotateLeft />,
    },
    {
      title: "Do you offer services in my area?",
      content:
        "HomeCrew is expanding rapidly! Currently, we serve all major cities across the United States. Enter your zip code on our homepage to check if we're available in your area. We're constantly adding new locations.",
      icon: <PlanetEarth />,
    },
    {
      title: "How do I cancel or reschedule a booking?",
      content:
        "You can cancel or reschedule your booking up to 24 hours before the scheduled time without any penalty. Simply go to your bookings page, select the booking, and choose 'Cancel' or 'Reschedule'. For last-minute changes, please contact our support team.",
      icon: <Clock />,
    },
    {
      title: "Are the service providers background checked?",
      content:
        "Absolutely. Every professional on HomeCrew undergoes a comprehensive background check, identity verification, and skill assessment. We also continuously monitor their performance and customer feedback to maintain quality standards.",
      icon: <Persons />,
    },
  ];

  const supportOptions = [
    {
      icon: <FaHeadset />,
      title: "Live Chat",
      description: "Chat with our support team in real-time",
      action: "Start Chat",
      href: "/chat",
    },
    {
      icon: <FaEnvelope />,
      title: "Email Support",
      description: "Get help via email within 24 hours",
      action: "Send Email",
      href: "/contact",
    },
    {
      icon: <FaClock />,
      title: "24/7 Support",
      description: "We're here whenever you need us",
      action: "Learn More",
      href: "/support",
    },
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
              FAQ
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
            Frequently Asked <span className="text-green-600">Questions</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find answers to the most common questions about HomeCrew services
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left - FAQ Accordion */}
          <div className="lg:col-span-3">
            <div
              className={`bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden transform transition-all duration-1000 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-green-50 to-emerald-50">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <FaCheckCircle className="text-green-600" />
                  Quick Answers
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Browse through our most frequently asked questions
                </p>
              </div>

              <div className="p-4">
                <Accordion
                  className="w-full space-y-2"
                  selectionMode="single"
                  defaultExpandedKeys={["0"]}
                >
                  {faqItems.map((item, index) => (
                    <Accordion.Item
                      key={index}
                      className="border border-gray-200 rounded-xl overflow-hidden hover:border-green-200 transition-colors"
                    >
                      <Accordion.Heading>
                        <Accordion.Trigger className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50/50 transition-colors cursor-pointer group">
                          <div className="flex items-center gap-3 flex-1">
                            {item.icon ? (
                              <span className="text-green-600 text-lg flex-shrink-0">
                                {item.icon}
                              </span>
                            ) : null}
                            <span className="text-sm font-medium text-gray-900 group-hover:text-green-600 transition-colors text-left">
                              {item.title}
                            </span>
                          </div>
                          <Accordion.Indicator className="text-gray-400 group-hover:text-green-600 transition-colors">
                            <ChevronDown className="w-4 h-4" />
                          </Accordion.Indicator>
                        </Accordion.Trigger>
                      </Accordion.Heading>
                      <Accordion.Panel>
                        <Accordion.Body className="px-4 pb-4 pt-0">
                          <div className="border-t border-gray-100 pt-3">
                            <p className="text-sm text-gray-600 leading-relaxed">
                              {item.content}
                            </p>
                          </div>
                        </Accordion.Body>
                      </Accordion.Panel>
                    </Accordion.Item>
                  ))}
                </Accordion>
              </div>
            </div>
          </div>

          {/* Right - Support Options */}
          <div className="lg:col-span-2">
            <div
              className={`space-y-4 transform transition-all duration-1000 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
              }`}
              style={{ transitionDelay: "400ms" }}
            >
              {/* Still Need Help? */}
              <div className="bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl p-6 shadow-xl shadow-green-500/20">
                <h3 className="text-white font-bold text-lg mb-2">
                  Still Need Help?
                </h3>
                <p className="text-emerald-100/80 text-sm mb-4">
                  Our support team is here to assist you
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/20 hover:bg-white/30 text-white font-medium rounded-xl transition-all duration-300 backdrop-blur-sm"
                >
                  Contact Support
                  <FaArrowRight className="text-sm" />
                </Link>
              </div>

              {/* Support Options */}
              {supportOptions.map((option, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-green-600 text-xl flex-shrink-0">
                      {option.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-gray-900">
                        {option.title}
                      </h4>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {option.description}
                      </p>
                      <Link
                        href={option.href}
                        className="inline-flex items-center gap-1 text-xs font-medium text-green-600 hover:text-green-700 mt-2 transition-colors"
                      >
                        {option.action}
                        <FaArrowRight className="text-[10px]" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">24/7</div>
                  <p className="text-xs text-gray-500">Support Available</p>
                </div>
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">&lt; 2h</div>
                  <p className="text-xs text-gray-500">Avg Response Time</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div
          className={`text-center mt-12 transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
          style={{ transitionDelay: "600ms" }}
        >
          <p className="text-gray-600 mb-4">
            Can't find what you're looking for?
          </p>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-full transition-all duration-300 shadow-xl shadow-green-500/30 hover:shadow-green-500/50 hover:scale-105 cursor-pointer"
          >
            Get in Touch
            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;