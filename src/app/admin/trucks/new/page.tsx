"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useState } from "react";

export default function NewTruckPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      plateNumber: formData.get("plateNumber"),
      model: formData.get("model"),
      capacity: parseFloat(formData.get("capacity") as string),
    };

    try {
      const response = await fetch("/api/trucks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        router.push("/admin/trucks");
        router.refresh();
      } else {
        alert("Failed to create truck");
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
          <Link href="/admin/trucks" className="text-sm text-primary hover:underline">
            ← Back to Trucks
          </Link>
          <h1 className="text-2xl font-bold">Add New Truck</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Truck Information</CardTitle>
            <CardDescription>Enter the details of the new truck</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="plateNumber">Plate Number</Label>
                <Input id="plateNumber" name="plateNumber" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="model">Model</Label>
                <Input id="model" name="model" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="capacity">Capacity (tons)</Label>
                <Input id="capacity" name="capacity" type="number" step="0.1" required />
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="submit" disabled={loading}>
                  {loading ? "Creating..." : "Create Truck"}
                </Button>
                <Link href="/admin/trucks">
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
