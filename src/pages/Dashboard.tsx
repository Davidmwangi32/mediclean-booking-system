
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DashboardStats from "@/components/dashboard/DashboardStats";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Calendar as CalendarIcon, MessageCircle, CreditCard, AlertTriangle } from "lucide-react";
import { format } from "date-fns";

const Dashboard = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
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

  const upcomingCollections = [
    { date: "2025-01-28", time: "10:00 AM", wasteType: "General" },
    { date: "2025-01-31", time: "2:00 PM", wasteType: "Sharps" },
    { date: "2025-02-05", time: "9:30 AM", wasteType: "Pharmaceutical" }
  ];

  const recentActivities = [
    { 
      id: 1, 
      type: "collection", 
      description: "Waste collection completed", 
      date: "2025-01-24", 
      details: "32 kg of general waste collected"
    },
    { 
      id: 2, 
      type: "payment", 
      description: "Invoice #INV-2023-124 paid", 
      date: "2025-01-22", 
      details: "$245.00"
    },
    { 
      id: 3, 
      type: "message", 
      description: "New message from Support", 
      date: "2025-01-20", 
      details: "Re: February Schedule"
    },
    { 
      id: 4, 
      type: "alert", 
      description: "Compliance reminder", 
      date: "2025-01-18", 
      details: "Annual report due in 14 days"
    },
  ];
  
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "collection": return <CalendarIcon className="h-4 w-4" />;
      case "payment": return <CreditCard className="h-4 w-4" />;
      case "message": return <MessageCircle className="h-4 w-4" />;
      case "alert": return <AlertTriangle className="h-4 w-4" />;
      default: return <CalendarIcon className="h-4 w-4" />;
    }
  };
  
  const getActivityColor = (type: string) => {
    switch (type) {
      case "collection": return "text-medical-500 bg-medical-100";
      case "payment": return "text-green-500 bg-green-100";
      case "message": return "text-blue-500 bg-blue-100";
      case "alert": return "text-amber-500 bg-amber-100";
      default: return "text-gray-500 bg-gray-100";
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 py-8">
        <div className="mediclean-container">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="mediclean-heading">Dashboard</h1>
              <p className="text-muted-foreground">
                Welcome back, {user?.name}!
              </p>
            </div>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Button variant="outline" asChild>
                <a href="/reports">View Reports</a>
              </Button>
              <Button asChild>
                <a href="/bookings">Schedule Collection</a>
              </Button>
            </div>
          </div>

          <DashboardStats />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Compliance Overview</CardTitle>
                  <CardDescription>Your regulatory compliance status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: "Documentation", value: 100 },
                      { name: "Staff Training", value: 85 },
                      { name: "Waste Segregation", value: 98 },
                      { name: "Storage Requirements", value: 92 },
                    ].map((item) => (
                      <div key={item.name} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">{item.name}</span>
                          <span className="text-sm text-muted-foreground">{item.value}%</span>
                        </div>
                        <Progress value={item.value} />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest actions and updates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity) => (
                      <div key={activity.id} className="flex items-start gap-4 pb-4 border-b last:pb-0 last:border-b-0">
                        <div className={`rounded-full p-2 ${getActivityColor(activity.type)}`}>
                          {getActivityIcon(activity.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <p className="font-medium">{activity.description}</p>
                            <span className="text-xs text-muted-foreground">
                              {format(new Date(activity.date), "MMM d, yyyy")}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">{activity.details}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Collections</CardTitle>
                  <CardDescription>Your scheduled waste pickups</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingCollections.map((collection, i) => (
                      <div 
                        key={i} 
                        className="flex flex-col space-y-2 p-3 rounded-lg border"
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-medium">
                            {format(new Date(collection.date), "EEE, MMM d")}
                          </span>
                          <span className="text-xs bg-medical-100 text-medical-500 px-2 py-1 rounded-full">
                            {collection.wasteType}
                          </span>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <CalendarIcon className="h-3 w-3 mr-1" />
                          <span>{collection.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4" asChild>
                    <a href="/bookings">View All Bookings</a>
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Waste Summary</CardTitle>
                  <CardDescription>This month's waste by category</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { type: "General", amount: "152 kg", percentage: 45 },
                      { type: "Sharps", amount: "87 kg", percentage: 25 },
                      { type: "Pharmaceutical", amount: "63 kg", percentage: 18 },
                      { type: "Hazardous", amount: "40 kg", percentage: 12 },
                    ].map((item, i) => (
                      <div key={i} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">{item.type}</span>
                          <span className="text-sm">{item.amount}</span>
                        </div>
                        <div className="w-full bg-secondary rounded-full h-2">
                          <div
                            className="bg-medical-500 h-2 rounded-full"
                            style={{ width: `${item.percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {item.percentage}% of total waste
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
