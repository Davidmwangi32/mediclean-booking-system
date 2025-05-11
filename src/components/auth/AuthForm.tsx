
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";

interface AuthFormProps {
  mode: "login" | "signup";
}

const AuthForm: React.FC<AuthFormProps> = ({ mode }) => {
  const { login, signup } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [facilityName, setFacilityName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFacility, setIsFacility] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (mode === "login") {
        await login(email, password);
        toast({
          title: "Login successful",
          description: "Welcome back to MediClean!",
        });
      } else {
        await signup(email, password, name, isFacility ? facilityName : undefined);
        toast({
          title: "Account created successfully",
          description: "Welcome to MediClean!",
        });
      }
      navigate("/dashboard");
    } catch (error) {
      console.error("Auth error:", error);
      toast({
        title: mode === "login" ? "Login failed" : "Signup failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold tracking-tight">
          {mode === "login" ? "Login to your account" : "Create your account"}
        </h1>
        <p className="text-sm text-muted-foreground mt-2">
          {mode === "login" 
            ? "Enter your credentials to access your account" 
            : "Enter your information to create your account"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === "signup" && (
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Dr. Jane Smith"
              required
            />
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@example.com"
            required
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="password">Password</Label>
            {mode === "login" && (
              <a
                href="/forgot-password"
                className="text-xs text-primary hover:text-primary/80"
              >
                Forgot password?
              </a>
            )}
          </div>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {mode === "signup" && (
          <>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="isFacility" 
                checked={isFacility} 
                onCheckedChange={(checked) => setIsFacility(checked === true)}
              />
              <Label htmlFor="isFacility">I represent a medical facility</Label>
            </div>

            {isFacility && (
              <div className="space-y-2">
                <Label htmlFor="facilityName">Facility Name</Label>
                <Input
                  id="facilityName"
                  type="text"
                  value={facilityName}
                  onChange={(e) => setFacilityName(e.target.value)}
                  placeholder="City Medical Center"
                  required={isFacility}
                />
              </div>
            )}
          </>
        )}

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Please wait..." : mode === "login" ? "Login" : "Create Account"}
        </Button>
      </form>

      <div className="text-center text-sm">
        {mode === "login" ? (
          <p>
            Don't have an account?{" "}
            <a href="/signup" className="text-primary hover:text-primary/80 font-medium">
              Sign up
            </a>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <a href="/login" className="text-primary hover:text-primary/80 font-medium">
              Login
            </a>
          </p>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
