import React from 'react'
import { Routes  ,Route} from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Auth/Login'
import Register from '../pages/Auth/Register'
import Dashboard from '../pages/User/dashboard'

const AppRoutes = () => {
    return (
        <div>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/dashboard' element={<Dashboard/>} />
            </Routes>
        </div>
    )
}

export default AppRoutes
