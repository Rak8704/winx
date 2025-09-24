import { NextRequest } from 'next/server';

const GAMEXA_BASE_URL = 'https://api.gamexaglobal.com';
// Initialize auth token as null - will be set after successful authentication
let authToken: string | null = null;
let lastAuthTime: number = 0; // Initialize as 0 to force initial authentication
const TOKEN_EXPIRY = 3600000; // 1 hour in milliseconds

// Helper function to authenticate and get a token
async function authenticateGameXA() {
  try {
    console.log('Authenticating with GameXA API...');
    
    const loginResponse = await fetch(`${GAMEXA_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Origin': 'https://api.gamexaglobal.com',
        'Referer': 'https://api.gamexaglobal.com/'
      },
      body: JSON.stringify({
        agent_code: process.env.GAMEXA_AGENT_CODE,
        password: process.env.GAMEXA_PASSWORD
      })
    });

    console.log(`GameXA Authentication response: Status ${loginResponse.status}`);
    
    if (!loginResponse.ok) {
      const errorText = await loginResponse.text();
      console.error(`GameXA Authentication failed: Status ${loginResponse.status}`, errorText);
      throw new Error(`Authentication failed with status ${loginResponse.status}: ${errorText}`);
    }

    const data = await loginResponse.json();
    console.log('GameXA Authentication response data:', JSON.stringify(data, null, 2));
    
    if (data && data.token) {
      authToken = data.token;
      lastAuthTime = Date.now();
      console.log('GameXA Authentication successful');
      return data.token;
    } else {
      console.error('No token in response:', data);
      throw new Error('No token received from GameXA API');
    }
  } catch (error) {
    console.error('GameXA Authentication error:', error);
    throw error;
  }
}

// Check if token is expired and needs refresh
function isTokenExpired() {
  return !authToken || (Date.now() - lastAuthTime > TOKEN_EXPIRY);
}

export async function GET(request: NextRequest) {
  // Handle GET requests by routing to appropriate endpoints
  const { pathname, searchParams } = new URL(request.url);
  
  // If it's a games request, handle it here
  if (pathname.includes('/games')) {
    try {
      // Always authenticate for games requests
      if (isTokenExpired()) {
        console.log('Token expired or not present, authenticating...');
        await authenticateGameXA();
      }

      const limit = searchParams.get("limit") || "100";
      const status = searchParams.get("status") || "active";
      const search = searchParams.get("search") || searchParams.get("q") || searchParams.get("query") || "";

      // Build query string with all parameters
      const queryParams = new URLSearchParams({
        limit,
        status,
      });
      
      // Add search parameter if provided
      if (search) {
        queryParams.append("search", search);
      }

      console.log("Fetching games from GameXA with URL:", `${GAMEXA_BASE_URL}/api/games?${queryParams.toString()}`);
      
      const gameRes = await fetch(`${GAMEXA_BASE_URL}/api/games?${queryParams.toString()}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      });

      const text = await gameRes.text();
      const contentType = gameRes.headers.get("content-type");
      console.log("GameXA API response status:", gameRes.status);
      console.log("GameXA API response text:", text);

      // Check if JSON response
      if (!contentType?.includes("application/json")) {
        console.error("Expected JSON but got:", text);
        return Response.json(
          { success: false, error: "Unexpected response from GameXA", raw: text },
          { status: 502 }
        );
      }

      const data = JSON.parse(text);

      return Response.json(
        { success: true, games: data.games || [], pagination: data.pagination || {} },
        { status: 200 }
      );
    } catch (err: any) {
      console.error("Games API Error:", err);
      return Response.json(
        { success: false, error: err.message || "Unexpected error" },
        { status: 500 }
      );
    }
  }
  
  // For other GET requests, return method not allowed
  return Response.json(
    { error: 'GET method not supported for this endpoint' },
    { status: 405 }
  );
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { endpoint, method = 'POST', data, params = {} } = body;
    
    // Always authenticate for login requests, otherwise check if token is expired
    if (endpoint.includes('/auth/login')) {
      console.log('Authenticating for login request...');
      await authenticateGameXA();
    } else if (isTokenExpired()) {
      console.log('Token expired or not present, authenticating...');
      await authenticateGameXA();
    }
    
    // Build the full URL
    const url = new URL(`${GAMEXA_BASE_URL}${endpoint}`);
    
    // Add query parameters if any
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, value as string);
      }
    });

    // Set up headers
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Origin': 'https://api.gamexaglobal.com',
      'Referer': 'https://api.gamexaglobal.com/'
    };
    
    // Add authorization header if token exists and it's not a login request
    if (authToken && !endpoint.includes('/auth/login')) {
      headers['Authorization'] = `Bearer ${authToken}`;
    }

    console.log(`Making ${method} request to ${url.toString()}`);
    console.log(`Request headers:`, JSON.stringify(headers, null, 2));
    if (data) {
      console.log(`Request body:`, JSON.stringify(data, null, 2));
    }
    
    // Make the request to GameXA API
    const response = await fetch(url.toString(), {
      method,
      headers,
      body: method !== 'GET' ? JSON.stringify(data) : undefined,
    });
    
    console.log(`GameXA API response: Status ${response.status}`);
    console.log(`Response headers:`, JSON.stringify(Object.fromEntries(response.headers.entries()), null, 2));

    // Handle different response status codes
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`GameXA API request failed: Status ${response.status}`, errorText);
      
      // Special handling for unauthorized responses
      if (response.status === 401 && !endpoint.includes('/auth/login')) {
        console.log('Token expired, re-authenticating...');
        try {
          await authenticateGameXA();
          
          // Retry the request with new token
          headers['Authorization'] = `Bearer ${authToken}`;
          
          console.log(`Retrying request with new token to ${url.toString()}`);
          console.log(`Retry headers:`, JSON.stringify(headers, null, 2));
          
          const retryResponse = await fetch(url.toString(), {
            method,
            headers,
            body: method !== 'GET' ? JSON.stringify(data) : undefined,
          });
          
          console.log(`GameXA API retry response: Status ${retryResponse.status}`);
          console.log(`Retry response headers:`, JSON.stringify(Object.fromEntries(retryResponse.headers.entries()), null, 2));
          
          if (!retryResponse.ok) {
            const retryErrorText = await retryResponse.text();
            console.error(`GameXA API retry failed: Status ${retryResponse.status}`, retryErrorText);
            return Response.json(
              { error: `Request failed with status ${retryResponse.status}: ${retryErrorText}` },
              { status: retryResponse.status }
            );
          }
          
          const retryData = await retryResponse.json();
          console.log(`Retry response data:`, JSON.stringify(retryData, null, 2));
          console.log(`Retry request successful: ${endpoint}`);
          return Response.json(retryData, { status: retryResponse.status });
        } catch (authError: any) {
          console.error('Re-authentication failed:', authError);
          return Response.json(
            { error: `Authentication failed: ${authError.message || 'Unknown error'}` },
            { status: 401 }
          );
        }
      }
      
      // Return error response for other status codes
      return Response.json(
        { error: `Request failed with status ${response.status}: ${errorText}` },
        { status: response.status }
      );
    }

    const responseData = await response.json();
    console.log(`Response data:`, JSON.stringify(responseData, null, 2));
    
    // Store token if it's a login response
    if (endpoint.includes('/auth/login') && responseData.token) {
      authToken = responseData.token;
      lastAuthTime = Date.now();
    }

    // Return the response
    console.log(`Request successful: ${endpoint}`);
    return Response.json(responseData, {
      status: response.status,
    });
  } catch (error: any) {
    console.error('GameXA Proxy Error:', error);
    return Response.json(
      {
        error: error.message || 'An error occurred while processing your request',
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}
