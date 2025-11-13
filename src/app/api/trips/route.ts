import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const trips = await prisma.trip.findMany({
      include: {
        driver: true,
        truck: true,
        route: true,
      },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(trips);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch trips" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { driverId, truckId, routeId, scheduledAt } = body;

    const trip = await prisma.trip.create({
      data: {
        driverId,
        truckId,
        routeId,
        scheduledAt: new Date(scheduledAt),
        status: "scheduled",
      },
      include: {
        driver: true,
        truck: true,
        route: true,
      },
    });

    return NextResponse.json(trip, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create trip" }, { status: 500 });
  }
}
