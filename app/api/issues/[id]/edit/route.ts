import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { issueSchema } from "@/app/validationSchema";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();

  const validatedBody = issueSchema.safeParse(body);

  if (!validatedBody.success) {
    return NextResponse.json(validatedBody.error.format(), { status: 400 });
  }

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) {
    return NextResponse.json({ error: "Issue not found" }, { status: 404 });
  }

  const updatedIssue = await prisma.issue.update({
    where: { id: issue.id },
    data: {
      title: validatedBody.data.title,
      description: validatedBody.data.description,
    },
  });

  return NextResponse.json({ updatedIssue }, { status: 200 });
}
