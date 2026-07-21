"use client";

import { AlertDialog, Button } from "@heroui/react";
import { 
  FaCheckCircle, 
  FaTimes, 
  FaEnvelope, 
  FaClock,
  FaArrowRight,
  FaHome,
} from "react-icons/fa";
import Link from "next/link";

interface BookingSuccessModalProps {
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  serviceTitle?: string;
  bookingId?: string;
  estimatedTime?: string;
  onClose?: () => void;
}

export function BookingSuccessModal({
  isOpen,
  onOpenChange,
  serviceTitle,
  bookingId,
  estimatedTime,
  onClose,
}: BookingSuccessModalProps) {
  return (
    <AlertDialog isOpen={isOpen} onOpenChange={onOpenChange}>
      <AlertDialog.Backdrop className="bg-black/60">
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[440px] rounded-2xl overflow-hidden border border-gray-100 shadow-2xl">
            {/* Header with Gradient */}
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-5 relative">
              <AlertDialog.CloseTrigger 
                onClick={onClose} 
                className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors cursor-pointer"
              >
                <FaTimes className="text-lg" />
              </AlertDialog.CloseTrigger>
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 bg-white/20  rounded-2xl flex items-center justify-center animate-bounce">
                  <FaCheckCircle className="text-white text-3xl" />
                </div>
                <div>
                  <AlertDialog.Heading className="text-white text-xl font-bold">
                    Booking Confirmed!
                  </AlertDialog.Heading>
                  <p className="text-white/80 text-sm">Your service is scheduled</p>
                </div>
              </div>
            </div>

            <AlertDialog.Body className="p-6">
              {/* Success Message */}
              <div className="mb-6">
                <p className="text-gray-600 text-sm leading-relaxed">
                  {serviceTitle
                    ? `Your booking for "${serviceTitle}" has been successfully confirmed.`
                    : "Your booking has been successfully confirmed."}
                </p>
                <p className="text-gray-500 text-sm mt-1">
                  We've sent the confirmation details to your email.
                </p>
              </div>

              {/* Booking Details */}
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 mb-6">
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  Booking Details
                </h4>
                <div className="space-y-2.5">
                  {serviceTitle && (
                    <div className="flex items-start justify-between">
                      <span className="text-sm text-gray-500">Service</span>
                      <span className="text-sm font-medium text-gray-900 text-right max-w-[200px]">
                        {serviceTitle}
                      </span>
                    </div>
                  )}
                  {bookingId && (
                    <div className="flex items-start justify-between">
                      <span className="text-sm text-gray-500">Booking ID</span>
                      <span className="text-sm font-mono text-gray-700">
                        #{bookingId}
                      </span>
                    </div>
                  )}
                  {estimatedTime && (
                    <div className="flex items-start justify-between">
                      <span className="text-sm text-gray-500">Estimated Arrival</span>
                      <span className="text-sm font-medium text-gray-700 flex items-center gap-1">
                        <FaClock className="text-green-500 text-xs" />
                        {estimatedTime}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Email Confirmation Note */}
              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <FaEnvelope className="text-green-500 text-lg mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-green-800">
                      Confirmation Email Sent
                    </p>
                    <p className="text-xs text-green-700/80">
                      Check your inbox for the full booking details and next steps.
                    </p>
                  </div>
                </div>
              </div>
            </AlertDialog.Body>

            <AlertDialog.Footer className="px-6 py-4 border-t border-gray-100 flex flex-col sm:flex-row gap-3">
              <Button 
                slot="close" 
                onClick={onClose}
                variant="tertiary" 
                className="flex-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
              >
                <FaTimes className="text-sm" />
                Close
              </Button>
              <Link 
                href="/my-bookings" 
                className="flex-1 px-4 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-green-600/20 hover:shadow-green-600/40 flex items-center justify-center gap-2"
              >
                My Bookings
                <FaArrowRight className="text-sm" />
              </Link>
              {/* <Link 
                href="/" 
                className="flex-1 px-4 py-2.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
              >
                <FaHome className="text-sm" />
                Home
              </Link> */}
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}