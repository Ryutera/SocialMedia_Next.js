"use client"
import React, { ReactNode, useContext, useEffect, useState } from "react"
import apiClient from "../lib/apiClient";


interface AuthProviderProps{
    children: ReactNode;
}

interface AuthContextType{
    user: null | {id:number; email:string; username:string };
login:(token:string)=> void;
logout:()=>void
}

const AuthContext = React.createContext<AuthContextType>({
    //初期値を何かしら設定しないとエラーになる
    user: null,
    login:()=>{},
    logout:()=>{},

})

export const useAuth= () =>{
    return useContext(AuthContext)
}

export const AuthProvider = ({children}:AuthProviderProps) =>{

    const [user, setUser] = useState<null|{id:number; email:string; username:string }>(null)
   

    useEffect(()=>{
        const token = localStorage.getItem("auth_token")
        if (token) {
            apiClient.defaults.headers["Authorization"] = `Bearer ${token}`
            apiClient.get("/user/find").then((res)=>{
                setUser(res.data.user)
            }).catch((err)=>{
                console.log(err)
            })
        }

    },[])
const login = async(token:string) =>{
    localStorage.setItem("auth_token", token)
apiClient.defaults.headers["Authorization"] = `Bearer ${token}`
    apiClient.get("/users/find").then((res)=>{
        setUser(res.data.user)
    }).catch((err)=>{
        console.log(err)
    })
}

const logout = ()=>{
    localStorage.removeItem("auth_token")
    setUser(null)
   delete  apiClient.defaults.headers["Authorization"]
}

const value = {
    login,
    logout,
    user
}

return (
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
)
}