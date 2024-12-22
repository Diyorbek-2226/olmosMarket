import React, { lazy } from 'react';
import { Home, Users, Palette } from 'lucide-react';

const Dashboard = lazy(() => import('../pages/dashboard/Dashboard'));
const Seller = lazy(() => import('../pages/seller/Seller'));
const Colors = lazy(() => import('../pages/colors/Colors'));

export const routes = [
  { id: 1, name: 'Dashboard', path: 'dashboard', icon: Home, element: Dashboard },
  { id: 2, name: 'Sotuvchilar', path: 'sellers', icon: Users, element: Seller },
  { id: 3, name: 'Ranglar', path: 'colors', icon: Palette, element: Colors },
];

