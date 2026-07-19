"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  FaStar,
  FaQuoteLeft,
  FaQuoteRight,
  FaArrowLeft,
  FaArrowRight,
  FaCheckCircle,
  FaUsers,
  FaThumbsUp,
  FaUserCircle,
} from "react-icons/fa";

interface Testimonial {
  id: number;
  name: string;
  location: string;
  avatar?: string;
  rating: number;
  date: string;
  service: string;
  content: string;
  verified: boolean;
}

const Testimonials = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
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

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      location: "Austin, TX",
      rating: 5,
      date: "2 days ago",
      service: "Home Deep Cleaning",
      content:
        "Absolutely incredible service! The team arrived on time, were extremely professional, and left my home spotless. I've never seen my kitchen shine like this. Highly recommend HomeCrew!",
      verified: true,
    },
    {
      id: 2,
      name: "Michael Chen",
      location: "San Francisco, CA",
      rating: 5,
      date: "1 week ago",
      service: "AC Repair & Service",
      content:
        "My AC broke down on the hottest day of the year. HomeCrew had a technician at my door within 2 hours. Fixed the issue quickly and explained everything. Life savers!",
      verified: true,
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      location: "Miami, FL",
      rating: 5,
      date: "2 weeks ago",
      service: "Interior Painting",
      content:
        "The painters did an outstanding job transforming my living room. They were meticulous with the details, cleaned up perfectly, and finished ahead of schedule. Will definitely use again!",
      verified: true,
    },
    {
      id: 4,
      name: "David Kim",
      location: "Seattle, WA",
      rating: 4,
      date: "3 weeks ago",
      service: "Furniture Assembly",
      content:
        "Had a nightmare with some IKEA furniture. The HomeCrew pro assembled everything perfectly in under 2 hours. Great value for money and very professional.",
      verified: true,
    },
    {
      id: 5,
      name: "Lisa Thompson",
      location: "Denver, CO",
      rating: 5,
      date: "1 month ago",
      service: "Pest Control",
      content:
        "We had a persistent ant problem that other companies couldn't solve. HomeCrew used eco-friendly methods and we haven't seen a single ant since. Highly recommend their pest control service!",
      verified: true,
    },
    {
      id: 6,
      name: "James Wilson",
      location: "Boston, MA",
      rating: 5,
      date: "1 month ago",
      service: "Math Tutoring",
      content:
        "My daughter's math grades improved dramatically after just a few sessions with their tutor. The tutor is patient, knowledgeable, and makes learning fun. Worth every penny!",
      verified: true,
    },
  ];

  const stats = [
    { value: "4.9/5", label: "Average Rating", icon: <FaStar /> },
    { value: "5,000+", label: "Reviews", icon: <FaThumbsUp /> },
    { value: "98%", label: "Satisfaction Rate", icon: <FaCheckCircle /> },
    { value: "12,000+", label: "Happy Customers", icon: <FaUsers /> },
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Get visible testimonials (3 at a time)
  const getVisibleTestimonials = () => {
    const result = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % testimonials.length;
      result.push(testimonials[index]);
    }
    return result;
  };

  const visibleTestimonials = getVisibleTestimonials();

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-gradient-to-b from-white via-gray-50/50 to-white relative overflow-hidden"
    >
      {/* Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-400/3 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 px-4 py-2 rounded-full mb-4">
            <FaStar className="text-yellow-400" />
            <span className="text-green-700 font-semibold text-sm uppercase tracking-wider">
              Testimonials
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
            What Our <span className="text-green-600">Customers Say</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Real reviews from real people who have used HomeCrew services
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl shadow-lg p-5 text-center border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="text-2xl text-green-500 mb-1 flex justify-center">
                {stat.icon}
              </div>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <p className="text-xs text-gray-600 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Testimonials Carousel */}
        <div className="relative mb-12">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-all duration-300 hover:scale-110 cursor-pointer border border-gray-200"
            aria-label="Previous testimonial"
          >
            <FaArrowLeft className="text-gray-700" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-all duration-300 hover:scale-110 cursor-pointer border border-gray-200"
            aria-label="Next testimonial"
          >
            <FaArrowRight className="text-gray-700" />
          </button>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {visibleTestimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden hover:-translate-y-1 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${(index + 3) * 150}ms` }}
              >
                <div className="p-6">
                  {/* Quote Icon */}
                  <FaQuoteLeft className="text-green-500/20 text-3xl mb-3" />

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={`${
                          i < testimonial.rating
                            ? "text-yellow-400"
                            : "text-gray-300"
                        } text-sm`}
                      />
                    ))}
                    <span className="text-xs text-gray-500 ml-2">
                      {testimonial.rating}.0
                    </span>
                  </div>

                  {/* Content */}
                  <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-4">
                    "{testimonial.content}"
                  </p>

                  <FaQuoteRight className="text-green-500/20 text-2xl ml-auto" />

                  {/* Divider */}
                  <div className="border-t border-gray-100 my-4" />

                  {/* User Info */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center text-green-600 text-xl flex-shrink-0">
                        <FaUserCircle />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900">
                          {testimonial.name}
                        </h4>
                        <p className="text-xs text-gray-500">
                          {testimonial.location}
                        </p>
                        <div className="flex items-center gap-1 mt-0.5">
                          <span className="text-[10px] text-green-600">
                            <FaCheckCircle />
                          </span>
                          <span className="text-[10px] text-gray-500">
                            Verified Review
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                        {testimonial.service}
                      </span>
                      <p className="text-[10px] text-gray-400 mt-1">
                        {testimonial.date}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  index === currentIndex
                    ? "w-8 bg-gradient-to-r from-green-500 to-emerald-600"
                    : "w-2 bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Trust Badges */}
        <div
          className={`bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 lg:p-10 shadow-2xl shadow-green-500/20 transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
          style={{ transitionDelay: "800ms" }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-2">⭐</div>
              <p className="text-white font-bold text-lg">4.9/5</p>
              <p className="text-emerald-100/80 text-sm">Average Rating</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🏆</div>
              <p className="text-white font-bold text-lg">Top Rated</p>
              <p className="text-emerald-100/80 text-sm">Service Platform</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">✅</div>
              <p className="text-white font-bold text-lg">100%</p>
              <p className="text-emerald-100/80 text-sm">Verified Reviews</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🤝</div>
              <p className="text-white font-bold text-lg">12k+</p>
              <p className="text-emerald-100/80 text-sm">Happy Customers</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Join thousands of satisfied customers</p>
          <Link
            href="/all-services"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-full transition-all duration-300 shadow-xl shadow-green-500/30 hover:shadow-green-500/50 hover:scale-105 cursor-pointer"
          >
            Book Your Service Now
            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;