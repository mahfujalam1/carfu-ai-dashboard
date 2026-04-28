import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  UserX,
  CreditCard,
  History,
  MessageSquare,
  FileText,
  LogOut
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const navItems = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'Users', path: '/users', icon: Users },
  { name: 'Incomplete Users', path: '/incomplete-users', icon: UserX },
  { name: 'Subscription', path: '/subscription', icon: CreditCard },
  { name: 'Transaction', path: '/transaction', icon: History },
  { name: 'Support', path: '/support', icon: MessageSquare },
  { name: 'Terms & Conditions', path: '/terms', icon: FileText },
];

interface SidebarProps {
  isMobile?: boolean;
}

const Sidebar = ({ isMobile }: SidebarProps) => {
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    window.location.href = '/login';
  };

  return (
    <aside className={cn(
      "w-64 bg-[#1A1C1E] text-gray-400 flex flex-col h-screen border-r border-gray-800 transition-all duration-300",
      !isMobile && "hidden lg:flex fixed left-0 top-0"
    )}>
      <div className="p-8 flex items-center gap-2">
        <h1 className="text-xl font-bold text-white tracking-tight">Carfu AI</h1>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto custom-scrollbar">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group",
                isActive
                  ? "bg-blue-600/10 text-blue-500 border-r-4 border-blue-600 rounded-r-none"
                  : "hover:bg-white/5 hover:text-white"
              )
            }
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium text-sm">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 mt-auto">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 cursor-pointer text-gray-400 hover:text-white hover:bg-blue-600 bg-blue-600/10 h-12 rounded-xl"
          onClick={handleLogout}
        >
          <span className="flex-1 text-left font-semibold">Logout</span>
          <LogOut className="w-5 h-5" />
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
