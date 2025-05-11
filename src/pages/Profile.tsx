import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { User, Building2, CreditCard, Bell, Mail, Phone, CalendarIcon } from "lucide-react";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    facilityName: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });
  
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/login");
    }
    
    if (user) {
      setProfileData({
        name: user.name,
        email: user.email,
        phone: "555-123-4567", // Mock data
        facilityName: user.facilityName || "",
        address: "123 Medical Plaza", // Mock data
        city: "San Francisco", // Mock data
        state: "CA", // Mock data
        zip: "94103", // Mock data
      });
    }
  }, [isAuthenticated, isLoading, navigate, user]);
  
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
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };
  
  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here would be an API call to update the profile
    toast({
      title: "Profile updated",
      description: "Your profile changes have been saved successfully.",
    });
  };
  
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here would be an API call to update the password
    toast({
      title: "Password updated",
      description: "Your password has been changed successfully.",
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 py-8">
        <div className="mediclean-container">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="mediclean-heading">Profile Settings</h1>
              <p className="text-muted-foreground">
                Manage your account details and preferences
              </p>
            </div>
          </div>

          <Tabs defaultValue="profile">
            <TabsList className="mb-6 w-full sm:w-auto">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="facility">Facility</TabsTrigger>
              <TabsTrigger value="billing">Billing</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Update your personal details</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleProfileSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            name="name"
                            value={profileData.name}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={profileData.email}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone</Label>
                          <Input
                            id="phone"
                            name="phone"
                            value={profileData.phone}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <Button type="submit">Save Changes</Button>
                    </form>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Password</CardTitle>
                    <CardDescription>Update your password</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handlePasswordSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="current-password">Current Password</Label>
                        <Input id="current-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input id="new-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                        <Input id="confirm-password" type="password" />
                      </div>
                      <Button type="submit">Update Password</Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="facility">
              <Card>
                <CardHeader>
                  <CardTitle>Facility Information</CardTitle>
                  <CardDescription>Update your facility details</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="facilityName">Facility Name</Label>
                        <Input
                          id="facilityName"
                          name="facilityName"
                          value={profileData.facilityName}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="address">Street Address</Label>
                        <Input
                          id="address"
                          name="address"
                          value={profileData.address}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          name="city"
                          value={profileData.city}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Input
                          id="state"
                          name="state"
                          value={profileData.state}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="zip">ZIP Code</Label>
                        <Input
                          id="zip"
                          name="zip"
                          value={profileData.zip}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="facility-type">Facility Type</Label>
                      <select
                        id="facility-type"
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="hospital">Hospital</option>
                        <option value="clinic">Medical Clinic</option>
                        <option value="dental">Dental Office</option>
                        <option value="laboratory">Laboratory</option>
                        <option value="pharmacy">Pharmacy</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <Button type="submit">Save Facility Information</Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="billing">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Payment Methods</CardTitle>
                    <CardDescription>Manage your payment options</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="flex items-start gap-4 p-4 rounded-lg border">
                        <CreditCard className="h-10 w-10 text-primary" />
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium">VISA ending in 4242</p>
                              <p className="text-sm text-muted-foreground">
                                Expires 12/2025
                              </p>
                            </div>
                            <span className="text-xs bg-primary/10 text-primary font-medium px-2 py-1 rounded-full">
                              Default
                            </span>
                          </div>
                          <div className="mt-4 flex gap-2">
                            <Button variant="outline" size="sm">Edit</Button>
                            <Button variant="outline" size="sm">Remove</Button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4 p-4 rounded-lg border">
                        <CreditCard className="h-10 w-10 text-muted-foreground" />
                        <div className="flex-1">
                          <div>
                            <p className="font-medium">MasterCard ending in 5678</p>
                            <p className="text-sm text-muted-foreground">
                              Expires 08/2024
                            </p>
                          </div>
                          <div className="mt-4 flex gap-2">
                            <Button variant="outline" size="sm">Edit</Button>
                            <Button variant="outline" size="sm">Remove</Button>
                            <Button variant="outline" size="sm">Make Default</Button>
                          </div>
                        </div>
                      </div>
                      
                      <Button>Add Payment Method</Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Billing Address</CardTitle>
                    <CardDescription>Your billing information</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="font-medium">{profileData.facilityName || profileData.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {profileData.address}
                      <br />
                      {profileData.city}, {profileData.state} {profileData.zip}
                    </p>
                    <Button variant="outline" className="mt-4">
                      Edit Billing Address
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Manage how you receive updates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive notifications via email
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">SMS Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive updates via text message
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="border-t pt-6">
                      <h3 className="text-lg font-medium mb-4">Notification Types</h3>
                      <div className="space-y-4">
                        {[
                          { title: "Collection Reminders", description: "Receive reminders about upcoming waste collections", icon: <CalendarIcon className="h-4 w-4" /> },
                          { title: "Payment Confirmations", description: "Get notified when payments are processed", icon: <CreditCard className="h-4 w-4" /> },
                          { title: "Account Updates", description: "Important updates regarding your account", icon: <User className="h-4 w-4" /> },
                          { title: "Compliance Alerts", description: "Stay informed about regulatory changes", icon: <Bell className="h-4 w-4" /> },
                        ].map((item, i) => (
                          <div key={i} className="flex items-center justify-between">
                            <div className="flex items-start gap-3">
                              <div className="bg-secondary rounded-md p-2">
                                {item.icon}
                              </div>
                              <div className="space-y-0.5">
                                <Label className="text-base">{item.title}</Label>
                                <p className="text-sm text-muted-foreground">
                                  {item.description}
                                </p>
                              </div>
                            </div>
                            <Switch defaultChecked={i !== 3} />
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <Button>Save Notification Preferences</Button>
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

export default Profile;
