import { HelpCircle, Bell, User, Menu } from 'lucide-react';

// Fix: Correctly destructure the onToggleSidebar prop from the props object
function Navbar({ onToggleSidebar }) {
  return (
    <header className="flex items-center p-4 bg-white shadow-md justify-between">
      <button 
        onClick={onToggleSidebar} 
        className="text-gray-800 hover:text-blue-500 cursor-pointer"
      >
        <Menu size={24} />
      </button>
      <div className="flex items-center">
        <HelpCircle className="ml-5 text-gray-800 hover:text-blue-500 cursor-pointer" size={24} />
        <Bell className="ml-5 text-gray-800 hover:text-blue-500 cursor-pointer" size={24} />
        <User className="ml-5 text-gray-800 hover:text-blue-500 cursor-pointer" size={24} />
      </div>
    </header>
  );
}

export default Navbar;
