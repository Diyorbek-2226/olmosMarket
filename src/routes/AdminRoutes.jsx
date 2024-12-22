import { Route, Routes } from 'react-router-dom';
import { routes } from './routes';
import Login from '../pages/login/Login';
import { ProtectedRoute } from '../components/protectedRoute/ProtectedRoute';
import AdminLayout from '../layout/adminLayout/AdminLayout';
import Logout from '../components/logOut/LogOut';
import SellerForm from '../pages/seller/components/SellerForm';
import ColorForm from '../pages/colorForm/ColorForm';

export default function AdminRoutes() {
  return (
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
            element={<item.element />}
          />
        ))}
        <Route path='sellers/add' element={<SellerForm/>}/>
        <Route path="/admin/sellers/edit/:id"element={<SellerForm/>}/>
        <Route path="/admin/sellers/view/:id"element={<SellerForm/>}/>
        <Route path="/admin/color/add"element={<ColorForm/>}/>
        <Route path='logout' element={<Logout/>}/>
        <Route path='*' element={<div>NOT FOUND</div>}></Route>
      </Route>
    </Routes>
  );
}
