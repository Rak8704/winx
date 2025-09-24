import { findCurrentUser } from "@/data/user";
import { INTERNAL_SERVER_ERROR } from "@/error";
import { db } from "@/lib/db";
import { NextRequest } from "next/server";

export const PUT = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const user = await findCurrentUser();
    console.log("USER ", user)
    if (!user)
      return Response.json({ error: "Refresh the page" }, { status: 401 });

    const { id } = await params;
    const { isActive } = await req.json();

    const card = await db.card.findFirst({
      where: { id },
      include: { container: true },
    });
    if (!card)
      return Response.json({ error: "Card Not Found" }, { status: 404 });

    console.log("Container owner ", card.container.userId);
    console.log("User Id ", user.id);

    if (card.container.userId !== user.id)
      return Response.json(
        { error: "You have no Permission to update this card" },
        { status: 403 }
      );

    await db.card.update({ where: { id }, data: { isActive } });

    return Response.json({ message: "Card was Updated" }, { status: 201 });
  } catch (error) {
    console.log("CARD UPDATE ERROR : ", error);
    return Response.json({ error: INTERNAL_SERVER_ERROR }, { status: 500 });
  }
};
