import React from 'react';
import { Routes, Route, Navigate, useMatch } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import MainContent from '../components/MainContent';
import Navbar from '../components/Navbar';
import Roles from './Roles';
import Usuarios from './Usuarios';
import Event from './Events';
import {Membresias, MembresiaEdit} from './Membresia';

const Dashboard = ({ role, onLogout }) => {
  let match = useMatch('/dashboard/*');


  const user = {};

  return (
    <div>
      <Navbar user={user} />
      <div style={{ display: 'flex', flexDirection: 'row', height: '100%', marginTop: '70px' }}>
        <Sidebar onLogout={onLogout}/>
        <div style={{ flex: 1, padding: '20px' }}>
          <Routes>
            <Route path="/" element={<MainContent user={user} />} />
            <Route path="roles" element={<Roles />} />
            <Route path="usuarios" element={<Usuarios />} />
            <Route path="eventos" element={<Event />} />
            <Route path="membresias" element={<Membresias />} />
            <Route path="membresia/:id?" element={<MembresiaEdit />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;