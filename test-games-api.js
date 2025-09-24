// Test script to check GameXA games API
async function testGamesAPI() {
  console.log('Testing GameXA games API...');
  
  try {
    const response = await fetch('http://localhost:3000/api/gamexa/games?limit=5&status=active', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));
    
    const text = await response.text();
    console.log('Response text (first 500 chars):', text.substring(0, 500));
    
    // Try to parse as JSON
    try {
      const data = JSON.parse(text);
      console.log('Parsed JSON:', data);
      
      if (data.success && data.games) {
        console.log('✅ Games API working! Found', data.games.length, 'games');
      } else {
        console.log('❌ Games API returned success=false or no games');
      }
    } catch (parseError) {
      console.log('❌ Response is not valid JSON');
    }
    
  } catch (error) {
    console.error('❌ API request failed:', error.message);
  }
}

// Run the test
testGamesAPI();
