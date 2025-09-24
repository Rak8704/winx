// Test script for GameXA player creation
// Using native fetch (Node.js 18+)

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

async function testGameXAPlayerCreation() {
  console.log("🧪 Testing GameXA Player Creation...\n");

  const testData = {
    username: `test${Date.now()}`,
    email: `test${Date.now()}@winxebet.com`,
    full_name: `Test User ${Date.now()}`,
    phone: `01${Math.floor(Math.random() * 1000000000)}`,
    currency: "IDR",
    password: "testpass123"
  };

  console.log("📤 Sending test data:", JSON.stringify(testData, null, 2));

  try {
    const response = await fetch(`${BASE_URL}/api/gamexa/players`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData)
    });

    const result = await response.json();
    
    console.log("\n📥 Response Status:", response.status);
    console.log("📥 Response Data:", JSON.stringify(result, null, 2));

    // Check if player ID was extracted successfully based on GameXA API documentation
    // GameXA returns: { "message": "Player created successfully", "player": { "id": 1, ... } }
    const gameXAPlayerId =
      result.player?.id?.toString() ||
      result.id?.toString() ||
      result.player_id?.toString() ||
      result.data?.player?.id?.toString() ||
      result.data?.id?.toString() ||
      result.data?.player_id?.toString();

    if (gameXAPlayerId) {
      console.log("\n✅ SUCCESS: GameXA Player ID extracted:", gameXAPlayerId);
    } else {
      console.log("\n❌ FAILED: Could not extract GameXA Player ID");
      console.log("Available keys in response:", Object.keys(result));
      if (result.data) {
        console.log("Available keys in result.data:", Object.keys(result.data));
      }
    }

  } catch (error) {
    console.error("\n❌ ERROR:", error.message);
  }
}

// Run the test
testGameXAPlayerCreation();
