import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";
import { format } from "date-fns";

async function getTrips() {
  return await prisma.trip.findMany({
    include: {
      driver: true,
      truck: true,
      route: true,
    },
    orderBy: { createdAt: "desc" },
  });
}

export default async function TripsPage() {
  const trips = await getTrips();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <Link href="/" className="text-sm text-primary hover:underline">
                ← Back to Home
              </Link>
              <h1 className="text-2xl font-bold">Manage Trips</h1>
            </div>
            <Link href="/admin/trips/new">
              <Button>Schedule New Trip</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Trips</CardTitle>
            <CardDescription>View and manage all scheduled trips</CardDescription>
          </CardHeader>
          <CardContent>
            {trips.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No trips found. Schedule your first trip to get started.
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Driver</TableHead>
                    <TableHead>Truck</TableHead>
                    <TableHead>Route</TableHead>
                    <TableHead>Scheduled</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Assistance</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {trips.map((trip) => (
                    <TableRow key={trip.id}>
                      <TableCell className="font-medium">{trip.driver.name}</TableCell>
                      <TableCell>{trip.truck.plateNumber}</TableCell>
                      <TableCell>{trip.route.name}</TableCell>
                      <TableCell>{format(new Date(trip.scheduledAt), "MMM d, yyyy HH:mm")}</TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                            trip.status === "scheduled"
                              ? "bg-yellow-100 text-yellow-700"
                              : trip.status === "in_progress"
                              ? "bg-blue-100 text-blue-700"
                              : trip.status === "completed"
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {trip.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        {trip.needsAssistance && (
                          <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-red-100 text-red-700">
                            Needs Help
                          </span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Link href={`/admin/trips/${trip.id}`}>
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
