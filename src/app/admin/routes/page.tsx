import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";

async function getRoutes() {
  return await prisma.route.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export default async function RoutesPage() {
  const routes = await getRoutes();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <Link href="/" className="text-sm text-primary hover:underline">
                ← Back to Home
              </Link>
              <h1 className="text-2xl font-bold">Manage Routes</h1>
            </div>
            <Link href="/admin/routes/new">
              <Button>Add New Route</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Routes</CardTitle>
            <CardDescription>View and manage all transportation routes</CardDescription>
          </CardHeader>
          <CardContent>
            {routes.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No routes found. Add your first route to get started.
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Origin</TableHead>
                    <TableHead>Destination</TableHead>
                    <TableHead>Distance (km)</TableHead>
                    <TableHead>Duration (min)</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {routes.map((route) => (
                    <TableRow key={route.id}>
                      <TableCell className="font-medium">{route.name}</TableCell>
                      <TableCell>{route.origin}</TableCell>
                      <TableCell>{route.destination}</TableCell>
                      <TableCell>{route.distance}</TableCell>
                      <TableCell>{route.estimatedDuration}</TableCell>
                      <TableCell>
                        <Link href={`/admin/routes/${route.id}`}>
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
