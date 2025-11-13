import { NextRequest, NextResponse } from "next/server";
import { createLiveKitToken, getLiveKitUrl } from "@/lib/livekit/token";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { roomName, participantName, metadata } = body;

    if (!roomName || !participantName) {
      return NextResponse.json(
        { error: "Room name and participant name are required" },
        { status: 400 }
      );
    }

    const token = await createLiveKitToken(roomName, participantName, metadata);
    const url = getLiveKitUrl();

    return NextResponse.json({ token, url });
  } catch (error) {
    console.error("Failed to create LiveKit token:", error);
    return NextResponse.json(
      { error: "Failed to create token" },
      { status: 500 }
    );
  }
}
