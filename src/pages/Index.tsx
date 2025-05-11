
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, ArrowRight, Calendar, FileText, Trash, CreditCard } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WasteCategories from "@/components/waste/WasteCategories";

const Index = () => {
  const features = [
    {
      title: "Efficient Scheduling",
      description: "Book and manage waste collection appointments with an intuitive calendar system",
      icon: <Calendar className="h-6 w-6" />,
    },
    {
      title: "Waste Tracking",
      description: "Track all waste categories and volumes with detailed reporting",
      icon: <Trash className="h-6 w-6" />,
    },
    {
      title: "Compliance Management",
      description: "Stay compliant with all medical waste disposal regulations",
      icon: <FileText className="h-6 w-6" />,
    },
    {
      title: "Simplified Payments",
      description: "Manage invoices and payments through a secure payment portal",
      icon: <CreditCard className="h-6 w-6" />,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-b from-medical-100 to-background overflow-hidden">
          <div className="mediclean-container relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-medical-600 to-medical-400 mb-6">
                Medical Waste Management Made Simple
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8">
                Streamline your medical waste disposal with our comprehensive waste management system designed for healthcare facilities
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild className="px-8">
                  <Link to="/signup">Get Started</Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="px-8">
                  <Link to="/learn-more">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 -z-10 h-full w-1/2 opacity-10">
            <div className="h-full w-full bg-gradient-to-tr from-medical-300 to-medical-500 blur-3xl"></div>
          </div>
        </section>

        {/* Features Section */}
        <section className="mediclean-section">
          <div className="mediclean-container">
            <div className="text-center mb-12">
              <h2 className="mediclean-heading mb-3">Our Features</h2>
              <p className="mediclean-subheading max-w-2xl mx-auto">
                Everything your medical facility needs for efficient waste management
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="mediclean-card">
                  <CardContent className="pt-6">
                    <div className="h-12 w-12 rounded-lg bg-medical-100 text-medical-500 flex items-center justify-center mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Waste Categories Section */}
        <section className="mediclean-section bg-secondary/30">
          <div className="mediclean-container">
            <div className="text-center mb-12">
              <h2 className="mediclean-heading mb-3">Waste Categories We Handle</h2>
              <p className="mediclean-subheading max-w-2xl mx-auto">
                Comprehensive waste management for all medical waste classifications
              </p>
            </div>

            <WasteCategories />
          </div>
        </section>

        {/* How it Works */}
        <section className="mediclean-section">
          <div className="mediclean-container">
            <div className="text-center mb-12">
              <h2 className="mediclean-heading mb-3">How It Works</h2>
              <p className="mediclean-subheading max-w-2xl mx-auto">
                Simple steps to manage your medical waste effectively
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="h-16 w-16 rounded-full bg-medical-100 text-medical-500 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">1</span>
                </div>
                <h3 className="text-xl font-medium mb-2">Create an Account</h3>
                <p className="text-muted-foreground">Register your facility and set up your profile</p>
              </div>
              
              <div className="text-center">
                <div className="h-16 w-16 rounded-full bg-medical-100 text-medical-500 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">2</span>
                </div>
                <h3 className="text-xl font-medium mb-2">Schedule Collection</h3>
                <p className="text-muted-foreground">Book waste pickup times that work for your facility</p>
              </div>
              
              <div className="text-center">
                <div className="h-16 w-16 rounded-full bg-medical-100 text-medical-500 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">3</span>
                </div>
                <h3 className="text-xl font-medium mb-2">Track & Manage</h3>
                <p className="text-muted-foreground">Monitor your waste metrics and maintain compliance</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-medical-500 to-medical-600 text-white">
          <div className="mediclean-container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to streamline your medical waste management?</h2>
              <p className="text-lg md:text-xl mb-8 text-white/90">
                Join hundreds of medical facilities already using our platform
              </p>
              <Button size="lg" variant="secondary" asChild className="px-8">
                <Link to="/signup">
                  Get Started Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Testimonials */}
        <section className="mediclean-section">
          <div className="mediclean-container">
            <div className="text-center mb-12">
              <h2 className="mediclean-heading mb-3">What Our Clients Say</h2>
              <p className="mediclean-subheading max-w-2xl mx-auto">
                Trusted by healthcare facilities nationwide
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  quote: "MediClean has transformed how we handle medical waste. The scheduling system alone has saved us hours each week.",
                  author: "Dr. Michael Chen",
                  role: "Director, City General Hospital"
                },
                {
                  quote: "The compliance tracking features give us peace of mind knowing we're always meeting regulatory requirements.",
                  author: "Sarah Johnson",
                  role: "Compliance Officer, MedStar Clinic"
                },
                {
                  quote: "Intuitive interface and responsive support team. Our staff was able to start using it with minimal training.",
                  author: "Robert Martinez",
                  role: "Office Manager, Family Practice Associates"
                }
              ].map((testimonial, index) => (
                <Card key={index} className="mediclean-card">
                  <CardContent className="pt-6">
                    <div className="mb-4 text-3xl text-medical-400">"</div>
                    <p className="mb-4 italic">{testimonial.quote}</p>
                    <div>
                      <p className="font-medium">{testimonial.author}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
