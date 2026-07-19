"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaStar,
  FaClock,
  FaArrowRight,
  FaCheckCircle,
  FaUsers,
  FaWrench,
  FaBroom,
  FaPaintRoller,
  FaBookOpen,
  FaTools,
  FaBug,
  FaShieldAlt,
  FaCalendarCheck,
  FaMapMarkerAlt,
  FaHeart,
  FaShare,
  FaEye,
} from "react-icons/fa";
import { Service } from "@/types";



interface ServiceCardProps {
  service: Service;
  index: number;
  isVisible: boolean;
  onLike?: (id: string) => void;
  isLiked?: boolean;
}

// Category Icons Mapping
export const getCategoryIcon = (category: string) => {
  const icons: { [key: string]: React.ReactNode } = {
    Cleaning: <FaBroom />,
    Repair: <FaWrench />,
    "Home Improvement": <FaPaintRoller />,
    "Pest Control": <FaBug />,
    Tutoring: <FaBookOpen />,
    Installation: <FaTools />,
  };
  return icons[category] || <FaTools />;
};

// Category Colors Mapping
export const getCategoryColor = (category: string) => {
  const colors: { [key: string]: string } = {
    Cleaning: "from-blue-500 to-cyan-400",
    Repair: "from-orange-500 to-amber-400",
    "Home Improvement": "from-purple-500 to-pink-400",
    "Pest Control": "from-red-500 to-rose-400",
    Tutoring: "from-pink-500 to-rose-400",
    Installation: "from-indigo-500 to-violet-400",
  };
  return colors[category] || "from-green-500 to-emerald-400";
};

// Category Background Colors Mapping
export const getCategoryBg = (category: string) => {
  const colors: { [key: string]: string } = {
    Cleaning: "bg-blue-50 text-blue-600",
    Repair: "bg-orange-50 text-orange-600",
    "Home Improvement": "bg-purple-50 text-purple-600",
    "Pest Control": "bg-red-50 text-red-600",
    Tutoring: "bg-pink-50 text-pink-600",
    Installation: "bg-indigo-50 text-indigo-600",
  };
  return colors[category] || "bg-green-50 text-green-600";
};

export const ServiceCard = ({
  service,
  index,
  isVisible,
  onLike,
  isLiked = false,
}: ServiceCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isShared, setIsShared] = useState(false);

  const handleLike = () => {
    if (onLike) {
      onLike(service._id);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: service.title,
          text: service.shortDescription,
          url: `${window.location.origin}/services/${service._id}`,
        });
        setIsShared(true);
        setTimeout(() => setIsShared(false), 2000);
      } catch (error) {
        // User cancelled or sharing failed
      }
    } else {
      // Fallback: copy to clipboard
      const url = `${window.location.origin}/services/${service._id}`;
      await navigator.clipboard.writeText(url);
      setIsShared(true);
      setTimeout(() => setIsShared(false), 2000);
    }
  };

  return (
    <div
      className={`group relative transform transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Card Container with 3D Effect */}
      <div
        className={`relative bg-white rounded-3xl shadow-lg overflow-hidden transition-all duration-500 ${
          isHovered ? "shadow-2xl -translate-y-3 rotate-[0.5deg]" : "shadow-lg"
        }`}
      >
        {/* Gradient Border Accent */}
        <div
          className={`absolute top-0 left-0 right-0 bg-gradient-to-r ${getCategoryColor(
            service.category
          )} transition-all duration-500 ${
            isHovered ? "h-1.5" : "h-1"
          }`}
        />

        {/* Image Section */}
        <div className="relative h-52 overflow-hidden">
          <Image
            src={service.imageUrl}
            alt={service.title}
            fill
            className={`object-cover transition-transform duration-700 ${
              isHovered ? "scale-110" : "scale-100"
            }`}
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Category Badge - Top Left */}
          <div className="absolute top-4 left-4">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-sm border border-white/20 ${getCategoryBg(
                service.category
              )}`}
            >
              {getCategoryIcon(service.category)}
              {service.category}
            </span>
          </div>

          {/* Featured Badge - Top Right */}
          {service.isFeatured && (
            <div className="absolute top-4 right-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-orange-500 to-red-500 text-white text-[10px] font-bold rounded-full uppercase tracking-wider shadow-lg shadow-orange-500/30">
                <FaShieldAlt className="text-[10px]" />
                Featured
              </span>
            </div>
          )}

          {/* Action Buttons - Top Right Below Featured */}
          <div
            className={`absolute top-16 right-4 flex flex-col gap-1.5 transition-all duration-300 ${
              isHovered
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-2"
            }`}
          >
            <button
              onClick={handleLike}
              className="w-8 h-8 cursor-pointer rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-all duration-300 shadow-lg"
              aria-label="Like"
            >
              <FaHeart
                className={`text-sm transition-all duration-300 ${
                  isLiked
                    ? "text-red-500 scale-110"
                    : "text-gray-500 hover:text-red-400"
                }`}
              />
            </button>
            <button
              onClick={handleShare}
              className="w-8 h-8 cursor-pointer rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-all duration-300 shadow-lg"
              aria-label="Share"
            >
              <FaShare
                className={`text-sm transition-all duration-300 ${
                  isShared
                    ? "text-green-500 scale-110"
                    : "text-gray-500 hover:text-green-500"
                }`}
              />
            </button>
          </div>

          {/* Rating Badge - Bottom Left */}
          <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-black/60 backdrop-blur-sm rounded-full px-3 py-1.5 border border-white/10">
            <FaStar className="text-yellow-400 text-xs" />
            <span className="text-white text-sm font-semibold">
              {service.avgRating}
            </span>
            <span className="text-white/50 text-xs">
              ({service.totalReviews})
            </span>
            <span className="w-px h-4 bg-white/20" />
            <div className="flex items-center gap-1 text-white/70 text-xs">
              <FaUsers className="text-[10px]" />
              <span>{service.totalBookings}</span>
            </div>
          </div>

          {/* Price Tag - Bottom Right */}
          <div className="absolute bottom-4 right-4">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-full px-4 py-1.5 shadow-lg shadow-green-500/30">
              <span className="text-white font-bold text-lg">
                ${service.price}
              </span>
              {service.priceUnit === "hourly" && (
                <span className="text-white/80 text-xs ml-0.5">/hr</span>
              )}
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-5">
          {/* Title & Duration */}
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-lg font-bold text-gray-900 group-hover:text-green-600 transition-colors line-clamp-1 flex-1">
              {service.title}
            </h3>
            <span className="flex items-center gap-1 text-xs text-gray-500 whitespace-nowrap ml-2">
              <FaClock className="text-green-500 text-[10px]" />
              {service.duration}
            </span>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {service.shortDescription}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {service.tags.map((tag, idx) => (
              <span
                key={idx}
                className="text-[10px] font-medium bg-gray-100 text-gray-600 px-2.5 py-0.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* What's Included - Progress Style */}
          <div className="mb-4">
            <div className="flex items-center justify-between text-[10px] text-gray-500 mb-1">
              <span className="font-medium">Included</span>
              <span>{service.whatsIncluded.length} items</span>
            </div>
            <div className="flex gap-1">
              {service.whatsIncluded.slice(0, 4).map((_, idx) => (
                <div
                  key={idx}
                  className="flex-1 h-1 rounded-full bg-gray-200 overflow-hidden"
                >
                  <div className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full" />
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-1 mt-1.5">
              {service.whatsIncluded.slice(0, 2).map((item, idx) => (
                <span
                  key={idx}
                  className="text-[10px] text-gray-500 flex items-center gap-0.5"
                >
                  <FaCheckCircle className="text-green-500 text-[8px]" />
                  {item}
                </span>
              ))}
              {service.whatsIncluded.length > 2 && (
                <span className="text-[10px] text-gray-400">
                  +{service.whatsIncluded.length - 2} more
                </span>
              )}
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
            <Link
              href={`/services/${service._id}`}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white text-sm font-medium rounded-xl transition-all duration-300 shadow-md shadow-green-500/30 hover:shadow-green-500/50 hover:scale-[1.02]"
            >
              <FaCalendarCheck className="text-sm" />
              Book Now
              <FaArrowRight className="group-hover:translate-x-1 transition-transform text-xs" />
            </Link>
            <Link
              href={`/services/${service._id}`}
              className="w-11 h-11 rounded-xl border-2 border-gray-200 hover:border-green-200 flex items-center justify-center text-gray-400 hover:text-green-500 transition-all duration-300 hover:bg-green-50 hover:scale-105"
              aria-label="View details"
            >
              <FaEye className="text-sm" />
            </Link>
          </div>

          {/* Available Cities */}
          <div className="flex items-center gap-1.5 mt-3 text-[10px] text-gray-400">
            <FaMapMarkerAlt className="text-green-400 text-[10px]" />
            <span>
              Available in:{" "}
              {service.availableCities.slice(0, 3).join(", ")}
              {service.availableCities.length > 3 && " + more"}
            </span>
          </div>
        </div>
      </div>

      {/* Decorative Card Number */}
      <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-xs font-bold text-gray-400 shadow-md">
        {String(index + 1).padStart(2, "0")}
      </div>
    </div>
  );
};