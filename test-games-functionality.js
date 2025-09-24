// Test script for GameXA games functionality
// Using native fetch (Node.js 18+)

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

async function testGamesFunctionality() {
  console.log("🎮 Testing GameXA Games Functionality...\n");

  try {
    // Step 1: Test fetching all games
    console.log("📋 Step 1: Fetching all available games...");
    const gamesResponse = await fetch(`${BASE_URL}/api/gamexa/games?limit=100`);
    const gamesData = await gamesResponse.json();
    
    console.log("Games API Status:", gamesResponse.status);
    console.log("Games Count:", gamesData?.games?.length || 0);
    
    if (!gamesData?.games || gamesData.games.length === 0) {
      console.log("❌ No games found!");
      return;
    }

    // Display first few games
    console.log("\n🎯 Sample Games:");
    gamesData.games.slice(0, 5).forEach((game, index) => {
      console.log(`${index + 1}. ${game.game_name} (${game.game_uid}) - Provider: ${game.provider_name}`);
    });

    // Step 2: Test creating a test player
    console.log("\n👤 Step 2: Creating test player...");
    const testPlayerData = {
      username: `testplayer${Date.now()}`,
      email: `testplayer${Date.now()}@winxebet.com`,
      full_name: `Test Player ${Date.now()}`,
      phone: `01${Math.floor(Math.random() * 1000000000)}`,
      currency: "IDR",
      password: "testpass123"
    };

    const playerResponse = await fetch(`${BASE_URL}/api/gamexa/players`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testPlayerData)
    });

    const playerData = await playerResponse.json();
    console.log("Player Creation Status:", playerResponse.status);
    
    // Extract player ID
    const playerId = 
      playerData?.player?.id?.toString() ||
      playerData?.id?.toString() ||
      playerData?.player_id?.toString();

    if (!playerId) {
      console.log("❌ Failed to create test player");
      console.log("Player Response:", JSON.stringify(playerData, null, 2));
      return;
    }

    console.log("✅ Test player created with ID:", playerId);

    // Step 3: Test game launch for different game types
    console.log("\n🚀 Step 3: Testing game launches...");
    
    // Group games by type
    const gamesByType = {};
    gamesData.games.forEach(game => {
      if (!gamesByType[game.game_type]) {
        gamesByType[game.game_type] = [];
      }
      gamesByType[game.game_type].push(game);
    });

    console.log("\nGame Types Available:", Object.keys(gamesByType));

    // Test launching one game from each type
    for (const [gameType, games] of Object.entries(gamesByType)) {
      if (games.length > 0) {
        const testGame = games[0];
        console.log(`\n🎲 Testing ${gameType} game: ${testGame.game_name}`);
        
        try {
          const launchResponse = await fetch(`${BASE_URL}/api/gamexa/games/launch`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              player_id: playerId,
              game_uid: testGame.game_uid,
              lobby_url: "https://casino.gamexaglobal.com"
            })
          });

          const launchData = await launchResponse.json();
          console.log(`Launch Status: ${launchResponse.status}`);
          
          if (launchResponse.ok && launchData.success) {
            console.log(`✅ ${gameType} game launched successfully`);
            console.log(`Game URL: ${launchData.game_launch_url}`);
            console.log(`Session ID: ${launchData.session_id}`);
          } else {
            console.log(`❌ ${gameType} game launch failed`);
            console.log("Error:", launchData.error || launchData.message);
          }
        } catch (error) {
          console.log(`❌ ${gameType} game launch error:`, error.message);
        }
      }
    }

    // Step 4: Test providers
    console.log("\n🏢 Step 4: Testing game providers...");
    const providersResponse = await fetch(`${BASE_URL}/api/gamexa/games/providers`);
    const providersData = await providersResponse.json();
    
    console.log("Providers API Status:", providersResponse.status);
    if (providersData?.providers) {
      console.log("Active Providers:", providersData.providers.length);
      providersData.providers.slice(0, 5).forEach((provider, index) => {
        console.log(`${index + 1}. ${provider.provider_name} (${provider.provider_code}) - ${provider.game_count} games`);
      });
    }

    // Summary
    console.log("\n📊 SUMMARY:");
    console.log(`✅ Total Games: ${gamesData.games.length}`);
    console.log(`✅ Game Types: ${Object.keys(gamesByType).length}`);
    console.log(`✅ Active Providers: ${providersData?.providers?.length || 0}`);
    console.log(`✅ Test Player Created: ${playerId}`);
    console.log("\n🎉 Games functionality test completed!");

  } catch (error) {
    console.error("\n❌ ERROR during games testing:", error.message);
  }
}

// Run the test
testGamesFunctionality();
