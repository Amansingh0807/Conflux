import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: "Customer ID parameter is required" },
        { status: 400 }
      );
    }

    // Fetch customer with related journey events and system flags
    const customer = await prisma.customer.findUnique({
      where: { id },
      include: {
        journeyEvents: {
          orderBy: {
            createdAt: "asc",
          },
        },
        systemFlags: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });

    if (!customer) {
      return NextResponse.json(
        { error: `Customer with ID '${id}' not found` },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: customer }, { status: 200 });
  } catch (error) {
    console.error("GET /api/customer/[id] error:", error);
    return NextResponse.json(
      { error: "Internal Server Error while fetching customer journey data" },
      { status: 500 }
    );
  }
}
