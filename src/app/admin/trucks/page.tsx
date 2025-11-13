import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";

async function getTrucks() {
  return await prisma.truck.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export default async function TrucksPage() {
  const trucks = await getTrucks();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <Link href="/" className="text-sm text-primary hover:underline">
                ← Back to Home
              </Link>
              <h1 className="text-2xl font-bold">Manage Trucks</h1>
            </div>
            <Link href="/admin/trucks/new">
              <Button>Add New Truck</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Trucks</CardTitle>
            <CardDescription>View and manage all trucks in the fleet</CardDescription>
          </CardHeader>
          <CardContent>
            {trucks.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No trucks found. Add your first truck to get started.
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Plate Number</TableHead>
                    <TableHead>Model</TableHead>
                    <TableHead>Capacity (tons)</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {trucks.map((truck) => (
                    <TableRow key={truck.id}>
                      <TableCell className="font-medium">{truck.plateNumber}</TableCell>
                      <TableCell>{truck.model}</TableCell>
                      <TableCell>{truck.capacity}</TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                            truck.status === "available"
                              ? "bg-green-100 text-green-700"
                              : truck.status === "in_use"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-orange-100 text-orange-700"
                          }`}
                        >
                          {truck.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Link href={`/admin/trucks/${truck.id}`}>
                          <Button variant="outline" size="sm">
                            Edit
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
