import { Home ,Users } from 'lucide-react';
import Dashboard from '../pages/dashboard/Dashboard';
import Seller from '../pages/seller/Seller';
import Colors from '../pages/colors/Colors';

export const routes = [
  { id: 1, name: 'Dashboard', path: 'dashboard', icon: Home, element: Dashboard },
  
  { id: 2, name: 'Sotuvchilar', path: 'sellers', icon: Users, element: Seller },
  { id: 3, name: 'Ranglar', path: 'colors', icon: Users, element: Colors },
];
          