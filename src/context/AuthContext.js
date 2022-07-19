import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext({
  authState: null,
  setAuthState: () => {},
  isAuthenticated:()=>{},
  logout:() =>{},
  isAdmin:()=>{}
});


const AuthProvider = ({ children }) => {
  const navigate = useNavigate()
  const userInfo = localStorage.getItem('userInfo');
  const expiresAt = localStorage.getItem('expiresAt');

  const [authState, setAuthState] = useState({
    token:null,
    expiresAt,
    userInfo: userInfo ? JSON.parse(userInfo) : {}
  });

  const setAuthInfo = ({ token, userInfo, expiresAt }) => {
    localStorage.setItem('userInfo', JSON.stringify(userInfo))
    localStorage.setItem('expiresAt', expiresAt)

    setAuthState({ token, userInfo, expiresAt })
  }

  const isAuthenticated = () =>{
    if(!authState.expiresAt){
      return false
    }
    return new Date().getTime()/1000 < authState.expiresAt
  }

  const isAdmin = () =>{
    return authState.userInfo.role === 'admin'
  }

  const logout = () =>{
    localStorage.removeItem('userInfo')
    localStorage.removeItem('expiresAt')
    setAuthState({
      token:null,
      userInfo:{},
      expiresAt:null
    })
    navigate('/')
  }

  const value = {
    authState,
    setAuthState: (authInfo) => setAuthInfo(authInfo),
    isAuthenticated,
    logout,
    isAdmin
  }
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
