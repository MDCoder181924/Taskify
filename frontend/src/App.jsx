import React from 'react'
import AppRoutes from './routes/AppRoutes'
import { BrowserRouter } from 'react-router-dom'
import { UserProvider } from './context/UserContext'
import { TaskProvider } from './context/TaskContext'
import {Toaster } from 'react-hot-toast'

const App = () => {
  return (
    <BrowserRouter>
      <UserProvider>
        <TaskProvider>
          <AppRoutes />
          <Toaster position="bottom-right" />
        </TaskProvider>
      </UserProvider>
    </BrowserRouter>
  )
}

export default App
