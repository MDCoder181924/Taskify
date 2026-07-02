import React from 'react'
import AppRoutes from './routes/AppRoutes'
import { BrowserRouter } from 'react-router-dom'
import { UserProvider } from './context/UserContext'
import { TaskProvider } from './context/TaskContext'
import { ThemeProvider } from './context/ThemeContext'
import { Toaster } from 'react-hot-toast'

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <UserProvider>
          <TaskProvider>
            <AppRoutes />
            <Toaster position="bottom-right" />
          </TaskProvider>
        </UserProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
