"use client";

import Link from "next/link";
import {
  FaHome,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaArrowRight,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaCheckCircle,
} from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "About Us", href: "/about" },
    { name: "All-Services", href: "/all-services" },
    { name: "How It Works", href: "/how-it-works" },
    { name: "For Pros", href: "/for-pros" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  const serviceLinks = [
    { name: "Home Cleaning", href: "/services/cleaning" },
    { name: "AC Repair", href: "/services/ac-repair" },
    { name: "Pest Control", href: "/services/pest-control" },
    { name: "Interior Painting", href: "/services/painting" },
    { name: "Tutoring", href: "/services/tutoring" },
    { name: "Furniture Assembly", href: "/services/assembly" },
  ];

  const supportLinks = [
    { name: "Help Center", href: "/help" },
    { name: "FAQ", href: "/faq" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Refund Policy", href: "/refund" },
    { name: "Cookie Policy", href: "/cookies" },
  ];

  const socialLinks = [
    { icon: <FaFacebook />, href: "https://facebook.com", label: "Facebook" },
    { icon: <FaTwitter />, href: "https://twitter.com", label: "Twitter" },
    { icon: <FaInstagram />, href: "https://instagram.com", label: "Instagram" },
    { icon: <FaLinkedin />, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: <FaYoutube />, href: "https://youtube.com", label: "YouTube" },
  ];

  const contactInfo = [
    { icon: <FaPhone />, text: "+1 (800) 123-4567", href: "tel:+18001234567" },
    { icon: <FaEnvelope />, text: "support@homecrew.com", href: "mailto:support@homecrew.com" },
    { icon: <FaMapMarkerAlt />, text: "123 Main St, New York, NY 10001" },
    { icon: <FaClock />, text: "Mon - Fri: 8:00 AM - 8:00 PM" },
  ];

  return (
    <footer className="bg-gray-900 text-white/80 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
      </div>

      {/* Main Footer */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center text-white text-lg shadow-lg shadow-green-500/30 group-hover:scale-110 transition-transform duration-300">
                <FaHome />
              </div>
              <span className="font-bold text-xl text-white">
                Home<span className="text-green-400">Crew</span>
              </span>
            </Link>
            <p className="text-sm text-white/60 leading-relaxed max-w-xs">
              Your trusted platform for booking professional home services. 
              From cleaning to repairs, we&apos;ve got you covered.
            </p>
            <div className="flex items-center gap-2 text-sm">
              <FaCheckCircle className="text-green-400" />
              <span className="text-white/70">12,000+ happy customers</span>
            </div>
            <div className="flex gap-3 pt-2">
              {socialLinks.map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-green-500/20 text-white/60 hover:text-green-400 flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-green-400 transition-colors duration-200 flex items-center gap-1 group"
                  >
                    <span className="w-0 group-hover:w-3 h-0.5 bg-green-400 transition-all duration-200" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Our Services
            </h3>
            <ul className="space-y-2.5">
              {serviceLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-green-400 transition-colors duration-200 flex items-center gap-1 group"
                  >
                    <span className="w-0 group-hover:w-3 h-0.5 bg-green-400 transition-all duration-200" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Get In Touch
            </h3>
            <ul className="space-y-3 mb-4">
              {contactInfo.map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-sm text-white/60">
                  <span className="text-green-400 mt-0.5">{item.icon}</span>
                  {item.href ? (
                    <Link href={item.href} className="hover:text-green-400 transition-colors">
                      {item.text}
                    </Link>
                  ) : (
                    <span>{item.text}</span>
                  )}
                </li>
              ))}
            </ul>

            {/* Newsletter Signup */}
            <div className="mt-4">
              <p className="text-sm text-white/60 mb-2">Subscribe to our newsletter</p>
              <form className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 bg-white/10 border border-white/10 rounded-lg text-white placeholder-white/40 text-sm focus:outline-none focus:border-green-400/50 transition-colors min-w-0"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-lg transition-all duration-300 hover:scale-105 flex-shrink-0"
                >
                  <FaArrowRight />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-white/40">
            &copy; {currentYear} HomeCrew. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-6 text-sm">
            {supportLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="text-white/40 hover:text-green-400 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;