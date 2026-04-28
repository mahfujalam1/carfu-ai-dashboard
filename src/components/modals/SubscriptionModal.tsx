import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { SubscriptionPlan } from '@/types';

interface SubscriptionModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  plan: SubscriptionPlan | null;
}

const SubscriptionModal = ({ isOpen, onOpenChange, plan }: SubscriptionModalProps) => {
  if (!plan) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#1A1C1E] border-gray-800 text-white max-w-md shadow-2xl">
        <div className="space-y-6">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Plan: {plan.name}</DialogTitle>
            <p className="text-blue-500 font-semibold">{plan.price}</p>
          </DialogHeader>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#121417] p-4 rounded-xl border border-gray-800">
              <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Subscribed Users</p>
              <p className="text-xl font-bold">{plan.subscribedUsers}</p>
            </div>
            <div className="bg-[#121417] p-4 rounded-xl border border-gray-800">
              <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Total Duration</p>
              <p className="text-xl font-bold">{plan.totalDuration}</p>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <h4 className="text-sm font-semibold">Includes:</h4>
            <ul className="space-y-2">
              <li className="text-xs text-gray-400 flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                Unlimited priority generation
              </li>
              <li className="text-xs text-gray-400 flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                Advanced AI editing tools
              </li>
              <li className="text-xs text-gray-400 flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                {plan.videoGenerated} video exports/month
              </li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SubscriptionModal;
