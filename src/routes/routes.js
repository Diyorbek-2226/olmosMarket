import { Home  } from 'lucide-react';
import Dashboard from '../pages/dashboard/Dashboard';
import Seller from '../pages/seller/Seller';

export const routes = [
  { id: 1, name: 'Dashboard', path: 'dashboard', icon: Home, element: Dashboard },
  
  { id: 2, name: 'Sotuvchilar', path: 'seller', icon: Home, element: Seller },
];
          