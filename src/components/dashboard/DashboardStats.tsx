
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Calendar, TrendingUp, Trash } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  description,
  icon,
  trend,
  trendValue,
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
          {description}
          {trend && trendValue && (
            <span className={`ml-1 font-medium ${
              trend === "up" 
                ? "text-waste-safe" 
                : trend === "down" 
                  ? "text-waste-hazard" 
                  : "text-muted-foreground"
            }`}>
              {trendValue}
            </span>
          )}
        </p>
      </CardContent>
    </Card>
  );
};

const DashboardStats: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatsCard 
        title="Total Collections" 
        value="87" 
        description="This month"
        icon={<Trash className="h-5 w-5" />}
        trend="up"
        trendValue="+12.5% from last month"
      />
      <StatsCard 
        title="Next Collection" 
        value="Tomorrow" 
        description="January 28, 10:00 AM"
        icon={<Calendar className="h-5 w-5" />}
      />
      <StatsCard 
        title="Waste Volume" 
        value="342 kg" 
        description="This month"
        icon={<BarChart3 className="h-5 w-5" />}
        trend="up"
        trendValue="+7.2% from last month"
      />
      <StatsCard 
        title="Compliance" 
        value="98%" 
        description="Regulatory compliance score"
        icon={<TrendingUp className="h-5 w-5" />}
      />
    </div>
  );
};

export default DashboardStats;
