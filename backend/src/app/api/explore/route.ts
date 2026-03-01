import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { corsHeaders } from "@/lib/cors";

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders });
}

// GET /api/explore — list all published forms (no auth required)
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search")?.trim() || "";
    const sort = searchParams.get("sort") || "newest";

    const where: Record<string, unknown> = { status: "published" };

    if (search) {
      where.title = { contains: search, mode: "insensitive" };
    }

    const orderBy =
      sort === "oldest"
        ? { updatedAt: "asc" as const }
        : { updatedAt: "desc" as const };

    const forms = await prisma.form.findMany({
      where,
      orderBy,
      select: {
        id: true,
        title: true,
        description: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        owner: { select: { name: true } },
        _count: { select: { questions: true, responses: true } },
      },
    });

    const result = forms.map((f) => ({
      id: f.id,
      title: f.title,
      description: f.description,
      status: f.status,
      createdAt: f.createdAt,
      updatedAt: f.updatedAt,
      ownerName: f.owner.name,
      questionCount: f._count.questions,
      responseCount: f._count.responses,
    }));

    return NextResponse.json(result, { status: 200, headers: corsHeaders });
  } catch (error) {
    console.error("Explore GET error:", error);
    return NextResponse.json(
      { message: "Unexpected error." },
      { status: 500, headers: corsHeaders }
    );
  }
}
