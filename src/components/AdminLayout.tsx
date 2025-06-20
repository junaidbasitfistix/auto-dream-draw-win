
import { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { 
  Car, 
  Trophy, 
  LayoutDashboard, 
  Users, 
  Award, 
  Menu,
  X,
  Plus,
  List
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
    { icon: Car, label: 'Cars', path: '/admin/cars', submenu: [
      { icon: List, label: 'All Cars', path: '/admin/cars' },
      { icon: Plus, label: 'Add Car', path: '/admin/cars/new' }
    ]},
    { icon: Trophy, label: 'Raffles', path: '/admin/raffles', submenu: [
      { icon: List, label: 'All Raffles', path: '/admin/raffles' },
      { icon: Plus, label: 'Create Raffle', path: '/admin/raffles/new' }
    ]},
    { icon: Award, label: 'Winners', path: '/admin/winners' },
    { icon: Users, label: 'Users', path: '/admin/users' }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-50 flex w-full">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-16'} transition-all duration-300 bg-white shadow-lg border-r flex-shrink-0`}>
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className={`flex items-center space-x-2 ${!sidebarOpen && 'justify-center'}`}>
              <Car className="w-8 h-8 text-blue-600" />
              {sidebarOpen && <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>}
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        <nav className="mt-8">
          {menuItems.map((item) => (
            <div key={item.path}>
              <Link 
                to={item.path}
                className={`flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors ${
                  isActive(item.path) ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' : ''
                }`}
              >
                <item.icon className="w-5 h-5" />
                {sidebarOpen && <span className="ml-3">{item.label}</span>}
              </Link>
              
              {item.submenu && sidebarOpen && (
                <div className="ml-8 space-y-1">
                  {item.submenu.map((subItem) => (
                    <Link
                      key={subItem.path}
                      to={subItem.path}
                      className={`flex items-center px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 transition-colors ${
                        isActive(subItem.path) ? 'bg-blue-50 text-blue-600' : ''
                      }`}
                    >
                      <subItem.icon className="w-4 h-4" />
                      <span className="ml-2">{subItem.label}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {sidebarOpen && (
          <div className="absolute bottom-4 left-4 right-4">
            <Link to="/" className="text-sm text-blue-600 underline">
              View Website →
            </Link>
          </div>
        )}
      </div>

      {/* Main Content - Full Width */}
      <div className="flex-1 overflow-auto w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
