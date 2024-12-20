import { Route, Routes } from 'react-router-dom';
import { routes } from './routes';
import Login from '../pages/login/Login';
import { ProtectedRoute } from '../components/protectedRoute/ProtectedRoute';
import AdminLayout from '../layout/adminLayout/AdminLayout';
import SellerAdd from '../pages/sellerAdd/SellerAdd';
import Logout from '../components/logOut/LogOut';

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
        <Route path='sellers/add' element={<SellerAdd/>}/>
        <Route path='logout' element={<Logout/>}/>
      </Route>
    </Routes>
  );
}
