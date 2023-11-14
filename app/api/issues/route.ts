import { NextRequest, NextResponse } from "next/server";
import z from "zod";
import prisma from "@/prisma/client";

const issueSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().min(1),
  //priority: z.enum(["low", "medium", "high"]),
});

export async function POST(request: NextRequest) {
  const body = await request.json();

  const validatedBody = issueSchema.safeParse(body);

  if (!validatedBody.success) {
    return NextResponse.json(validatedBody.error.errors, { status: 400 });
  }

  const newIssue = await prisma.issue.create({
    data: {
      title: validatedBody.data.title,
      description: validatedBody.data.description,
    },
  });

  return NextResponse.json(newIssue, { status: 201 });
}
