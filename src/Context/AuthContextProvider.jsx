import React, { createContext } from 'react'
import { useState } from 'react'

export let authContext=createContext()
export default function AuthContextProvider({children}) {
  const [token, setToken] = useState(localStorage.getItem("token"))
  const [userId, setUserId] = useState(localStorage.getItem("userId"))
  
  return <authContext.Provider value={{token,setToken,userId,setUserId}}>
    {children}
  </authContext.Provider>
}
