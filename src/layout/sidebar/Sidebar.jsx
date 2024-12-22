import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { User, X, ChevronRight, ChevronLeft } from 'lucide-react';
import styles from './Sidebar.module.css';
import { routes } from '../../routes/routes';
import icons from '../../assets/logo.svg';

export function Sidebar({ isOpen, onClose }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    setMenuItems(routes);
  }, []);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      <div className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ''} ${isCollapsed ? styles.sidebarCollapsed : ''}`}>
        {/* Header Section */}
        <div className={styles.header}>
          {!isCollapsed && (
            <div className={styles.logo}>
              <div className={styles.logoIcon}>
                <img src={icons} alt="Olmos Market Logo" />
              </div>
              <span className={styles.logoText}>
                OLMOS <span className={styles.highlight}>MARKET</span>
              </span>
            </div>
          )}
          <button
            onClick={toggleCollapse}
            className={styles.toggleButton}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
          {onClose && (
            <button onClick={onClose} className={styles.closeButton} aria-label="Close sidebar">
              <X size={16} />
            </button>
          )}
        </div>

        {/* Navigation Section */}
        <nav className={styles.nav}>
          {menuItems.map((item) => (
            <NavLink
              key={item.id}
              to={item.path}
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
              }
            >
              {item.icon && <item.icon size={16} />}
              {!isCollapsed && <span>{item.name}</span>}
            </NavLink>
          ))}
        </nav>

        {/* User Profile Section */}
        <div className={styles.userProfile}>
          <div className={styles.avatar}>
            <User size={24} />
          </div>
          {!isCollapsed && <NavLink to="/logout">Logout</NavLink>}
        </div>
      </div>
      {isOpen && <div className={styles.backdrop} onClick={onClose}></div>}
    </>
  );
}

