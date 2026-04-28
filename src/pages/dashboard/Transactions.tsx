import { useState, useMemo } from 'react';
import { Search, Filter, ArrowUpDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import DataTable from '@/components/shared/DataTable';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from '@/lib/utils';

interface Transaction {
  id: string;
  orderId: string;
  customerName: string;
  plan: string;
  amount: string;
  status: 'Completed' | 'Pending' | 'Failed';
  date: string;
}

const INITIAL_TRANSACTIONS: Transaction[] = [
  { id: '1', orderId: '#ORD-7732', customerName: 'Marvin McKinney', plan: 'Pro Plan', amount: '$49.00', status: 'Completed', date: '21 Jan 2026' },
  { id: '2', orderId: '#ORD-7733', customerName: 'Cameron Williamson', plan: 'Basic Plan', amount: '$19.00', status: 'Completed', date: '21 Jan 2026' },
  { id: '3', orderId: '#ORD-7734', customerName: 'Brooklyn Simmons', plan: 'Pro Plan', amount: '$49.00', status: 'Pending', date: '21 Jan 2026' },
  { id: '4', orderId: '#ORD-7735', customerName: 'Albert Flores', plan: 'Basic Plan', amount: '$19.00', status: 'Failed', date: '21 Jan 2026' },
  { id: '5', orderId: '#ORD-7736', customerName: 'Eleanor Pena', plan: 'Pro Plan', amount: '$49.00', status: 'Completed', date: '22 Jan 2026' },
  { id: '6', orderId: '#ORD-7737', customerName: 'Ralph Edwards', plan: 'Basic Plan', amount: '$19.00', status: 'Completed', date: '22 Jan 2026' },
  { id: '7', orderId: '#ORD-7738', customerName: 'Darrell Steward', plan: 'Pro Plan', amount: '$49.00', status: 'Completed', date: '22 Jan 2026' },
  { id: '8', orderId: '#ORD-7739', customerName: 'Bessie Cooper', plan: 'Basic Plan', amount: '$19.00', status: 'Completed', date: '22 Jan 2026' },
];

const TransactionsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<'All' | 'Completed' | 'Pending' | 'Failed'>('All');
  const itemsPerPage = 8;

  const filteredTransactions = useMemo(() => {
    return INITIAL_TRANSACTIONS.filter(t => {
      const matchesSearch = t.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.orderId.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'All' || t.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, statusFilter]);

  const paginatedTransactions = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredTransactions.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredTransactions, currentPage]);

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

  const columns = [
    { 
      header: (
        <div className="flex items-center gap-1">
          Order ID <ArrowUpDown className="w-3 h-3" />
        </div>
      ), 
      accessorKey: 'orderId',
      cell: (t: Transaction) => <span className="text-white font-medium">{t.orderId}</span>
    },
    { 
      header: (
        <div className="flex items-center gap-1">
          Customer Name <ArrowUpDown className="w-3 h-3" />
        </div>
      ), 
      accessorKey: 'customerName',
      cell: (t: Transaction) => <span className="text-gray-300">{t.customerName}</span>
    },
    { 
      header: (
        <div className="flex items-center gap-1">
          Plan <ArrowUpDown className="w-3 h-3" />
        </div>
      ), 
      accessorKey: 'plan',
      cell: (t: Transaction) => <span className="text-gray-400">{t.plan}</span>
    },
    { 
      header: (
        <div className="flex items-center gap-1">
          Amount <ArrowUpDown className="w-3 h-3" />
        </div>
      ), 
      accessorKey: 'amount',
      cell: (t: Transaction) => <span className="text-white font-bold">{t.amount}</span>
    },
    { 
      header: (
        <div className="flex items-center gap-1">
          Date <ArrowUpDown className="w-3 h-3" />
        </div>
      ), 
      accessorKey: 'date',
      cell: (t: Transaction) => <span className="text-gray-400">{t.date}</span>
    },
    { 
      header: (
        <div className="flex items-center gap-1">
          Status <ArrowUpDown className="w-3 h-3" />
        </div>
      ), 
      accessorKey: 'status',
      cell: (t: Transaction) => (
        <Badge variant="outline" className={cn(
          "border-none px-3 py-0.5 rounded-full text-[10px] font-semibold",
          t.status === 'Completed' ? 'bg-green-500/10 text-green-500' :
          t.status === 'Pending' ? 'bg-yellow-500/10 text-yellow-500' :
          'bg-red-500/10 text-red-500'
        )}>
          {t.status}
        </Badge>
      )
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">Transaction History</h2>
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
              <DropdownMenuItem onClick={() => setStatusFilter('Completed')} className="cursor-pointer hover:bg-white/5 text-green-500">Completed</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter('Pending')} className="cursor-pointer hover:bg-white/5 text-yellow-500">Pending</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter('Failed')} className="cursor-pointer hover:bg-white/5 text-red-500">Failed</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        <Input 
          placeholder="Search by Order ID or Name" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-[#1A1C1E] border-none text-white pl-12 h-12 rounded-xl focus:ring-1 focus:ring-blue-500 placeholder:text-gray-600 shadow-lg"
        />
      </div>

      <div className="bg-[#1A1C1E] rounded-2xl border border-gray-800/50 shadow-2xl overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <DataTable 
            columns={columns} 
            data={paginatedTransactions} 
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
    </div>
  );
};

export default TransactionsPage;
