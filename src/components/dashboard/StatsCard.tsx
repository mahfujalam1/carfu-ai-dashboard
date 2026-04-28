import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  className?: string;
}

const StatsCard = ({ title, value, icon, className }: StatsCardProps) => {
  return (
    <Card className={cn("bg-[#1A1C1E] border-none text-white rounded-lg", className)}>
      <CardContent className="p-8">
        <div className="flex justify-between items-start">
          <div className="space-y-6">
            <p className="text-sm font-medium text-gray-400 tracking-tight">{title}</p>
            <h3 className="text-4xl font-bold text-[#0095FF] tracking-tight">{value}</h3>
          </div>
          <div className="bg-gray-800/50 p-2.5 rounded-full cursor-pointer hover:bg-gray-700 transition-colors border border-gray-700/50">
            <ArrowUpRight className="w-5 h-5 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
