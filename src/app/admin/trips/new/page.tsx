"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Driver {
  id: string;
  name: string;
}

interface Truck {
  id: string;
  plateNumber: string;
}

interface Route {
  id: string;
  name: string;
}

export default function NewTripPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [trucks, setTrucks] = useState<Truck[]>([]);
  const [routes, setRoutes] = useState<Route[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [driversRes, trucksRes, routesRes] = await Promise.all([
          fetch("/api/drivers"),
          fetch("/api/trucks"),
          fetch("/api/routes"),
        ]);
        
        setDrivers(await driversRes.json());
        setTrucks(await trucksRes.json());
        setRoutes(await routesRes.json());
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    }
    fetchData();
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      driverId: formData.get("driverId"),
      truckId: formData.get("truckId"),
      routeId: formData.get("routeId"),
      scheduledAt: new Date(formData.get("scheduledAt") as string).toISOString(),
    };

    try {
      const response = await fetch("/api/trips", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        router.push("/admin/trips");
        router.refresh();
      } else {
        alert("Failed to create trip");
      }
    } catch (error) {
      alert("An error occurred");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <Link href="/admin/trips" className="text-sm text-primary hover:underline">
            ← Back to Trips
          </Link>
          <h1 className="text-2xl font-bold">Schedule New Trip</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Trip Information</CardTitle>
            <CardDescription>Schedule a new trip for a driver</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="driverId">Driver</Label>
                <select
                  id="driverId"
                  name="driverId"
                  required
                  className="flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="">Select a driver</option>
                  {drivers.map((driver) => (
                    <option key={driver.id} value={driver.id}>
                      {driver.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="truckId">Truck</Label>
                <select
                  id="truckId"
                  name="truckId"
                  required
                  className="flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="">Select a truck</option>
                  {trucks.map((truck) => (
                    <option key={truck.id} value={truck.id}>
                      {truck.plateNumber}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="routeId">Route</Label>
                <select
                  id="routeId"
                  name="routeId"
                  required
                  className="flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="">Select a route</option>
                  {routes.map((route) => (
                    <option key={route.id} value={route.id}>
                      {route.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="scheduledAt">Scheduled Date & Time</Label>
                <Input id="scheduledAt" name="scheduledAt" type="datetime-local" required />
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="submit" disabled={loading}>
                  {loading ? "Creating..." : "Schedule Trip"}
                </Button>
                <Link href="/admin/trips">
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
