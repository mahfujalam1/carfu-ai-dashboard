import { useState, useMemo } from 'react';
import { Search, Filter, Eye, ArrowRight, ArrowUpDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import DataTable from '@/components/shared/DataTable';
import UserModal from '@/components/modals/UserModal';
import type { IncompleteUser } from '@/types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from '@/lib/utils';

const INITIAL_INCOMPLETE_USERS: IncompleteUser[] = [
  { id: '1', name: 'Marvin McKinney', email: 'jackson.graham@example.com', dob: '21 Sep, 2020', accountCreated: 'Dec 4, 2019 21:42' },
  { id: '2', name: 'Cameron Williamson', email: 'alma.lawson@example.com', dob: '1 Feb, 2020', accountCreated: 'Dec 7, 2019 23:26' },
  { id: '3', name: 'Brooklyn Simmons', email: 'deanna.curtis@example.com', dob: '1 Feb, 2020', accountCreated: 'Dec 4, 2019 21:42' },
  { id: '4', name: 'Albert Flores', email: 'debbie.baker@example.com', dob: '17 Oct, 2020', accountCreated: 'Dec 4, 2019 21:42' },
  { id: '5', name: 'Eleanor Pena', email: 'tanya.hill@example.com', dob: '17 Oct, 2020', accountCreated: 'Dec 4, 2019 21:42' },
  { id: '6', name: 'Ralph Edwards', email: 'michelle.rivera@example.com', dob: '24 May, 2020', accountCreated: 'Dec 4, 2019 21:42' },
  { id: '7', name: 'Darrell Steward', email: 'tim.jennings@example.com', dob: '24 May, 2020', accountCreated: 'Dec 7, 2019 23:26' },
  { id: '8', name: 'Bessie Cooper', email: 'willie.jennings@example.com', dob: '8 Sep, 2020', accountCreated: 'Dec 7, 2019 23:26' },
];

const IncompleteUsersPage = () => {
  const [users] = useState<IncompleteUser[]>(INITIAL_INCOMPLETE_USERS);
  const [selectedUser, setSelectedUser] = useState<IncompleteUser | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [dateFilter, setDateFilter] = useState<'All' | 'Today' | 'Last 7 Days'>('All');
  const itemsPerPage = 8;

  const handleViewDetails = (user: IncompleteUser) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          user.email.toLowerCase().includes(searchQuery.toLowerCase());
      // Dummy date filtering for demonstration
      const matchesDate = dateFilter === 'All' || user.accountCreated.includes('Dec 4'); 
      return matchesSearch && matchesDate;
    });
  }, [users, searchQuery, dateFilter]);

  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredUsers.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredUsers, currentPage]);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const columns = [
    { 
      header: (
        <div className="flex items-center gap-1">
          Customer Name <ArrowUpDown className="w-3 h-3" />
        </div>
      ), 
      accessorKey: 'name',
      cell: (user: IncompleteUser) => (
        <div className="flex items-center gap-3">
          <Avatar className="w-8 h-8 rounded-lg">
            <AvatarImage src={`https://i.pravatar.cc/150?u=${user.id}`} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium whitespace-nowrap">{user.name}</span>
        </div>
      )
    },
    { 
      header: (
        <div className="flex items-center gap-1">
          Customer Email <ArrowUpDown className="w-3 h-3" />
        </div>
      ), 
      accessorKey: 'email',
      cell: (user: IncompleteUser) => <span className="text-gray-400">{user.email}</span>
    },
    { 
      header: (
        <div className="flex items-center gap-1">
          Date of Birth <ArrowUpDown className="w-3 h-3" />
        </div>
      ), 
      accessorKey: 'dob',
      cell: (user: IncompleteUser) => <span className="text-gray-400">{user.dob}</span>
    },
    { 
      header: (
        <div className="flex items-center gap-1">
          Account Created <ArrowUpDown className="w-3 h-3" />
        </div>
      ), 
      accessorKey: 'accountCreated',
      cell: (user: IncompleteUser) => <span className="text-gray-400">{user.accountCreated}</span>
    },
    { 
      header: (
        <div className="flex items-center gap-1">
          Action <ArrowUpDown className="w-3 h-3" />
        </div>
      ), 
      accessorKey: 'id',
      cell: (user: IncompleteUser) => (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 cursor-pointer" onClick={(e) => {
            e.stopPropagation();
            handleViewDetails(user);
          }}>
            <Eye className="w-4 h-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-blue-500 cursor-pointer"
          >
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      )
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">56 New Incomplete Users</h2>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex-1 md:flex-none bg-white text-black hover:bg-gray-100 border-none rounded-lg h-10 px-6 cursor-pointer font-semibold shadow-sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter: {dateFilter}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-[#1A1C1E] border-gray-800 text-white">
            <DropdownMenuItem onClick={() => setDateFilter('All')} className="cursor-pointer hover:bg-white/5">All</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setDateFilter('Today')} className="cursor-pointer hover:bg-white/5">Today</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setDateFilter('Last 7 Days')} className="cursor-pointer hover:bg-white/5">Last 7 Days</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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
            data={paginatedUsers} 
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

      <UserModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        user={selectedUser}
        actionText="Contact"
        onAction={() => console.log('Contacting user:', selectedUser?.id)}
      />
    </div>
  );
};

export default IncompleteUsersPage;
