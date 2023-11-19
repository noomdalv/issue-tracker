import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { issueSchema } from "../../validationSchema";

export async function POST(request: NextRequest) {
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

export async function GET() {
  const issues = await prisma.issue.findMany();

  return NextResponse.json(issues, { status: 200 });
}
