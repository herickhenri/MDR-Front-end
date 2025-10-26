import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App.tsx'
import { ToastContainer } from 'react-toastify'

import './styles/global.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <ToastContainer limit={3} autoClose={3000}/>
  </StrictMode>,
)
