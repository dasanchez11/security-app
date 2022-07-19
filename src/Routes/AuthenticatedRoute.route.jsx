import React from 'react'
import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import AppShell from '../AppShell'
import { AuthContext } from '../context/AuthContext'


const AuthenticatedRoute = ({ children, ...rest }) => {
  const authContext = useContext(AuthContext)
  const { isAuthenticated } = authContext
  const auth = isAuthenticated()

  return (<>
    {auth ? <AppShell>{children}</AppShell> : <Navigate to='/' />}
  </>
  )
}

export default AuthenticatedRoute