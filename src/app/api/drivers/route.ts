import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const drivers = await prisma.driver.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(drivers);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch drivers" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, licenseNo } = body;

    const driver = await prisma.driver.create({
      data: {
        name,
        email,
        phone,
        licenseNo,
        status: "available",
      },
    });

    return NextResponse.json(driver, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create driver" }, { status: 500 });
  }
}
