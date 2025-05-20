import React from 'react'
import AppRoutes from './Routes/appRoutes'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


const App = () => {
  return (
    <>
      <AppRoutes />
      <ToastContainer position="top-center" />
    </>
  )
}

export default App