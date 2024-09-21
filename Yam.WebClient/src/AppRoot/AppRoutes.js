import React from 'react'
import LogIn from '../Pages/Auth/LogIn'
import { Route, Routes } from 'react-router-dom'
import Home from '../Pages/Home/Home'
import SignUp from '../Pages/Auth/SignUp'
import Profile from '../Pages/Profile/Profile'
import PlugPage from '../Pages/PlugPage/PlugPage'
import RequireAuth from '@auth-kit/react-router/RequireAuth'

export default function AppRoutes() {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<LogIn />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path={'/profile'} element={
              <RequireAuth fallbackPath={'/login?redirectTo=profile'}>
                <Profile />
              </RequireAuth>
            }/>
            <Route path={'/plugpage'} element={
              <RequireAuth fallbackPath={'/login?redirectTo=plugpage'}>
                <PlugPage />
              </RequireAuth>
            }/>
        </Routes>
    </div>
  )
}
