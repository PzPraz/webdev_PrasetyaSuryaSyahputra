import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserFromRequest } from "@/lib/auth";
import { corsHeaders } from "@/lib/cors";
import { isValidObjectId } from "@/lib/request";

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders });
}

// POST /api/forms/[id]/questions - Create question
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getUserFromRequest(request);
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401, headers: corsHeaders });
    }

    const { id: formId } = await params;
    if (!formId || !isValidObjectId(formId)) {
      return NextResponse.json(
        { message: "Invalid form ID." },
        { status: 400, headers: corsHeaders }
      );
    }
    const body = await request.json();
    const { type, title, required, order, options, allowMultiple, labelMin, labelMax } = body;

    // Verify form ownership
    const form = await prisma.form.findUnique({
      where: { id: formId },
      select: { ownerId: true },
    });

    if (!form) {
      return NextResponse.json({ message: "Form not found" }, { status: 404, headers: corsHeaders });
    }

    if (form.ownerId !== user.userId) {
      return NextResponse.json(
        { message: "Not authorized to add questions to this form" },
        { status: 403, headers: corsHeaders }
      );
    }

    // Block adding questions if form already has responses
    const responseCount = await prisma.response.count({ where: { formId } });
    if (responseCount > 0) {
      return NextResponse.json(
        { message: "Tidak dapat menambah pertanyaan karena form sudah memiliki respons." },
        { status: 400, headers: corsHeaders }
      );
    }

    // Validate question type
    const validTypes = [
      "short_answer",
      "long_answer",
      "multiple_choice",
      "multiple_choice_dropdown",
      "page_break",
      "text_block",
      "linear_scale",
      "star_rating",
      "date_picker"
    ];

    if (!validTypes.includes(type)) {
      return NextResponse.json(
        { message: "Invalid question type" },
        { status: 400, headers: corsHeaders }
      );
    }

    // Create question
    const question = await prisma.question.create({
      data: {
        formId,
        type,
        title: title || "",
        required: required ?? false,
        order: order ?? 0,
        options: options || [],
        allowMultiple: allowMultiple ?? false,
        labelMin: type === "linear_scale" ? (labelMin ?? null) : null,
        labelMax: type === "linear_scale" ? (labelMax ?? null) : null,
      },
    });

    return NextResponse.json(question, { status: 201, headers: corsHeaders });
  } catch (error) {
    console.error("Create question error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500, headers: corsHeaders }
    );
  }
}

// GET /api/forms/[id]/questions - List questions (for convenience)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getUserFromRequest(request);
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401, headers: corsHeaders });
    }

    const { id: formId } = await params;
    if (!formId || !isValidObjectId(formId)) {
      return NextResponse.json(
        { message: "Invalid form ID." },
        { status: 400, headers: corsHeaders }
      );
    }

    // Verify form access
    const form = await prisma.form.findUnique({
      where: { id: formId },
      select: { ownerId: true },
    });

    if (!form) {
      return NextResponse.json({ message: "Form not found" }, { status: 404, headers: corsHeaders });
    }

    if (form.ownerId !== user.userId) {
      return NextResponse.json(
        { message: "Not authorized to view this form" },
        { status: 403, headers: corsHeaders }
      );
    }

    // Get questions
    const questions = await prisma.question.findMany({
      where: { formId },
      orderBy: { order: "asc" },
    });

    return NextResponse.json(questions, { headers: corsHeaders });
  } catch (error) {
    console.error("Get questions error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500, headers: corsHeaders }
    );
  }
}
