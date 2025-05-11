
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Droplet,
  Tablets,
  Syringe,
  FileText,
  AlertTriangle,
  Flask,
  VirusIcon,
  RadioIcon,
} from "lucide-react";

interface WasteCategoryProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: "safe" | "caution" | "hazard";
  examples: string[];
  guidelines: string;
}

const WasteCategory: React.FC<WasteCategoryProps> = ({
  title,
  description,
  icon,
  color,
  examples,
  guidelines,
}) => {
  const colorClasses = {
    safe: "bg-waste-safe/10 text-waste-safe border-waste-safe/20",
    caution: "bg-waste-caution/10 text-waste-caution border-waste-caution/20",
    hazard: "bg-waste-hazard/10 text-waste-hazard border-waste-hazard/20",
  };

  return (
    <Card className="overflow-hidden border-l-4 hover:shadow-md transition-all" style={{ borderLeftColor: `var(--waste-${color})` }}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription className="mt-1">{description}</CardDescription>
          </div>
          <div className={`h-10 w-10 rounded-full ${colorClasses[color]} flex items-center justify-center`}>
            {icon}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium mb-2">Examples</h4>
            <div className="flex flex-wrap gap-2">
              {examples.map((example, i) => (
                <Badge key={i} variant="outline">
                  {example}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium mb-1">Guidelines</h4>
            <p className="text-sm text-muted-foreground">{guidelines}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className={`w-full py-2 px-3 rounded-md text-xs ${colorClasses[color]} flex items-center gap-2`}>
          <AlertTriangle className="h-4 w-4" />
          <span>
            {color === "safe" && "Low risk - Standard protocols apply"}
            {color === "caution" && "Medium risk - Special handling required"}
            {color === "hazard" && "High risk - Strict protocols must be followed"}
          </span>
        </div>
      </CardFooter>
    </Card>
  );
};

const WasteCategories = () => {
  const categories: WasteCategoryProps[] = [
    {
      title: "General Medical Waste",
      description: "Non-hazardous healthcare waste similar to regular waste",
      icon: <Droplet className="h-5 w-5" />,
      color: "safe",
      examples: ["Paper", "Packaging", "Non-soiled items", "Masks", "Gloves"],
      guidelines: "Can be disposed of with regular waste following standard sanitation protocols. Should be placed in clear or white bags."
    },
    {
      title: "Infectious Waste",
      description: "Materials contaminated with blood and other bodily fluids",
      icon: <VirusIcon className="h-5 w-5" />,
      color: "caution",
      examples: ["Soiled bandages", "Culture dishes", "Blood bags", "Swabs"],
      guidelines: "Must be placed in leak-proof, biohazard-labeled red bags and containers. Requires treatment before disposal."
    },
    {
      title: "Sharps Waste",
      description: "Objects that can cut or puncture skin",
      icon: <Syringe className="h-5 w-5" />,
      color: "caution",
      examples: ["Needles", "Scalpels", "Broken glass", "Lancets"],
      guidelines: "Must be collected in puncture-resistant, labeled containers. Never recap needles before disposal."
    },
    {
      title: "Pharmaceutical Waste",
      description: "Expired or unused medications and related supplies",
      icon: <Tablets className="h-5 w-5" />,
      color: "caution",
      examples: ["Expired drugs", "Unused medications", "Containers", "Vials"],
      guidelines: "Must be segregated from other waste streams. Some medications require special disposal methods."
    },
    {
      title: "Chemical Waste",
      description: "Laboratory chemicals and reagents",
      icon: <Flask className="h-5 w-5" />,
      color: "hazard",
      examples: ["Solvents", "Disinfectants", "Reagents", "Acids"],
      guidelines: "Must be collected in compatible containers with proper labeling. Segregate incompatible chemicals."
    },
    {
      title: "Radioactive Waste",
      description: "Materials contaminated with radioactive substances",
      icon: <RadioIcon className="h-5 w-5" />,
      color: "hazard",
      examples: ["Isotopes", "Contaminated tools", "Lab coats", "Gloves"],
      guidelines: "Requires specialized containment, labeling, and documentation. Must be handled by trained personnel only."
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((category, index) => (
        <WasteCategory key={index} {...category} />
      ))}
    </div>
  );
};

export default WasteCategories;
