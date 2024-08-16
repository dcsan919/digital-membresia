import React, { useState, useEffect } from 'react';
import '../styles/usuarios.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaUserPlus } from 'react-icons/fa';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'https://api-digitalevent.onrender.com/api';

const Usuarios = () => {
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [usuarios, setUsuarios] = useState([]);
  const [newUser, setNewUser] = useState({
    nombre: '',
    email: '',
    contrasena: '',
    telefono: '',
    rol_id: '',
    membresia_id: '',
    activo: '',
    last_name: '',
    resetPasswordExpire: '',
    resetPasswordToken: '',
    fotoPerfil: ''
  });

  useEffect(() => {
    axios.get(`${API_URL}/users`)
      .then(response => {
        setUsuarios(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewUser(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleCreateUser = () => {
    axios.post(`${API_URL}users/register`, newUser)
      .then(response => {
        setUsuarios([...usuarios, response.data]);
        setShowModal(false);
        setNewUser({
          nombre: '',
          email: '',
          contrasena: '',
          telefono: '',
          rol_id: 0,
        });
      })
      .catch(error => {
        console.error('Error creating user:', error);
      });
  };

  const getRoleName = (roleId) => {
    switch(roleId) {
      case 1:
        return 'super admin';
      case 2:
        return 'organizador';
      case 3:
        return 'cliente';
      default:
        return 'Desconocido';
    }
  };

  const getMembresia = (roleId) => {
    switch(roleId) {
      case 1:
        return 'Basico';
      case 2:
        return 'Plus';
      case 3:
        return 'Profesional';
      case 4:
        return 'Defecto';
      default:
        return 'Sin asginar';
    }
  };


  return (
    <div className='fondo'>
      <div className="container">
        <div className="contenedor-tablas">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <button className="btn btn-secondary">Mostrar de 1 a 10 usuarios</button>
            <input 
              type="text" 
              className="form-control search-input" 
              placeholder="Buscar..." 
              value={search}
              onChange={handleSearchChange}
            />
          </div>

          <div className="card text-center mt-4">
            <div className="card-header">
              Lista de Usuarios
              <button className="btn btn-primary float-right" onClick={handleShowModal}>
                <FaUserPlus className="mr-2" /> Crear Nuevo Usuario
              </button>
            </div>
            <div className="card-body">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Email</th>
                    <th scope="col">Numero</th>
                    <th scope="col">Rol</th>
                    <th scope="col">Membresia</th>
                    <th scope="col">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {usuarios.map(usuario => (
                    <tr key={usuario.id}>
                      <td>{usuario.usuario_id}</td>
                      <td>{usuario.nombre}</td>
                      <td>{usuario.email}</td>
                      <td>{usuario.telefono}</td>
                      <td>{getRoleName(usuario.rol_id)}</td>
                      <td>{getMembresia(usuario.membresia_id)}</td>
                      <td>
                        <button className="btn btn-primary mr-2">Editar</button>
                        <button className="btn btn-danger">Eliminar</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="text-center mt-3">
            Mostrando usuarios de 1 a 10
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Crear Usuario</h5>
              <button type="button" className="close" onClick={handleCloseModal}>
                &times;
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label>Nombre</label>
                  <input type="text" className="form-control" name="name" value={newUser.nombre} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" className="form-control" name="email" value={newUser.email} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input type="password" className="form-control" name="password" value={newUser.contrasena} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input type="text" className="form-control" name="phone" value={newUser.telefono} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Rol</label>
                  <input type="text" className="form-control" name="role_id" value={newUser.rol_id} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Membresia</label>
                  <input type="text" className="form-control" name="membresia_id" value={newUser.membresia_id} onChange={handleChange} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                Cancelar
              </button>
              <button type="button" className="btn btn-primary" onClick={handleCreateUser}>
                Crear Usuario
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Usuarios;
