import { Outlet } from 'react-router-dom';
import styles from './AdminLayout.module.css';
import { Sidebar } from '../sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';

function AdminLayout() {
  return (
    <div className={styles.layout}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className={styles.mainContainer}>
        <Navbar/>

        {/* Page Content */}
        <main className={styles.main}>
          <div className={styles.content}>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
