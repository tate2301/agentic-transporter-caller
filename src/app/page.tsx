import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-primary">Agentic Transporter Caller</h1>
          <p className="text-sm text-muted-foreground">Driver tracking and assistance platform</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Admin Interface</CardTitle>
              <CardDescription>
                Manage drivers, trucks, routes, and trips
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Link href="/admin/drivers">
                  <Button variant="outline" className="w-full justify-start">
                    Manage Drivers
                  </Button>
                </Link>
                <Link href="/admin/trucks">
                  <Button variant="outline" className="w-full justify-start">
                    Manage Trucks
                  </Button>
                </Link>
                <Link href="/admin/routes">
                  <Button variant="outline" className="w-full justify-start">
                    Manage Routes
                  </Button>
                </Link>
                <Link href="/admin/trips">
                  <Button variant="outline" className="w-full justify-start">
                    Manage Trips
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Driver Interface</CardTitle>
              <CardDescription>
                Receive and manage AI-powered assistance calls
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/driver">
                <Button className="w-full">
                  Access Driver Dashboard
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Features</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Real-time driver tracking and status monitoring</li>
                <li>• AI-powered assistance calls using LiveKit and OpenAI Realtime API</li>
                <li>• Scheduled call management for proactive driver support</li>
                <li>• Comprehensive trip management and reporting</li>
                <li>• Fleet and route optimization</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
