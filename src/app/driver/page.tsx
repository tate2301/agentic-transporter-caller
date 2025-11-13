"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Phone, PhoneOff, AlertCircle } from "lucide-react";

interface Trip {
  id: string;
  status: string;
  needsAssistance: boolean;
  route: {
    name: string;
    origin: string;
    destination: string;
  };
  scheduledAt: string;
}

export default function DriverPage() {
  const [activeTrip, setActiveTrip] = useState<Trip | null>(null);
  const [inCall, setInCall] = useState(false);

  useEffect(() => {
    // In a real application, you would fetch the driver's active trip
    // This is a placeholder for demonstration
  }, []);

  const handleRequestAssistance = async () => {
    if (!activeTrip) return;
    
    try {
      const response = await fetch(`/api/trips/${activeTrip.id}/assistance`, {
        method: "POST",
      });
      
      if (response.ok) {
        alert("Assistance request sent. You will receive a call shortly.");
      }
    } catch (error) {
      alert("Failed to request assistance");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="text-sm text-primary hover:underline">
            ← Back to Home
          </Link>
          <h1 className="text-2xl font-bold">Driver Dashboard</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Active Trip</CardTitle>
              <CardDescription>Your current trip information</CardDescription>
            </CardHeader>
            <CardContent>
              {activeTrip ? (
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Route</p>
                    <p className="font-medium">{activeTrip.route.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">From</p>
                    <p className="font-medium">{activeTrip.route.origin}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">To</p>
                    <p className="font-medium">{activeTrip.route.destination}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                        activeTrip.status === "in_progress"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {activeTrip.status}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No active trip. Check with your dispatcher for your next assignment.
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>AI Assistance</CardTitle>
              <CardDescription>Request help during your trip</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {inCall ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-center p-8 bg-green-100 rounded-lg">
                      <Phone className="h-12 w-12 text-green-600 animate-pulse" />
                    </div>
                    <p className="text-center text-sm text-muted-foreground">
                      Connected to AI assistant
                    </p>
                    <Button
                      variant="destructive"
                      className="w-full"
                      onClick={() => setInCall(false)}
                    >
                      <PhoneOff className="mr-2 h-4 w-4" />
                      End Call
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                        <div className="text-sm text-blue-900">
                          <p className="font-medium mb-1">Need assistance?</p>
                          <p>
                            Request help and receive a call from our AI assistant
                            powered by LiveKit and OpenAI Realtime API.
                          </p>
                        </div>
                      </div>
                    </div>
                    <Button
                      className="w-full"
                      onClick={handleRequestAssistance}
                      disabled={!activeTrip}
                    >
                      <Phone className="mr-2 h-4 w-4" />
                      Request AI Assistance
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Features</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Real-time AI-powered voice assistance</li>
                <li>• Automatic check-ins during trips</li>
                <li>• Emergency support request</li>
                <li>• Trip status updates</li>
                <li>• Navigation assistance</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
