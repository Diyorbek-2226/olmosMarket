import React, { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { routes } from './routes';
import { ProtectedRoute } from '../components/protectedRoute/ProtectedRoute';
import AdminLayout from '../layout/adminLayout/AdminLayout';

const Login = lazy(() => import('../pages/login/Login'));
const Logout = lazy(() => import('../components/logOut/LogOut'));
const SellerForm = lazy(() => import('../pages/seller/components/SellerForm'));
const ColorForm = lazy(() => import('../pages/colorForm/ColorForm'));

// Fallback component for Suspense
const LoadingFallback = () => <div className="flex justify-center items-center h-screen">Loading...</div>;

export default function AdminRoutes() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          {routes.map((item) => (
            <Route
              key={item.id}
              path={item.path}
              element={
                <Suspense fallback={<LoadingFallback />}>
                  <item.element />
                </Suspense>
              }
            />
          ))}
          <Route path='sellers/add' element={<SellerForm />} />
          <Route path="sellers/edit/:id" element={<SellerForm />} />
          <Route path="sellers/view/:id" element={<SellerForm />} />
          <Route path="color/add" element={<ColorForm />} />
          <Route path='logout' element={<Logout />} />
          <Route path='*' element={<div>NOT FOUND</div>} />
        </Route>
      </Routes>
    </Suspense>
  );
}

