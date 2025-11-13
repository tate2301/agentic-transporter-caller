import { AccessToken } from "livekit-server-sdk";

export async function createLiveKitToken(
  roomName: string,
  participantName: string,
  participantMetadata?: string
): Promise<string> {
  const apiKey = process.env.LIVEKIT_API_KEY;
  const apiSecret = process.env.LIVEKIT_API_SECRET;

  if (!apiKey || !apiSecret) {
    throw new Error("LiveKit API credentials not configured");
  }

  const at = new AccessToken(apiKey, apiSecret, {
    identity: participantName,
    metadata: participantMetadata,
  });

  at.addGrant({
    roomJoin: true,
    room: roomName,
    canPublish: true,
    canSubscribe: true,
  });

  return await at.toJwt();
}

export function getLiveKitUrl(): string {
  const url = process.env.LIVEKIT_URL;
  if (!url) {
    throw new Error("LiveKit URL not configured");
  }
  return url;
}
