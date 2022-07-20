import React, { createContext,useEffect } from 'react';
import axios from 'axios';


export const FetchContext = createContext({
  authAxios:null,
  kanbanAxios:null,
  publicAxios:null
});


const FetchProvider = ({ children }) => {


  const publicAxios = axios.create({
    baseURL: '/auth/'
  })

  const authAxios = axios.create({
    baseURL: '/app/'
  })

  const kanbanAxios = axios.create({
    baseURL:'/kanban/'
  })
  
  
  useEffect(()=>{
    const getCsrfToken =async() =>{
      try {
        const {data} = await publicAxios.get('csrf-token')
        publicAxios.defaults.headers['X-CSRF-Token'] = data.csrfToken
        authAxios.defaults.headers['X-CSRF-Token'] = data.csrfToken
        kanbanAxios.defaults.headers['X-CSRF-Token'] = data.csrfToken


      } catch (error) {
        console.log(error)
      }
    }

    getCsrfToken()
  },[publicAxios,authAxios,kanbanAxios])

  

  const value = {authAxios,kanbanAxios,publicAxios}
  return (
    <FetchContext.Provider
      value={value}
    >
      {children}
    </FetchContext.Provider>
  );
};

export default FetchProvider;