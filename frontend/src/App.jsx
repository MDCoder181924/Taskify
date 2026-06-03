import React from 'react'
import AppRoutes from './routes/AppRoutes'
import { BrowserRouter } from 'react-router-dom'
import { UserProvider } from './context/UserContext'
import { TaskProvider } from './context/TaskContext'

const App = () => {
  return (
    <BrowserRouter>
      <UserProvider>
        <TaskProvider>
          <AppRoutes />
        </TaskProvider>
      </UserProvider>
    </BrowserRouter>
  )
}

export default App
