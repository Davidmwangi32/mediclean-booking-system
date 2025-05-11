
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingCalendar from "@/components/bookings/BookingCalendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download, FileText, FilterIcon, Clock } from "lucide-react";

const Bookings = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, isLoading, navigate]);
  
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="h-10 w-10 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return null; // This will redirect in the useEffect
  }

  const pastBookings = [
    { id: 1, date: "Jan 15, 2025", time: "10:00 AM", wasteType: "General", status: "completed", weight: "28 kg" },
    { id: 2, date: "Jan 08, 2025", time: "2:00 PM", wasteType: "Sharps", status: "completed", weight: "12 kg" },
    { id: 3, date: "Jan 02, 2025", time: "9:30 AM", wasteType: "Pharmaceutical", status: "completed", weight: "15 kg" },
    { id: 4, date: "Dec 27, 2024", time: "11:00 AM", wasteType: "Hazardous", status: "completed", weight: "8 kg" },
    { id: 5, date: "Dec 20, 2024", time: "3:30 PM", wasteType: "General", status: "completed", weight: "32 kg" },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <span className="waste-tag-safe">Completed</span>;
      case "canceled":
        return <span className="waste-tag-hazard">Canceled</span>;
      case "scheduled":
        return <span className="waste-tag-caution">Scheduled</span>;
      default:
        return <span className="waste-tag-safe">Completed</span>;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 py-8">
        <div className="mediclean-container">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="mediclean-heading">Waste Collection Bookings</h1>
              <p className="text-muted-foreground">
                Schedule and manage your waste collection services
              </p>
            </div>
          </div>

          <Tabs defaultValue="schedule">
            <TabsList className="mb-6 w-full sm:w-auto">
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
              <TabsTrigger value="history">Booking History</TabsTrigger>
              <TabsTrigger value="recurring">Recurring Plans</TabsTrigger>
            </TabsList>
            
            <TabsContent value="schedule">
              <BookingCalendar />
            </TabsContent>

            <TabsContent value="history">
              <Card>
                <CardHeader>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                    <div>
                      <CardTitle>Past Collections</CardTitle>
                      <CardDescription>History of your waste collections</CardDescription>
                    </div>
                    <div className="mt-4 sm:mt-0 flex gap-2">
                      <Button variant="outline" size="sm">
                        <FilterIcon className="h-4 w-4 mr-1" />
                        Filter
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-1" />
                        Export
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-secondary/50 border-b">
                            <th className="px-4 py-3 text-left font-medium">Date</th>
                            <th className="px-4 py-3 text-left font-medium">Time</th>
                            <th className="px-4 py-3 text-left font-medium">Waste Type</th>
                            <th className="px-4 py-3 text-left font-medium">Status</th>
                            <th className="px-4 py-3 text-left font-medium">Weight</th>
                            <th className="px-4 py-3 text-left font-medium">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {pastBookings.map((booking) => (
                            <tr key={booking.id} className="border-b last:border-b-0 hover:bg-secondary/20">
                              <td className="px-4 py-3 whitespace-nowrap">{booking.date}</td>
                              <td className="px-4 py-3 whitespace-nowrap">{booking.time}</td>
                              <td className="px-4 py-3 whitespace-nowrap">{booking.wasteType}</td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                {getStatusBadge(booking.status)}
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">{booking.weight}</td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                <Button variant="ghost" size="sm">
                                  <FileText className="h-4 w-4 mr-1" />
                                  Receipt
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="recurring">
              <Card>
                <CardHeader>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                    <div>
                      <CardTitle>Recurring Plans</CardTitle>
                      <CardDescription>Regular collection schedules</CardDescription>
                    </div>
                    <Button className="mt-4 sm:mt-0">
                      Create New Plan
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border rounded-lg p-4 hover:shadow-md transition-all">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-medium">Weekly General Waste</h3>
                          <p className="text-sm text-muted-foreground">Every Monday at 10:00 AM</p>
                        </div>
                        <span className="waste-tag-safe">Active</span>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Clock className="h-4 w-4 mr-1" />
                          Reschedule
                        </Button>
                        <Button variant="outline" size="sm">
                          Pause
                        </Button>
                      </div>
                    </div>

                    <div className="border rounded-lg p-4 hover:shadow-md transition-all">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-medium">Bi-weekly Sharps</h3>
                          <p className="text-sm text-muted-foreground">Every other Friday at 2:00 PM</p>
                        </div>
                        <span className="waste-tag-safe">Active</span>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Clock className="h-4 w-4 mr-1" />
                          Reschedule
                        </Button>
                        <Button variant="outline" size="sm">
                          Pause
                        </Button>
                      </div>
                    </div>

                    <div className="border rounded-lg p-4 hover:shadow-md transition-all">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-medium">Monthly Pharmaceutical</h3>
                          <p className="text-sm text-muted-foreground">First Monday of each month at 9:00 AM</p>
                        </div>
                        <span className="waste-tag-caution">Paused</span>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Clock className="h-4 w-4 mr-1" />
                          Reschedule
                        </Button>
                        <Button variant="outline" size="sm">
                          Resume
                        </Button>
                      </div>
                    </div>

                    <div className="border border-dashed rounded-lg p-4 flex items-center justify-center">
                      <Button variant="ghost">
                        + Add New Recurring Plan
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Bookings;
