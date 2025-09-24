/**
 * Durantopay API Types
 * 
 * AppName: WinXeBet
 * AppKey: ec7eb489-5dc1-4406-919b-418177e2931a22
 * AppSecret: 4368cef6-855b-46ae-8c42-2f86e77c401f22
 * App Address: http://winxebet.com
 */

// Common response structure
export interface DurantoPayResponse<T> {
  status: boolean;
  message: string;
  data: T;
}

// Payment creation request
export interface CreatePaymentRequest {
  invoice_no: string;  // Unique transaction identifier/order_id/invoice_id
  paymentType: string; // Payment method from allowed list (e.g., "bkash")
  amount: string;      // Fixed amount of the payment
}

// Payment creation response
export interface CreatePaymentResponse {
  dp_transaction_id: string;
  payment_url: string;
  transaction_status: string;
}

// Payout request
export interface CreatePayoutRequest {
  invoice_no: string;   // Unique transaction identifier/order_id/invoice_id
  pay_type: string;     // Payment method (e.g., "bkash")
  wallet_number: string; // Wallet number for the payout
  amount: string;       // Fixed amount of the payout
}

// Payout response
export interface CreatePayoutResponse {
  dp_transaction_id: string;
  status: string;
}

// Transaction query response
export interface TransactionQueryResponse {
  dp_transaction_id: string;
  transaction_status: string;
}

// App balance response
export interface AppBalanceResponse {
  app_id: string;
  current_balance: string;
}

// Callback payload
export interface CallbackPayload {
  dp_transaction_id: string;
  invoice_no: string;
  amount: string;
  status: string;
  paymentType: string;
  transaction_time: string;
}

// Available payment systems response
export interface AvailablePaymentSystemsResponse {
  // This would contain the list of available payment systems
  // The exact structure would depend on the API response
  [key: string]: any;
}

// Database models for Durantopay transactions
export interface DurantoPayDeposit {
  id: string;
  invoice_no: string;
  dp_transaction_id: string;
  amount: number;
  paymentType: string;
  status: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface DurantoPayWithdraw {
  id: string;
  invoice_no: string;
  dp_transaction_id: string;
  amount: number;
  pay_type: string;
  wallet_number: string;
  status: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}