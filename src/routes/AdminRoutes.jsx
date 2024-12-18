import { Route, Routes } from 'react-router-dom';
import AdminLayout from '../layout/AdminLayout';
import { routes } from './routes';
import Dashboard from '../pages/dashboard/Dashboard';

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path='/admin' element={<AdminLayout />}>
        <Route index element={<Dashboard></Dashboard>}/>
        {routes.map((item) => (
          <Route
            key={item.id}
            path={item.path}
            element={<item.element />}
          />
        ))}
      </Route>
    </Routes>
  );
}
