import { useState } from 'react';
import { Bell, Menu } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from './Sidebar';
import { cn } from '@/lib/utils';

const INITIAL_NOTIFICATIONS = [
  { id: 1, title: 'New User Registered', time: '5m ago', description: 'Marvin McKinney joined the platform', read: false },
  { id: 2, title: 'Support Ticket #123', time: '1h ago', description: 'Courtney Henry requested assistance', read: false },
  { id: 3, title: 'Subscription Renewed', time: '2h ago', description: 'Cameron Williamson upgraded to Pro', read: false },
];

const Topbar = () => {
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const hasUnread = notifications.some(n => !n.read);

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <header className="h-20 flex items-center justify-between px-4 md:px-8 bg-[#121417] border-b border-gray-800 sticky top-0 z-20">
      <div className="flex items-center gap-4">
        <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden text-gray-400">
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 border-none bg-transparent">
            <div className="w-64 h-full">
              <Sidebar isMobile onClose={() => setIsSidebarOpen(false)} />
            </div>
          </SheetContent>
        </Sheet>
        
        <div>
          <h2 className="text-lg md:text-xl font-semibold text-white">Hello, Admin</h2>
          <p className="text-[10px] md:text-xs text-gray-500">Check & maintains your dashboard</p>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-6">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative text-gray-400 hover:text-white cursor-pointer">
              <Bell className="w-5 h-5" />
              {hasUnread && (
                <span className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full border-2 border-[#121417]"></span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 bg-[#1A1C1E] border-gray-800 text-white p-0 overflow-hidden shadow-2xl">
            <div className="flex justify-between items-center p-4 border-b border-gray-800 bg-[#121417]">
              <DropdownMenuLabel className="p-0 font-bold">Notifications</DropdownMenuLabel>
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  markAllAsRead();
                }}
                className="text-[10px] text-blue-500 hover:text-blue-400 font-bold cursor-pointer transition-colors"
              >
                Mark as read
              </button>
            </div>
            <div className="max-h-80 overflow-y-auto custom-scrollbar">
              {notifications.map((notif) => (
                <DropdownMenuItem 
                  key={notif.id} 
                  className={cn(
                    "flex flex-col items-start gap-1 p-4 cursor-pointer hover:bg-white/5 focus:bg-white/5 focus:text-white border-b border-gray-800/50 last:border-0",
                    !notif.read && "bg-blue-600/5"
                  )}
                >
                  <div className="flex justify-between w-full">
                    <span className="font-semibold text-sm">{notif.title}</span>
                    <span className="text-[10px] text-gray-500">{notif.time}</span>
                  </div>
                  <p className="text-xs text-gray-400">{notif.description}</p>
                </DropdownMenuItem>
              ))}
            </div>
            <DropdownMenuItem className="justify-center text-blue-500 text-xs font-semibold cursor-pointer py-3 hover:bg-white/5 bg-[#121417] border-t border-gray-800">
              View All Notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <div className="flex items-center gap-3">
          <Avatar className="w-8 h-8 md:w-10 md:h-10 border border-gray-700 cursor-pointer">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
