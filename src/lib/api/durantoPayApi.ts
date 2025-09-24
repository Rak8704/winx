/**
 * Durantopay API Service
 * 
 * Uses environment variables for configuration:
 * - DURANTOPAY_APP_KEY: The API key for Durantopay
 * - DURANTOPAY_APP_SECRET: The API secret for Durantopay
 * - DURANTOPAY_API_URL: The base URL for the Durantopay API
 */

// Types based on Durantopay API documentation
export interface DurantoPayResponse<T = any> {
  status: number;
  message: string;
  data?: T;
  payment_url?: string;
  dp_transaction_id?: string;
  transaction_status?: string;
}

export interface CreatePaymentRequest {
  invoice_no: string;
  paymentType: string;
  amount: string;
}

export interface CreatePaymentResponse {
  dp_transaction_id?: string;
  payment_url?: string;
  transaction_status?: string;
  transaction_id?: string;
  paymentUrl?: string;
  status?: string;
}

export interface CreatePayoutRequest {
  invoice_no: string;
  pay_type: string;
  wallet_number: string;
  amount: string;
}

export interface CreatePayoutResponse {
  dp_transaction_id: string;
  status: string;
}

export interface TransactionQueryResponse {
  dp_transaction_id: string;
  transaction_status: string;
}

export interface AppBalanceResponse {
  app_id: string;
  current_balance: string;
}

export interface AvailablePaymentSystemsResponse {
  [key: string]: any;
}

// API Constants from environment variables
const BASE_URL = process.env.DURANTOPAY_API_URL || "https://merchant.durantopay.com";
const APP_KEY = process.env.DURANTOPAY_APP_KEY || "";
const APP_SECRET = process.env.DURANTOPAY_APP_SECRET || "";
const APP_ID = process.env.DURANTOPAY_APP_ID || ""; // This should be filled with the actual app ID

// Headers for API requests
const getHeaders = () => ({
  "App-Key": APP_KEY,
  "App-Secret": APP_SECRET,
  "App-Id": APP_ID,
  "Accept": "application/json",
  "Content-Type": "application/json",
});

/**
 * Get available payment systems
 * @returns Promise<DurantoPayResponse<AvailablePaymentSystemsResponse>>
 */
export const getAvailablePaymentSystems = async (): Promise<DurantoPayResponse<AvailablePaymentSystemsResponse>> => {
  try {
    console.log("Getting available payment systems");
    const response = await fetch(`${BASE_URL}/api/v2/ps/transaction/method/available`, {
      method: "GET",
      headers: getHeaders(),
    });

    const responseData = await response.json();
    console.log("Available payment systems response:", responseData);

    if (!response.ok) {
      throw new Error(`Error fetching payment systems: ${response.statusText} - ${responseData.message || 'Unknown error'}`);
    }

    // Transform the response to match our expected format
    return {
      status: responseData.status || 0,
      message: responseData.message || 'Success',
      data: responseData.data || {}
    };
  } catch (error) {
    console.error("Error fetching payment systems:", error);
    throw error;
  }
};

/**
 * Create a payment transaction (deposit)
 * @param data Payment request data
 * @returns Promise<DurantoPayResponse<CreatePaymentResponse>>
 */
export const createPayment = async (
  data: CreatePaymentRequest
): Promise<DurantoPayResponse<CreatePaymentResponse>> => {
  try {
    console.log("Creating Durantopay payment with data:", data);
    const response = await fetch(`${BASE_URL}/api/v2/ps/transaction/create`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(data),
    });

    let responseData;
    try {
      const responseText = await response.text();
      console.log("Durantopay raw response:", responseText);
      console.log("Response status:", response.status);
      console.log("Response headers:", Object.fromEntries(response.headers.entries()));

      try {
        responseData = JSON.parse(responseText);
        console.log("Durantopay parsed response:", responseData);
      } catch (jsonError) {
        console.error("Failed to parse JSON:", jsonError);
        throw new Error(`Invalid JSON response from Durantopay: ${responseText}`);
      }
    } catch (parseError) {
      console.error("Failed to read Durantopay response:", parseError);
      throw new Error(`Failed to read response from Durantopay: ${response.statusText}`);
    }

    if (!response.ok) {
      throw new Error(`Error creating payment: ${response.statusText} - ${responseData?.message || 'Unknown error'}`);
    }

    // Transform the response to match our expected format
    // Durantopay returns {success: true/false} but we expect {status: 0/1}
    try {
      return {
        status: responseData.success ? 0 : 1,
        message: responseData.message || 'Unknown response',
        data: responseData.data || responseData || {},
        payment_url: responseData.data?.payment_url || responseData.payment_url,
        dp_transaction_id: responseData.data?.dp_transaction_id || responseData.dp_transaction_id
      };
    } catch (transformError) {
      console.error("Error transforming response:", transformError, "Raw response:", responseData);
      throw new Error(`Failed to transform Durantopay response: ${transformError}`);
    }
  } catch (error) {
    console.error("Error creating payment:", error);
    throw error;
  }
};

/**
 * Create a payout transaction (withdraw)
 * @param data Payout request data
 * @returns Promise<DurantoPayResponse<CreatePayoutResponse>>
 */
export const createPayout = async (
  data: CreatePayoutRequest
): Promise<DurantoPayResponse<CreatePayoutResponse>> => {
  try {
    console.log("Creating Durantopay payout with data:", data);
    const response = await fetch(`${BASE_URL}/api/v2/ps/payout`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(data),
    });

    const responseData = await response.json();
    console.log("Durantopay payout response:", responseData);

    if (!response.ok) {
      throw new Error(`Error creating payout: ${response.statusText} - ${responseData.message || 'Unknown error'}`);
    }

    // Transform the response to match our expected format
    return {
      status: responseData.status || 0,
      message: responseData.message || 'Unknown response',
      data: responseData.data || {},
      dp_transaction_id: responseData.data?.dp_transaction_id || responseData.dp_transaction_id
    };
  } catch (error) {
    console.error("Error creating payout:", error);
    throw error;
  }
};

/**
 * Query transaction status
 * @param type Transaction type ('payin' or 'payout')
 * @param dpTrxId Durantopay transaction ID
 * @returns Promise<DurantoPayResponse<TransactionQueryResponse>>
 */
export const queryTransaction = async (
  type: "payin" | "payout",
  dpTrxId: string
): Promise<DurantoPayResponse<TransactionQueryResponse>> => {
  try {
    console.log(`Querying ${type} transaction:`, dpTrxId);
    const response = await fetch(`${BASE_URL}/api/dp/app/query/${type}/${dpTrxId}`, {
      method: "GET",
      headers: getHeaders(),
    });

    const responseData = await response.json();
    console.log("Transaction query response:", responseData);

    if (!response.ok) {
      throw new Error(`Error querying transaction: ${response.statusText} - ${responseData.message || 'Unknown error'}`);
    }

    // Transform the response to match our expected format
    return {
      status: responseData.status || 0,
      message: responseData.message || 'Success',
      data: responseData.data || {}
    };
  } catch (error) {
    console.error("Error querying transaction:", error);
    throw error;
  }
};

/**
 * Get app balance
 * @returns Promise<DurantoPayResponse<AppBalanceResponse>>
 */
export const getAppBalance = async (): Promise<DurantoPayResponse<AppBalanceResponse>> => {
  try {
    console.log("Getting app balance for app ID:", APP_ID);
    const response = await fetch(`${BASE_URL}/api/dp/app/balance/${APP_ID}`, {
      method: "GET",
      headers: getHeaders(),
    });

    const responseData = await response.json();
    console.log("App balance response:", responseData);

    if (!response.ok) {
      throw new Error(`Error fetching app balance: ${response.statusText} - ${responseData.message || 'Unknown error'}`);
    }

    // Transform the response to match our expected format
    return {
      status: responseData.status || 0,
      message: responseData.message || 'Success',
      data: responseData.data || {}
    };
  } catch (error) {
    console.error("Error fetching app balance:", error);
    throw error;
  }
};

/**
 * Generate a unique invoice number
 * @returns string
 */
export const generateInvoiceNumber = (): string => {
  const timestamp = Date.now().toString();
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `INV_${timestamp}_${random}`;
};