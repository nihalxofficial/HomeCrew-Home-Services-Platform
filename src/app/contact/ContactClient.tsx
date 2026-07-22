"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaClock,
  FaArrowRight,
  FaHome,
  FaUser,
  FaComment,
  FaPaperPlane,
  FaHeadset,
  FaWhatsapp,
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";

const ContactClient = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const formValues = Object.fromEntries(
        new FormData(e.currentTarget).entries()
      );

      console.log("Contact Form Data:", formValues);

      toast.success("Message sent successfully! 🎉 We'll get back to you soon.");
      setFormData({ name: "", email: "", subject: "", message: "" });
      e.currentTarget.reset();
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <FaEnvelope />,
      title: "Email Us",
      details: "support@homecrew.com",
      sub: "We'll respond within 24 hours",
      href: "mailto:support@homecrew.com",
    },
    {
      icon: <FaPhone />,
      title: "Call Us",
      details: "+1 (800) 123-4567",
      sub: "Mon-Fri 8AM - 8PM EST",
      href: "tel:+18001234567",
    },
    {
      icon: <FaMapMarkerAlt />,
      title: "Visit Us",
      details: "123 Main Street, NY 10001",
      sub: "Come say hello!",
      href: "#",
    },
    {
      icon: <FaClock />,
      title: "Working Hours",
      details: "24/7 Support",
      sub: "We're always here to help",
      href: "#",
    },
  ];

  const socialLinks = [
    { icon: <FaFacebook />, label: "Facebook", href: "https://facebook.com", color: "hover:bg-blue-600 hover:text-white" },
    { icon: <FaTwitter />, label: "Twitter", href: "https://twitter.com", color: "hover:bg-sky-500 hover:text-white" },
    { icon: <FaInstagram />, label: "Instagram", href: "https://instagram.com", color: "hover:bg-pink-600 hover:text-white" },
    { icon: <FaLinkedin />, label: "LinkedIn", href: "https://linkedin.com", color: "hover:bg-blue-700 hover:text-white" },
    { icon: <FaYoutube />, label: "YouTube", href: "https://youtube.com", color: "hover:bg-red-600 hover:text-white" },
    { icon: <FaWhatsapp />, label: "WhatsApp", href: "https://wa.me/18001234567", color: "hover:bg-green-500 hover:text-white" },
  ];

  return (
    <section
      ref={sectionRef}
      className="min-h-[calc(100vh-6rem)] pt-32 pb-16 bg-gradient-to-b from-white via-gray-50/50 to-white relative overflow-hidden"
    >
      {/* Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-400/3 rounded-full blur-3xl" />
        {/* Floating Orbs */}
        <div className="absolute top-32 right-20 w-16 h-16 bg-green-500/10 rounded-full blur-2xl animate-pulse" />
        <div className="absolute bottom-32 left-20 w-20 h-20 bg-emerald-500/10 rounded-full blur-2xl animate-pulse delay-700" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 px-4 py-2 rounded-full mb-6">
            <FaHeadset className="text-green-600" />
            <span className="text-green-700 font-semibold text-sm uppercase tracking-wider">Contact Us</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
            Get in <span className="bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">Touch</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Have questions, feedback, or need assistance? We're here to help. 
            Reach out to us through any of the channels below.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid lg:grid-cols-5 gap-8 mb-16">
          {/* Contact Info - Left Side */}
          <div className="lg:col-span-2 space-y-6">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl flex items-center justify-center text-green-600 text-xl flex-shrink-0">
                    {info.icon}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">{info.title}</h3>
                    {info.href && info.href !== "#" ? (
                      <Link href={info.href} className="text-sm text-gray-600 hover:text-green-600 transition-colors">
                        {info.details}
                      </Link>
                    ) : (
                      <p className="text-sm text-gray-600">{info.details}</p>
                    )}
                    <p className="text-xs text-gray-400">{info.sub}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* Social Links */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Connect With Us</h3>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social, index) => (
                  <Link
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-600 transition-all duration-300 hover:scale-110 ${social.color}`}
                    aria-label={social.label}
                  >
                    {social.icon}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form - Right Side */}
          <div
            className={`lg:col-span-3 bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "400ms" }}
          >
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900">Send Us a Message</h2>
              <p className="text-sm text-gray-500">We'll get back to you as soon as possible</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Full Name
                  </label>
                  <div className="relative">
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                      className="w-full px-3 py-2.5 pl-10 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all"
                    />
                    <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      required
                      className="w-full px-3 py-2.5 pl-10 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all"
                    />
                    <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Subject
                </label>
                <div className="relative">
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What's this about?"
                    required
                    className="w-full px-3 py-2.5 pl-10 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all"
                  />
                  <FaComment className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Message
                </label>
                <div className="relative">
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Tell us how we can help..."
                    required
                    className="w-full px-3 py-2.5 pl-10 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all resize-none"
                  />
                  <FaComment className="absolute left-3 top-4 text-gray-400" />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-green-500/30 hover:shadow-green-500/50 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <FaPaperPlane className="text-sm" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Map Section */}
        <div className="relative rounded-2xl overflow-hidden shadow-xl border border-gray-100 h-64 md:h-80">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.2219901290355!2d-74.00369368400567!3d40.71312937933039!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a316bb7f7c5%3A0xaf0b3f0d6d9b2a5b!2sNew%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="HomeCrew Location"
            className="grayscale hover:grayscale-0 transition-all duration-500"
          />
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/5 via-transparent to-transparent" />
        </div>

        {/* CTA */}
        <div className="mt-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-10 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
          <div className="relative z-10">
            <FaHome className="text-white/20 text-5xl mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-3">Prefer to Browse First?</h2>
            <p className="text-emerald-100/80 mb-6 max-w-md mx-auto">
              Explore our wide range of home services and find the perfect solution for your needs.
            </p>
            <Link
              href="/services"
              className="group inline-flex items-center gap-2 px-8 py-3.5 bg-white text-green-700 font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              Explore Services
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactClient;