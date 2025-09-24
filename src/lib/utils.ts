/* eslint-disable @typescript-eslint/no-explicit-any */
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import crypto from "crypto";

/**
 * Merge Tailwind CSS class names safely
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format number to Bangladeshi Taka currency string
 */
export function formatBDT(amount: number): string {
  return amount.toLocaleString("en-BD", {
    style: "currency",
    currency: "BDT",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

/**
 * Get currency symbol by currency code
 */
export function getCurrencySymbol(currencyCode: string): string | null {
  try {
    const formatter = new Intl.NumberFormat("bn-BD", {
      style: "currency",
      currency: currencyCode,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });

    const parts = formatter.formatToParts(1);
    const symbolPart = parts.find((part) => part.type === "currency");
    return symbolPart?.value || null;
  } catch {
    return null;
  }
}

/**
 * Generate a random 10-character transaction ID
 */
export function generateTrxId(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let trxid = "";
  for (let i = 0; i < 10; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    trxid += chars[randomIndex];
  }
  return trxid;
}

/**
 * Generate MD5 + SHA1 signature for transactions
 */
export function generateSignature(
  accessKey: string,
  privateKey: string,
  transactions: any
): string {
  // Convert transactions object to JSON
  const json = JSON.stringify(transactions);

  // MD5 hash of JSON
  const md5Hash = crypto.createHash("md5").update(json).digest("hex");

  // Combine keys + MD5
  const combined = accessKey + privateKey + md5Hash;

  // SHA1 hash of combined string
  const sha1Signature = crypto
    .createHash("sha1")
    .update(combined)
    .digest("hex");

  return sha1Signature;
}

/**
 * Convert BDT to IDR
 * @param amountInBDT - Amount in BDT
 * @returns Amount in IDR
 */
export function convertBDTToIDR(amountInBDT: number): number {
  // Conversion rate: 1 BDT = 50 IDR (example rate, adjust as needed)
  // You should use a real-time exchange rate API in production
  const conversionRate = 50;
  return Math.round(amountInBDT * conversionRate);
}

/**
 * Convert IDR to BDT
 * @param amountInIDR - Amount in IDR
 * @returns Amount in BDT
 */
export function convertIDRToBDT(amountInIDR: number): number {
  // Conversion rate: 1 IDR = 0.02 BDT (example rate, adjust as needed)
  // You should use a real-time exchange rate API in production
  const conversionRate = 0.02;
  return Math.round(amountInIDR * conversionRate * 100) / 100; // Round to 2 decimal places
}

/**
 * Format amount with currency conversion
 * @param amount - Amount to format
 * @param fromCurrency - Source currency code
 * @param toCurrency - Target currency code
 * @returns Converted amount
 */
export function convertCurrency(amount: number, fromCurrency: string, toCurrency: string): number {
  if (fromCurrency === toCurrency) {
    return amount;
  }
  
  if (fromCurrency === "BDT" && toCurrency === "IDR") {
    return convertBDTToIDR(amount);
  }
  
  if (fromCurrency === "IDR" && toCurrency === "BDT") {
    return convertIDRToBDT(amount);
  }
  
  // For other currency pairs, return the original amount
  // In a production environment, you would implement proper conversion logic
  return amount;
}
