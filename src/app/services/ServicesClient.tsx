"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FaArrowLeft, FaRedo, FaSpinner } from "react-icons/fa";
import { SearchField, Select, ListBox, Pagination, Label } from "@heroui/react";
import { Service } from "@/types";
import { ServiceCard } from "@/components/shared/ServiceCard";
import { getAllServices } from "@/lib/api/services";

interface ServicesClientProps {
  initialServices: Service[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
}

const ServicesClient = ({
  initialServices,
  totalCount: initialTotalCount,
  totalPages: initialTotalPages,
  currentPage: initialCurrentPage,
}: ServicesClientProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sectionRef = useRef<HTMLElement>(null);

  const [isVisible, setIsVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "All");
  const [sortBy, setSortBy] = useState(searchParams.get("sort") || "newest");
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");
  const [page, setPage] = useState(initialCurrentPage);

  const [services, setServices] = useState<Service[]>(initialServices);
  const [totalCount, setTotalCount] = useState(initialTotalCount);
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  const [currentPage, setCurrentPage] = useState(initialCurrentPage);
  const [isLoading, setIsLoading] = useState(false);
  const [likedServices, setLikedServices] = useState<Set<string>>(new Set());

  const categories = [
    "All",
    "Cleaning",
    "Repair",
    "Home Improvement",
    "Pest Control",
    "Tutoring",
    "Installation",
    "Electrical",
    "TV Mounting",
    "Gardening",
  ];

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

  // Sync state with props if server re-renders
  useEffect(() => {
    setServices(initialServices);
    setTotalCount(initialTotalCount);
    setTotalPages(initialTotalPages);
    setCurrentPage(initialCurrentPage);
  }, [initialServices, initialTotalCount, initialTotalPages, initialCurrentPage]);

  // Fetch services from server API
  const fetchServicesData = useCallback(
    async (s: string, c: string, sort: string, minP: string, maxP: string, p: number) => {
      setIsLoading(true);
      try {
        const res = await getAllServices({
          search: s,
          category: c,
          sort: sort,
          minPrice: minP,
          maxPrice: maxP,
          page: p,
          limit: 8,
        });

        if (res) {
          setServices(res.data || []);
          setTotalCount(res.totalCount || 0);
          setTotalPages(res.totalPages || 1);
          setCurrentPage(res.currentPage || 1);
        }
      } catch (err) {
        console.error("Failed to fetch services:", err);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  // Update URL params & trigger fetch
  const updateUrlAndFetch = (
    s: string,
    c: string,
    sort: string,
    minP: string,
    maxP: string,
    p: number
  ) => {
    const params = new URLSearchParams();
    if (s) params.set("search", s);
    if (c && c !== "All") params.set("category", c);
    if (sort && sort !== "newest") params.set("sort", sort);
    if (minP) params.set("minPrice", minP);
    if (maxP) params.set("maxPrice", maxP);
    if (p > 1) params.set("page", String(p));

    const queryString = params.toString();
    router.push(queryString ? `/services?${queryString}` : "/services", { scroll: false });

    fetchServicesData(s, c, sort, minP, maxP, p);
  };

  // Debounced search handler
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setPage(1);

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      updateUrlAndFetch(value, selectedCategory, sortBy, minPrice, maxPrice, 1);
    }, 350);
  };

  // Debounced price change handler
  const priceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const handlePriceChange = (minVal: string, maxVal: string) => {
    setMinPrice(minVal);
    setMaxPrice(maxVal);
    setPage(1);

    if (priceTimeoutRef.current) {
      clearTimeout(priceTimeoutRef.current);
    }

    priceTimeoutRef.current = setTimeout(() => {
      updateUrlAndFetch(searchTerm, selectedCategory, sortBy, minVal, maxVal, 1);
    }, 400);
  };

  const handleCategoryChange = (val: string) => {
    setSelectedCategory(val);
    setPage(1);
    updateUrlAndFetch(searchTerm, val, sortBy, minPrice, maxPrice, 1);
  };

  const handleSortChange = (val: string) => {
    setSortBy(val);
    setPage(1);
    updateUrlAndFetch(searchTerm, selectedCategory, val, minPrice, maxPrice, 1);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
    updateUrlAndFetch(searchTerm, selectedCategory, sortBy, minPrice, maxPrice, newPage);
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All");
    setSortBy("newest");
    setMinPrice("");
    setMaxPrice("");
    setPage(1);
    updateUrlAndFetch("", "All", "newest", "", "", 1);
  };

  const handleLike = (id: string) => {
    setLikedServices((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const startItem = (currentPage - 1) * 8 + 1;
  const endItem = Math.min(currentPage * 8, totalCount);

  const isFiltered =
    searchTerm || selectedCategory !== "All" || sortBy !== "newest" || minPrice || maxPrice;

  return (
    <section
      ref={sectionRef}
      className="py-12 bg-gradient-to-b from-gray-50/50 via-white to-gray-50/30 min-h-[calc(100vh-4rem)] pt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Link
                href="/"
                className="p-2 rounded-xl bg-white border border-gray-200 hover:bg-gray-100 transition-colors shadow-sm text-gray-600"
              >
                <FaArrowLeft />
              </Link>
              <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                All Professional Services
              </h1>
            </div>
            <p className="text-gray-500 text-sm">
              Discover, compare, and book verified expert home services near you
            </p>
          </div>

          {isFiltered && (
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold rounded-xl transition-all self-start md:self-auto cursor-pointer"
            >
              <FaRedo className="text-[10px]" />
              Reset Filters
            </button>
          )}
        </div>

        {/* HeroUI Controls Bar */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-200/80 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-12 lg:grid-cols-12 gap-4 items-end">
            {/* Search Field (Reduced Width: col-span-4) */}
            <div className="lg:col-span-4 md:col-span-6">
              <SearchField
                name="search"
                value={searchTerm}
                onChange={handleSearchChange}
                onClear={() => handleSearchChange("")}
                className="w-full"
              >
                <Label className="text-xs font-bold text-gray-600 mb-1.5 block uppercase tracking-wider">
                  Search Services
                </Label>
                <SearchField.Group className="relative flex items-center w-full bg-gray-50/70 border border-gray-200 rounded-2xl focus-within:bg-white focus-within:border-green-500 focus-within:ring-2 focus-within:ring-green-500/20 transition-all p-1">
                  <SearchField.SearchIcon className="ml-3 text-gray-400 w-4 h-4 flex-shrink-0" />
                  <SearchField.Input
                    placeholder="Search services..."
                    className="w-full py-2 px-3 text-sm text-gray-800 bg-transparent outline-none placeholder-gray-400 font-medium"
                  />
                  <SearchField.ClearButton className="mr-3 text-gray-400 hover:text-gray-600 transition-colors" />
                </SearchField.Group>
              </SearchField>
            </div>

            {/* Category Select using HeroUI v3 */}
            <div className="lg:col-span-3 md:col-span-6">
              <Select
                className="w-full"
                placeholder="Select category"
                selectedKey={selectedCategory}
                onSelectionChange={(key) => {
                  if (key !== null && key !== undefined) {
                    handleCategoryChange(String(key));
                  }
                }}
              >
                <Label className="text-xs font-bold text-gray-600 mb-1.5 block uppercase tracking-wider">
                  Category
                </Label>
                <Select.Trigger className="w-full flex items-center justify-between px-4 py-3 bg-gray-50/70 border border-gray-200 rounded-2xl text-sm font-semibold text-gray-800 hover:bg-white focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all shadow-sm">
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>
                <Select.Popover className="w-[var(--trigger-width)] bg-white border border-gray-100 rounded-2xl shadow-xl z-50 p-1">
                  <ListBox className="max-h-60 overflow-y-auto py-1">
                    {categories.map((cat) => (
                      <ListBox.Item
                        id={cat}
                        key={cat}
                        textValue={cat}
                        className="flex items-center justify-between px-3 py-2 text-sm text-gray-700 rounded-xl hover:bg-green-50 hover:text-green-700 cursor-pointer transition-colors"
                      >
                        {cat}
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                    ))}
                  </ListBox>
                </Select.Popover>
              </Select>
            </div>

            {/* Price Filter (Min & Max Price) */}
            <div className="lg:col-span-3 md:col-span-6">
              <Label className="text-xs font-bold text-gray-600 mb-1.5 block uppercase tracking-wider">
                Price Range ($)
              </Label>
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <input
                    type="number"
                    min="0"
                    placeholder="Min"
                    value={minPrice}
                    onChange={(e) => handlePriceChange(e.target.value, maxPrice)}
                    className="w-full py-2.5 px-3 text-sm text-gray-800 bg-gray-50/70 border border-gray-200 rounded-2xl focus:bg-white focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all outline-none font-medium placeholder-gray-400"
                  />
                </div>
                <span className="text-gray-400 text-xs font-bold">-</span>
                <div className="relative flex-1">
                  <input
                    type="number"
                    min="0"
                    placeholder="Max"
                    value={maxPrice}
                    onChange={(e) => handlePriceChange(minPrice, e.target.value)}
                    className="w-full py-2.5 px-3 text-sm text-gray-800 bg-gray-50/70 border border-gray-200 rounded-2xl focus:bg-white focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all outline-none font-medium placeholder-gray-400"
                  />
                </div>
              </div>
            </div>

            {/* Sort Select using HeroUI v3 */}
            <div className="lg:col-span-2 md:col-span-6">
              <Select
                className="w-full"
                placeholder="Sort by"
                selectedKey={sortBy}
                onSelectionChange={(key) => {
                  if (key !== null && key !== undefined) {
                    handleSortChange(String(key));
                  }
                }}
              >
                <Label className="text-xs font-bold text-gray-600 mb-1.5 block uppercase tracking-wider">
                  Sort By
                </Label>
                <Select.Trigger className="w-full flex items-center justify-between px-4 py-3 bg-gray-50/70 border border-gray-200 rounded-2xl text-sm font-semibold text-gray-800 hover:bg-white focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all shadow-sm">
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>
                <Select.Popover className="w-[var(--trigger-width)] bg-white border border-gray-100 rounded-2xl shadow-xl z-50 p-1">
                  <ListBox className="py-1">
                    <ListBox.Item
                      id="newest"
                      key="newest"
                      textValue="Newest First"
                      className="flex items-center justify-between px-3 py-2 text-sm text-gray-700 rounded-xl hover:bg-green-50 hover:text-green-700 cursor-pointer transition-colors"
                    >
                      Newest First
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                    <ListBox.Item
                      id="oldest"
                      key="oldest"
                      textValue="Oldest First"
                      className="flex items-center justify-between px-3 py-2 text-sm text-gray-700 rounded-xl hover:bg-green-50 hover:text-green-700 cursor-pointer transition-colors"
                    >
                      Oldest First
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                    <ListBox.Item
                      id="price_asc"
                      key="price_asc"
                      textValue="Price: Low to High"
                      className="flex items-center justify-between px-3 py-2 text-sm text-gray-700 rounded-xl hover:bg-green-50 hover:text-green-700 cursor-pointer transition-colors"
                    >
                      Price: Low to High
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                    <ListBox.Item
                      id="price_desc"
                      key="price_desc"
                      textValue="Price: High to Low"
                      className="flex items-center justify-between px-3 py-2 text-sm text-gray-700 rounded-xl hover:bg-green-50 hover:text-green-700 cursor-pointer transition-colors"
                    >
                      Price: High to Low
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                  </ListBox>
                </Select.Popover>
              </Select>
            </div>
          </div>
        </div>

        {/* Results Counter & Loading Indicator */}
        <div className="flex items-center justify-between mb-6 px-1">
          <p className="text-sm font-medium text-gray-500">
            Showing{" "}
            <span className="font-bold text-gray-800">
              {services.length > 0 ? `${startItem}-${endItem}` : 0}
            </span>{" "}
            of <span className="font-bold text-gray-800">{totalCount}</span> services
          </p>

          {isLoading && (
            <div className="flex items-center gap-2 text-xs font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full border border-green-100">
              <FaSpinner className="animate-spin text-green-600" />
              <span>Fetching from server...</span>
            </div>
          )}
        </div>

        {/* Services Grid - Balanced equal height cards */}
        {services.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch">
            {services.map((service, index) => (
              <div key={service._id || service.id || index} className="h-full">
                <ServiceCard
                  service={service}
                  index={index}
                  isVisible={isVisible}
                  onLike={handleLike}
                  isLiked={likedServices.has(service._id || service.id || "")}
                />
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white rounded-3xl border border-gray-200/80 text-center py-20 px-4 shadow-sm">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400 text-2xl">
              🔍
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No Services Found</h3>
            <p className="text-gray-500 text-sm max-w-md mx-auto mb-6">
              We couldn't find any services matching your criteria. Try adjusting your search or price range filters.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-6 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold text-xs rounded-xl shadow-md hover:from-green-700 hover:to-emerald-700 transition-all cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* HeroUI v3 Pagination */}
        {totalPages > 1 && (
          <Pagination className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 mt-12 pt-6 border-t border-gray-200">
            <Pagination.Summary className="text-sm font-medium text-gray-600">
              Showing <span className="font-semibold text-gray-900">{startItem}</span> to{" "}
              <span className="font-semibold text-gray-900">{endItem}</span> of{" "}
              <span className="font-semibold text-gray-900">{totalCount}</span> services
            </Pagination.Summary>
            <Pagination.Content className="flex items-center gap-1.5">
              <Pagination.Item>
                <Pagination.Previous
                  isDisabled={currentPage === 1 || isLoading}
                  onPress={() => handlePageChange(currentPage - 1)}
                  className="px-4 py-2 rounded-xl text-sm font-medium text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <Pagination.PreviousIcon />
                  <span>Prev</span>
                </Pagination.Previous>
              </Pagination.Item>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <Pagination.Item key={p}>
                  <Pagination.Link
                    isActive={p === currentPage}
                    onPress={() => handlePageChange(p)}
                    className={`w-10 h-10 rounded-xl text-sm font-semibold flex items-center justify-center transition-all cursor-pointer ${
                      p === currentPage
                        ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-md shadow-green-600/20"
                        : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 shadow-sm"
                    }`}
                  >
                    {p}
                  </Pagination.Link>
                </Pagination.Item>
              ))}
              <Pagination.Item>
                <Pagination.Next
                  isDisabled={currentPage === totalPages || isLoading}
                  onPress={() => handlePageChange(currentPage + 1)}
                  className="px-4 py-2 rounded-xl text-sm font-medium text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <span>Next</span>
                  <Pagination.NextIcon />
                </Pagination.Next>
              </Pagination.Item>
            </Pagination.Content>
          </Pagination>
        )}
      </div>
    </section>
  );
};

export default ServicesClient;