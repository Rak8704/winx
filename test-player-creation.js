// Test script to verify player creation in GameXA API
const { createPlayer } = require('./src/lib/api/gamexaApi.ts');

async function testPlayerCreation() {
  console.log('Testing GameXA player creation...');
  
  try {
    const testPlayerData = {
      username: `test_${Date.now()}`,
      email: `test_${Date.now()}@winxebet.com`,
      full_name: `Test User ${Date.now()}`,
      phone: `01700000${Math.floor(Math.random() * 1000)}`,
      currency: "IDR",
      password: "123456",
      locale: "en-US"
    };

    console.log('Creating player with data:', testPlayerData);
    
    const result = await createPlayer(testPlayerData);
    
    console.log('Player creation result:', result);
    
    if (result && (result.player_id || result.id)) {
      console.log('✅ Player creation successful!');
      console.log('Player ID:', result.player_id || result.id);
    } else {
      console.log('❌ Player creation failed - no player ID returned');
    }
    
  } catch (error) {
    console.error('❌ Player creation failed with error:', error.message);
    console.error('Full error:', error);
  }
}

// Run the test
testPlayerCreation();
