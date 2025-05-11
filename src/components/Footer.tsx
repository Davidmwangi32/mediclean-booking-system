
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-secondary/50 border-t">
      <div className="container mx-auto py-10 px-4 md:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-medical-400 to-medical-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">MC</span>
              </div>
              <span className="font-bold text-xl text-foreground">MediClean</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              Professional medical waste management solutions for healthcare facilities of all sizes.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold mb-3">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/services/waste-collection" className="text-sm text-muted-foreground hover:text-foreground">
                  Waste Collection
                </Link>
              </li>
              <li>
                <Link to="/services/disposal" className="text-sm text-muted-foreground hover:text-foreground">
                  Disposal Services
                </Link>
              </li>
              <li>
                <Link to="/services/compliance" className="text-sm text-muted-foreground hover:text-foreground">
                  Compliance Management
                </Link>
              </li>
              <li>
                <Link to="/services/training" className="text-sm text-muted-foreground hover:text-foreground">
                  Staff Training
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold mb-3">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/resources/guidelines" className="text-sm text-muted-foreground hover:text-foreground">
                  Guidelines
                </Link>
              </li>
              <li>
                <Link to="/resources/regulations" className="text-sm text-muted-foreground hover:text-foreground">
                  Regulations
                </Link>
              </li>
              <li>
                <Link to="/resources/blog" className="text-sm text-muted-foreground hover:text-foreground">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/resources/faqs" className="text-sm text-muted-foreground hover:text-foreground">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold mb-3">Contact</h3>
            <ul className="space-y-2">
              <li className="text-sm text-muted-foreground">
                support@mediclean.example
              </li>
              <li className="text-sm text-muted-foreground">
                +1 (555) 123-4567
              </li>
              <li className="text-sm text-muted-foreground">
                123 Medical Plaza, Suite 500
                <br />
                San Francisco, CA 94103
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row justify-between items-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} MediClean. All rights reserved.
          </p>
          <div className="flex gap-4 mt-4 sm:mt-0">
            <Link to="/privacy" className="text-xs text-muted-foreground hover:text-foreground">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-xs text-muted-foreground hover:text-foreground">
              Terms of Service
            </Link>
            <Link to="/contact" className="text-xs text-muted-foreground hover:text-foreground">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
