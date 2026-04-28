import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SupportTicketModal from '@/components/modals/SupportTicketModal';
import type { SupportTicket } from '@/types';

const messages: SupportTicket[] = [
  { id: '1', name: 'Ronald Richards', email: 'ronald@example.com', subject: 'Login issue', status: 'Pending', date: '21 Jan 2026' },
  { id: '2', name: 'Cameron Williamson', email: 'cameron@example.com', subject: 'Payment failed', status: 'Pending', date: '21 Jan 2026' },
  { id: '3', name: 'Guy Hawkins', email: 'guy@example.com', subject: 'Feature request', status: 'Pending', date: '21 Jan 2026' },
  { id: '4', name: 'Kathryn Murphy', email: 'kathryn@example.com', subject: 'Account deletion', status: 'Pending', date: '21 Jan 2026' },
  { id: '5', name: 'Annette Black', email: 'annette@example.com', subject: 'Bug report', status: 'Pending', date: '21 Jan 2026' },
];

const RecentMessages = () => {
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenTicket = (ticket: SupportTicket) => {
    setSelectedTicket(ticket);
    setIsModalOpen(true);
  };

  return (
    <Card className="bg-[#1A1C1E] border-none text-white shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold text-gray-300">Recent Support Message</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {messages.map((msg) => (
          <div key={msg.id} className="flex justify-between items-center bg-[#121417] p-3 md:p-4 rounded-3xl border border-gray-800/50 hover:bg-white/5 transition-colors group">
            <span className="text-gray-400 text-sm font-medium">{msg.name}</span>
            <Button 
              size="sm" 
              className="bg-[#0095FF] hover:bg-[#0095FF]/90 text-white h-7 md:h-8 px-4 md:px-6 text-[10px] md:text-xs font-bold rounded-full cursor-pointer"
              onClick={() => handleOpenTicket(msg)}
            >
              Open
            </Button>
          </div>
        ))}
      </CardContent>

      <SupportTicketModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        ticket={selectedTicket}
      />
    </Card>
  );
};

export default RecentMessages;
