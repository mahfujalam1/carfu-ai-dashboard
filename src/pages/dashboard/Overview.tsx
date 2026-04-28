import StatsCard from "@/components/dashboard/StatsCard";
import ActivityChart from "@/components/dashboard/ActivityChart";
import RegisterStatus from "@/components/dashboard/RegisterStatus";
import RecentMessages from "@/components/dashboard/RecentMessages";

const DashboardOverview = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard title="Total Revenue" value="130,450" />
        <StatsCard title="Total Registered User" value="220,100" />
        <StatsCard title="Total Incomplete Users" value="19,600" />
        <StatsCard title="Total Trial Users" value="19,600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ActivityChart />
        </div>
        <div className="space-y-6">
          <RegisterStatus />
          <RecentMessages />
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
