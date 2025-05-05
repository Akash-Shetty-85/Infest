import React from 'react'
import AppRoutes from './Routes/appRoutes'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <>
      <AppRoutes />
      <ToastContainer position="top-center" />
    </>
  )
}

export default App