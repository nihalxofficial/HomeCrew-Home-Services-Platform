"use client";

import { useState } from "react";
import { AlertDialog, Button } from "@heroui/react";
import { BookingSuccessModal } from "./BookingSuccessModal";
import { 
  FaCalendarCheck, 
  FaArrowRight, 
  FaCheckCircle, 
  FaTimes,
} from "react-icons/fa";

interface BookingModalProps {
  serviceTitle: string;
  servicePrice?: number;
  serviceDuration?: string;
  triggerClassName?: string;
  buttonSize?: "sm" | "md" | "lg";
  onConfirm?: () => void;
}

export const BookingModal = ({
  serviceTitle,
  servicePrice,
  serviceDuration,
  triggerClassName,
  buttonSize = "md",
  onConfirm,
}: BookingModalProps) => {
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    setIsSuccessOpen(true);
  };

  const getButtonSize = () => {
    switch (buttonSize) {
      case "sm":
        return "px-3 py-2 text-xs";
      case "lg":
        return "px-6 py-3.5 text-base";
      default:
        return "px-4 py-2.5 text-sm";
    }
  };

  return (
    <>
      <AlertDialog>
        <Button
          className={
            triggerClassName ||
            `group inline-flex items-center justify-center gap-2 ${getButtonSize()} bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-md shadow-green-600/20 hover:shadow-green-600/40 hover:scale-[1.02]`
          }
        >
          <FaCalendarCheck className="text-sm" />
          Book Now
          <FaArrowRight className="group-hover:translate-x-1 transition-transform text-xs" />
        </Button>

        <AlertDialog.Backdrop className="bg-black/60 ">
          <AlertDialog.Container>
            <AlertDialog.Dialog className="sm:max-w-[440px] rounded-2xl overflow-hidden border border-gray-100 shadow-2xl">
              {/* Header with Gradient */}
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-5 relative">
                <AlertDialog.CloseTrigger className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors cursor-pointer">
                  <FaTimes className="text-lg" />
                </AlertDialog.CloseTrigger>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <FaCheckCircle className="text-white text-2xl" />
                  </div>
                  <div>
                    <AlertDialog.Heading className="text-white text-xl font-bold">
                      Confirm Booking
                    </AlertDialog.Heading>
                    <p className="text-white/80 text-sm">Review your booking details</p>
                  </div>
                </div>
              </div>

              <AlertDialog.Body className="p-6">
                {/* Service Details */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Service Details</h4>
                  <div className="bg-gray-50 rounded-xl p-4 space-y-2.5 border border-gray-100">
                    <div className="flex items-start justify-between">
                      <span className="text-sm text-gray-500">Service</span>
                      <span className="text-sm font-semibold text-gray-900 text-right max-w-[200px]">
                        {serviceTitle}
                      </span>
                    </div>
                    {servicePrice && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Price</span>
                        <span className="text-sm font-semibold text-green-600">
                          ${servicePrice}
                        </span>
                      </div>
                    )}
                    {serviceDuration && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Duration</span>
                        <span className="text-sm text-gray-700">{serviceDuration}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Confirmation Message */}
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <FaCheckCircle className="text-green-500 text-lg mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-green-800">
                        Ready to book?
                      </p>
                      <p className="text-xs text-green-700/80">
                        You'll receive a confirmation email with all the details.
                      </p>
                    </div>
                  </div>
                </div>
              </AlertDialog.Body>

              <AlertDialog.Footer className="px-6 py-4 border-t border-gray-100 flex flex-col sm:flex-row gap-3">
                <Button 
                  slot="close" 
                  variant="tertiary" 
                  className="flex-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-all duration-300"
                >
                  Cancel
                </Button>
                <Button 
                  slot="close" 
                  onPress={handleConfirm}
                  className="flex-1 px-4 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-green-600/20 hover:shadow-green-600/40 flex items-center justify-center gap-2"
                >
                  Confirm Booking
                  <FaArrowRight className="text-sm" />
                </Button>
              </AlertDialog.Footer>
            </AlertDialog.Dialog>
          </AlertDialog.Container>
        </AlertDialog.Backdrop>
      </AlertDialog>

      <BookingSuccessModal
        isOpen={isSuccessOpen}
        onOpenChange={setIsSuccessOpen}
        serviceTitle={serviceTitle}
        onClose={() => setIsSuccessOpen(false)}
      />
    </>
  );
};