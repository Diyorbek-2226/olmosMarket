import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { ChevronRight, User } from 'lucide-react';
import styles from './Sidebar.module.css';
import { routes } from '../../routes/routes';
import logo from '../../assets/logo.svg';

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    setMenuItems(routes);
  }, []);

  return (
    <div className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ''}`}>
      <div className={styles.header}>
        {!isCollapsed && (
          <div className={styles.logo}>
            <img src={logo} alt="Logo" className={styles.logoIcon} />
            <span className={styles.brandName}>
              OLMOS <span className={styles.highlight}>MARKET</span>
            </span>
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={styles.toggleButton}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
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
              `${styles.navLink} ${isActive ? styles.active : ''}`
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
          <NavLink to="/logout" className={styles.logoutLink}>Logout</NavLink>
        )}
      </div>
    </div>
  );
}

