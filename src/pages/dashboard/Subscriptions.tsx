import { useState } from 'react';
import { Search, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DataTable from '@/components/shared/DataTable';
import SubscriptionModal from '@/components/modals/SubscriptionModal';
import type { SubscriptionPlan } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const mockPlans: SubscriptionPlan[] = [
  { id: '1', name: 'Free', price: '$0', subscribedUsers: 4148, videoGenerated: 100, totalDuration: '10h' },
  { id: '2', name: 'Basic', price: '$10 per month', subscribedUsers: 6615, videoGenerated: 100, totalDuration: '10h' },
  { id: '3', name: 'Pro', price: '$25 per month', subscribedUsers: 1470, videoGenerated: 200, totalDuration: '1h' },
];

const SubscriptionsPage = () => {
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetails = (plan: SubscriptionPlan) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  const columns = [
    { header: 'Plan Name', accessorKey: 'name' },
    { header: 'Price', accessorKey: 'price' },
    { header: 'Subscribed User', accessorKey: 'subscribedUsers' },
    { header: 'Video Generate', accessorKey: 'videoGenerated' },
    { 
      header: 'Action', 
      accessorKey: 'id',
      cell: (plan: SubscriptionPlan) => (
        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400" onClick={() => handleViewDetails(plan)}>
          <Eye className="w-4 h-4" />
        </Button>
      )
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-6">
        <h2 className="text-xl md:text-2xl font-bold text-white">Subscription</h2>
        <div className="overflow-x-auto custom-scrollbar">
          <DataTable 
            columns={columns} 
            data={mockPlans} 
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockPlans.map((plan) => (
          <Card key={plan.id} className="bg-[#1A1C1E] border-none text-white overflow-hidden group hover:ring-1 hover:ring-blue-500/50 transition-all">
            <CardHeader className="text-center pt-8 pb-4">
              <CardTitle className="text-xl font-bold">Carfu AI {plan.name}</CardTitle>
              <div className="flex items-center justify-center gap-1 mt-2">
                <span className="text-3xl font-bold">{plan.price.split(' ')[0]}</span>
                <span className="text-gray-400">/month</span>
              </div>
            </CardHeader>
            <CardContent className="px-8 pb-8 text-center space-y-6">
              <p className="text-xs text-gray-400">
                Get {plan.name === 'Pro' ? 'highest' : 'more'} access to new and powerful features to boost your productivity and creativity
              </p>
              <div className="text-left space-y-3">
                <p className="text-[10px] text-gray-500 uppercase font-bold">Featured</p>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5" />
                  <p className="text-xs text-gray-300">Access to our most intelligent model</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5" />
                  <p className="text-xs text-gray-300">{plan.videoGenerated} Videos per month</p>
                </div>
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 h-10 rounded-lg text-xs font-bold" onClick={() => handleViewDetails(plan)}>
                View Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <SubscriptionModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        plan={selectedPlan}
      />
    </div>
  );
};

export default SubscriptionsPage;
