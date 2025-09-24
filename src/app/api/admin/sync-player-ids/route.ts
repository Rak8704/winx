import { NextRequest } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    // Find all users and filter those with mismatched IDs
    const allUsers = await db.user.findMany({
      select: {
        id: true,
        phone: true,
        playerId: true,
        gameXAPlayerId: true
      }
    });

    const usersWithMismatchedIds = allUsers.filter(user => 
      !user.gameXAPlayerId || user.playerId !== user.gameXAPlayerId
    );

    console.log(`Found ${usersWithMismatchedIds.length} users with mismatched player IDs`);

    const syncResults = [];

    for (const user of usersWithMismatchedIds) {
      try {
        // If user has a gameXAPlayerId, use that for both fields
        // If not, use the playerId for both fields
        const correctId = user.gameXAPlayerId || user.playerId;

        await db.user.update({
          where: { id: user.id },
          data: {
            playerId: correctId,
            gameXAPlayerId: correctId
          }
        });

        syncResults.push({
          userId: user.id,
          phone: user.phone,
          oldPlayerId: user.playerId,
          oldGameXAPlayerId: user.gameXAPlayerId,
          newId: correctId,
          status: 'synced'
        });

        console.log(`Synced user ${user.phone}: playerId and gameXAPlayerId both set to ${correctId}`);
      } catch (error) {
        console.error(`Failed to sync user ${user.phone}:`, error);
        syncResults.push({
          userId: user.id,
          phone: user.phone,
          oldPlayerId: user.playerId,
          oldGameXAPlayerId: user.gameXAPlayerId,
          status: 'failed',
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }

    return Response.json({
      success: true,
      message: `Processed ${usersWithMismatchedIds.length} users`,
      results: syncResults,
      summary: {
        total: usersWithMismatchedIds.length,
        synced: syncResults.filter(r => r.status === 'synced').length,
        failed: syncResults.filter(r => r.status === 'failed').length
      }
    });

  } catch (error) {
    console.error("Sync player IDs error:", error);
    return Response.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : "Unknown error" 
      },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    // Just check how many users have mismatched IDs without fixing them
    const allUsers = await db.user.findMany({
      select: {
        id: true,
        phone: true,
        playerId: true,
        gameXAPlayerId: true
      }
    });

    const usersWithMismatchedIds = allUsers.filter(user => 
      !user.gameXAPlayerId || user.playerId !== user.gameXAPlayerId
    );

    return Response.json({
      success: true,
      message: `Found ${usersWithMismatchedIds.length} users with mismatched player IDs`,
      users: usersWithMismatchedIds.map(user => ({
        phone: user.phone,
        playerId: user.playerId,
        gameXAPlayerId: user.gameXAPlayerId,
        needsSync: user.playerId !== user.gameXAPlayerId || !user.gameXAPlayerId
      }))
    });

  } catch (error) {
    console.error("Check player IDs error:", error);
    return Response.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : "Unknown error" 
      },
      { status: 500 }
    );
  }
}
