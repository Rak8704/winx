import { findCurrentUser } from "@/data/user";
import { INTERNAL_SERVER_ERROR } from "@/error";
import { db } from "@/lib/db";

export const GET = async () => {
  try {
    const user = await findCurrentUser();
    console.log("User object in wallet API:", user);

    if (!user) {
      console.log("Authentication failed - no user found");
      return Response.json({ error: "Authentication Failed" }, { status: 401 });
    }

    // Extract user ID from the session object
    const userId = user.id || (user as any)?.sub;
    
    if (!userId) {
      console.log("User ID is missing from user object:", user);
      return Response.json({ error: "User ID is missing" }, { status: 500 });
    }

    console.log("Searching for wallet with userId:", userId);
    
    const wallet = await db.wallet.findUnique({
      where: {
        userId: userId,
      },
    });

    console.log("Wallet found:", wallet);
    
    if (!wallet) {
      console.log("Wallet not found for userId:", userId);
      return Response.json({ error: "Wallet not found" }, { status: 404 });
    }

    return Response.json({ payload: wallet }, { status: 200 });
  } catch (error){
    console.log("Wallet error is this ", error);
    return Response.json({ error: INTERNAL_SERVER_ERROR }, { status: 500 });
  }
};
