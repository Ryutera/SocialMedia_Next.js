"use client"
import React, { ReactNode, useContext, useEffect } from "react"
import apiClient from "../lib/apiClient";


interface AuthProviderProps{
    children: ReactNode;
}

interface AuthContextType{
login:(token:string)=> void;
logout:()=>void
}

const AuthContext = React.createContext<AuthContextType>({
    //デフォルトの値を何かしら設定しないとエラーになる
    login:()=>{},
    logout:()=>{},

})

export const useAuth= () =>{
    return useContext(AuthContext)
}

export const AuthProvider = ({children}:AuthProviderProps) =>{
    const token = localStorage.getItem("auth_token")

    useEffect(()=>{
apiClient.defaults.headers["Authorization"] = `Bearer ${token}`
    },[])
const login = async(token:string) =>{
    localStorage.setItem("auth_token", token)
}

const logout = ()=>{
    localStorage.removeItem("auth_token")
}

const value = {
    login, 
    logout
}

return (
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
)
}