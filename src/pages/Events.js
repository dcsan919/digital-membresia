import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/event.css';
import { FaPlus } from 'react-icons/fa';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'https://digital-event-hub.fly.dev/api';

const Event = () => {
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [events, setEvents] = useState([]);
  const [newEventName, setNewEventName] = useState({
    nombre: '',
    fecha_inicio: '',
    fecha_termino: '',
    hora: '',
    tipo_evento_id: '',
    organizador_id: '',
    validacion_id: '',
    categoria_id: '',
    ubicacion: '',
    max_per: '',
    estado: '',
    autorizado_por: '',
    fecha_autorizacion: ''
  });
  
  useEffect(() => {
    axios.get(`${API_URL}/events`)
      .then(response => {
        setEvents(response.data);
      })
      .catch(error => {
        console.error('Error fetching roles:', error);
      });
  }, []);
  const createEvent = () => {
    axios.post(`${API_URL}/events`, newEventName)
      .then(response => {
        setEvents([...events, response.data]);
        setShowModal(false);
        setNewEventName({
          nombre: '',
          fecha_inicio: '',
          fecha_termino: '',
          hora: '',
          tipo_evento_id: '',
          organizador_id: '',
          validacion_id: '',
          categoria_id: '',
          ubicacion: '',
          max_per: '',
          estado: '',
          autorizado_por: '',
          fecha_autorizacion: ''
        });
        
      })
      .catch (e => {
        console.error('Error al registrar evento', e)
      });
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleCreateEvent = () => {
    createEvent();
    console.log(`Nuevo evento creado: ${newEventName}`);
    setNewEventName('');

    handleCloseModal();
  };

  return (
    <div className="container mt-4">
      <h2>Lista de eventos</h2>

      <div className="d-flex justify-content-between align-items-center border-bottom pb-2">
        <div>
          <button className="btn btn-primary" onClick={handleShowModal}>
            <FaPlus className="mr-2" /> Crear Nuevo Evento
          </button>
        </div>
      </div>

      <div className="roles-container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <button className="btn btn-secondary">Mostrar de 1 a 10 eventos</button>
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
              <tr className='nab-table-event'>
                <th>Nombre</th>
                <th>Fecha inicio</th>
                <th>Fecha termino</th>
                <th>Hora</th>
                <th>Ubicación</th>
                <th>Max Personas</th>
                <th>Estado</th>
                <th>Fecha autorizacion</th>
                <th>Tipo de evento</th>
                <th>Nombre del Organizador</th>
                <th>Autorizado por</th>
                <th>Categoria nombre</th>
                <th>Imagen</th>
                <th>Aciones</th>
              </tr>
            </thead>
            <tbody>
              {events.map(event => (
                <tr key={event.id}>
                  <td>{event.nombre_evento}</td>
                  <td>{event.fecha_inicio}</td>
                  <td>{event.fecha_termino}</td>
                  <td>{event.hora}</td>
                  <td>{event.ubicacion}</td>
                  <td>{event.max_per}</td>
                  <td>{event.estado}</td>
                  <td>{event.fecha_autorizacion}</td>
                  <td>{event.tipo_evento}</td>
                  <td>{event.organizador_nombre}</td>
                  <td>{event.autorizado_nombre}</td>
                  <td>{event.categoria_nombre}</td>
                  <td><img src={event.imagen_url} style={{width:150, height: 150}}></img></td>
                  <td>
                    <button className="btn btn-primary mr-2">Editar</button>
                    <button className="btn btn-danger">Eliminar</button>
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
            <h5 className="modal-title">Crear Evento</h5>
            <button type="button" className="close" onClick={handleCloseModal}>
              &times;
            </button>
          </div>
          <div className="modal-body">
            <form className="form-grid">
              <div className="form-group form-group-full">
                <label>Nombre del Evento</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={newEventName.nombre}
                  onChange={(e) => setNewEventName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Fecha de inicio</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={newEventName.fecha_inicio}
                  onChange={(e) => setNewEventName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Fecha de Termino</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={newEventName.fecha_termino}
                  onChange={(e) => setNewEventName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Hora</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={newEventName.hora}
                  onChange={(e) => setNewEventName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Tipo de evento</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={newEventName.tipo_evento_id}
                  onChange={(e) => setNewEventName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Organizador</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={newEventName.organizador_id}
                  onChange={(e) => setNewEventName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Validacion</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={newEventName.validacion_id}
                  onChange={(e) => setNewEventName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Categoría</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={newEventName.categoria_id}
                  onChange={(e) => setNewEventName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Ubicación</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={newEventName.ubicacion}
                  onChange={(e) => setNewEventName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Máximo de personas</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={newEventName.max_per}
                  onChange={(e) => setNewEventName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Estado</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={newEventName.estado}
                  onChange={(e) => setNewEventName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Autorizado por</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={newEventName.autorizado_por}
                  onChange={(e) => setNewEventName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Fecha de autorización</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={newEventName.fecha_autorizacion}
                  onChange={(e) => setNewEventName(e.target.value)}
                />
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
              Cancelar
            </button>
            <button type="button" className="btn btn-primary" onClick={handleCreateEvent}>
              Crear Evento
            </button>
          </div>
        </div>
      </div>
      
      )}
    </div>
  );
};

export default Event;
