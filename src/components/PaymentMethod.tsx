/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Image from "next/image";
import { getPaymentMethodImage, getPaymentMethodLabel } from "@/lib/utils/paymentMethodUtils";

// Wallet type
interface Wallet {
  id: string;
  name: string;
  min_deposit: number;
  max_deposit: number;
  [key: string]: any; // extra fields allowed
}

interface PaymentMethodProps {
  method: Wallet;
  selectedPaymentMethod: Wallet;
  onClick: () => void;
}

const PaymentMethod: React.FC<PaymentMethodProps> = ({
  method,
  selectedPaymentMethod,
  onClick,
}) => {
  const isSelected = selectedPaymentMethod?.id === method.id;

  return (
    <div
      className={`flex-shrink-0 mx-1 cursor-pointer whitespace-nowrap`}
      onClick={onClick}
    >
      <div
        className={`w-24 h-24 rounded-lg border-2 flex flex-col items-center justify-center p-3 transition-all ${
          isSelected ? "border-blue-500 bg-blue-50" : "border-gray-200"
        }`}
      >
        {/* Image of payment method */}
        <div className="relative w-12 h-12">
          <Image
            src={getPaymentMethodImage(method.name)}
            alt={getPaymentMethodLabel(method.name)}
            fill
            className="object-contain"
          />
        </div>

        <span
          className={`mt-2 text-sm font-medium ${
            isSelected ? "text-blue-700" : "text-gray-700"
          }`}
        >
          {getPaymentMethodLabel(method.name)}
        </span>
      </div>
    </div>
  );
};

export default PaymentMethod;
