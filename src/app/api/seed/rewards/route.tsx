/* eslint-disable @typescript-eslint/no-unused-vars */
import { INTERNAL_SERVER_ERROR } from "@/error";
import { db } from "@/lib/db";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    await db.invitationRewareds.createMany({
      data: [
        {
          rewardImg:
            "https://res.cloudinary.com/dxs9u7pqc/image/upload/v1746607129/mbuzz88/kdi4ajsyggxdjl8xvyy5.png",
          prize: 30,
          targetReferral: 3,
        },
        {
          rewardImg:
            "https://res.cloudinary.com/dxs9u7pqc/image/upload/v1746607134/mbuzz88/ittgozvoezof3cqbprik.png",
          prize: 40,
          targetReferral: 7,
        },
        {
          rewardImg:
            "https://res.cloudinary.com/dxs9u7pqc/image/upload/v1746607130/mbuzz88/dx7stvyko3gvwvrwgxwx.png",
          prize: 50,
          targetReferral: 12,
        },
        {
          rewardImg:
            "https://res.cloudinary.com/dxs9u7pqc/image/upload/v1746607131/mbuzz88/mqo9muoc3pevb6kff8jb.png",
          prize: 100,
          targetReferral: 20,
        },
        {
          rewardImg:
            "https://res.cloudinary.com/dxs9u7pqc/image/upload/v1746607130/mbuzz88/xrqqj8zdn7dtdwcsn4wd.png",
          prize: 300,
          targetReferral: 50,
        },
        {
          rewardImg:
            "https://res.cloudinary.com/dxs9u7pqc/image/upload/v1746607130/mbuzz88/tf8sa8jbruzzckjljcjg.png",
          prize: 500,
          targetReferral: 100,
        },
      ],
    });
  
    return Response.json({ success: true });
  } catch (error) {
    console.log({ error });
    return Response.json({ error: INTERNAL_SERVER_ERROR });
  }
};
