import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    if (!username || !password) {
      setError("Iltimos, barcha maydonlarni to'ldiring");
      return;
    }

    try {
      setLoading(true);
      setError('');

      const response = await fetch('http://157.230.94.49:8088/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login xatosi");
      }

      // Save tokens and user data
      localStorage.setItem('accessToken', data.token);
      localStorage.setItem('refreshToken', data.refreshToken);
      
      const userData = {
        id: data.userId,
        username: data.username,
        roles: data.roles,
      };
      localStorage.setItem('user', JSON.stringify(userData));

      // Set Authorization header for future requests
      if (data.token) {
        localStorage.setItem('token', `Bearer ${data.token}`);
      }

      // Navigate based on role
      if (data.roles.includes('ROLE_ADMIN')) {
        navigate('/admin/dashboard');
      } else if (data.roles.includes('ROLE_SELLER')) {
        navigate('/seller/dashboard');
      } else {
        navigate('/dashboard');
      }

    } catch (err) {
      setError(err.message || "Login paytida xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex flex-col justify-center py-12 px-4">
      <div className="max-w-md w-full mx-auto">
        <h2 className="text-4xl font-bold text-center mb-8">
          <span className="text-blue-600">Ozon</span>ga kirish
        </h2>

        <div className="bg-white rounded-lg shadow-sm p-8 pt-12 pb-12">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                id="username"
                type="text"
                ref={usernameRef}
                placeholder="Foydalanuvchi nomi"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Parol
              </label>
              <input
                id="password"
                type="password"
                ref={passwordRef}
                placeholder="••••••••"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Yuklanmoqda..." : "Kirish"}
            </button>
          </form>

          {error && (
            <p className="mt-2 text-sm text-red-600 text-center">
              {error}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;

