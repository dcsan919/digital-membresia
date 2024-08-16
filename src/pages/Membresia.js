import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaPlus, FaTrash, FaList, FaTh, FaEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import '../styles/membresia.css'
import axios from 'axios';
import { Alert, Modal, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const API_URL = 'https://api-digitalevent.onrender.com/api/membresia';

const Membresias = () => {
  const [activeList, setActiveList] = useState(1);
  const [membresias, setMembresias] = React.useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedMembresiaId, setSelectedMembresiaId] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    axios.get(API_URL)
      .then(response => {
        setMembresias(response.data);
      })
      .catch(error => {
        console.error('Error fetching roles:', error);
      });
  }, []);

  const handleViewList = (listNumber) => {
    setActiveList(listNumber);
  };

  const handleEdit = (id) => {
    navigate(`/dashboard/membresia/${id}`);
  };

  const handleAdd = () => {
    navigate('/dashboard/membresia')
  }
  
  const openDeleteModal = (id) => {
    setSelectedMembresiaId(id);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedMembresiaId(null);
  };

  const handleDelete = () => {
    axios.delete(`${API_URL}/${selectedMembresiaId}`)
      .then(response => {
        setMembresias(membresias.filter(membresia => membresia.membresia_id !== selectedMembresiaId));
        alert("Membresía eliminada exitosamente.");
        closeDeleteModal();
      })
      .catch(error => {
        console.error('Error deleting membresia:', error);
        alert("Error al eliminar la membresía.");
      });
  };

  const getCardClassName = (tipo) => {
    switch (tipo) {
      case 'Premium':
        return 'card-premium';
      case 'VIP':
        return 'card-vip';
      case 'Gratis':
        return 'card-gratis';
      default:
        return 'card-default';
    }
  };

  return (
    <div className="container mt-4">
      <h2>Membresias</h2>

      <div className="d-flex justify-content-between align-items-center border-bottom pb-2">
        <div className="container mt-4">
          <div className="row align-items-center justify-content-between">
            <div className="col-auto">
              <button className="btn btn-success" onClick={handleAdd}>
                <FaPlus className="mr-2" /> Crear Nueva Membresia
              </button>
            </div>
            <div className="col-auto">
              <button 
                className={activeList === 1 ? "btn btn-selected btn-primary" : "btn btn-light"}
                onClick={() => handleViewList(1)}
              >
                {activeList === 1 ? <FaTh size={25}/>: <FaTh size={19}/>}
                
              </button>

              <button 
                className={activeList === 2 ? "btn btn-viewlist btn-selected btn-primary" : "btn btn-light"}
                onClick={() => handleViewList(2)}
              >
                {activeList === 2 ? <FaList size={25}/>: <FaList size={19}/>}
                
              </button>
            </div>
          </div>
        </div>
      </div>
      

      {activeList === 1 && (
        <div className="container mt-4">
        <div className="membresia-container mt-2">
          <div className="row">
            {membresias.map(membresia => (
              <div className="col-md-4 mb-4" key={membresia.id}>
                <div className={`${getCardClassName(membresia.tipo)} card h-100`}>
                  <div className="card-body">
                    <h4 className="card-title">{membresia.tipo}</h4>
                    <div className='linea'></div>
                    <p className="card-text">Descripción: {membresia.descripcion}</p>
                    <p className="card-text">Costo: ${membresia.costo}</p>
                    <button onClick={() => handleEdit(membresia.membresia_id)} className="btn btn-primary mr-2">Editar</button>
                    <button onClick={() => openDeleteModal(membresia.membresia_id)} className="btn btn-danger">Eliminar</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      )}
      

      {activeList === 2 && (
        <div className="membresia-container mt-4">
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Tipo</th>
                  <th>Descripcion</th>
                  <th>Costo</th>
                </tr>
              </thead>
              <tbody>
                {membresias.map(membresia => (
                  <tr key={membresia.id}>
                    <td>{membresia.membresia_id}</td>
                    <td>{membresia.tipo}</td>
                    <td>{membresia.descripcion}</td>
                    <td>{membresia.costo}</td>
                    <td>
                      <button className="btn btn-primary mr-2" onClick={() => handleEdit(membresia.membresia_id)}>Editar</button>
                      <button className="btn btn-danger" onClick={() => openDeleteModal(membresia.membresia_id)}>Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

        <Modal show={showDeleteModal} onHide={closeDeleteModal}>
          <Modal.Header closeButton>
            <Modal.Title>Confirmar Eliminación</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>¿Estás seguro de que deseas eliminar esta membresía?</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeDeleteModal}>Cancelar</Button>
            <Button variant="danger" onClick={handleDelete}>Eliminar</Button>
          </Modal.Footer>
      </Modal>
    </div>
  );
}

const MembresiaEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);
  const [membresia, setMembresia] = useState(null);
  const [formData, setFormData] = useState({
    tipo: '',
    descripcion: '',
    costo: ''
  });
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      axios.get(`${API_URL}/${id}`)
        .then(response => {
          setMembresia(response.data);
          setFormData({
            tipo: response.data.tipo,
            descripcion: response.data.descripcion,
            costo: response.data.costo
          });
        })
        .catch(error => {
          console.error('Error fetching membresia details:', error);
        });
    }
  }, [id, isEditing]);

  const getCardClassName = (tipo) => {
    switch (tipo) {
      case 'Premium':
        return 'card-premium';
      case 'VIP':
        return 'card-vip';
      case 'Gratis':
        return 'card-gratis';
      default:
        return 'card-default';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = () => {
    setLoading(true);
    const request = isEditing
      ? axios.put(`${API_URL}/${id}`, formData)
      : axios.post(API_URL, formData);

    request
      .then((response) => {
        setAlertType('success');
        setAlertMessage(isEditing ? 'Membresía actualizada exitosamente' : 'Membresía creada exitosamente');
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
          navigate('/dashboard/membresias');
        }, 1000);
      })
      .catch((error) => {
        console.error('Error saving membresia:', error);
        setAlertType('danger');
        setAlertMessage(isEditing ? 'Error al actualizar la membresía' : 'Error al crear la membresía');
        setShowAlert(true);
        setLoading(false);
      });
  };

  const handleMembresias = () => {
    navigate(`/dashboard/membresias`);
  };

  return (
    <div className="container mt-4">
      {showAlert && <Alert variant={alertType}>{alertMessage}</Alert>}
      <div className="row mb-4">
        {/* Formulario de edición o creación */}
        <div className="col-md-8 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <h4 className="card-title">{isEditing ? 'Editar Membresía' : 'Crear Membresía'}</h4>
              <div className="linea"></div>
              <form>
                <div className="mb-3">
                  <label htmlFor="tipo" className="form-label">
                    Tipo
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="tipo"
                    name="tipo"
                    value={formData.tipo}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="descripcion" className="form-label">
                    Descripción
                  </label>
                  <textarea
                    className="form-control"
                    id="descripcion"
                    name="descripcion"
                    rows="3"
                    value={formData.descripcion}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="costo" className="form-label">
                    Costo
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="costo"
                    name="costo"
                    value={formData.costo}
                    onChange={handleChange}
                  />
                </div>
                {loading ? (
                  <button className="btn btn-success" type="button" disabled>
                    <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                    <span role="status"> Guardando...</span>
                  </button>
                ) : (
                  <div>
                  <button type="button" className="btn btn-success" onClick={handleSubmit}>
                    {isEditing ? 'Actualizar' : 'Crear'}
                  </button>

                  <button type="button" className="btn btn-danger" onClick={handleMembresias}>
                    Cancelar
                  </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* Tarjeta para verificar */}
        <div className="col-md-4 mb-4">
          <div className={`${getCardClassName(formData.tipo)} card h-100`}>
            <div className="card-body">
              <h4 className="card-title">{formData.tipo}</h4>
              <div className="linea"></div>
              <p className="card-text">Descripción: {formData.descripcion}</p>
              <p className="card-text">Costo: ${formData.costo}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export {Membresias, MembresiaEdit};