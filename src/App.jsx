import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login/Login'
import { ProtectedRoute } from './components/protectedRoute/ProtectedRoute'
import SellerLayout from './layout/sellerLayout/SellerLayout';
import AdminLayout from './layout/adminLayout/AdminLayout';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute requiredRole="ROLE_ADMIN">
              <AdminLayout/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/seller/dashboard"
          element={
            <ProtectedRoute requiredRole="ROLE_SELLER">
              <SellerLayout/>
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;

