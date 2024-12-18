// Token utilities
export const getToken = () => localStorage.getItem('token');

export const setToken = (token) => {
  if (token) {
    localStorage.setItem('token', `Bearer ${token}`);
  } else {
    localStorage.removeItem('token');
  }
};

export const removeToken = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('user');
};

// User utilities
export const getUser = () => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

export const isAuthenticated = () => {
  return !!getToken();
};

export const hasRole = (role) => {
    const user = getUser();
    if (!user || !Array.isArray(user.roles)) return false;
    return user.roles.includes(role);
  };
  
