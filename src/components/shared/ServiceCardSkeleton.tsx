"use client";

export const ServiceCardSkeleton = () => {
  return (
    <div className="group relative animate-pulse">
      {/* Card Container */}
      <div className="relative bg-white rounded-3xl shadow-lg overflow-hidden">
        {/* Gradient Border Accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200" />

        {/* Image Section */}
        <div className="relative h-52 bg-gray-200">
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

          {/* Category Badge Skeleton */}
          <div className="absolute top-4 left-4">
            <div className="w-20 h-7 bg-gray-300 rounded-full" />
          </div>

          {/* Featured Badge Skeleton */}
          <div className="absolute top-4 right-4">
            <div className="w-16 h-7 bg-gray-300 rounded-full" />
          </div>

          {/* Rating Badge Skeleton */}
          <div className="absolute bottom-4 left-4">
            <div className="w-32 h-8 bg-gray-300 rounded-full" />
          </div>

          {/* Price Tag Skeleton */}
          <div className="absolute bottom-4 right-4">
            <div className="w-20 h-8 bg-gray-300 rounded-full" />
          </div>
        </div>

        {/* Content Section */}
        <div className="p-5">
          {/* Title & Duration */}
          <div className="flex items-start justify-between mb-2">
            <div className="h-6 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-16" />
          </div>

          {/* Description */}
          <div className="space-y-2 mb-3">
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-2/3" />
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            <div className="h-5 bg-gray-200 rounded-full w-12" />
            <div className="h-5 bg-gray-200 rounded-full w-16" />
            <div className="h-5 bg-gray-200 rounded-full w-14" />
          </div>

          {/* What's Included */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-1">
              <div className="h-3 bg-gray-200 rounded w-16" />
              <div className="h-3 bg-gray-200 rounded w-12" />
            </div>
            <div className="flex gap-1">
              <div className="flex-1 h-1 bg-gray-200 rounded" />
              <div className="flex-1 h-1 bg-gray-200 rounded" />
              <div className="flex-1 h-1 bg-gray-200 rounded" />
              <div className="flex-1 h-1 bg-gray-200 rounded" />
            </div>
            <div className="flex gap-1 mt-1.5">
              <div className="h-3 bg-gray-200 rounded w-20" />
              <div className="h-3 bg-gray-200 rounded w-16" />
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
            <div className="flex-1 h-11 bg-gray-200 rounded-xl" />
            <div className="w-11 h-11 bg-gray-200 rounded-xl" />
          </div>

          {/* Available Cities */}
          <div className="flex items-center gap-1.5 mt-3">
            <div className="h-3 bg-gray-200 rounded w-2/3" />
          </div>
        </div>
      </div>

      {/* Decorative Card Number */}
      <div className="absolute -top-3 -right-3 w-8 h-8 bg-gray-200 rounded-full" />
    </div>
  );
};