import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
}

export function StatsCard({ title, value, icon: Icon, trend, trendUp }: StatsCardProps) {
  return (
    <Card className="p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground mb-1" data-testid="text-stats-title">
            {title}
          </p>
          <p className="text-2xl font-bold" data-testid="text-stats-value">
            {value}
          </p>
          {trend && (
            <p
              className={`text-sm mt-1 ${
                trendUp ? "text-chart-1" : "text-destructive"
              }`}
              data-testid="text-stats-trend"
            >
              {trend}
            </p>
          )}
        </div>
        <div className="p-3 bg-primary/10 rounded-lg">
          <Icon className="h-6 w-6 text-primary" />
        </div>
      </div>
    </Card>
  );
}
