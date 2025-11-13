import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";

async function getDrivers() {
  return await prisma.driver.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export default async function DriversPage() {
  const drivers = await getDrivers();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <Link href="/" className="text-sm text-primary hover:underline">
                ← Back to Home
              </Link>
              <h1 className="text-2xl font-bold">Manage Drivers</h1>
            </div>
            <Link href="/admin/drivers/new">
              <Button>Add New Driver</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Drivers</CardTitle>
            <CardDescription>View and manage all drivers in the system</CardDescription>
          </CardHeader>
          <CardContent>
            {drivers.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No drivers found. Add your first driver to get started.
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>License No.</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {drivers.map((driver) => (
                    <TableRow key={driver.id}>
                      <TableCell className="font-medium">{driver.name}</TableCell>
                      <TableCell>{driver.email}</TableCell>
                      <TableCell>{driver.phone}</TableCell>
                      <TableCell>{driver.licenseNo}</TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                            driver.status === "available"
                              ? "bg-green-100 text-green-700"
                              : driver.status === "on_trip"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {driver.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Link href={`/admin/drivers/${driver.id}`}>
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
