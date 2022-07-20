import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {publicFetch} from '../util/fetch'

export const AuthContext = createContext({
  authState: null,
  setAuthState: () => {},
  isAuthenticated:()=>{},
  logout:() =>{},
  isAdmin:()=>{},
  getNewToken:()=>{},
  getAccessToken: ()=>{},
  getNewTokenForRequest: ()=>{}
});


const AuthProvider = ({ children }) => {
  const navigate = useNavigate()
  const token = localStorage.getItem('token');
  const userInfo = localStorage.getItem('userInfo');
  const expiresAt = localStorage.getItem('expiresAt');

  const [authState, setAuthState] = useState({
    token,
    expiresAt,
    userInfo: userInfo ? JSON.parse(userInfo) : {}
  });

  const setAuthInfo = ({ token, userInfo, expiresAt }) => {
    localStorage.setItem('token', token)
    localStorage.setItem('userInfo', JSON.stringify(userInfo))
    localStorage.setItem('expiresAt', expiresAt)

    setAuthState({ token, userInfo, expiresAt })
  }

  const isAuthenticated = () =>{
    if(!authState.token || !authState.expiresAt){
      return false
    }
    return new Date().getTime()/1000 < authState.expiresAt
  }

  const isAdmin = () =>{
    return authState.userInfo.role === 'admin'
  }

  const getNewToken = async() =>{
    try {
      const {data} = await publicFetch.get('token/refresh')
      setAuthState({...authState,token:data.token})
    } catch (error) {
      return error
    }
  }

  const getAccessToken = () =>{
    return localStorage.getItem('token')
  }

  const getNewTokenForRequest = async(failedRequest) =>{
    const {data} = await publicFetch.get('token/refresh')

    failedRequest.response.config.headers['Authorization'] = `Bearer ${data.token}`

    localStorage.setItem('token',data.token)
    setAuthState({...authState,token:data.token})

    return Promise.resolve()
  }

  const logout = () =>{
    localStorage.removeItem('token')
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
    isAdmin,
    getNewToken,
    getAccessToken,
    getNewTokenForRequest
  }
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
