import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import styles from './AdminLayout.module.css';

function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={styles.layout}>
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className={styles.mainContainer}>
        <Navbar onToggleSidebar={toggleSidebar} />

        <main className={styles.main}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
