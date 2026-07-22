"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaEye,
  FaSearch,
  FaFilter,
  FaTimes,
  FaArrowLeft,
  FaStar,
  FaCheckCircle,
  FaClock,
  FaDollarSign,
} from "react-icons/fa";
import { Service } from "@/types";

interface MyServicesClientProps {
  services: Service[];
  userId: string;
}

const MyServicesClient = ({ services, userId }: MyServicesClientProps) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [servicesList, setServicesList] = useState<Service[]>(services);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const categories = ["All", "Cleaning", "Repair", "Home Improvement", "Pest Control", "Tutoring", "Installation", "Electrical", "TV Mounting", "Gardening"];

  // Filter services
  const filteredServices = servicesList.filter((service) => {
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.shortDescription.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service? This action cannot be undone.")) {
      return;
    }

    setIsDeleting(id);

    try {
      // Simulate API call - replace with actual delete API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      setServicesList((prev) => prev.filter((service) => service._id !== id));
      toast.success("Service deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete service. Please try again.");
    } finally {
      setIsDeleting(null);
    }
  };

  const handleEdit = (id: string) => {
    router.push(`/services/edit/${id}`);
  };

  const handleView = (id: string) => {
    router.push(`/services/${id}`);
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

  return (
    <div className="min-h-[calc(100vh-6rem)] pt-32 pb-16 bg-gradient-to-b from-white via-gray-50/50 to-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Link href="/" className="p-2 rounded-xl hover:bg-gray-100 transition-colors">
                <FaArrowLeft className="text-gray-600" />
              </Link>
              <h1 className="text-3xl font-bold text-gray-900">My Services</h1>
            </div>
            <p className="text-gray-500">Manage your services</p>
          </div>
          <Link
            href="/add-service"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-green-500/30 hover:shadow-green-500/50 hover:scale-105"
          >
            <FaPlus />
            Add New Service
          </Link>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 pl-11 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all"
            />
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>

          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="px-5 py-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm font-medium text-gray-700"
          >
            <FaFilter className="text-gray-400" />
            Filters
          </button>
        </div>

        {/* Filter Panel */}
        {isFilterOpen && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-6 animate-fadeIn">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Filter Services</h3>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FaTimes />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500/50"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Results Count */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-gray-500">
            Showing <span className="font-semibold text-gray-700">{filteredServices.length}</span> services
          </p>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Service</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredServices.length > 0 ? (
                  filteredServices.map((service) => (
                    <tr key={service._id} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                            <img
                              src={service.imageUrl}
                              alt={service.title}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/48x48?text=Service';
                              }}
                            />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{service.title}</p>
                            <p className="text-xs text-gray-500 line-clamp-1">{service.shortDescription}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getCategoryColor(service.category)}`}>
                          {service.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1 text-sm font-semibold text-gray-900">
                          <FaDollarSign className="text-xs text-gray-400" />
                          {service.price}
                          {service.priceUnit === "hourly" && <span className="text-xs font-normal text-gray-500">/hr</span>}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
                          service.isFeatured 
                            ? "bg-orange-100 text-orange-700" 
                            : "bg-gray-100 text-gray-600"
                        }`}>
                          {service.isFeatured && <FaStar className="text-[10px]" />}
                          {service.isFeatured ? "Featured" : "Standard"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleView(service._id)}
                            className="p-2 cursor-pointer text-gray-400 hover:text-blue-600 transition-colors rounded-lg hover:bg-blue-50"
                            title="View"
                          >
                            <FaEye className="text-sm" />
                          </button>
                          <button
                            onClick={() => handleEdit(service._id)}
                            className="p-2 cursor-pointer text-gray-400 hover:text-green-600 transition-colors rounded-lg hover:bg-green-50"
                            title="Edit"
                          >
                            <FaEdit className="text-sm" />
                          </button>
                          <button
                            onClick={() => handleDelete(service._id)}
                            disabled={isDeleting === service._id}
                            className="p-2 text-gray-400 cursor-pointer hover:text-red-600 transition-colors rounded-lg hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            title="Delete"
                          >
                            {isDeleting === service._id ? (
                              <span className="w-4 h-4 border-2 border-gray-400 border-t-red-600 rounded-full animate-spin block" />
                            ) : (
                              <FaTrash className="text-sm" />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center">
                      <div className="text-4xl mb-3">📋</div>
                      <p className="text-gray-500 font-medium">No services found</p>
                      <p className="text-sm text-gray-400 mt-1">Try adjusting your search or filters</p>
                      <Link
                        href="/add-service"
                        className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-green-50 text-green-600 font-medium rounded-lg hover:bg-green-100 transition-colors"
                      >
                        <FaPlus className="text-sm" />
                        Add Your First Service
                      </Link>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          {filteredServices.length > 0 && (
            <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
              <p className="text-sm text-gray-500">
                Showing {filteredServices.length} of {servicesList.length} services
              </p>
              <div className="flex items-center gap-2">
                <button
                  disabled
                  className="px-3 py-1.5 text-sm text-gray-400 bg-gray-100 rounded-lg cursor-not-allowed"
                >
                  Previous
                </button>
                <span className="px-3 py-1.5 text-sm font-medium text-white bg-green-600 rounded-lg">
                  1
                </span>
                <button
                  disabled
                  className="px-3 py-1.5 text-sm text-gray-400 bg-gray-100 rounded-lg cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default MyServicesClient;