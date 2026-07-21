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
import { getAllServices } from "@/lib/api/services";

const FeaturedServices = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [services, setServices] = useState<Service[]>([]);
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

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setIsLoading(true);
        const res = await getAllServices({ limit: 6 });
        if (res?.data && Array.isArray(res.data)) {
          setServices(res.data.slice(0, 6));
        } else if (Array.isArray(res)) {
          setServices(res.slice(0, 6));
        } else {
          setServices([]);
        }
      } catch (error) {
        console.error("Error fetching featured services:", error);
        setServices([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
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
            : // Actual Cards from API
              services.map((service, index) => (
                <ServiceCard
                  key={service._id || service.id || index}
                  service={service}
                  index={index}
                  isVisible={isVisible}
                  onLike={handleLike}
                  isLiked={likedCards.has(service._id || service.id || "")}
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