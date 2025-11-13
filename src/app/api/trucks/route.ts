import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const trucks = await prisma.truck.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(trucks);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch trucks" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { plateNumber, model, capacity } = body;

    const truck = await prisma.truck.create({
      data: {
        plateNumber,
        model,
        capacity,
        status: "available",
      },
    });

    return NextResponse.json(truck, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create truck" }, { status: 500 });
  }
}
