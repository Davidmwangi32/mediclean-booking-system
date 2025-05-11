
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, X, Calendar, FileText, User, Home, BarChart3, MessageCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/", icon: <Home className="h-5 w-5" /> },
    { name: "Dashboard", href: "/dashboard", icon: <BarChart3 className="h-5 w-5" />, authRequired: true },
    { name: "Bookings", href: "/bookings", icon: <Calendar className="h-5 w-5" />, authRequired: true },
    { name: "Messages", href: "/messages", icon: <MessageCircle className="h-5 w-5" />, authRequired: true },
    { name: "Profile", href: "/profile", icon: <User className="h-5 w-5" />, authRequired: true },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-medical-400 to-medical-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">MC</span>
          </div>
          <span className="font-bold text-xl text-foreground">MediClean</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems
            .filter(item => !item.authRequired || isAuthenticated)
            .map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground flex items-center gap-2"
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          {isAuthenticated ? (
            <Button variant="outline" onClick={logout}>
              Log Out
            </Button>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/login">
                <Button variant="outline">Log In</Button>
              </Link>
              <Link to="/signup">
                <Button>Sign Up</Button>
              </Link>
            </div>
          )}
        </nav>
        
        {/* Mobile Navigation */}
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="outline" size="icon" onClick={() => setMobileMenuOpen(true)}>
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[250px] sm:w-[300px]">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between mb-6 mt-2">
                <Link to="/" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-medical-400 to-medical-600 flex items-center justify-center">
                    <span className="text-white font-bold text-sm">MC</span>
                  </div>
                  <span className="font-bold text-xl text-foreground">MediClean</span>
                </Link>
                <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <nav className="flex flex-col gap-4">
                {navItems
                  .filter(item => !item.authRequired || isAuthenticated)
                  .map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-secondary"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.icon}
                      {item.name}
                    </Link>
                  ))}
                {isAuthenticated ? (
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                  >
                    Log Out
                  </Button>
                ) : (
                  <div className="flex flex-col gap-4 mt-4">
                    <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="outline" className="w-full">Log In</Button>
                    </Link>
                    <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                      <Button className="w-full">Sign Up</Button>
                    </Link>
                  </div>
                )}
              </nav>
              <div className="mt-auto text-xs text-muted-foreground py-4">
                {isAuthenticated && user && (
                  <div className="px-3">
                    <p className="font-medium">{user.name}</p>
                    <p>{user.facilityName || "No facility"}</p>
                  </div>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Navbar;
