import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  // const session = await getServerSession(authOptions);

  // if (!session) {
  //   return res.status(401).json({ error: "Unauthorized" });
  // }
  try {
    const users = await prisma.user.findMany({ orderBy: { name: "asc" } });

    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
