import { useState, useMemo } from 'react';
import { Search, Filter, Download, Eye, X, ChevronLeft, ChevronRight, ArrowUpDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import DataTable from '@/components/shared/DataTable';
import SupportTicketModal from '@/components/modals/SupportTicketModal';
import type { SupportTicket } from '@/types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

const INITIAL_TICKETS: SupportTicket[] = [
  { id: '1', name: 'Courtney Henry', email: 'jessica.hanson@example.com', subject: 'Não consegui pegar o link daquele material que a prof passou... tem como você me mandar?', status: 'Pending', date: '21 Jan 2026' },
  { id: '2', name: 'Jacob Jones', email: 'alma.lawson@example.com', subject: 'Ei, como q foi a aula hoje? Alguma fofoquinha interessante para compartilhar? 👀 kkkk', status: 'Resolved', date: '21 Jan 2026' },
  { id: '3', name: 'Darrell Steward', email: 'nathan.roberts@example.com', subject: 'Ainda não acabei essa pesquisa... vou ver se consigo terminar até amanhã', status: 'Pending', date: '21 Jan 2026' },
  { id: '4', name: 'Darlene Robertson', email: 'dolores.chambers@example.com', subject: 'Não consegui pegar o link daquele material que a prof passou... tem como você me mandar?', status: 'Pending', date: '21 Jan 2026' },
  { id: '5', name: 'Marvin McKinney', email: 'jackson.graham@example.com', subject: 'I need help with my account settings', status: 'Pending', date: '22 Jan 2026' },
  { id: '6', name: 'Cameron Williamson', email: 'alma.lawson@example.com', subject: 'Subscription renewal failed', status: 'Resolved', date: '22 Jan 2026' },
];

const SupportPage = () => {
  const [tickets, setTickets] = useState<SupportTicket[]>(INITIAL_TICKETS);
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<'All' | 'Pending' | 'Resolved'>('All');
  const itemsPerPage = 8;

  const handleViewDetails = (ticket: SupportTicket) => {
    setSelectedTicket(ticket);
    setIsModalOpen(true);
  };

  const handleMarkAsResolved = (ticketId: string) => {
    setTickets(prev => prev.map(t =>
      t.id === ticketId ? { ...t, status: 'Resolved' } : t
    ));
    if (selectedTicket?.id === ticketId) {
      setSelectedTicket(prev => prev ? { ...prev, status: 'Resolved' } : null);
    }
    setIsModalOpen(false);
  };

  const filteredTickets = useMemo(() => {
    return tickets.filter(ticket => {
      const matchesSearch = ticket.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.subject.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'All' || ticket.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [tickets, searchQuery, statusFilter]);

  const paginatedTickets = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredTickets.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredTickets, currentPage]);

  const totalPages = Math.ceil(filteredTickets.length / itemsPerPage);

  const columns = [
    {
      header: (
        <div className="flex items-center gap-1">
          Name <ArrowUpDown className="w-3 h-3" />
        </div>
      ),
      accessorKey: 'name',
      cell: (ticket: SupportTicket) => <span className="text-sm font-medium">{ticket.name}</span>
    },
    {
      header: (
        <div className="flex items-center gap-1">
          Email <ArrowUpDown className="w-3 h-3" />
        </div>
      ),
      accessorKey: 'email',
      cell: (ticket: SupportTicket) => <span className="text-gray-400">{ticket.email}</span>
    },
    {
      header: (
        <div className="flex items-center gap-1">
          Subject <ArrowUpDown className="w-3 h-3" />
        </div>
      ),
      accessorKey: 'subject',
      cell: (ticket: SupportTicket) => (
        <span className="text-xs text-gray-400 line-clamp-1 max-w-[200px] md:max-w-md">{ticket.subject}</span>
      )
    },
    {
      header: (
        <div className="flex items-center gap-1">
          Status <ArrowUpDown className="w-3 h-3" />
        </div>
      ),
      accessorKey: 'status',
      cell: (ticket: SupportTicket) => (
        <Badge variant="outline" className={cn(
          "border-none px-3 py-0.5 rounded-full text-[10px] font-semibold",
          ticket.status === 'Resolved' ? 'bg-green-500/10 text-green-500' : 'bg-gray-500/10 text-gray-400'
        )}>
          {ticket.status}
        </Badge>
      )
    },
    {
      header: (
        <div className="flex items-center gap-1">
          Action <ArrowUpDown className="w-3 h-3" />
        </div>
      ),
      accessorKey: 'id',
      cell: (ticket: SupportTicket) => (
        <Button
          variant="outline"
          size="sm"
          className="bg-white text-black hover:bg-gray-100 border-none rounded-full px-4 h-7 text-[10px] font-bold cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            handleViewDetails(ticket);
          }}
        >
          View
        </Button>
      )
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">Contact & Support</h2>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex-1 md:flex-none bg-white text-black hover:bg-gray-100 border-none rounded-lg h-10 px-6 cursor-pointer font-semibold shadow-sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter: {statusFilter}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-[#1A1C1E] border-gray-800 text-white">
              <DropdownMenuItem onClick={() => setStatusFilter('All')} className="cursor-pointer hover:bg-white/5">All</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter('Pending')} className="cursor-pointer hover:bg-white/5 text-yellow-500">Pending</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter('Resolved')} className="cursor-pointer hover:bg-white/5 text-green-500">Resolved</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        <Input
          placeholder="Search for Order"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-[#1A1C1E] border-none text-white pl-12 h-12 rounded-xl focus:ring-1 focus:ring-blue-500 placeholder:text-gray-600 shadow-lg"
        />
      </div>

      <div className="bg-[#1A1C1E] rounded-2xl border border-gray-800/50 shadow-2xl overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <DataTable
            columns={columns}
            data={paginatedTickets}
            onRowClick={handleViewDetails}
          />
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-start items-center gap-2 py-4">
        <Button
          variant="outline"
          size="icon"
          className="w-8 h-8 rounded-lg bg-[#1A1C1E] border-gray-800 text-gray-400 hover:bg-gray-800 disabled:opacity-30 cursor-pointer"
          onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
        {[...Array(totalPages)].map((_, i) => (
          <Button
            key={i + 1}
            variant="outline"
            className={cn(
              "w-8 h-8 rounded-lg text-xs font-bold border-none cursor-pointer",
              currentPage === i + 1 ? "bg-[#0095FF] text-white" : "bg-[#1A1C1E] text-gray-400 hover:bg-gray-800"
            )}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </Button>
        ))}
        <Button
          variant="outline"
          size="icon"
          className="w-8 h-8 rounded-lg bg-[#1A1C1E] border-gray-800 text-gray-400 hover:bg-gray-800 disabled:opacity-30 cursor-pointer"
          onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      <SupportTicketModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        ticket={selectedTicket}
        onResolve={handleMarkAsResolved}
      />
    </div>
  );
};

export default SupportPage;
