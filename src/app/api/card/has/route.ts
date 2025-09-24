import { findCurrentUser } from "@/data/user";
import { INTERNAL_SERVER_ERROR } from "@/error";
import { db } from "@/lib/db";

export const GET = async () => {
  try {
    const user = await findCurrentUser();
    if (!user)
      return Response.json({ error: "Refresh the page" }, { status: 401 });

    const hasCardContainer = !!(await db.cardContainer.findFirst({
      where: { userId: user.id },
    }));

    return Response.json({ hasCardContainer }, { status: 200 });
  } catch (error) {
    console.log("CARD FETCH ERROR : ", error);
    return Response.json({ error: INTERNAL_SERVER_ERROR }, { status: 500 });
  }
};
