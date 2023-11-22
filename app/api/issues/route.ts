import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { issueSchema } from "../../validationSchema";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/AuthOptions";

export async function GET() {
  const issues = await prisma.issue.findMany();

  return NextResponse.json(issues, { status: 200 });
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  const validatedBody = issueSchema.safeParse(body);

  if (!validatedBody.success) {
    return NextResponse.json(validatedBody.error.format(), { status: 400 });
  }

  const newIssue = await prisma.issue.create({
    data: {
      title: validatedBody.data.title,
      description: validatedBody.data.description,
    },
  });

  return NextResponse.json(newIssue, { status: 201 });
}
