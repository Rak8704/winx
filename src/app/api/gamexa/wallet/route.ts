import { NextRequest } from 'next/server';
import { launchGame } from '@/lib/api/gamexaApi';

export async function POST(request: NextRequest) {
  try {
    console.log("Testing GameXA game launch with custom lobby URL...");
    
    const body = await request.json();
    const { playerId, gameUid, lobbyUrl } = body;
    
    if (!playerId || !gameUid) {
      return Response.json(
        { 
          success: false,
          error: "playerId and gameUid are required"
        },
        { status: 400 }
      );
    }
    
    // Test launching game with or without lobby URL
    const launchResponse = await launchGame(playerId, gameUid, lobbyUrl);
    
    console.log("GameXA Launch successful:", JSON.stringify(launchResponse, null, 2));
    
    return Response.json({
      success: true,
      message: "GameXA Launch successful",
      data: launchResponse
    });
  } catch (error: any) {
    console.error("GameXA Launch test failed:", error);
    return Response.json(
      { 
        success: false,
        error: error.message || 'An error occurred while testing GameXA game launch',
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}