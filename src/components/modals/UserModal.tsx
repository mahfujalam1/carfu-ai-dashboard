import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import type { User, IncompleteUser } from '@/types';

interface UserModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  user: User | IncompleteUser | null;
  onAction?: (userId: string) => void;
  actionText?: string;
  isBlocked?: boolean;
}

const UserModal = ({ isOpen, onOpenChange, user, onAction, actionText, isBlocked }: UserModalProps) => {
  if (!user) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#1A1C1E] border-gray-800 text-white max-w-md p-0 overflow-hidden shadow-2xl">
        <div className="p-6 space-y-6">
          <DialogHeader className="flex flex-row justify-between items-start space-y-0">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-500 font-bold text-xl">
                {user.name.charAt(0)}
              </div>
              <div>
                <DialogTitle className="text-xl font-bold">{user.name}</DialogTitle>
                <p className="text-xs text-blue-500">{user.email}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-gray-500">Registered</p>
              <p className="text-[10px] text-gray-400 font-bold">21 Jan 2026</p>
            </div>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-[#121417] rounded-xl border border-gray-800">
              <p className="text-[10px] text-gray-500 uppercase mb-1">User ID</p>
              <p className="text-sm font-semibold">{user.id}</p>
            </div>
            <div className="p-3 bg-[#121417] rounded-xl border border-gray-800">
              <p className="text-[10px] text-gray-500 uppercase mb-1">Role</p>
              <p className="text-sm font-semibold">User</p>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">About User</p>
            <p className="text-xs text-gray-400 leading-relaxed">
              This user has been active since January 2026. They have generated 12 videos and are currently on the Pro Plan. No suspicious activity detected.
            </p>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              className="w-12 bg-gray-800 border-none text-red-500 hover:bg-gray-700 h-10 rounded-lg cursor-pointer"
              onClick={() => onOpenChange(false)}
            >
              <X className="w-5 h-5" />
            </Button>
            {onAction && actionText && (
              <Button
                className={`flex-1 ${isBlocked ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'} text-white h-10 rounded-lg font-bold cursor-pointer`}
                onClick={() => onAction(user.id)}
              >
                {actionText}
              </Button>
            )}
            <Button
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white h-10 rounded-lg font-bold cursor-pointer"
              onClick={() => onOpenChange(false)}
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserModal;
