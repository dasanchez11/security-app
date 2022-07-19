import React, { createContext, useEffect } from 'react';
import axios from 'axios';


export const FetchContext = createContext({
  authAxios:null,
  kanbanAxios:null
});


const FetchProvider = ({ children }) => {
  const authAxios = axios.create({
    baseURL: '/app/'
  })
  const kanbanAxios = axios.create({
    baseURL:'/kanban/'
  })
  
  useEffect(()=>{
    const getCsrfToken = async() =>{
      const {data} = await authAxios.get('/csrf-token');
      authAxios.defaults.headers['X-CSRF-Token'] = data.csrfToken
    }
    getCsrfToken();
  },[])
  

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