import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import type { SupportTicket } from '@/types';

interface SupportTicketModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  ticket: SupportTicket | null;
  onResolve?: (ticketId: string) => void;
}

const SupportTicketModal = ({ isOpen, onOpenChange, ticket, onResolve }: SupportTicketModalProps) => {
  if (!ticket) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#1A1C1E] border-gray-800 text-white max-w-lg p-0 overflow-hidden shadow-2xl">
        <div className="p-6 space-y-6">
          <DialogHeader className="flex flex-row justify-between items-start space-y-0">
            <div>
              <DialogTitle className="text-xl font-bold">{ticket.name}</DialogTitle>
              <p className="text-xs text-blue-500">{ticket.email}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-gray-500">{ticket.date}</p>
              <p className="text-[10px] text-gray-500">12:30 pm</p>
            </div>
          </DialogHeader>

          <div className="space-y-4">
            <div className="p-4 bg-[#121417] rounded-xl border border-gray-800 space-y-3">
              <p className="text-xs font-semibold text-gray-300 underline underline-offset-4">Subject: {ticket.subject}</p>
              <div className="text-xs text-gray-400 leading-relaxed max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              className="w-12 bg-gray-800 border-none text-red-500 hover:bg-gray-700 h-10 rounded-lg cursor-pointer"
              onClick={() => onOpenChange(false)}
            >
              <X className="w-5 h-5" />
            </Button>
            {ticket.status !== 'Resolved' && onResolve && (
              <Button
                className="flex-1 bg-gray-800 hover:bg-gray-700 text-green-500 border border-green-500/20 h-10 rounded-lg font-bold cursor-pointer"
                onClick={() => onResolve(ticket.id)}
              >
                Mark as Resolved
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

export default SupportTicketModal;
