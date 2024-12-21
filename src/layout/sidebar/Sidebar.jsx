import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ChevronRight, User } from 'lucide-react';
import styles from './Sidebar.module.css';
import { routes } from '../../routes/routes';
import icons from '../../assets/logo.svg'

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    setMenuItems(routes);
  }, []);

  return (
    <div className={`${styles.sidebar} ${isCollapsed ? styles.sidebarCollapsed : ''}`}>
      <div className={styles.header}>
        {!isCollapsed && (
          <div className={styles.logo}>
            <div className={styles.logoIcon}>
             <img src={icons} alt="Olmos Market" />
            </div>
            <span className={styles.logoText}>
              OLMOS <span className={styles.highlight}>MARKET</span>
            </span>
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={styles.toggleButton}
        >
          <ChevronRight size={20} className={isCollapsed ? styles.rotate180 : ''} />
        </button>
      </div>

      <nav className={styles.nav}>
        {menuItems.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
            }
          >
            {item.icon && <item.icon size={20} />}
            {!isCollapsed && <span>{item.name}</span>}
          </NavLink>
        ))}
      </nav>

      <div className={styles.userProfile}>
        <div className={styles.avatar}>
          <User size={24} />
        </div>
        {!isCollapsed && (
         <NavLink to={'logout'}>Logout</NavLink>
        )}
      </div>
    </div>
  );
}

