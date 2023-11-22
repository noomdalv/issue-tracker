import authOptions from "@/app/auth/AuthOptions";
import prisma from "@/prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
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
