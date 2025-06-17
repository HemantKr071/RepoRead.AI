import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { PrimeReactProvider } from 'primereact/api';
import { UserProvider } from './context/UserContext.tsx';
import {HelmetProvider } from 'react-helmet-async';

createRoot(document.getElementById('root')!).render(
   
  <StrictMode>
     <HelmetProvider>
     <PrimeReactProvider>
      <UserProvider>
         <App />
       </UserProvider>
    </PrimeReactProvider>
    </HelmetProvider>
  </StrictMode>,
)
