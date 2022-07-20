import React, { createContext, useEffect, useState,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {FetchContext} from './FetchContext'

export const AuthContext = createContext({
  authState: null,
  setAuthState: () => {},
  isAuthenticated:()=>{},
  logout:() =>{},
  isAdmin:()=>{}
});


const AuthProvider = ({ children }) => {
  const fetchContext = useContext(FetchContext)
  const navigate = useNavigate()
 

  const [authState, setAuthState] = useState({
    userInfo: null,
    isAuthenticated: false
  });

  useEffect(()=>{
    const getUserInfo = async() =>{
      try {
        const {data} = await fetchContext.authAxios.get('user-info')
        setAuthState({userInfo:data.user, isAuthenticated:true})
      } catch (error) {
        setAuthState({userInfo:{},isAuthenticated:false})
      }
    }
    getUserInfo()
  },[fetchContext])

  const setAuthInfo = ({  userInfo }) => {
    setAuthState({
      userInfo,
      isAuthenticated: userInfo && userInfo._id ? true : false
    })
  }


  const logout = async () =>{
    try {
      await fetchContext.authAxios.post('logout')
      setAuthState({
        userInfo: {},
        isAuthenticated: false
      })
      navigate('/')
    } catch (error) {
      
    }
  }

  const value = {
    authState,
    setAuthState: (authInfo) => setAuthInfo(authInfo),
    logout,
  }
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
