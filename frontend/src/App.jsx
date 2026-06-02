import React from 'react'
import AppRoutes from './routes/AppRoutes'
import { BrowserRouter } from 'react-router-dom'
import UserProvider from './context/UserContext'

const App = () => {
  return (
    <UserProvider>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
    </UserProvider>
  )
}

export default App
