
import React, { useContext, useState } from 'react';
import Auth from './contexts/Auth';
import './App.css';
import { Route, BrowserRouter, Routes, Navigate, HashRouter } from 'react-router-dom';
import Loginn from './pages/login/loginn';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { TemaGlobal } from './components/temaGlobal';
import Protected from './components/protectedRoute';
import RedirectUser from './components/redirectUser';
import Transacction from './pages/transactions/transacction';
import Filtersss from './pages/filtersss/filtersss';
import toast, { Toaster } from 'react-hot-toast';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import CajaMasterInfo from './pages/cajaMasterInfo/cajaMasterInfo';
import CambiarPasswords from './pages/cambiarPassword/cambiarPasswords';
import Enviar from './pages/enviar/enviar';
import Recibir from './pages/recibir/recibir';

const queryClient = new QueryClient()


function App() {

  const [userData, setUserData] = useState({ permision: ['crear', 'recargar'], name: 'g-nob' })

  return (
    <Auth>
      <ThemeProvider theme={TemaGlobal}>
        <HashRouter>
          <Toaster
            toastOptions={{
              className: '',
              duration: 5000,

            }}
          />
          <Routes>

            <Route exact path="/signIn" element={
              <RedirectUser>
                <Loginn />
              </RedirectUser>

            } />
            <Route exact path="/" element={
              <Protected isAlloweb={!!userData}>
                <Transacction />
              </Protected>
            }
            />
            <Route exact path="/flujo" element={
              <Protected isAlloweb={!!userData}>
                <Filtersss />
              </Protected>
            }
            />
            <Route exact path="/enviar" element={
              <Protected isAlloweb={!!userData}>
                <Enviar />
              </Protected>
            }
            />
            <Route exact path="/recibir" element={
              <Protected isAlloweb={!!userData}>
                <Recibir />
              </Protected>
            }
            />
            <Route exact path="/caja_master_info/:id" element={
              <Protected isAlloweb={!!userData}>
                <CajaMasterInfo />
              </Protected>
            }
            />
            <Route exact path="/cambiar_password" element={
              <Protected isAlloweb={!!userData}>
                <CambiarPasswords />
              </Protected>
            }
            />

          </Routes>
        </HashRouter>
      </ThemeProvider>
    </Auth>
  );
}

export default App;
