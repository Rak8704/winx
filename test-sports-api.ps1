# Test Sports API Script
Write-Host "Testing The Odds API..." -ForegroundColor Green

# Test 1: Get Sports List
Write-Host "`n1. Testing Sports List Endpoint:" -ForegroundColor Yellow
try {
    $sportsResponse = Invoke-WebRequest -Uri "https://api.the-odds-api.com/v4/sports/?apiKey=f1eff4223b834f8c4f72687c2ea3acdd"
    Write-Host "Status Code: $($sportsResponse.StatusCode)" -ForegroundColor Green
    Write-Host "Response Length: $($sportsResponse.Content.Length) bytes" -ForegroundColor Green
    
    # Parse JSON to count sports
    $sportsData = $sportsResponse.Content | ConvertFrom-Json
    Write-Host "Number of sports available: $($sportsData.Count)" -ForegroundColor Green
    
    # Show first few sports
    Write-Host "Sample sports:" -ForegroundColor Green
    $sportsData[0..4] | ForEach-Object {
        Write-Host "  - $($_.title) ($($_.key))" -ForegroundColor Cyan
    }
}
catch {
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 2: Get NBA Odds
Write-Host "`n2. Testing NBA Odds Endpoint:" -ForegroundColor Yellow
try {
    $nbaResponse = Invoke-WebRequest -Uri "https://api.the-odds-api.com/v4/sports/basketball_nba/odds/?apiKey=f1eff4223b834f8c4f72687c2ea3acdd&regions=us&markets=h2h"
    Write-Host "Status Code: $($nbaResponse.StatusCode)" -ForegroundColor Green
    Write-Host "Response Length: $($nbaResponse.Content.Length) bytes" -ForegroundColor Green
    
    # Parse and show game count
    $nbaData = $nbaResponse.Content | ConvertFrom-Json
    Write-Host "Number of NBA games with odds: $($nbaData.Count)" -ForegroundColor Green
    
    if ($nbaData.Count -gt 0) {
        Write-Host "Sample game: $($nbaData[0].away_team) vs $($nbaData[0].home_team)" -ForegroundColor Cyan
    }
}
catch {
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 3: Get Soccer Odds (EPL)
Write-Host "`n3. Testing Soccer (EPL) Odds Endpoint:" -ForegroundColor Yellow
try {
    $soccerResponse = Invoke-WebRequest -Uri "https://api.the-odds-api.com/v4/sports/soccer_epl/odds/?apiKey=f1eff4223b834f8c4f72687c2ea3acdd&regions=us&markets=h2h"
    Write-Host "Status Code: $($soccerResponse.StatusCode)" -ForegroundColor Green
    Write-Host "Response Length: $($soccerResponse.Content.Length) bytes" -ForegroundColor Green
    
    $soccerData = $soccerResponse.Content | ConvertFrom-Json
    Write-Host "Number of EPL games with odds: $($soccerData.Count)" -ForegroundColor Green
    
    if ($soccerData.Count -gt 0) {
        Write-Host "Sample game: $($soccerData[0].away_team) vs $($soccerData[0].home_team)" -ForegroundColor Cyan
    }
}
catch {
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`nAPI Test Complete!" -ForegroundColor Green
