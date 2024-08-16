import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faFolder, faTicket, faUsers, faCalendarDays, faUserGroup, faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import '../styles/sidebar.css';

const Sidebar = ({ onLogout }) => {
  const [showDropdownCuentas, setShowDropdownCuentas] = useState(false);
  const [showDropdownMembresias, setShowDropdownMembresias] = useState(false);
  const [showDropdownContenido, setShowDropdownContenido] = useState(false);
  const [showDropdownEventos, setShowDropdownEventos] = useState(false);
  const [showDropdownAsistentes, setShowDropdownAsistentes] = useState(false);
  const [showDropdownGestion, setShowDropdownGestion] = useState(false);

  const toggleDropdownCuentas = () => {
    setShowDropdownCuentas(!showDropdownCuentas);
  };

  const toggleDropdownMembresias = () => {
    setShowDropdownMembresias(!showDropdownMembresias);
  };

  const toggleDropdownContenido = () => {
    setShowDropdownContenido(!showDropdownContenido);
  };

  const toggleDropdownEventos = () => {
    setShowDropdownEventos(!showDropdownEventos);
  };

  const toggleDropdownAsistentes = () => {
    setShowDropdownAsistentes(!showDropdownAsistentes);
  };

  const toggleDropdownGestion = () => {
    setShowDropdownGestion(!showDropdownGestion);
  };

  return (
    <div className="sidebar">
      <div>
        
          <>
            <h2>Dashboard</h2>
            <ul>
              <li className={showDropdownCuentas ? 'dropdown-active' : ''} onClick={toggleDropdownCuentas}>
                <FontAwesomeIcon icon={faUsers} className="menu-icon" />
                Cuentas
                {showDropdownCuentas && <FontAwesomeIcon icon={faChevronDown} className="chevron-icon" />}
              </li>
              {showDropdownCuentas && (
                <ul>
                <li className="roles-link">
                  <Link to="/dashboard/roles">Roles</Link>
                </li>
                <li className="usuarios-link">
                  <Link to="/dashboard/usuarios">Usuarios</Link>
                </li>
              </ul>
              )}
            </ul>
            <ul>
              <li className={showDropdownMembresias ? 'dropdown-active' : ''} onClick={toggleDropdownMembresias}>
                <FontAwesomeIcon icon={faTicket} className="menu-icon" />
                Membresias
                {showDropdownMembresias && <FontAwesomeIcon icon={faChevronDown} className="chevron-icon" />}
              </li>
              {showDropdownMembresias && (
                <ul>
                <li className="roles-link">
                  <Link to="/dashboard/membresias">Membresias</Link>
                </li>
                </ul>
              )}
            </ul>
            <ul>
              <li className={showDropdownContenido ? 'dropdown-active' : ''} onClick={toggleDropdownContenido}>
                <FontAwesomeIcon icon={faFolder} className="menu-icon" />
                Contenido
                {showDropdownContenido && <FontAwesomeIcon icon={faChevronDown} className="chevron-icon" />}
              </li>
              {showDropdownContenido && (
                <ul>
                  <li>Contenido 1</li>
                  <li>Contenido 2</li>
                </ul>
              )}
            </ul>
          </>
        

        
          <>
            <h2>Organizador</h2>
            <ul>
              <li className={showDropdownEventos ? 'dropdown-active' : ''} onClick={toggleDropdownEventos}>
                <FontAwesomeIcon icon={faCalendarDays} className="menu-icon" />
                Eventos
                {showDropdownEventos && <FontAwesomeIcon icon={faChevronDown} className="chevron-icon" />}
              </li>
              {showDropdownEventos && (
                <ul>
                <li className="roles-link">
                  <Link to="/dashboard/eventos">Eventos</Link>
                </li>
                <li className="usuarios-link">
                  <Link to="/dashboard/usuarios">Categoria</Link>
                </li>
              </ul>
              )}
            </ul>
            <ul>
              <li className={showDropdownAsistentes ? 'dropdown-active' : ''} onClick={toggleDropdownAsistentes}>
                <FontAwesomeIcon icon={faUserGroup} className="menu-icon" />
                Asistentes
                {showDropdownAsistentes && <FontAwesomeIcon icon={faChevronDown} className="chevron-icon" />}
              </li>
              {showDropdownAsistentes && (
                <ul>
                  <li>Asistentes 1</li>
                  <li>Asistentes 2</li>
                </ul>
              )}
            </ul>
            <ul>
              <li className={showDropdownGestion ? 'dropdown-active' : ''} onClick={toggleDropdownGestion}>
                <FontAwesomeIcon icon={faFolderOpen} className="menu-icon" />
                Gestion
                {showDropdownGestion && <FontAwesomeIcon icon={faChevronDown} className="chevron-icon" />}
              </li>
              {showDropdownGestion && (
                <ul>
                  <li>Contenido 1</li>
                  <li>Contenido 2</li>
                </ul>
              )}
            </ul>
          </>
        
      </div>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
};

export default Sidebar;
