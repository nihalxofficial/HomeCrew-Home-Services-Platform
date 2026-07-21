"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BookingModal } from "@/components/shared/BookingModal";
import { useRouter } from "next/navigation";
import {
  FaArrowLeft,
  FaStar,
  FaClock,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaTag,
  FaUser,
  FaEnvelope,
  FaCalendarCheck,
  FaShare,
  FaHeart,
  FaArrowRight,
  FaPhone,
  FaShieldAlt,
  FaAward,
  FaUsers,
} from "react-icons/fa";
import { Service } from "@/types";

interface ServiceDetailsClientProps {
  service: Service & {
    creatorId?: {
      _id: string;
      name: string;
      email: string;
      image?: string;
    };
  };
}

const ServiceDetailsClient = ({ service }: ServiceDetailsClientProps) => {
  const router = useRouter();
  const [isLiked, setIsLiked] = useState(false);
  const [isShared, setIsShared] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
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
      const url = `${window.location.origin}/services/${service._id}`;
      await navigator.clipboard.writeText(url);
      setIsShared(true);
      setTimeout(() => setIsShared(false), 2000);
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      Cleaning: "bg-blue-100 text-blue-700",
      Repair: "bg-orange-100 text-orange-700",
      "Home Improvement": "bg-purple-100 text-purple-700",
      "Pest Control": "bg-red-100 text-red-700",
      Tutoring: "bg-pink-100 text-pink-700",
      Installation: "bg-indigo-100 text-indigo-700",
      Electrical: "bg-yellow-100 text-yellow-700",
      "TV Mounting": "bg-teal-100 text-teal-700",
      Gardening: "bg-emerald-100 text-emerald-700",
    };
    return colors[category] || "bg-gray-100 text-gray-700";
  };

  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: React.ReactNode } = {
      Cleaning: <span className="text-lg">🧹</span>,
      Repair: <span className="text-lg">🔧</span>,
      "Home Improvement": <span className="text-lg">🎨</span>,
      "Pest Control": <span className="text-lg">🐜</span>,
      Tutoring: <span className="text-lg">📚</span>,
      Installation: <span className="text-lg">🛠️</span>,
      Electrical: <span className="text-lg">⚡</span>,
      "TV Mounting": <span className="text-lg">📺</span>,
      Gardening: <span className="text-lg">🌿</span>,
    };
    return icons[category] || <span className="text-lg">🔧</span>;
  };

  return (
    <div className="min-h-[calc(100vh-6rem)] bg-gradient-to-b from-white via-gray-50/50 to-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-6 cursor-pointer group"
        >
          <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          Back to Services
        </button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Image & Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image */}
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-gray-100 shadow-lg">
              <Image
                src={service.imageUrl}
                alt={service.title}
                fill
                className="object-cover"
                priority
              />
              {service.isFeatured && (
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold rounded-full uppercase tracking-wider shadow-lg shadow-orange-500/30">
                    <FaShieldAlt className="text-[10px]" />
                    Featured
                  </span>
                </div>
              )}
              <div className="absolute top-4 right-4 flex gap-2">
                <button
                  onClick={handleLike}
                  className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-all duration-300 shadow-lg cursor-pointer"
                >
                  <FaHeart
                    className={`text-lg transition-all duration-300 ${
                      isLiked ? "text-red-500 scale-110" : "text-gray-500 hover:text-red-400"
                    }`}
                  />
                </button>
                <button
                  onClick={handleShare}
                  className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-all duration-300 shadow-lg cursor-pointer"
                >
                  <FaShare
                    className={`text-lg transition-all duration-300 ${
                      isShared ? "text-green-500 scale-110" : "text-gray-500 hover:text-green-500"
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Service Info */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(service.category)}`}>
                      {getCategoryIcon(service.category)}
                      {service.category}
                    </span>
                    <span className="flex items-center gap-1 text-sm text-gray-500">
                      <FaStar className="text-yellow-400" />
                      {service.avgRating || 4.9} ({service.totalReviews || 0} reviews)
                    </span>
                  </div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                    {service.title}
                  </h1>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-green-600">
                    ${service.price}
                    {service.priceUnit === "hourly" && (
                      <span className="text-sm font-normal text-gray-500">/hr</span>
                    )}
                  </div>
                  <span className="text-sm text-gray-500">{service.duration}</span>
                </div>
              </div>

              <p className="text-gray-600 leading-relaxed mb-6">
                {service.fullDescription}
              </p>

              {/* What's Included */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <FaCheckCircle className="text-green-500" />
                  What's Included
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {service.whatsIncluded.map((item, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                      <FaCheckCircle className="text-green-500 text-xs flex-shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <FaTag className="text-gray-400" />
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {service.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Book Now Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Book This Service</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Price</span>
                  <span className="font-semibold text-gray-900">
                    ${service.price}
                    {service.priceUnit === "hourly" && <span className="text-xs text-gray-500">/hr</span>}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Duration</span>
                  <span className="text-gray-900">{service.duration}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Category</span>
                  <span className="text-gray-900">{service.category}</span>
                </div>
              </div>

              <BookingModal
                serviceTitle={service.title}
                triggerClassName="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-green-500/30 hover:shadow-green-500/50 hover:scale-[1.02]"
              />

              <div className="mt-4 text-center">
                <p className="text-xs text-gray-400">Secure booking • No hidden fees</p>
              </div>
            </div>

            {/* Provider Info */}
            {service.creatorId && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <FaUser className="text-gray-400" />
                  Service Provider
                </h3>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-green-100 to-emerald-100 flex-shrink-0">
                    {service.creatorId.image ? (
                      <Image
                        src={service.creatorId.image}
                        alt={service.creatorId.name}
                        width={48}
                        height={48}
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-green-600 text-xl font-bold">
                        {service.creatorId.name?.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{service.creatorId.name}</p>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <FaEnvelope className="text-[10px]" />
                      {service.creatorId.email}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Available Cities */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <FaMapMarkerAlt className="text-gray-400" />
                Available Cities
              </h3>
              <div className="flex flex-wrap gap-2">
                {service.availableCities.map((city, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full border border-green-200"
                  >
                    {city}
                  </span>
                ))}
              </div>
            </div>

            {/* Trust Badges */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center p-3 bg-gray-50 rounded-xl">
                  <FaShieldAlt className="text-green-500 text-xl mx-auto mb-1" />
                  <p className="text-xs font-medium text-gray-700">Verified Pro</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-xl">
                  <FaAward className="text-green-500 text-xl mx-auto mb-1" />
                  <p className="text-xs font-medium text-gray-700">Top Rated</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-xl">
                  <FaUsers className="text-green-500 text-xl mx-auto mb-1" />
                  <p className="text-xs font-medium text-gray-700">500+ Bookings</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-xl">
                  <FaClock className="text-green-500 text-xl mx-auto mb-1" />
                  <p className="text-xs font-medium text-gray-700">On-Time</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailsClient;