import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const routes = await prisma.route.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(routes);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch routes" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, origin, destination, distance, estimatedDuration } = body;

    const route = await prisma.route.create({
      data: {
        name,
        origin,
        destination,
        distance,
        estimatedDuration,
      },
    });

    return NextResponse.json(route, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create route" }, { status: 500 });
  }
}
