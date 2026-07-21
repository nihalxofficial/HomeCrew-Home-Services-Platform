"use client";

import { AlertDialog, Button } from "@heroui/react";
import { FaCalendarCheck, FaArrowRight } from "react-icons/fa";

interface BookingModalProps {
  serviceTitle: string;
  triggerClassName?: string;
  buttonSize?: "sm" | "md" | "lg";
}

export const BookingModal = ({
  serviceTitle,
  triggerClassName,
}: BookingModalProps) => {
  return (
    <AlertDialog>
      <Button
        className={
          triggerClassName ||
          "flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white text-xs font-semibold rounded-xl transition-all duration-300 shadow-md shadow-green-600/20 hover:shadow-green-600/40 hover:scale-[1.01]"
        }
      >
        <FaCalendarCheck className="text-xs" />
        Book Now
        <FaArrowRight className="group-hover:translate-x-1 transition-transform text-[10px]" />
      </Button>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="success" />
              <AlertDialog.Heading>Booking Confirmed!</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p className="text-sm text-gray-600">
                Your booking for <strong className="text-gray-900">{serviceTitle}</strong> has been successfully confirmed. Our service team will reach out to you shortly!
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Close
              </Button>
              <Button slot="close" variant="primary">
                Got it
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
};
