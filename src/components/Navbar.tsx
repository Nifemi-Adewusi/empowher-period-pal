
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Calendar, PieChart, Settings } from 'lucide-react';
import { useUser } from '@/context/UserContext';

const Navbar = () => {
  const location = useLocation();
  const { userData } = useUser();
  
  if (!userData) return null; // Don't show navbar if user is not logged in
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg rounded-t-xl z-50">
      <div className="flex justify-around items-center py-2">
        <NavItem
          to="/"
          label="Home"
          icon={<Home size={24} />}
          isActive={location.pathname === '/'}
        />
        <NavItem
          to="/calendar"
          label="Calendar"
          icon={<Calendar size={24} />}
          isActive={location.pathname === '/calendar'}
        />
        <NavItem
          to="/insights"
          label="Insights"
          icon={<PieChart size={24} />}
          isActive={location.pathname === '/insights'}
        />
        <NavItem
          to="/settings"
          label="Settings"
          icon={<Settings size={24} />}
          isActive={location.pathname === '/settings'}
        />
      </div>
    </div>
  );
};

type NavItemProps = {
  to: string;
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
};

const NavItem: React.FC<NavItemProps> = ({ to, label, icon, isActive }) => {
  return (
    <Link
      to={to}
      className={`flex flex-col items-center px-3 py-2 ${
        isActive 
          ? 'text-empowher-primary font-medium' 
          : 'text-gray-400 hover:text-empowher-primary'
      }`}
    >
      {icon}
      <span className="text-xs mt-1">{label}</span>
    </Link>
  );
};

export default Navbar;
