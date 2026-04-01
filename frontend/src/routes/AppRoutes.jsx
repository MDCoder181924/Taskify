import React from 'react'
import { Routes  ,Route} from 'react-router-dom'
import Login from '../pages/Auth/Login'
import Register from '../pages/Auth/Register'

const AppRoutes = () => {
    return (
        <div>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/register' element={<Register />} />
            </Routes>
        </div>
    )
}

export default AppRoutes
