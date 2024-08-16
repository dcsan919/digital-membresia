import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/roles.css';
import { FaPlus } from 'react-icons/fa';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'https://digital-event-hub.fly.dev/api';

const Roles = () => {
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [roles, setRoles] = useState([]);
  const [newRoleName, setNewRoleName] = useState('');

  useEffect(() => {
    axios.get(`${API_URL}/roles`)
      .then(response => {
        setRoles(response.data);
      })
      .catch(error => {
        console.error('Error fetching roles:', error);
      });
  }, []);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleCreateRole = () => {
    // Lógica para crear un nuevo rol
    console.log(`Nuevo rol creado: ${newRoleName}`);
    setNewRoleName('');
    handleCloseModal();
  };

  return (
    <div className="container mt-4">
      <h2>Roles</h2>

      <div className="d-flex justify-content-between align-items-center border-bottom pb-2">
        <div>
          <button className="btn btn-primary" onClick={handleShowModal}>
            <FaPlus className="mr-2" /> Crear Nuevo Rol
          </button>
        </div>
      </div>

      <div className="roles-container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <button className="btn btn-secondary">Mostrar de 1 a 10 roles</button>
          <input 
            type="text" 
            className="form-control search-input" 
            placeholder="Buscar..." 
            value={search}
            onChange={handleSearchChange}
          />
        </div>

        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {roles.map(role => (
                <tr key={role.id}>
                  <td>{role.rol_id}</td>
                  <td>{role.nombre}</td>
                  <td>
                    <button className="btn btn-primary mr-2">Editar</button>
                    <button className="btn btn-danger">Eliminar Rol</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="text-center mt-3">
          Mostrando roles de 1 a 10
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Crear Rol</h5>
              <button type="button" className="close" onClick={handleCloseModal}>
                &times;
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label>Nombre del Rol</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={newRoleName}
                    onChange={(e) => setNewRoleName(e.target.value)}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                Cancelar
              </button>
              <button type="button" className="btn btn-primary" onClick={handleCreateRole}>
                Crear Rol
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Roles;
