import React from 'react';
import { NavLink } from 'react-router-dom';
import { User, X } from 'lucide-react';
import styles from './Sidebar.module.css';
import { routes } from '../../routes/routes';
import icons from '../../assets/logo.svg';

export function Sidebar({ isOpen, onClose }) {
  return (
    <>
      <div className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.header}>
          <div className={styles.logo}>
            <div className={styles.logoIcon}>
              <img src={icons} alt="Olmos Market" />
            </div>
            <span className={styles.logoText}>
              OLMOS <span className={styles.highlight}>MARKET</span>
            </span>
          </div>
          <button onClick={onClose} className={styles.closeButton}>
            <X size={24} />
          </button>
        </div>

        <nav className={styles.nav}>
          {routes.map((item) => (
            <NavLink
              key={item.id}
              to={item.path}
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
              }
              onClick={onClose}
            >
              {item.icon && <item.icon size={20} />}
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>

        <div className={styles.userProfile}>
          <div className={styles.avatar}>
            <User size={24} />
          </div>
          <NavLink to={'logout'} onClick={onClose}>Logout</NavLink>
        </div>
      </div>
      {isOpen && <div className={styles.backdrop} onClick={onClose}></div>}
    </>
  );
}

