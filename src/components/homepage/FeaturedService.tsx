"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  FaStar,
  FaArrowRight,
} from "react-icons/fa";
import { Service } from "@/types";
import { ServiceCardSkeleton } from "../shared/ServiceCardSkeleton";
import { ServiceCard } from "../shared/ServiceCard";

const FeaturedServices = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [likedCards, setLikedCards] = useState<Set<string>>(new Set());
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

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleLike = (id: string) => {
    setLikedCards((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const featuredServices: Service[] = [
    {
      _id: "1",
      title: "Premium Home Deep Cleaning",
      category: "Cleaning",
      shortDescription: "Complete home cleaning with eco-friendly products",
      fullDescription:
        "Our premium deep cleaning service covers every corner of your home with eco-friendly, non-toxic products safe for kids and pets.",
      price: 129,
      priceUnit: "fixed",
      duration: "3-4 hours",
      imageUrl:
        "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=800&h=600&fit=crop",
      whatsIncluded: [
        "All rooms deep cleaned",
        "Kitchen & bathroom sanitized",
        "Floor mopping & vacuuming",
        "Window & mirror cleaning",
      ],
      tags: ["Deep Clean", "Eco-Friendly", "Pet Safe"],
      avgRating: 4.9,
      totalReviews: 234,
      totalBookings: 567,
      isFeatured: true,
      availableCities: ["New York", "Los Angeles", "Chicago"],
      createdAt: "2024-12-01T00:00:00Z",
    },
    {
      _id: "2",
      title: "AC Repair & Maintenance",
      category: "Repair",
      shortDescription: "Expert AC repair with certified technicians",
      fullDescription:
        "Keep your AC running efficiently with our expert repair and maintenance services. Certified technicians diagnose issues quickly.",
      price: 79,
      priceUnit: "hourly",
      duration: "1-2 hours",
      imageUrl:
        "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=800&h=600&fit=crop",
      whatsIncluded: [
        "Complete system diagnosis",
        "Filter replacement",
        "Coil cleaning",
        "Performance optimization",
      ],
      tags: ["AC Repair", "Maintenance", "Emergency"],
      avgRating: 4.8,
      totalReviews: 189,
      totalBookings: 423,
      isFeatured: true,
      availableCities: ["New York", "Los Angeles", "Chicago"],
      createdAt: "2024-12-02T00:00:00Z",
    },
    {
      _id: "3",
      title: "Interior Wall Painting",
      category: "Home Improvement",
      shortDescription: "Professional painting with premium paints",
      fullDescription:
        "Transform your home with our professional interior painting service using premium, low-VOC paints for flawless finishes.",
      price: 199,
      priceUnit: "fixed",
      duration: "2-3 days",
      imageUrl:
        "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&h=600&fit=crop",
      whatsIncluded: [
        "Wall preparation & priming",
        "Premium paint application",
        "Trim & ceiling painting",
        "Full cleanup",
      ],
      tags: ["Painting", "Home Improvement", "Premium"],
      avgRating: 4.9,
      totalReviews: 156,
      totalBookings: 312,
      isFeatured: true,
      availableCities: ["New York", "Los Angeles", "Chicago"],
      createdAt: "2024-12-03T00:00:00Z",
    },
    {
      _id: "4",
      title: "Comprehensive Pest Control",
      category: "Pest Control",
      shortDescription: "Safe and effective pest elimination",
      fullDescription:
        "Protect your home with eco-friendly, pet-safe pest control methods that eliminate pests and prevent future infestations.",
      price: 99,
      priceUnit: "fixed",
      duration: "2-3 hours",
      imageUrl:
        "https://images.unsplash.com/photo-1583947585927-4b1b6e1acbe0?w=800&h=600&fit=crop",
      whatsIncluded: [
        "Full property inspection",
        "Custom treatment plan",
        "Eco-friendly pesticides",
        "3-month guarantee",
      ],
      tags: ["Pest Control", "Eco-Friendly", "Safe"],
      avgRating: 4.7,
      totalReviews: 143,
      totalBookings: 289,
      isFeatured: true,
      availableCities: ["New York", "Los Angeles", "Chicago"],
      createdAt: "2024-12-04T00:00:00Z",
    },
    {
      _id: "5",
      title: "Furniture Assembly Service",
      category: "Installation",
      shortDescription: "Fast and reliable furniture assembly",
      fullDescription:
        "Expert furniture assembly for all types from IKEA to custom pieces. Quick, professional, and hassle-free.",
      price: 89,
      priceUnit: "fixed",
      duration: "1-3 hours",
      imageUrl:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
      whatsIncluded: [
        "Furniture assembly",
        "Hardware installation",
        "Leveling & alignment",
        "Cleanup & packaging removal",
      ],
      tags: ["Assembly", "Furniture", "IKEA"],
      avgRating: 4.7,
      totalReviews: 98,
      totalBookings: 210,
      isFeatured: true,
      availableCities: ["New York", "Los Angeles", "Chicago"],
      createdAt: "2024-12-05T00:00:00Z",
    },
    {
      _id: "6",
      title: "Math Tutoring Services",
      category: "Tutoring",
      shortDescription: "Personalized math tutoring for all levels",
      fullDescription:
        "Expert math tutoring with personalized attention and proven results. Progress tracking and test preparation included.",
      price: 45,
      priceUnit: "hourly",
      duration: "1 hour",
      imageUrl:
        "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=600&fit=crop",
      whatsIncluded: [
        "Personalized lesson plans",
        "Homework assistance",
        "Test preparation",
        "Progress tracking",
      ],
      tags: ["Tutoring", "Math", "Education"],
      avgRating: 4.8,
      totalReviews: 112,
      totalBookings: 178,
      isFeatured: true,
      availableCities: ["New York", "Los Angeles", "Chicago"],
      createdAt: "2024-12-06T00:00:00Z",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-gradient-to-b from-white via-gray-50/50 to-white relative overflow-hidden"
    >
      {/* Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-400/3 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 px-4 py-2 rounded-full mb-4">
            <FaStar className="text-yellow-400" />
            <span className="text-green-700 font-semibold text-sm uppercase tracking-wider">
              Featured Services
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
            Popular <span className="text-green-600">Services</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our most requested services, trusted by thousands of customers
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading
            ? // Skeleton Loaders
              Array.from({ length: 6 }).map((_, index) => (
                <ServiceCardSkeleton key={`skeleton-${index}`} />
              ))
            : // Actual Cards
              featuredServices.map((service, index) => (
                <ServiceCard
                  key={service._id}
                  service={service}
                  index={index}
                  isVisible={isVisible}
                  onLike={handleLike}
                  isLiked={likedCards.has(service._id)}
                />
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
            href="/services"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-white text-green-600 font-semibold rounded-full border-2 border-green-600 hover:bg-green-600 hover:text-white transition-all duration-300 hover:shadow-xl hover:shadow-green-500/20 hover:scale-105 cursor-pointer"
          >
            View All Services
            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedServices;