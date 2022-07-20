import React, { createContext, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';
import createAuthRefreshInterceptor from 'axios-auth-refresh'

export const FetchContext = createContext({
  authAxios:null,
  kanbanAxios:null
});


const FetchProvider = ({ children }) => {
  const authContext = useContext(AuthContext)
  const authAxios = axios.create({
    baseURL: '/app/'
  })

  authAxios.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${authContext.getAccessToken()}`
    return config
  },
    error => {
      return Promise.reject(error)
    }
  )

  createAuthRefreshInterceptor(authAxios,authContext.getNewTokenForRequest,{
    skipWhileRefreshing:false,
    statusCodes: [500]
  })
  

  const kanbanAxios = axios.create({
    baseURL:'/kanban/'
  })
  
  kanbanAxios.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${authContext.authState.token}`
    return config
  },
    error => {
      return Promise.reject(error)
    }
  )

  const value = {authAxios,kanbanAxios}
  return (
    <FetchContext.Provider
      value={value}
    >
      {children}
    </FetchContext.Provider>
  );
};

export default FetchProvider;