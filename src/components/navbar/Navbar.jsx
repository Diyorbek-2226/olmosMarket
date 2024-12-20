import { HelpCircle, Bell, User } from 'lucide-react';

function Navbar() {
  return (
    <header className="flex justify-between  items-center p-4 bg-white shadow-md">
      <div className="text-lg font-semibold text-gray-800">
        <span className="text-2xl font-mono font-bold">Admin uchun</span>
      </div>
      <div className="flex items-center">
        <HelpCircle className="ml-5 text-gray-800 hover:text-blue-500 cursor-pointer" size={24} />
        <Bell className="ml-5 text-gray-800 hover:text-blue-500 cursor-pointer" size={24} />
        <User className="ml-5 text-gray-800 hover:text-blue-500 cursor-pointer" size={24} />
      </div>
    </header>
  );
}

export default Navbar;
