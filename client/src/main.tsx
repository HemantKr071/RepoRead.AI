import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { PrimeReactProvider } from 'primereact/api';
import { UserProvider } from './context/UserContext.tsx';


createRoot(document.getElementById('root')!).render(
   
  <StrictMode>
     <PrimeReactProvider>
      <UserProvider>
         <App />
       </UserProvider>
    </PrimeReactProvider>
  </StrictMode>,
)
