import React from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { UserProvider } from 'common/contexts/UserContext';
import NavLayout from 'common/layouts/NavLayout';
import Form from 'pages/cae-form/Form';
import Home from 'pages/home/Home';
import InitiativePage from 'pages/initiative-display/initiative';
import NotFound from 'pages/not-found/NotFound';
import Scoreboard from 'pages/scoreboard/Scoreboard';

import './App.css';

export default function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<NavLayout />}>
            <Route index element={<Home />} />
            <Route path='form' element={<Form />} />
            <Route path='scoreboard' element={<Scoreboard />} />
            <Route
              path='initiative/:programNameParam/:initiativeNameParam'
              element={<InitiativePage />}
            />
            <Route path='*' element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}
