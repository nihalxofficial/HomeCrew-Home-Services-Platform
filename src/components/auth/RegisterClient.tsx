"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaArrowRight,
  FaGoogle,
  FaFacebook,
  FaApple,
  FaHome,
  FaUser,
  FaExclamationCircle,
  FaImage,
  FaTimes,
} from "react-icons/fa";
import { authClient } from "@/lib/auth-client";

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  imageUrl: string;
  agreeTerms: boolean;
}

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  imageUrl?: string;
  agreeTerms?: string;
  general?: string;
}

export default function RegisterClient() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSocialLoading, setIsSocialLoading] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    imageUrl: "",
    agreeTerms: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    // Name validation
    if (!formData.name) {
      newErrors.name = "Full name is required";
      isValid = false;
    } else if (formData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
      isValid = false;
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    // Image URL validation (optional)
    if (formData.imageUrl && !/^https?:\/\/.+/.test(formData.imageUrl)) {
      newErrors.imageUrl = "Please enter a valid image URL";
      isValid = false;
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
      isValid = false;
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = "Must contain uppercase, lowercase and number";
      isValid = false;
    }

    // Confirm Password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    // Terms validation
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = "You must agree to the terms and conditions";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }

    if (name === "imageUrl" && value) {
      setImagePreview(value);
    } else if (name === "imageUrl" && !value) {
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const formValues = Object.fromEntries(
        new FormData(e.currentTarget).entries(),
      );

      const { data, error } = await authClient.signUp.email({
        name: formValues.name as string,
        email: formValues.email as string,
        password: formValues.password as string,
        image: formValues.imageUrl as string,
      });

      if (error) {
        toast.error(error.message);
      }
      if (data) {
        toast.success("Account created successfully! 🎉");
        setTimeout(() => {
          router.push("/");
        }, 1500);
      }
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "An error occurred. Please try again later.",
      );
      setErrors({
        general:
          error instanceof Error
            ? error.message
            : "An error occurred. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearImage = () => {
    setFormData((prev) => ({ ...prev, imageUrl: "" }));
    setImagePreview(null);
  };

  // Social Login Functions
  const handleGoogleRegister = async() => {
    await authClient.signIn.social({
      provider: "google",
    });
  };

  const handleFacebookRegister = () => {
    setIsSocialLoading("facebook");
    toast.info("Facebook registration coming soon!");
    setIsSocialLoading(null);
  };

  const handleAppleRegister = () => {
    setIsSocialLoading("apple");
    toast.info("Apple registration coming soon!");
    setIsSocialLoading(null);
  };

  const socialButtons = [
    {
      icon: <FaGoogle />,
      label: "Google",
      onClick: handleGoogleRegister,
      color: "hover:bg-red-50 hover:border-red-200 hover:text-red-600",
    },
    {
      icon: <FaFacebook />,
      label: "Facebook",
      onClick: handleFacebookRegister,
      color: "hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600",
    },
    {
      icon: <FaApple />,
      label: "Apple",
      onClick: handleAppleRegister,
      color: "hover:bg-gray-50 hover:border-gray-300 hover:text-gray-900",
    },
  ];

  return (
    <div className="min-h-[calc(100vh-6rem)] flex items-center justify-center bg-gradient-to-br from-white via-gray-50/50 to-white relative overflow-hidden px-4 pt-20 pb-10">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-green-400/5 rounded-full blur-3xl" />

        <div className="absolute top-20 right-20 w-12 h-12 bg-green-500/20 rounded-full blur-2xl animate-pulse" />
        <div className="absolute bottom-20 left-20 w-16 h-16 bg-emerald-500/20 rounded-full blur-2xl animate-pulse delay-700" />
        <div className="absolute top-1/2 right-1/4 w-10 h-10 bg-green-400/20 rounded-full blur-2xl animate-pulse delay-1000" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-md w-full bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 mx-auto mb-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/30">
            <FaHome className="text-white text-2xl" />
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">
            Create Account
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Join HomeCrew and get started
          </p>
        </div>

        {/* General Error */}
        {errors.general && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2.5">
            <FaExclamationCircle className="text-red-500 text-lg flex-shrink-0" />
            <p className="text-sm text-red-700">{errors.general}</p>
          </div>
        )}

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Row 1: Name & Email */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
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
                  className={`w-full px-3 py-2.5 pl-10 bg-gray-50 border rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all ${
                    errors.name
                      ? "border-red-300 focus:ring-red-500/50 focus:border-red-500"
                      : "border-gray-200"
                  }`}
                />
                <FaUser
                  className={`absolute left-3 top-1/2 -translate-y-1/2 text-sm ${
                    errors.name ? "text-red-400" : "text-gray-400"
                  }`}
                />
              </div>
              {errors.name && (
                <p className="mt-1 text-xs text-red-600">{errors.name}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
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
                  className={`w-full px-3 py-2.5 pl-10 bg-gray-50 border rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all ${
                    errors.email
                      ? "border-red-300 focus:ring-red-500/50 focus:border-red-500"
                      : "border-gray-200"
                  }`}
                />
                <FaEnvelope
                  className={`absolute left-3 top-1/2 -translate-y-1/2 text-sm ${
                    errors.email ? "text-red-400" : "text-gray-400"
                  }`}
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-xs text-red-600">{errors.email}</p>
              )}
            </div>
          </div>

          {/* Row 2: Image URL (Full Row) */}
          <div>
            <label
              htmlFor="imageUrl"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              Profile Image URL{" "}
              <span className="text-gray-400 text-xs">(optional)</span>
            </label>
            <div className="relative">
              <input
                id="imageUrl"
                name="imageUrl"
                type="url"
                value={formData.imageUrl}
                onChange={handleChange}
                placeholder="https://example.com/avatar.jpg"
                className={`w-full px-3 py-2.5 pl-10 pr-10 bg-gray-50 border rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all ${
                  errors.imageUrl
                    ? "border-red-300 focus:ring-red-500/50 focus:border-red-500"
                    : "border-gray-200"
                }`}
              />
              <FaImage
                className={`absolute left-3 top-1/2 -translate-y-1/2 text-sm ${
                  errors.imageUrl ? "text-red-400" : "text-gray-400"
                }`}
              />
              {formData.imageUrl && (
                <button
                  type="button"
                  onClick={handleClearImage}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
                  aria-label="Clear image"
                >
                  <FaTimes className="text-sm" />
                </button>
              )}
            </div>
            {errors.imageUrl && (
              <p className="mt-1 text-xs text-red-600">{errors.imageUrl}</p>
            )}

            {/* Image Preview */}
            {/* {imagePreview && (
              <div className="mt-3 flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-green-200 flex-shrink-0">
                  <Image
                    src={imagePreview}
                    alt="Profile preview"
                    fill
                    className="object-cover"
                    onError={() => {
                      setImagePreview(null);
                      toast.warning("Invalid image URL. Please check the link.");
                    }}
                  />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-medium text-gray-700">Image Preview</p>
                  <p className="text-[10px] text-gray-400 truncate">{imagePreview}</p>
                </div>
                <button
                  type="button"
                  onClick={handleClearImage}
                  className="text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
                  aria-label="Remove image"
                >
                  <FaTimes className="text-sm" />
                </button>
              </div>
            )} */}
          </div>

          {/* Row 3: Password & Confirm Password */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={`w-full px-3 py-2.5 pl-10 pr-10 bg-gray-50 border rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all ${
                    errors.password
                      ? "border-red-300 focus:ring-red-500/50 focus:border-red-500"
                      : "border-gray-200"
                  }`}
                />
                <FaLock
                  className={`absolute left-3 top-1/2 -translate-y-1/2 text-sm ${
                    errors.password ? "text-red-400" : "text-gray-400"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <FaEyeSlash className="text-sm" />
                  ) : (
                    <FaEye className="text-sm" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-xs text-red-600">{errors.password}</p>
              )}
              <p className="mt-1 text-[10px] text-gray-400">
                Include uppercase, lowercase & number
              </p>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={`w-full px-3 py-2.5 pl-10 pr-10 bg-gray-50 border rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all ${
                    errors.confirmPassword
                      ? "border-red-300 focus:ring-red-500/50 focus:border-red-500"
                      : "border-gray-200"
                  }`}
                />
                <FaLock
                  className={`absolute left-3 top-1/2 -translate-y-1/2 text-sm ${
                    errors.confirmPassword ? "text-red-400" : "text-gray-400"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                  aria-label={
                    showConfirmPassword ? "Hide password" : "Show password"
                  }
                >
                  {showConfirmPassword ? (
                    <FaEyeSlash className="text-sm" />
                  ) : (
                    <FaEye className="text-sm" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
          </div>

          {/* Terms & Conditions */}
          <div className="flex items-start gap-2.5">
            <input
              type="checkbox"
              id="agreeTerms"
              name="agreeTerms"
              checked={formData.agreeTerms}
              onChange={handleChange}
              className="w-4 h-4 mt-0.5 rounded border-gray-300 text-green-600 focus:ring-green-500 focus:ring-offset-0 cursor-pointer"
            />
            <label
              htmlFor="agreeTerms"
              className="text-sm text-gray-600 cursor-pointer"
            >
              I agree to the{" "}
              <Link
                href="/terms"
                className="text-green-600 hover:text-green-700 font-medium transition-colors"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="text-green-600 hover:text-green-700 font-medium transition-colors"
              >
                Privacy Policy
              </Link>
            </label>
          </div>
          {errors.agreeTerms && (
            <p className="text-xs text-red-600 -mt-2">{errors.agreeTerms}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 cursor-pointer bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-green-500/30 hover:shadow-green-500/50 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Creating account...
              </>
            ) : (
              <>
                Create Account
                <FaArrowRight className="text-sm" />
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-white px-4 text-gray-500">
              Or continue with
            </span>
          </div>
        </div>

        {/* Social Login */}
        <div className="grid grid-cols-3 gap-2.5 mb-6">
          {socialButtons.map((social, index) => (
            <button
              key={index}
              onClick={social.onClick}
              disabled={!!isSocialLoading}
              className={`flex cursor-pointer items-center justify-center gap-2 px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-600 text-sm font-medium transition-all duration-300 hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed ${social.color}`}
            >
              {isSocialLoading === social.label.toLowerCase() ? (
                <span className="w-4 h-4 border-2 border-gray-400 border-t-gray-600 rounded-full animate-spin" />
              ) : (
                <>
                  {social.icon}
                  {social.label}
                </>
              )}
            </button>
          ))}
        </div>

        {/* Login Link */}
        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-green-600 hover:text-green-700 font-semibold transition-colors"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
