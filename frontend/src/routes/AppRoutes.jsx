import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Auth/Login'
import Register from '../pages/Auth/Register'
import Workspace from '../pages/User/Workspace'
import { useUser } from '../context/UserContext'
import LoadingScreen from '../components/Common/LoadingScreen'

const PublicRoute = ({ children }) => {
    const { user, loading } = useUser();
    if (loading) return <LoadingScreen />;
    return user ? <Navigate to="/dashboard" replace /> : children;
};

const PrivateRoute = ({ children }) => {
    const { user, loading } = useUser();
    if (loading) return <LoadingScreen />;
    return user ? children : <Navigate to="/login" replace />;
};

const AppRoutes = () => {
    return (
        <div>
            <Routes>
                <Route path='/' element={
                    <PublicRoute>
                        <Home />
                    </PublicRoute>
                } />
                <Route path='/login' element={
                    <PublicRoute>
                        <Login />
                    </PublicRoute>
                } />
                <Route path='/register' element={
                    <PublicRoute>
                        <Register />
                    </PublicRoute>
                } />
                <Route path='/dashboard' element={
                    <PrivateRoute>
                        <Workspace />
                    </PrivateRoute>
                } />
            </Routes>
        </div>
    )
}

export default AppRoutes
