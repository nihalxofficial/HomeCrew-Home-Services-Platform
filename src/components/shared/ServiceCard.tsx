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
  const serviceId = service._id || service.id || String(index);

  const handleLike = () => {
    if (onLike) {
      onLike(serviceId);
    }
  };

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/services/${serviceId}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: service.title,
          text: service.shortDescription,
          url: shareUrl,
        });
        setIsShared(true);
        setTimeout(() => setIsShared(false), 2000);
      } catch (error) {
        // User cancelled or sharing failed
      }
    } else {
      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(shareUrl);
      setIsShared(true);
      setTimeout(() => setIsShared(false), 2000);
    }
  };

  return (
    <div
      className={`group relative transform transition-all duration-700 h-full flex flex-col ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
      style={{ transitionDelay: `${index * 50}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Card Container with equal height */}
      <div
        className={`relative bg-white rounded-3xl shadow-lg overflow-hidden transition-all duration-500 flex flex-col h-full border border-gray-100/80 ${
          isHovered ? "shadow-2xl -translate-y-2" : "shadow-md hover:shadow-xl"
        }`}
      >
        {/* Gradient Border Accent */}
        <div
          className={`absolute top-0 left-0 right-0 z-10 bg-gradient-to-r ${getCategoryColor(
            service.category
          )} transition-all duration-500 ${
            isHovered ? "h-1.5" : "h-1"
          }`}
        />

        {/* Image Section */}
        <div className="relative h-48 sm:h-52 w-full flex-shrink-0 overflow-hidden">
          <Image
            src={service.imageUrl || "https://images.unsplash.com/photo-1581578731548-c64695cc6952"}
            alt={service.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className={`object-cover transition-transform duration-700 ${
              isHovered ? "scale-110" : "scale-100"
            }`}
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

          {/* Category Badge - Top Left */}
          <div className="absolute top-4 left-4 z-10">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md border border-white/20 shadow-sm ${getCategoryBg(
                service.category
              )}`}
            >
              {getCategoryIcon(service.category)}
              {service.category}
            </span>
          </div>

          {/* Featured Badge - Top Right */}
          {service.isFeatured && (
            <div className="absolute top-4 right-4 z-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[10px] font-bold rounded-full uppercase tracking-wider shadow-lg shadow-orange-500/30">
                <FaShieldAlt className="text-[10px]" />
                Featured
              </span>
            </div>
          )}

          {/* Action Buttons - Top Right Below Featured */}
          <div
            className={`absolute top-16 right-4 z-10 flex flex-col gap-1.5 transition-all duration-300 ${
              isHovered
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-2"
            }`}
          >
            <button
              onClick={handleLike}
              className="w-8 h-8 cursor-pointer rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center hover:bg-white transition-all duration-300 shadow-md"
              aria-label="Like"
            >
              <FaHeart
                className={`text-xs transition-all duration-300 ${
                  isLiked
                    ? "text-red-500 scale-110"
                    : "text-gray-500 hover:text-red-400"
                }`}
              />
            </button>
            <button
              onClick={handleShare}
              className="w-8 h-8 cursor-pointer rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center hover:bg-white transition-all duration-300 shadow-md"
              aria-label="Share"
            >
              <FaShare
                className={`text-xs transition-all duration-300 ${
                  isShared
                    ? "text-green-500 scale-110"
                    : "text-gray-500 hover:text-green-500"
                }`}
              />
            </button>
          </div>

          {/* Price Tag - Bottom Right */}
          <div className="absolute bottom-3 right-3 z-10">
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-full px-3.5 py-1 shadow-lg shadow-green-600/30">
              <span className="text-white font-bold text-base">
                ${service.price}
              </span>
              {service.priceUnit === "hourly" && (
                <span className="text-white/80 text-[10px] ml-0.5">/hr</span>
              )}
            </div>
          </div>
        </div>

        {/* Content Section - Flex grow to ensure balanced card heights */}
        <div className="p-5 flex-1 flex flex-col justify-between bg-white">
          <div>
            {/* Title & Duration */}
            <div className="flex items-start justify-between mb-2 gap-2 h-7">
              <h3
                className="text-base font-bold text-gray-900 group-hover:text-green-600 transition-colors line-clamp-1 flex-1"
                title={service.title}
              >
                {service.title}
              </h3>
              <span className="flex items-center gap-1 text-xs text-gray-500 whitespace-nowrap bg-gray-50 px-2 py-0.5 rounded-md border border-gray-100 flex-shrink-0">
                <FaClock className="text-green-500 text-[10px]" />
                {service.duration}
              </span>
            </div>

            {/* Description - Fixed 2-line height */}
            <p
              className="text-xs text-gray-600 mb-3 line-clamp-2 h-9 overflow-hidden leading-relaxed"
              title={service.shortDescription}
            >
              {service.shortDescription}
            </p>

            {/* Tags - Fixed container height with overflow hidden */}
            <div className="flex flex-wrap gap-1.5 mb-3 h-10 overflow-hidden content-start">
              {service.tags && service.tags.length > 0 ? (
                service.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] font-medium bg-gray-100/80 text-gray-600 px-2.5 py-0.5 rounded-full border border-gray-200/50"
                  >
                    {tag}
                  </span>
                ))
              ) : (
                <span className="text-[10px] text-gray-400 italic">No tags</span>
              )}
            </div>

            {/* What's Included Card Box */}
            <div className="mb-4 h-[68px] flex flex-col justify-between bg-gray-50/80 p-2.5 rounded-xl border border-gray-100">
              <div className="flex items-center justify-between text-[10px] text-gray-500">
                <span className="font-semibold text-gray-700">Included</span>
                <span className="font-medium text-gray-500">
                  {service.whatsIncluded ? service.whatsIncluded.length : 0} items
                </span>
              </div>
              <div className="flex gap-1 my-1">
                {(service.whatsIncluded || []).slice(0, 4).map((_, idx) => (
                  <div
                    key={idx}
                    className="flex-1 h-1 rounded-full bg-gray-200 overflow-hidden"
                  >
                    <div className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full" />
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 overflow-hidden h-4 text-[10px] text-gray-600">
                {(service.whatsIncluded || []).slice(0, 2).map((item, idx) => (
                  <span
                    key={idx}
                    className="flex items-center gap-1 truncate max-w-[110px]"
                  >
                    <FaCheckCircle className="text-green-500 text-[8px] flex-shrink-0" />
                    <span className="truncate">{item}</span>
                  </span>
                ))}
                {(service.whatsIncluded || []).length > 2 && (
                  <span className="text-gray-400 flex-shrink-0 text-[9px] ml-auto">
                    +{(service.whatsIncluded || []).length - 2} more
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Bottom Action Footer - Anchored at the bottom of the card */}
          <div className="mt-auto pt-3 border-t border-gray-100">
            <div className="flex items-center gap-2.5">
              <Link
                href={`/services/${serviceId}`}
                className="flex-1 inline-flex items-center justify-center gap-2 px-3.5 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white text-xs font-semibold rounded-xl transition-all duration-300 shadow-md shadow-green-600/20 hover:shadow-green-600/40 hover:scale-[1.01]"
              >
                <FaCalendarCheck className="text-xs" />
                Book Now
                <FaArrowRight className="group-hover:translate-x-1 transition-transform text-[10px]" />
              </Link>
              <Link
                href={`/services/${serviceId}`}
                className="w-10 h-10 rounded-xl border border-gray-200 hover:border-green-300 flex items-center justify-center text-gray-500 hover:text-green-600 transition-all duration-300 hover:bg-green-50/50 flex-shrink-0"
                aria-label="View details"
              >
                <FaEye className="text-xs" />
              </Link>
            </div>

            {/* Available Cities */}
            <div className="flex items-center gap-1.5 mt-2.5 text-[10px] text-gray-400 truncate">
              <FaMapMarkerAlt className="text-green-500 text-[10px] flex-shrink-0" />
              <span className="truncate">
                Available in:{" "}
                {service.availableCities && service.availableCities.length > 0
                  ? service.availableCities.slice(0, 3).join(", ")
                  : "Multiple Cities"}
                {service.availableCities && service.availableCities.length > 3 && " + more"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};