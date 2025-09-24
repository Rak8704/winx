// src/lib/utils/currency.ts
export function convertBDTToIDR(amount: number): number {
  const exchangeRate = 230; // উদাহরণ: 1 BDT = 230 IDR, তুমি চাইলে ডাইনামিক করতে পারো
  return amount * exchangeRate;
}
