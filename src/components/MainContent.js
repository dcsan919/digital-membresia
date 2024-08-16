import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Roles from '../pages/Roles';
import Usuarios from '../pages/Usuarios';
import '../styles/mainContent.css';
import Event from '../pages/Events';
const MainContent = ({ role, user }) => {
  return (
    <div className="main-content">
      <Routes>
        <Route path="/" element={<HomePage role={role} />} />
        <Route path="/dashboard/roles" element={<Roles />} />
        <Route path="/dashboard/usuarios" element={<Usuarios />} />
        <Route path="/dashboard/eventos" element={<Event />} />
      </Routes>
    </div>
    
  );
  
};

const HomePage = ({ role }) => (
  
  <div className="home-page">
    <h1>Welcome, {role}</h1>
    <h2>Your Event Management Dashboard</h2>
    <p>Here you can create, view, and manage your events easily.</p>
    <div className="summary">
      <div className="card">
        <h3>Create Event</h3>
        <p>Start planning a new event by clicking the button below.</p>
        <button>Create Event</button>
      </div>
      <div className="card">
        <h3>Upcoming Events</h3>
        <p>View all your upcoming events in one place.</p>
        <button>View Events</button>
      </div>
      <div className="card">
        <h3>Manage Users</h3>
        <p>Manage your event participants and collaborators.</p>
        <button>Manage Users</button>
      </div>
    </div>
    <div className="recent-activities">
      <h2>Notificaciones</h2>
      <ul>
        <li>Event "Summer Festival" created on June 29, 2024</li>
        <li>User "John Doe" added to event "Tech Conference"</li>
        <li>Event "Charity Run" updated with new details</li>
      </ul>
    </div>
  </div>
);

export default MainContent;
