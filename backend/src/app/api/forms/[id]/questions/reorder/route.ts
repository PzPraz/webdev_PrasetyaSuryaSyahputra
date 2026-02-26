import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { corsHeaders } from "@/lib/cors";
import { getAuthUserId } from "@/lib/request";

// PATCH /api/forms/[id]/questions/reorder — bulk update question order
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id: formId } = await params;
  const userId = getAuthUserId(req);

  if (!userId) {
    return NextResponse.json(
      { message: "Unauthorized." },
      { status: 401, headers: corsHeaders },
    );
  }

  try {
    // Verify form ownership
    const form = await prisma.form.findUnique({
      where: { id: formId },
      select: { ownerId: true },
    });

    if (!form) {
      return NextResponse.json(
        { message: "Form not found." },
        { status: 404, headers: corsHeaders },
      );
    }

    if (form.ownerId !== userId) {
      return NextResponse.json(
        { message: "Forbidden." },
        { status: 403, headers: corsHeaders },
      );
    }

    const body = await req.json();
    const { orderedIds } = body;

    if (!Array.isArray(orderedIds) || orderedIds.length === 0) {
      return NextResponse.json(
        { message: "orderedIds must be a non-empty array." },
        { status: 400, headers: corsHeaders },
      );
    }

    // Update each question's order in a transaction
    await prisma.$transaction(
      orderedIds.map((questionId: string, index: number) =>
        prisma.question.update({
          where: { id: questionId },
          data: { order: index },
        }),
      ),
    );

    // Return updated questions
    const questions = await prisma.question.findMany({
      where: { formId },
      orderBy: { order: "asc" },
    });

    return NextResponse.json(questions, { status: 200, headers: corsHeaders });
  } catch (error) {
    console.error("Reorder questions error:", error);
    return NextResponse.json(
      { message: "Unexpected error." },
      { status: 500, headers: corsHeaders },
    );
  }
}
