import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-[#121417]">
      <Sidebar />
      <main className="flex-1 lg:ml-64 flex flex-col min-w-0">
        <Topbar />
        <div className="p-4 md:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
