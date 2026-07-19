"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaArrowRight,
  FaCalendarAlt,
  FaClock,
  FaUser,
  FaTag,
  FaBookOpen,
  FaNewspaper,
  FaPenFancy,
  FaLightbulb,
  FaTools,
  FaHome,
  FaLeaf,
  FaStar,
} from "react-icons/fa";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  featured?: boolean;
  tags: string[];
}

const BlogSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
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

  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "5 Signs Your AC Needs Immediate Repair",
      excerpt: "Don't wait for a breakdown! Learn the warning signs that indicate your air conditioning system needs professional attention.",
      category: "Maintenance",
      author: "John Anderson",
      date: "Dec 15, 2024",
      readTime: "5 min read",
      image: "https://static.vecteezy.com/system/resources/thumbnails/071/837/068/small/technician-repairing-white-wall-mounted-air-conditioner-in-modern-indoor-setting-free-photo.jpg",
      featured: true,
      tags: ["AC Repair", "Maintenance", "Home Care"],
    },
    {
      id: 2,
      title: "Eco-Friendly Cleaning Tips for Your Home",
      excerpt: "Discover natural and effective ways to keep your home clean without harmful chemicals. Safe for kids and pets!",
      category: "Cleaning",
      author: "Maria Green",
      date: "Dec 12, 2024",
      readTime: "4 min read",
      image: "https://thumbs.dreamstime.com/b/young-woman-cleaning-house-washing-floor-mop-copy-space-111336290.jpg",
      tags: ["Cleaning", "Eco-Friendly", "Home Tips"],
    },
    {
      id: 3,
      title: "How to Choose the Right Tutor for Your Child",
      excerpt: "Finding the perfect tutor can be challenging. Here's a comprehensive guide to help you make the right choice.",
      category: "Education",
      author: "Sarah Mitchell",
      date: "Dec 10, 2024",
      readTime: "6 min read",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlPk4hgFhFKjLt6io3hP31xnuGxpvbUARzV_2ajteXxM0LvKdxkl2cviU&s=10",
      tags: ["Tutoring", "Education", "Parenting"],
    },
    {
      id: 4,
      title: "Preventative Pest Control: Save Your Home",
      excerpt: "Learn how to protect your home from common pests with these preventative measures and early detection tips.",
      category: "Pest Control",
      author: "Robert Chen",
      date: "Dec 8, 2024",
      readTime: "4 min read",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWMtFt8eiE5jBFe1OxjY0qBiKHb6sr9SVZeV_XUC8WUw&s=10",
      tags: ["Pest Control", "Home Safety"],
    },
    {
      id: 5,
      title: "DIY vs Professional Home Painting: What to Know",
      excerpt: "Considering a fresh coat of paint? We break down the pros and cons of DIY versus hiring a professional.",
      category: "Home Improvement",
      author: "Lisa Wong",
      date: "Dec 5, 2024",
      readTime: "7 min read",
      image: "https://media.istockphoto.com/id/1198703852/photo/painter-man-at-work.jpg?s=612x612&w=0&k=20&c=C_QRUjPe2qdqrjpRL2wcWS3ajGmBVB5qVgIXSRsYjgg=",
      tags: ["Painting", "DIY", "Home Improvement"],
    },
    {
      id: 6,
      title: "The Ultimate Guide to Furniture Assembly",
      excerpt: "From IKEA to custom pieces, learn the best practices for assembling furniture without the headaches.",
      category: "Installation",
      author: "Mike Davidson",
      date: "Dec 3, 2024",
      readTime: "5 min read",
      image: "https://img.magnific.com/free-photo/furniture-assembly-worker-standing-reading-instruction-using-tape-measure-worker-tools_482257-24849.jpg?semt=ais_hybrid&w=740&q=80",
      tags: ["Furniture", "Assembly", "DIY"],
    },
  ];

  const categories = [
    "All",
    "Cleaning",
    "Education",
    "Pest Control",
    "Home Improvement",
    "Installation",
  ];

  const filteredPosts =
    activeCategory === "All"
      ? blogPosts
      : blogPosts.filter((post) => post.category === activeCategory);

  const featuredPost = blogPosts.find((post) => post.featured);
  const regularPosts = filteredPosts.filter((post) => !post.featured);

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-gradient-to-b from-white via-gray-50/50 to-white relative overflow-hidden"
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
            <FaNewspaper className="text-green-600" />
            <span className="text-green-700 font-semibold text-sm uppercase tracking-wider">
              Blog & Articles
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
            Latest <span className="text-green-600">Insights</span> & Tips
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Expert advice, tips, and guides to help you maintain your home
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                activeCategory === category
                  ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg shadow-green-500/30 hover:shadow-green-500/50 hover:scale-105"
                  : "bg-white text-gray-700 hover:bg-gray-100 shadow-sm border border-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Featured Post */}
        {featuredPost && activeCategory === "All" && (
          <div
            className={`mb-12 transform transition-all duration-1000 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
            }`}
            style={{ transitionDelay: "100ms" }}
          >
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative h-64 md:h-auto">
                  <Image
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
                      Featured
                    </span>
                  </div>
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                    <FaTag className="text-green-500" />
                    <span>{featuredPost.category}</span>
                    <span className="w-1 h-1 bg-gray-300 rounded-full" />
                    <FaCalendarAlt className="text-green-500" />
                    <span>{featuredPost.date}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 hover:text-green-600 transition-colors">
                    <Link href={`/blog/${featuredPost.id}`}>
                      {featuredPost.title}
                    </Link>
                  </h3>
                  <p className="text-gray-600 mb-4">{featuredPost.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <FaUser className="text-green-500" />
                      <span>{featuredPost.author}</span>
                      <span className="w-1 h-1 bg-gray-300 rounded-full" />
                      <FaClock className="text-green-500" />
                      <span>{featuredPost.readTime}</span>
                    </div>
                    <Link
                      href={`/blog/${featuredPost.id}`}
                      className="inline-flex items-center gap-1 text-sm font-medium text-green-600 hover:text-green-700 transition-colors group"
                    >
                      Read More
                      <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Regular Posts Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {regularPosts.map((post, index) => (
            <div
              key={post.id}
              className={`group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden hover:-translate-y-2 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${(index + 2) * 100}ms` }}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className="bg-green-600/90 text-white text-xs font-medium px-2.5 py-1 rounded-full">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                  <FaCalendarAlt className="text-green-500" />
                  <span>{post.date}</span>
                  <span className="w-1 h-1 bg-gray-300 rounded-full" />
                  <FaClock className="text-green-500" />
                  <span>{post.readTime}</span>
                </div>

                <h3 className="text-base font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors line-clamp-2">
                  <Link href={`/blog/${post.id}`}>{post.title}</Link>
                </h3>

                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <FaUser className="text-green-500 text-[10px]" />
                    <span>{post.author}</span>
                  </div>
                  <Link
                    href={`/blog/${post.id}`}
                    className="inline-flex items-center gap-1 text-sm font-medium text-green-600 hover:text-green-700 transition-colors group/link"
                  >
                    Read
                    <FaArrowRight className="group-hover/link:translate-x-1 transition-transform text-xs" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All CTA */}
        <div
          className={`text-center mt-12 transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
          style={{ transitionDelay: "800ms" }}
        >
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-white text-green-600 font-semibold rounded-full border-2 border-green-600 hover:bg-green-600 hover:text-white transition-all duration-300 hover:shadow-xl hover:shadow-green-500/20 hover:scale-105 cursor-pointer"
          >
            View All Articles
            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;